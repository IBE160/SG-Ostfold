# Test Plan: Shift & KPI Reporting Solution

**Author:** Murat, Master Test Architect
**Date:** 2025-12-01
**Version:** 1.0

---

## 1. Test Strategy

### 1.1 Overall Test Approach

This project will adopt a **risk-based, layered testing strategy** combining automated and manual testing, with a strong focus on early defect detection and continuous feedback. The strategy will be integrated into the CI/CD pipeline, ensuring quality gates are enforced throughout development. Testing efforts will be prioritized based on the business impact and likelihood of risks.

The core principles of this strategy are:
-   **Shift-Left Testing:** Involve QA early in the development lifecycle, starting from requirements analysis and design.
-   **Test Pyramid:** Prioritize fast, granular unit tests, followed by integration (API) tests, and a smaller set of critical end-to-end (UI) tests.
-   **Automate Everything Feasible:** Maximize automation for repetitive tasks, regression, and performance/security NFRs.
-   **Risk-Based Prioritization:** Focus testing efforts on high-risk areas identified through assessment.

### 1.2 In-Scope vs. Out-of-Scope Testing

#### In-Scope (MVP)

Testing will cover all features defined within **Epics 1, 2, and 3** of the `epics.md` document, which constitute the Minimum Viable Product. This includes:

-   **Core Reporting:** User authentication (Shift Leader, Manager roles), creation, viewing, and updating of shift reports.
-   **Management Views:** Unified historical report view for managers, advanced filtering (by date, shift, area), and CSV export.
-   **KPI Dashboard:** The dashboard UI, "Critical 3" KPI cards (Orders per Hour, Overtime, Sick Leave %), the Overtime trend graph, and dashboard date filtering.
-   **Non-Functional Requirements (Core):** Performance (page load, interaction response), Security (auth, RBAC), Scalability (data volume, concurrent users), Accessibility (WCAG 2.1 AA) for the MVP features.

#### Out-of-Scope (Post-MVP)

The following features, detailed in **Epics 4 and 5**, will **not** be tested as part of the initial MVP release:

-   Manager approval workflow (accept/reject reports).
-   Threshold-based alerts.
-   Uploading attachments to reports.
-   All AI-powered features (note summarization, anomaly detection, chatbot).
-   Native mobile application support.

### 1.3 Assumptions and Dependencies

-   **User Environment:** Users have access to modern web browsers (Chrome, Firefox, Edge, Safari latest two versions) on desktop or mobile devices.
-   **API Availability:** The Supabase backend is available and performant. (Post-MVP AI services are assumed available for later integration).
-   **Data Accuracy:** The definitions for KPIs and business logic provided in the `PRD.md` are correct and unambiguous.
-   **Technology Stack:** The testing strategy is dependent on the defined tech stack: Next.js, Vercel, Supabase, Playwright (E2E), Jest (Unit/Integration), k6 (Performance).
-   **Test Data Management:** Robust test data generation and cleanup mechanisms are in place.

---

## 2. Test Levels and Types

This layered testing approach aligns with the architectural design and the Test Levels Framework (`test-levels-framework.md`).

### 2.1 Functional Testing

-   **Unit Tests (Jest & React Testing Library):**
    -   **Purpose:** Verify correctness of isolated functions, components, and business logic.
    -   **Coverage:** Utility functions (`date-fns`), data transformations, form validation logic, isolated React components (e.g., custom hooks).
    -   **Tools:** Jest, React Testing Library.
    -   **Focus:** Core logic, edge cases.

-   **Integration Tests (Jest & Playwright API):**
    -   **Purpose:** Verify interaction between integrated components, services, and the database. Validate API contracts.
    -   **Coverage:** Database operations, Supabase client interactions, Next.js Route Handlers, authentication flows, KPI aggregation logic.
    -   **Tools:** Jest (for server-side integration), Playwright API (`request` fixture) for backend API validation.
    -   **Focus:** Data persistence, service boundaries, business process flows.

-   **End-to-End (E2E) Tests (Playwright):**
    -   **Purpose:** Simulate critical user journeys across the entire application stack in a near-production environment.
    -   **Coverage:** User login, full shift report creation/submission, manager dashboard navigation and filtering, CSV export.
    -   **Tools:** Playwright.
    -   **Focus:** Critical user flows, UI integration, system behavior.

