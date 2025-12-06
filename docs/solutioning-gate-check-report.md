# Solutioning Gate-Check Report

**Project:** Shift & KPI Reporting Solution
**Author:** Winston, System Architect
**Date:** 2025-12-06
**Version:** 1.0

---

## 1. Overall Assessment

### Coherence
The solution is **highly coherent**. The `architecture.md` aligns well with the requirements outlined in the `ux-design-specification.md` and `epics.md`.

-   **UX to Architecture:** User journeys, like the 9-step Shift Report, are directly supported by the proposed frontend components (`ShiftReportStepper`), backend API (`POST /api/reports`, `PUT /api/reports/:id/draft`), and database schema (`shift_reports`, `report_steps`). The KPI dashboard design is supported by dedicated backend aggregation endpoints.
-   **Backlog to Architecture:** MVP epics (E-1 to E-4, E-6) are all mapped to specific elements in the architecture plan (e.g., E-2 Auth -> Supabase RLS + NestJS Guards; E-4 KPIs -> NestJS Dashboard Module).
-   **Tech Stack:** The choice of Next.js, NestJS, and Supabase is a mature and powerful combination. The hybrid approach (using NestJS for complex logic and Supabase for simple data/auth) is a sound strategy that balances developer productivity with control and performance.

### Feasibility
The solution is **realistic for an MVP implementation**, provided the team adheres to the prioritization in the `epics.md` document.

-   **Clear MVP Scope:** The epics clearly distinguish between MVP (E-1, E-2, E-3, E-4, E-6) and Post-MVP (E-5 Historical Reporting). Deferring advanced historical analysis is a sensible decision that reduces initial complexity.
-   **Phased Rollout:** The implementation roadmap in `architecture.md` provides a logical sequence: foundation, then core reporting, then the manager dashboard. This iterative approach is well-suited for an MVP.

---

## 2. Coverage Check

### Shift Report Flow
**Verdict:** **Well-Covered**
-   The critical 9-step submission flow is thoroughly supported. The architecture accounts for a multi-step form on the frontend (`ShiftReportStepper`), auto-saving drafts (`PUT /api/reports/:id/draft`), and a transactional final submission (`POST /api/reports`). The `report_steps` table with its `JSONB` data field provides the necessary flexibility.

### KPI Dashboards & Reporting
**Verdict:** **Well-Covered**
-   The architecture correctly offloads heavy KPI aggregation to the NestJS backend (`GET /api/dashboard/kpis`), which is essential for performance (as noted in risk R-02). The `kpi_snapshots` table is a good forward-thinking addition for caching and historical performance analysis, though it may not be strictly necessary for the MVP.

### Non-Functional Requirements (NFRs)
**Verdict:** **Sufficiently Addressed (with dependencies)**
-   **Security:** The multi-layer security model (Supabase Auth + RLS + NestJS Guards) is robust. The main dependency is the correct *implementation* of RLS policies, which is highlighted as risk R-01 in the test design.
-   **Performance:** The architecture anticipates performance bottlenecks (KPI queries) and addresses them. The <2s load time requirement from the backlog (S-4.3) is explicitly acknowledged in the test design's risk R-02.
-   **Accessibility:** The UX spec mandates WCAG 2.1 AA and the test design includes automated `axe-core` scanning. This is a solid plan.
-   **Logging/Monitoring:** The need for structured logging is identified in the backlog (S-6.2) and the testability assessment. A health check endpoint was also recommended. This is sufficient for an MVP, but implementation is key.

---

## 3. Gaps & Risks

### Gaps
1.  **Role Management UI:** The architecture defines `shift_leader` and `manager` roles, and the `profiles` table stores them. However, there is no mention in the UX spec or epics of a user interface for an Operations Manager or admin to *assign* these roles. For the MVP, this will likely have to be done directly in the Supabase database.
2.  **Data Schema for All 9 Steps:** The `report_steps` table uses a generic `JSONB` field. While flexible, this defers schema definition. Before implementing the 9-step form, the development team must agree on the expected JSON structure for each of the 9 steps to ensure consistency.
3.  **Onboarding/Empty States:** The UX spec mentions empty states, but the initial seeding of necessary data (e.g., list of production lines, machine names for dropdowns) is not defined. This needs to be part of the initial setup (Epic E-1).

