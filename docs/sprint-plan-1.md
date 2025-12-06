# Sprint 1 Planning Package

**Sprint:** 1
**Project:** Shift & KPI Reporting Solution
**Author:** Bob, Scrum Master
**Date:** 2025-12-06

---

## 1. Sprint Goal

To establish the project's technical foundation and deliver the core user authentication flow. By the end of this sprint, a developer should be able to set up the environment, and a user should be able to log in and see a basic application shell, secured by a foundational role-based access control system.

---

## 2. Sprint Backlog

The following user stories have been selected for Sprint 1. The focus is on **Epic 1 (Foundation & Setup)** and **Epic 2 (Authentication & User Roles)**, as these are critical blockers for all future feature development.

| Story ID | User Story                                                                          | Epic | Complexity | Rationale                                                                      | Dependencies |
| :------- | :---------------------------------------------------------------------------------- | :--- | :--------- | :----------------------------------------------------------------------------- | :----------- |
| **S-1.1**  | As a Developer, I want a Next.js project initialized...                             | E-1  | S          | Establishes the frontend codebase.                                             | None         |
| **S-1.2**  | As a Developer, I want a NestJS project initialized...                            | E-1  | S          | Establishes the backend codebase.                                              | None         |
| **S-1.3**  | As a Developer, I want a Supabase project set up with the initial database schema.  | E-1  | M          | Creates the data persistence layer required for auth and future features.      | None         |
| **S-2.1**  | As a user, I want to log in with my email and password...                           | E-2  | M          | The primary entry point for all users. A blocker for all role-specific work. | S-1.1, S-1.3 |
| **S-2.4**  | As a Developer, I want to implement Supabase Row Level Security (RLS) policies...   | E-2  | L          | A foundational security requirement that must be in place before any data is written. | S-1.3, S-2.1 |

**Note on Dependencies:** While S-1.1, S-1.2, and S-1.3 can be started in parallel, S-2.1 depends on the frontend project existing and the database being ready. S-2.4 depends on a working auth flow and a database schema.

---

## 3. Task Breakdown

### Story: S-1.1 (Next.js Project)
-   **Frontend:** Initialize Next.js app with TypeScript, Tailwind CSS, and `shadcn/ui`.
-   **Frontend:** Create the main layout component, including the persistent sidebar as defined in `ux-design-specification.md`.
-   **Documentation:** Create a `README.md` with setup and run instructions for the frontend.

### Story: S-1.2 (NestJS Project)
-   **Backend:** Initialize NestJS project with TypeScript.
-   **Backend:** Set up modules for `Auth`, `Users`, and `Reports` as placeholders.
-   **Backend:** Establish a connection to the Supabase database.
-   **Documentation:** Create a `README.md` with setup and run instructions for the backend.

### Story: S-1.3 (Supabase Setup)
-   **Backend (DB):** Create the Supabase project.
-   **Backend (DB):** Write and apply SQL migration scripts for the initial schema (`profiles`, `shift_reports`, `report_steps`, `incidents`).
-   **Documentation:** Document the process for applying migrations.

### Story: S-2.1 (User Login)
-   **Frontend:** Build the login page UI (`/auth/login`) based on the design specification.
-   **Frontend:** Implement the client-side logic in `hooks/useAuth.ts` to call the Supabase Auth client for login.
-   **Frontend:** Implement JWT storage in the browser and handle authenticated/unauthenticated states.
-   **Testing:** Write an E2E test (Playwright) that verifies a user can log in and is redirected to the dashboard.

### Story: S-2.4 (Implement RLS)
-   **Backend (DB):** Write and apply the initial RLS policies for `profiles` and `shift_reports` as defined in `architecture.md`.
-   **Backend (DB):** Create a 'manager' and 'shift_leader' role in PostgreSQL.
-   **Testing:** Write integration tests (Vitest/supertest) that attempt to access data as different roles and assert that the RLS policies work correctly. These tests must prove both access and denial of access.

---

## 4. Capacity & Feasibility Check

-   **Total Stories:** 5
-   **Complexity Distribution:** Small (S): 2, Medium (M): 2, Large (L): 1.
-   **Estimated Effort:** The scope is heavily focused on foundational setup and one key user flow (login). The complexity is low-to-medium, with the RLS work being the most complex piece. This is a **realistic and achievable** scope for a single sprint. It avoids the large complexity of the 9-step form (S-3.1) and dashboard (E-4), correctly deferring them to Sprint 2.

---

## 5. Risks & Mitigation

| Risk                                     | Mitigation Strategy                                                                                                                                                             |
| :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Flawed RLS Implementation (High Risk)**  | The sprint backlog explicitly includes **S-2.4** and its associated integration tests. This is the primary mitigation. Passing these tests is a requirement to meet the DoD.       |
| **Hybrid Model Complexity (Medium Risk)**  | This sprint focuses only on Supabase Auth, deferring the NestJS API interaction. This simplifies the initial learning curve. A clear guideline on when to use API vs. Supabase direct will be required for Sprint 2. |
| **Analysis Paralysis on Schema**         | The schema for this sprint is limited to the tables defined in `architecture.md`. The flexible `JSONB` field in `report_steps` defers detailed decisions, which is acceptable for now. |

---

## 6. Definition of Ready & Definition of Done

### Definition of Ready (DoR)
A story is "Ready" to be worked on when:
-   It is linked to an Epic.
-   It has clear, testable Acceptance Criteria.
-   Dependencies on other stories are identified.
-   The required UX mockups or architectural designs exist.
-   The story is small enough to be completed in one sprint.

### Definition of Done (DoD)
A story is "Done" when:
-   All associated code has been written and peer-reviewed.
-   All acceptance criteria are met.
-   All associated unit, integration, and E2E tests are passing in the CI pipeline.
-   The feature meets NFRs for security and accessibility (verified by automated scans).
-   Any necessary documentation (`READMEs`, architectural diagrams) has been updated.
-   The code is merged into the main branch.

---

## 7. Sprint Plan Summary

This sprint is **Sprint 0 / Foundation Sprint**. The objective is to build the skeleton of the application. The development agent should tackle the stories in the following general order, allowing for parallel work where possible:

1.  **Parallel Setup:** Start `S-1.1`, `S-1.2`, and `S-1.3` simultaneously to set up the frontend, backend, and database projects.
2.  **Authentication:** Once the projects are initialized, begin `S-2.1` to implement the login flow.
3.  **Security Layer:** In parallel with auth work, implement `S-2.4` to write and test the RLS policies. This is critical to have in place before any feature writes data.

Upon successful completion of this sprint, the team will have a secure, runnable application shell, ready for the core feature development of the Shift Report form in Sprint 2.
