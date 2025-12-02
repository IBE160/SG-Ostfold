# Story: 1.3 - Create & Submit Shift Report

**Epic:** 1 - Foundation & Core Reporting
**Status:** Ready for Development
**Estimate:** L

---

## 1. Story Summary

As a Shift Leader, I want an intuitive form to create and submit a new shift report, so that I can accurately capture my daily operational data with minimal effort. This story involves building the user interface for the report creation form, implementing both client and server-side validation, and creating the backend API endpoint to save the report to the database.

## 2. Business Justification

This story is the cornerstone of the application's value proposition. It directly replaces the inefficient and error-prone manual data entry process, which is the primary problem this project aims to solve. By enabling the collection of clean, structured, and validated data at the source, this feature provides the foundation for all subsequent data analysis, KPI dashboards, and management insights.

## 3. Functional Description

A logged-in user with the 'Shift Leader' role will be able to navigate to a dedicated page to create a new shift report. This page will present a form with fields for all required operational data points (e.g., Overtime, Sick Leave, Orders per Hour). The form will provide immediate feedback on data entry, highlighting any validation errors in real-time. Upon clicking "Submit", the data is sent securely to the backend, validated again, and persisted in the Supabase database. The Shift Leader receives a clear success notification once the submission is complete.

## 4. Acceptance Criteria

-   A logged-in Shift Leader can access an intuitive form to create and submit a new shift report.
-   The form provides real-time validation for numeric inputs, with error states as defined in the UX spec.
-   When they click "Submit", the report data is saved to the `reports` table in the Supabase database.
-   A success notification is displayed upon successful submission.
-   The API endpoint for submission is protected and only accessible by users with the 'shift_leader' role.

## 5. Dependencies

-   **Story 1.2: User Authentication & Role-Based Access** must be complete. This story requires an authenticated 'Shift Leader' session to function correctly.

## 6. Related UX Screens and Flows

-   **New Report Form:** The UI for this story is the form at the `/reports/new` route. It must be built according to the components, layout, and styling defined in `ux-design-specification.md`.
-   **User Flow:** Logged-in Shift Leader -> Navigates to "New Report" -> Fills Form -> Submits Form -> Receives Success/Error Feedback.

---

## 7. Implementation Approach

### Frontend Requirements

1.  **Form Page UI:** Create a new protected route and page at `src/app/(app)/reports/new/page.tsx`.
2.  **Form Component:** Build the shift report form using ShadCN/UI components (`Input`, `DatePicker`, `Button`, `Card`, etc.). The layout should be clean and easy to follow.
3.  **Client-Side Validation:** Use a library like `zod` to define a schema for the form that matches the backend validation rules. Integrate it with `react-hook-form` to provide real-time, inline validation feedback to the user.
4.  **API Communication:** On form submission, use `fetch` to send a `POST` request with the form data to the `/api/reports` endpoint.
5.  **Notifications:** Implement toast notifications (e.g., using `react-hot-toast` or a similar library) to display success or error messages returned from the API.

### Backend/API Requirements

1.  **API Route Handler:** Create a new API route at `src/app/api/reports/route.ts` to handle the `POST` request.
2.  **Authorization:** Protect this route to ensure that only authenticated users with the 'shift_leader' role can submit a report. This can be done by checking the user's session and role on the server-side.
3.  **Server-Side Validation:** Use the same `zod` schema from the frontend to re-validate the incoming data on the server. This is a critical security step.
4.  **Database Insertion:** If validation passes, use the Supabase client to insert the new report data into the `reports` table. Ensure the `user_id` from the authenticated session is included in the new record.

### Database Impact

-   This story will perform `INSERT` operations on the `reports` table.
-   It will test the RLS policy that ensures a user can only insert a report with their own `user_id`.

### Validation Rules

-   As specified in `prd.md` and `tech-spec-epic-1.md`:
    -   `date`: Required, must be a valid date.
    -   `shift`: Required, must be one of the predefined values.
    -   `overtime_hrs`: Required, numeric, 0-24.
    -   All other numeric fields must be non-negative.

### Error Handling

-   **Frontend:**
    -   Display inline error messages for each field that fails validation.
    -   Disable the "Submit" button while the form is submitting to prevent duplicate entries.
    -   Show a generic error toast if the API call fails for an unknown reason.
-   **Backend:**
    -   Return a `400 Bad Request` response with detailed error messages if server-side validation fails.
    -   Return a `401 Unauthorized` or `403 Forbidden` if the user is not properly authenticated or authorized.
    -   Return a `500 Internal Server Error` if the database insertion fails for an unexpected reason.

---

## 8. Testing Scope

-   **Unit Tests:**
    -   Write comprehensive unit tests for the client-side validation schema (`zod`) to cover all fields and edge cases.
-   **Integration Tests:**
    -   Test the `POST /api/reports` endpoint thoroughly:
        -   Test successful creation with valid data.
        -   Test validation failure with invalid data for multiple fields.
        -   Test authorization failure by attempting to post as a 'manager' or an unauthenticated user.
-   **End-to-End (E2E) Tests:**
    -   **Happy Path:** A full user journey: Login as a Shift Leader -> Navigate to the new report form -> Fill out the form with valid data -> Submit -> Assert that a success notification is shown.
    -   **Validation Path:** Login as a Shift Leader -> Navigate to the form -> Attempt to submit with invalid data -> Assert that field-specific error messages are displayed and the form is not submitted.

## 9. Definition of Done

-   [ ] The "New Shift Report" form is implemented at `/reports/new` and is accessible only to users with the 'shift_leader' role.
-   [ ] The form provides real-time, client-side validation for all fields.
-   [ ] The backend API endpoint (`POST /api/reports`) is created, secured, and performs server-side validation.
-   [ ] A successful form submission results in a new record being saved to the `reports` table in Supabase.
-   [ ] The user receives a toast notification indicating success or failure of the submission.
-   [ ] All acceptance criteria are met and verified.
-   [ ] All specified unit, integration, and E2E tests for this story are passing.
