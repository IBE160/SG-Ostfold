# Story 1.3: Create & Submit Shift Report

**Epic:** 1 - Foundation & Core Reporting
**Status:** Ready for Development
**Estimate:** L

---

## 1. Story Summary

As a **Shift Leader**,
I want **an intuitive form to create and submit a new shift report**,
So that **I can accurately capture my daily operational data with minimal effort**.

## 2. Business Justification

This story delivers core operational value by replacing manual report processes with a digital, validated form. It's essential for collecting the foundational data required for KPI tracking and management insights, directly contributing to improved data quality and operational efficiency.

## 3. Functional Description

A logged-in Shift Leader will access a dedicated page with a form to enter shift-specific data. This form will include fields for date, shift, and key performance indicators like "Orders per Hour," "Overtime (hours)," and "Sick Leave (%)". The form will provide immediate feedback through client-side validation. Upon successful submission, the data will be securely stored in the Supabase database, and the user will receive a confirmation.

## 4. Acceptance Criteria

1.  A logged-in Shift Leader can access a form at the `/reports/new` route.
2.  The form includes all MVP fields and provides real-time client-side validation.
3.  On submission, the report data is saved to the `reports` table in the Supabase database via a secure API route.
4.  A success notification is displayed upon successful submission.

## 5. Dependencies

-   **Story 1.2: User Authentication & Role-Based Access** must be complete to ensure secure access to the form and proper user context.

## 6. Related UX Screens and Flows

-   **New Report Form:** A dedicated UI at `/reports/new` (or similar) with all necessary input fields, validation feedback, and submission controls. Refer to `ux-design-specification.md` for styling and layout.

---

## 7. Implementation Approach

### Frontend Requirements

1.  **New Report Page UI:** Create a new route and page at `src/app/(app)/reports/new/page.tsx`.
2.  **Report Form Component:** Build a reusable form component using ShadCN/UI (`Input`, `DatePicker`, `Select`, `Button`, `Label`) for all required KPI fields and other report details.
3.  **Client-side Validation:** Implement real-time validation for numeric inputs (e.g., using Zod for schema definition).
4.  **Form Submission Logic:** Use the Supabase client to call a Next.js API Route Handler (`/api/reports`) for submitting the form data.
5.  **Notifications:** Display success/error toast notifications upon form submission feedback.

### Backend/API Requirements

1.  **API Route Handler:** Create a `src/app/api/reports/route.ts` (POST) to receive and process shift report submissions.
2.  **Server-side Validation:** Implement robust server-side validation for all incoming report data.
3.  **Supabase Database Interaction:** Use the Supabase client within the API Route Handler to securely insert validated report data into the `reports` table.
4.  **Authorization:** Ensure the API route is protected and only accessible by authenticated users with the 'shift_leader' role.

### Database Impact

-   This story will insert new records into the `reports` table in the `public` schema.
-   Relies on the `reports` table schema and RLS policies established in Story 1.1 to ensure data integrity and security.

---

## 8. Testing Scope

-   **Unit Tests:**
    -   Test the client-side form validation logic (e.g., Zod schema validation).
-   **Integration Tests:**
    -   **CRITICAL:** Write integration tests for the `POST /api/reports` API Route Handler to ensure correct server-side validation, data insertion, and authorization.
-   **End-to-End (E2E) Tests:**
    -   A test case for a successful form submission by a logged-in Shift Leader, asserting data persistence and success notification.
    -   A test case for attempted submission with invalid data, asserting validation errors.
    -   A test case for an unauthenticated user attempting to access the form, asserting redirection to `/login`.

## 9. Definition of Done

-   [ ] The "New Report" page UI is built and styled according to the UX specification.
-   [ ] The report form includes all MVP fields and performs real-time client-side validation.
-   [ ] The `POST /api/reports` API Route Handler is implemented with server-side validation and securely saves data to Supabase.
-   [ ] Users receive appropriate feedback (success/error notifications) upon form submission.
-   [ ] All acceptance criteria are met and verified.
-   [ ] All specified unit, integration, and E2E tests are passing.

---

## Dev Notes

### Relevant architecture patterns and constraints
-   **API Pattern:** Next.js Route Handlers + Direct Supabase Client.
-   **Database:** Supabase (PostgreSQL), `reports` table for data storage.
-   **Validation:** Client-side with Zod, Server-side in API Route Handler.
-   **UI Components:** ShadCN/UI (`Input`, `DatePicker`, `Select`, `Button`, `Label`).
-   **Styling:** Tailwind CSS, Dark mode.
-   **Security:** RLS policies from Story 1.1, API route protection from Story 1.2.

### Source tree components to touch
-   `src/app/(app)/reports/new/page.tsx` (new page)
-   `src/components/reports/ShiftReportForm.tsx` (new component)
-   `src/app/api/reports/route.ts` (new API route)
-   `src/lib/supabase.ts` (reuse client)
-   `src/lib/utils.ts` (for common utilities like date formatting)

### Testing standards summary
-   Unit tests with Jest (for form validation).
-   Integration tests with Jest (for API route and database interaction).
-   E2E tests with Playwright (for full user flow).

### Project Structure Notes
-   Aligns with `src/app/(app)/reports` for the page and `src/app/api/reports` for the API route.

### References
-   [Source: docs/epics.md#Story-1.3:-Create-&-Submit-Shift-Report]
-   [Source: sprint-artifacts/tech-spec-epic-1.md#Story-1.3:-Create-&-Submit-Shift-Report]
-   [Source: docs/PRD.md#Product-Scope] (MVP section for KPIs and validation)
-   [Source: docs/architecture.md#API-Pattern] (Next.js Route Handlers)
-   [Source: docs/architecture.md#Database-Impact] (reports table)

---

## Dev Agent Record

### Context Reference
- `sprint-artifacts/1-3-create-submit-shift-report.context.xml`

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List