-   **User Acceptance Testing (UAT):**
    -   **Purpose:** Validate that the system meets business requirements and is fit for purpose from end-user perspective.
    -   **Coverage:** All MVP features.
    -   **Tools:** Manual testing by key stakeholders (Shift Leaders, Department Managers) on a staging environment.
    -   **Focus:** Usability, business process validation.

### 2.2 Non-Functional Testing (NFRs)

-   **Performance Testing (k6):**
    -   **Approach:** Load, stress, and spike testing to validate SLO/SLA thresholds.
    -   **Coverage:** Key API endpoints, dashboard load times, report submission under concurrent load.
    -   **Criteria:** P95 response times < 500ms, error rate < 1% (`nfr-criteria.md`).
    -   **Tools:** k6.

-   **Security Testing (Playwright & Manual/Automated Scans):**
    -   **Approach:** Automated E2E tests for authentication/authorization, input validation. Manual security audits and vulnerability scans.
    -   **Coverage:** Role-based access control (RBAC), secure login/logout, data exposure, OWASP Top 10 risks.
    -   **Tools:** Playwright (for functional security scenarios), `npm audit`, external security scanners.

-   **Reliability Testing (Playwright):**
    -   **Approach:** Automated E2E tests simulating network failures, API errors, and transient conditions to verify graceful degradation.
    -   **Coverage:** Error handling, retry mechanisms, offline mode (if applicable), health checks.
    -   **Tools:** Playwright (with network mocking capabilities).

-   **Maintainability Testing (CI Tools & Code Standards):**
    -   **Approach:** Continuous integration checks for code quality, test coverage, and code duplication.
    -   **Coverage:** Code coverage thresholds (≥80%), code duplication limits (<5%), linting/formatting rules, no critical vulnerabilities.
    -   **Tools:** ESLint, Prettier, Jest coverage reports, GitHub Actions/Vercel CI.

-   **Accessibility Testing (Manual & Automated):**
    -   **Approach:** Automated checks (e.g., axe-core via Playwright) and manual review.
    -   **Coverage:** WCAG 2.1 AA compliance for critical UI components and user flows.
    -   **Tools:** Playwright-axe, manual review.

---

## 3. Test Objects and Coverage

### 3.1 Epic and Story Coverage

All functional requirements (FRs) from the `PRD.md` are covered by stories in `epics.md`. Every story will have corresponding test coverage at appropriate levels.

| Epic | Test Area | Key Stories to Test |
| :--- | :--- | :--- |
| **Epic 1** | Foundation & Core Reporting | 1.2 (Authentication & RBAC), 1.3 (Create Report), 1.4 (View/Edit Own Reports) |
| **Epic 2** | Management Insights & Data Export | 2.1 (Unified View), 2.2 (Filtering), 2.3 (CSV Export) |
| **Epic 3** | KPI Dashboard & Visualization | 3.2 (KPI Cards), 3.3 (Trend Graph), 3.4 (Dashboard Filter) |

### 3.2 Critical User Flows

The following user flows are considered business-critical and will receive the highest priority for E2E test coverage (P0):

1.  **Shift Registration Flow:**
    *   Secure login as Shift Leader.
    *   Navigate to "New Report" form.
    *   Fill out all required fields with valid data.
    *   Successfully submit the report.
    *   View the newly created report in "My Reports" history.
2.  **Manager KPI Analysis & Export Flow:**
    *   Secure login as Manager.
    *   Navigate to the Dashboard, verify "Critical 3" KPIs load.
    *   Apply date range filter to dashboard, verify updates.
    *   Navigate to "All Reports" history.
    *   Apply filters for date and shift.
    *   Successfully export the filtered results to CSV.

### 3.3 Go-Live Test Requirements

The following criteria must be met before the MVP can be released:

-   All P0 tests pass (100% pass rate).
-   All E2E tests for critical user flows pass (100% pass rate).
-   No Critical (score 9) or High (score 6-8) risks remain unmitigated or unwaivered.
-   Security NFRs pass (Auth/Authz, OWASP checks).
-   Performance NFRs meet SLO/SLA targets (k6 evidence).
-   Maintainability NFRs pass (code coverage ≥80%, code duplication <5%).
-   All functional requirements in Epics 1-3 are covered by at least one test.

