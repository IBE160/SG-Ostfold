# Technical Specification: Epic 1 - Foundation & Core Reporting

**Date:** 2025-12-02
**Author:** SM (Scrum Master)
**Status:** Ready for Development

---

## 1. Epic Summary

This epic establishes the entire technical and functional foundation of the 'Shift and KPI Reporting Solution'. Its primary value is to deliver a stable, secure, and automated groundwork for all future development.

Functionally, it provides the first piece of core user value: enabling a **Shift Leader** to securely log in and submit a new shift report through a validated form. This directly supports the MVP as defined in the `proposal.md` by tackling the most fundamental user story and setting up the project for subsequent features like historical views and dashboards.

---

## 2. Functional Scope (Sprint 1)

This epic includes the following user stories planned for the current sprint:

### Story 1.1: Project Foundation & CI/CD
-   **ID:** 1.1
-   **Title:** Project Foundation & CI/CD
-   **Dependencies:** None
-   **Acceptance Criteria:**
    -   A Next.js application is created with all specified dependencies (Supabase, TailwindCSS, ShadCN/UI).
    -   The Supabase project is configured with the initial database schema for `users`, `roles`, and `reports` with RLS enabled.
    -   A Vercel project is configured to automatically deploy the `main` branch to production.

### Story 1.2: User Authentication & Role-Based Access
-   **ID:** 1.2
-   **Title:** User Authentication & Role-Based Access
-   **Dependencies:** Story 1.1
-   **Acceptance Criteria:**
    -   A user can securely log in and be assigned a role.
    -   A 'Shift Leader' is authenticated and redirected to their personal report dashboard.
    -   A 'Manager' is authenticated and redirected to the main operations dashboard.
    -   An error message is displayed for invalid credentials.

### Story 1.3: Create & Submit Shift Report
-   **ID:** 1.3
-   **Title:** Create & Submit Shift Report
-   **Dependencies:** Story 1.2
-   **Acceptance Criteria:**
    -   A logged-in Shift Leader can access an intuitive form to create and submit a new shift report.
    -   The form provides real-time validation for numeric inputs.
    -   On submission, the report data is saved to the `reports` table in the Supabase database.
    -   A success notification is displayed upon successful submission.

---

## 3. Architecture & System Impact

This epic is foundational and will create or touch the following parts of the system as defined in `architecture.md`:

-   **Project Structure:** The entire initial project structure will be created, including `src/app`, `src/components`, `src/lib`, `src/hooks`, and `src/types`.
-   **Database Schema (Supabase):**
    -   The `users`, `roles`, and `reports` tables will be created.
    -   Initial Row Level Security (RLS) policies will be implemented to ensure a Shift Leader can only create reports for themselves and that roles are enforced.
-   **API Routes (Next.js):**
    -   The first API endpoint will be created: `POST /api/reports` for submitting new shift reports. This route must be protected and only accessible by authenticated users with the 'shift_leader' role.
-   **Pages (Next.js App Router):**
    -   `/login`: A public route for user authentication.
    -   `/reports/new`: A protected route for Shift Leaders to create reports.
    -   Placeholder dashboard pages for role-based redirects.
-   **Components (React):**
    -   The main `Layout` component.
    -   The `LoginForm` component.
    -   The `ShiftReportForm` component and its associated input components.
-   **Authentication:** The core authentication flow using Supabase Auth will be implemented, including client-side logic for session management and server-side logic (middleware) for route protection.

---

## 4. Technical Requirements

### Data Model Fields
-   **users:** `id`, `email`, `role`
-   **roles:** `id`, `name` (e.g., 'shift_leader', 'manager')
-   **reports:** `id`, `date`, `shift`, `user_id` (foreign key to `users`), and all data fields required for MVP KPIs (e.g., `overtime_hrs`, `sick_leave_hrs`, `orders_per_hr`).

### Validation Rules (from PRD.md)
-   `date`: required, must be today or earlier.
-   `shift`: required, must be one of the predefined enum values.
-   `overtime_hrs`: required, numeric, must be between 0 and 24.
-   All other numeric KPI fields: required, must be a non-negative number.

### API Endpoint: `POST /api/reports`
-   **Request Body:**
    ```json
    {
      "date": "2025-12-02T00:00:00.000Z",
      "shift": "morning",
      "overtime_hrs": 8,
      "sick_leave_hrs": 0,
      "orders_per_hr": 150,
      "...": "..."
    }
    ```
-   **Success Response (201 Created):**
    ```json
    {
      "data": { "id": "new-report-uuid", "message": "Report created successfully" }
    }
    ```
-   **Error Response (400 Bad Request / 401 Unauthorized / 403 Forbidden):**
    ```json
    {
      "error": { "code": "VALIDATION_ERROR", "message": "overtime_hrs must be a non-negative number." }
    }
    ```

### UI Elements
-   **Technology:** Tailwind CSS, ShadCN/UI
-   **Components:** `Card`, `Button`, `Input`, `Label`, `Form`, `DatePicker`, `Select`.
-   **Styling:** Must adhere to the dark-mode theme specified in `ux-design-specification.md`.

---

## 5. Risks & Constraints

### Technical Risks
-   **Unauthorized Access (Risk ID: R-SEC-001):** High risk of improper RLS or middleware implementation allowing one role to access another's data or pages. Mitigation requires thorough integration testing of RLS policies and API route protection.
-   **Inconsistent Validation:** Discrepancies between client-side and server-side validation could lead to user confusion or bad data. Mitigation requires using a shared schema (e.g., with Zod) for both frontend and backend validation.
-   **Poor User Adoption:** If the report creation form is slow, confusing, or perceived as more work than the manual process, users may resist adoption. Mitigation requires strict adherence to the UX design and performance targets.

### Constraints
-   The technology stack is fixed: Next.js, Supabase, Vercel.
-   The application must be a responsive web app, targeting modern browsers.
-   The UI is dark-mode only, as per the UX specification.

---

## 6. Testing Requirements

Based on `tests/test-plan.md`, the following tests are critical for this epic:

-   **Unit Tests (Jest):**
    -   Test all form validation rules in isolation.
    -   Test utility functions for date formatting or data transformation.
-   **Integration Tests (Jest/Playwright API):**
    -   Verify that the `POST /api/reports` endpoint correctly performs server-side validation and saves data to the database.
    -   Test Supabase RLS policies to ensure a user with the 'manager' role *cannot* post to the create-report endpoint.
    -   Test the user authentication flow and JWT handling.
-   **End-to-End Tests (Playwright):**
    -   **Critical Flow:** Login as Shift Leader -> Navigate to `/reports/new` -> Fill and submit the form -> Assert success notification.
    -   **Security Flow:** Login as Manager -> Attempt to navigate to `/reports/new` -> Assert redirection or "Access Denied" error.

---

## 7. Definition of Ready for Development

This epic is considered **Ready for Development** because the following criteria have been met:

-   [x] All associated stories (1.1, 1.2, 1.3) are defined with clear acceptance criteria.
-   [x] The `architecture.md` document is stable and approved.
-   [x] The `ux-design-specification.md` provides clear mockups and component requirements for the login and report creation forms.
-   [x] The `test-plan.md` outlines a clear testing strategy for the functional scope.
-   [x] The initial database schema for all required tables is defined.
-   [x] Dependencies on external services (Supabase) are known and access keys can be configured.
-   [x] The epic has been reviewed and agreed upon during sprint planning.