### Risks
| ID | Risk Description                                                               | Type      | Rating | Impact                                                                                                |
| :-- | :----------------------------------------------------------------------------- | :-------- | :----- | :---------------------------------------------------------------------------------------------------- |
| **R-01** | **Flawed RLS Implementation** (from Test Design)                             | Technical | **High**   | Critical data leakage between users/roles. A Shift Leader seeing another's data is a deal-breaker.  |
| **R-02** | **KPI Performance Degradation** (from Test Design)                           | Technical | **Medium** | Slow dashboard load times will frustrate managers and violate a core NFR (S-4.3).                   |
| **R-03** | **Non-Transactional Report Submission** (from Test Design)                 | Technical | **Medium** | A network or server error during submission could leave reports in a corrupt, half-finished state.     |
| **R-07** | **Hybrid Model Complexity**                                                  | Delivery  | **Medium** | The use of both direct Supabase calls and a separate NestJS backend adds cognitive overhead for developers. It must be very clear *when* to use which. |
| **R-08** | **Drafting/Autosave Logic**                                                | UX/Tech   | **Low**    | The interaction between the `useShiftReport.ts` hook, the auto-save API (`PUT /api/reports/:id/draft`), and Supabase could be complex to get right, potentially leading to lost user input. |

---

## 4. Alignment with Supabase

### Data Model & RLS
-   **Approach:** The proposed data model is sound and follows relational best practices. The use of a `profiles` table to extend `auth.users` is the standard, recommended Supabase pattern.
-   **RLS Policies:** The example RLS policies are a good start. However, they need to be comprehensive. For example, policies on `report_steps` and `incidents` are also required to ensure they are only accessible via the parent `shift_reports` record. The dependency on a JWT role claim (`TO manager`) is good, but this requires setting up custom claims correctly via Supabase Functions or triggers.

### Potential Issues & Anti-Patterns to Avoid
1.  **"Chatty" Frontend:** The architecture allows the frontend to call Supabase directly. Avoid making many small, individual queries for data that could be fetched in a single, larger query from the backend. The dashboard is a good example where the backend should do the heavy lifting.
2.  **Over-reliance on `service_role`:** The backend will use the `service_role` key to bypass RLS. This is necessary for aggregation, but this power should be used judiciously. All endpoints must still validate the user's *own* permissions via the JWT guard before performing any action. The service key should not be a backdoor to let users perform actions they aren't authorized for.
3.  **Client-side Writes:** The roadmap suggests draft auto-saving could go directly to Supabase from the client. This is acceptable for drafts owned by the user, but the final, transactional submission **must** be handled by the backend API as designed. This separation of concerns is critical.

---

## 5. Recommendations

### Before Implementation (Sprint 0)
1.  **ACTION (High Priority):** **Define the JSON Schema for all 9 Report Steps.** This should be documented and agreed upon by the frontend and backend developers.
2.  **ACTION (High Priority):** **Write comprehensive RLS policies** for *all* tables and create integration tests that prove they work as expected. This directly mitigates risk R-01.
3.  **ACTION (Medium Priority):** Clarify the process for **initial data seeding** (production lines, etc.) and **user role assignment**. For the MVP, a documented manual process is acceptable.
4.  **ACTION (Medium Priority):** Establish a clear **guideline for developers** on when to use the NestJS API vs. direct Supabase calls. (e.g., "Use API for all writes and complex reads; use Supabase client for simple, RLS-protected reads").

### During Implementation
5.  **Simplify for MVP:** Defer the `kpi_snapshots` table and the associated Edge Function. Calculate KPIs on-demand for the MVP. This simplifies the architecture and can be added later if performance becomes an issue (mitigates R-02 proactively).
6.  **Update Documents:**
    -   `architecture.md`: Should be updated with the RLS policies for `report_steps` and `incidents`, and the guideline on API vs. direct DB access.
    -   `epics.md`: Add a user story under Epic E-1 for initial data seeding.

---

## 6. Gate Decision

**Decision:** **Ready with Conditions**

The solution is well-architected and coherent. The planning artifacts are high-quality and demonstrate a clear understanding of the project's goals. The decision to proceed is contingent on addressing the following conditions *before* starting feature development (Epics E-3 and E-4).

1.  **Condition 1:** The JSON schema for the 9-step report must be defined and documented.
2.  **Condition 2:** The core RLS security policies must be implemented and, critically, verified with automated tests that prove both access and denial of access work correctly.
3.  **Condition 3:** A clear, documented guideline must be provided to the development team explaining when to use the backend API versus the direct Supabase client.