---

## 4. Environments and Test Data

### 4.1 Test Environments

-   **Local Development:** Used by developers for unit and component testing.
-   **Feature Branch / Preview Environments (Vercel):** Each Pull Request will trigger a deployment to a unique preview URL. This environment will run the full automated test suite (Unit, Integration, E2E, NFRs) and serve for manual feature testing and code reviews.
-   **Staging:** A stable environment mirroring production, used for UAT, regression testing, and final NFR validation before deployment to production.
-   **Production:** The live environment. Minimal smoke tests will run post-deployment to ensure basic functionality.

### 4.2 Test Data Strategy

-   **Test Data Factories (`faker`):** Use factories to generate unique, realistic, but anonymized data for each test run. This prevents test pollution and enables parallel execution.
-   **API Seeding:** For integration and E2E tests, data will be seeded directly via API calls or database commands (e.g., Supabase CLI) rather than UI forms, to speed up test setup.
-   **Fixtures with Auto-Cleanup:** Test fixtures will be designed to set up necessary preconditions (e.g., authenticated users, specific reports) and automatically clean up data after test execution to maintain test isolation.
-   **Edge Case Data:** Specific datasets will be created to test boundary conditions, invalid inputs, and error scenarios (e.g., zero reports, very high overtime, invalid login attempts).
-   **Data Anonymization:** All test data will be synthetic and contain no Personally Identifiable Information (PII).

---

## 5. Acceptance Criteria

The **Acceptance Criteria (AC)** defined for each user story in `epics.md` will serve as the foundation for all test cases. Each AC will be translated into one or more test scenarios.

### Definition of Done (Testing Perspective)

A user story, epic, or release is considered "Done" from a testing perspective when:

-   All P0 and P1 test cases related to the scope pass (100% and ≥95% respectively).
-   All identified Critical and High-priority risks are either mitigated, accepted, or have approved waivers.
-   NFR thresholds (Security, Performance, Reliability, Maintainability) are met.
-   Relevant code coverage targets are achieved (e.g., 80% for new code).
-   No Critical or High severity defects remain open for the scoped features.
-   UAT has been successfully completed by business stakeholders.
-   Traceability from requirements to test cases is established and verified.

---

## 6. Test Cases

Test cases will be derived directly from story Acceptance Criteria, following a BDD-style format. Below are high-level examples for critical user flows.

| ID | Epic/Story | Test Case Description | Preconditions | Steps | Expected Result | Priority | Test Level | Risk Link |
| :-- | :-- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-E1.2-E2E-001** | E1.2 | **User Login - Valid Credentials** | New unverified user exists. | 1. Navigate to `/login`. 2. Enter valid email/password. 3. Click "Sign In". | User is redirected to `/dashboard`. "Welcome" message is visible. Auth token is present. | P0 | E2E | R-SEC-001 |
| **TC-E1.3-INT-001** | E1.3 | **Report Submission - Valid Data** | Authenticated Shift Leader. | 1. API POST to `/api/reports` with valid data. | Status 201 (Created). Report data saved correctly in DB. | P0 | API | R-DATA-001 |
| **TC-E1.3-UI-001** | E1.3 | **Report Form - Invalid Input** | Authenticated Shift Leader. | 1. Navigate to `/reports/new`. 2. Enter non-numeric in "Overtime". 3. Click "Submit". | Inline validation error visible. Report not submitted. | P1 | Component | R-TECH-002 |
| **TC-E2.2-E2E-001** | E2.2 | **Manager Filter Reports - Date & Shift** | Multiple reports exist for different dates/shifts. | 1. Login as Manager. 2. Navigate to `/reports`. 3. Apply Date Range filter. 4. Apply Shift filter. | Table displays only reports matching filters. | P0 | E2E | R-BUS-001 |
| **TC-E3.2-INT-001** | E3.2 | **KPI Calculation - Overtime** | Specific reports with known overtime data in DB. | 1. API GET to `/api/kpis/overtime`. | Returns correct aggregated overtime for period. | P0 | API | R-BUS-002 |
| **TC-NFR-SEC-001** | (NFR) | **RBAC - Shift Leader Cannot Access All Reports** | Authenticated Shift Leader. | 1. Login as Shift Leader. 2. Attempt navigate to Manager `/reports` route. | Redirected to own reports or "Access Denied" page (403). | P0 | E2E | R-SEC-002 |

---

## 7. Regression Strategy

The regression strategy is built upon the layered test approach and integrated into the CI/CD pipeline (Vercel).

-   **Commit-Level (Smoke Tests):** A small, fast subset of P0 tests (smoke tests) will run on every commit to `main` and feature branches to ensure the build is not broken.
-   **Pull Request (Full P0 & P1):** The full suite of P0 and P1 automated tests (Unit, Integration, E2E) will run on every Pull Request. Failure will block merging.
-   **Nightly/Scheduled (Full Regression & P2/P3):** The complete automated test suite, including P2 and P3 tests, will run nightly or on a scheduled basis (e.g., before major releases) to provide comprehensive regression coverage.
-   **Targeted Manual Regression:** For changes impacting critical areas or high-risk features, a targeted manual regression test by QA will be performed on the staging environment.
-   **Post-Deployment (Smoke Tests):** A very small set of critical smoke tests will run automatically in production immediately after deployment to verify application health.
-   **NFR Regression:** Performance and security tests will be run regularly (e.g., nightly, weekly) to detect NFR regressions.

---

## 8. Risks and Mitigations

This section identifies key risks related to quality and testing, along with their mitigation strategies, leveraging the Risk Governance (`risk-governance.md`) and NFR Criteria (`nfr-criteria.md`) knowledge.

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation Strategy | Owner |
| :------ | :------- | :---------- | :---------- | :----- | :---- | :------------------ | :---- |
| **R-SEC-001** | SEC | Unauthorized access to manager reports by Shift Leader. | 3 (Likely) | 3 (Critical) | 9 | Implement robust Row Level Security (RLS) policies in Supabase and server-side authorization checks on all API endpoints. Comprehensive unit and integration tests for RBAC. | Architect/Dev |
| **R-PERF-001** | PERF | Dashboard loading slowly under concurrent manager usage. | 2 (Possible) | 3 (Critical) | 6 | Optimize database queries for KPI aggregation. Implement caching strategy (e.g., Redis). Performance test critical dashboard endpoints with k6. | Architect/Dev |
| **R-DATA-001** | DATA | Inaccurate KPI calculations due to incorrect aggregation logic. | 2 (Possible) | 3 (Critical) | 6 | Write dedicated integration tests for all KPI calculation logic with diverse datasets (edge cases, large data, nulls). Peer review aggregation functions. | Dev/QA |
| **R-BUS-001** | BUS | Misinterpretation of KPI data due to unclear UI/UX or confusing labels. | 2 (Possible) | 2 (Degraded) | 4 | Conduct usability testing with target users. Ensure UI follows UX design spec for clarity. Implement tooltips/help text for KPIs. | UX/PM |
| **R-OPS-001** | OPS | Deployment failures due to broken tests in CI/CD pipeline. | 1 (Unlikely) | 2 (Degraded) | 2 | Ensure automated tests are stable (not flaky). Implement proper test environments and data setup. Fast feedback loop in CI. | Dev/QA |
| **R-NFR-Maint-001** | TECH | Test suite becomes slow and brittle over time, hindering developer productivity. | 3 (Likely) | 2 (Degraded) | 6 | Enforce Test Quality DoD (`test-quality.md`): no hard waits, explicit assertions, tests <300 lines, tests <1.5 min, self-cleaning tests, unique data, parallel-safe. | QA/Dev |

**Risk Scoring Methodology (from `probability-impact.md`):**
-   **Probability (1-3):** 1 (Unlikely), 2 (Possible), 3 (Likely)
-   **Impact (1-3):** 1 (Minor), 2 (Degraded), 3 (Critical)
-   **Score = Probability × Impact:** Score ≥6 requires immediate mitigation.

---

_Generated by BMad TEA Agent - Test Architect Module_
_Date: 2025-12-01_
_For: BIP_
