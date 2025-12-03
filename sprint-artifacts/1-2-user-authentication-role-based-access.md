# Story: 1.2 - User Authentication & Role-Based Access

**Epic:** 1 - Foundation & Core Reporting
**Status:** Review
**Estimate:** M

---

## 1. Story Summary

As a User, I want to securely log in and be assigned a role, so that I can access the features relevant to my position. This story covers the implementation of the user authentication system using Supabase Auth and the creation of route protection logic based on the user's role ('shift_leader' or 'manager').

## 2. Business Justification

Secure access is a fundamental requirement for any application handling operational data. This story is critical as it enforces data privacy and security by ensuring only authenticated and authorized users can access the system. It is a direct dependency for nearly every other feature in the application, as functionality is tailored to specific user roles.

## 3. Functional Description

An unauthenticated user accessing any protected page within the application will be redirected to a dedicated `/login` page. On this page, they can enter their email and password. Upon successful authentication, the system identifies their role and redirects them to the appropriate dashboard—a personal dashboard for Shift Leaders or the main operations dashboard for Managers. Invalid login attempts will result in a clear error message on the login form.

## 4. Acceptance Criteria

-   A user can securely log in and be assigned a role.
-   A 'Shift Leader' is authenticated and redirected to their personal report dashboard after login.
-   A 'Manager' is authenticated and redirected to the main operations dashboard after login.
-   An error message is displayed for invalid credentials, as per the UX specification.
-   Application routes under the `/(app)` group are protected and inaccessible to unauthenticated users.

## 5. Dependencies

-   **Story 1.1: Project Foundation & CI/CD** must be complete. This story relies on the created project structure, Supabase client setup, and initial database schema.

## 6. Related UX Screens and Flows

-   **Login Page:** The primary UI for this story is the login form, which should be styled according to `ux-design-specification.md`.
-   **User Flow:** The core flow is Unauthenticated User -> Access App -> Redirect to Login -> Submit Credentials -> Redirect to Role-Based Dashboard.

---

## 7. Implementation Approach

### Frontend Requirements

- [x] 1.  **Login Page UI:** Create a new route and page at `src/app/(auth)/login/page.tsx`.
- [x] 2.  **Login Form Component:** Build a reusable form component using ShadCN/UI (`Input`, `Button`, `Label`) for email and password fields.
- [x] 3.  **Authentication Logic:** Use the Supabase client (`supabase.auth.signInWithPassword`) to handle the authentication request.
- [x] 4.  **State Management:** Implement logic to manage the user's session state on the client-side, potentially using React Context or a similar pattern to make the user session available throughout the app.
- [x] 5.  **Redirects:** Handle the client-side redirection after a successful login using the Next.js `useRouter` hook.

### Backend/API Requirements

### Review Follow-ups (AI)

- [x] [AI-Review][Medium] Modify `middleware.ts` to fetch the user's role after authentication and implement logic to redirect to the correct dashboard based on that role (e.g., `/shift-leader/dashboard` vs. `/manager/dashboard`).
- [x] [AI-Review][Low] In `supabase.ts`, update the error messages to be more specific (e.g., "Missing NEXT_PUBLIC_SUPABASE_URL environment variable").

- [x] 1.  **Middleware for Route Protection:** Create a `src/middleware.ts` file. This middleware will run on requests to protected routes (e.g., `/dashboard/*`, `/reports/*`).
- [x] 2.  **Session Verification:** The middleware will check for the user's session cookie, verify it with the Supabase client on the server-side, and refresh the session if needed.
- [x] 3.  **Authorization Logic:** If the user is authenticated, the middleware allows the request to proceed. If not, it redirects the user to the `/login` page. This protects all routes within the `(app)` route group.

### Database Impact

-   This story will begin populating the `users` table in the `auth.users` schema managed by Supabase Auth.
-   It will rely on the `role` field defined on the `users` table in the `public` schema (created in Story 1.1) to perform role-based redirects. The RLS policies established in 1.1 are critical for ensuring data security once the user is logged in.

### Validation Rules

-   **Client-side:** The login form should validate that the email is in a valid format and that the password field is not empty before submission.

### Error Handling

-   **Frontend:** Display clear, user-friendly error messages on the login form for "Invalid login credentials" or other authentication errors returned by Supabase. Do not expose detailed technical error messages to the user.
-   **Backend:** The middleware should handle cases where session verification fails silently by redirecting to the login page.

---

## 8. Testing Scope

-   **Unit Tests:**
    -   Test the validation logic of the login form component.
-   **Integration Tests:**
    -   **CRITICAL:** Write integration tests for the `middleware.ts` file to ensure it correctly protects routes, allows authenticated users, and redirects unauthenticated users.
    -   Test the server-side Supabase client's ability to verify a session.
-   **End-to-End (E2E) Tests:**
    -   A test case for a successful login as a 'Shift Leader' and redirection to their specific dashboard.
    -   A test case for a successful login as a 'Manager' and redirection to the main dashboard.
    -   A test case for a failed login attempt, asserting that an error message is displayed.
    -   A test case where an unauthenticated user attempts to access a protected URL (e.g., `/reports/new`) and is redirected to `/login`.

## 9. Definition of Done

-   [ ] The Login page UI is built and styled according to the UX specification.
-   [ ] Users can successfully log in with valid credentials via Supabase Auth.
-   [ ] Next.js middleware is implemented and effectively protects all routes within the `(app)` group.
-   [ ] Users are redirected to the correct dashboard based on their assigned role after logging in.
-   [ ] All acceptance criteria are met and verified.
-   [ ] All specified unit, integration, and E2E tests are passing in the CI/CD pipeline.

---

## Dev Agent Record

### Context Reference
- `sprint-artifacts/1-2-user-authentication-role-based-access.context.xml`

### File List
- `sg-ostfold-app/src/app/(auth)/login/page.tsx` (created)
- `sg-ostfold-app/src/lib/supabase.ts` (created)
- `sg-ostfold-app/src/middleware.ts` (created)
- `sg-ostfold-app/src/app/(app)/dashboard/page.tsx` (created)
- `sg-ostfold-app/src/app/(app)/shift-leader/dashboard/page.tsx` (created)
- `sg-ostfold-app/src/app/(app)/manager/dashboard/page.tsx` (created)
- `sg-ostfold-app/src/middleware.test.ts` (created)
- `sg-ostfold-app/src/components/ui/button.tsx` (created)
- `sg-ostfold-app/src/components/ui/input.tsx` (created)
- `sg-ostfold-app/src/components/ui/label.tsx` (created)
- `sg-ostfold-app/package.json` (modified)

---

## Senior Developer Review (AI)

**Reviewer:** dev
**Date:** 2025-12-02
**Outcome:** Changes Requested

**Summary:**
The core authentication and route protection are functional, but the implementation does not fully satisfy the role-based redirection requirements specified in the acceptance criteria.

**Key Findings (by severity):**
- **[Medium] Missing Role-Based Redirects:** The `middleware.ts` correctly redirects authenticated users, but it sends all roles to a generic `/dashboard`. The acceptance criteria require distinct redirects for 'Shift Leader' and 'Manager' roles.
- **[Low] Generic Error in Supabase Client:** The `supabase.ts` file throws a generic `Error` if environment variables are missing. A more specific error message would improve debuggability.

**Acceptance Criteria Coverage:**
| AC # | Description | Status | Evidence |
| :--- | :--- | :--- | :--- |
| 1 | A user can securely log in and be assigned a role. | **IMPLEMENTED** | `login/page.tsx:21` |
| 2 | A 'Shift Leader' is redirected to their personal report dashboard. | **PARTIAL** | `middleware.ts:16` |
| 3 | A 'Manager' is authenticated and redirected to the main operations dashboard. | **PARTIAL** | `middleware.ts:16` |
| 4 | An error message is displayed for invalid credentials. | **IMPLEMENTED** | `login/page.tsx:49` |
| 5 | Application routes under `/(app)` are protected. | **IMPLEMENTED** | `middleware.ts:12` |
**Summary: 3 of 5 acceptance criteria fully implemented**

**Task Completion Validation:**
All tasks marked as complete in the "Implementation Approach" have been verified.

**Action Items:**

**Code Changes Required:**
- [x] [AI-Review][Medium] Modify `middleware.ts` to fetch the user's role after authentication and implement logic to redirect to the correct dashboard based on that role (e.g., `/shift-leader/dashboard` vs. `/manager/dashboard`).
- [x] [AI-Review][Low] In `supabase.ts`, update the error messages to be more specific (e.g., "Missing NEXT_PUBLIC_SUPABASE_URL environment variable").

---

## Final Developer Review (AI)

**Reviewer:** dev
**Date:** 2025-12-02
**Outcome:** Approve

**Summary:**
The implementation correctly handles secure user login, role-based redirection, and protected routes. The previous findings regarding generic error messages in `supabase.ts` and the lack of role-based redirects in `middleware.ts` have been successfully addressed.

**Key Findings (by severity):**
- All previous findings have been resolved.

**Acceptance Criteria Coverage: 5 of 5 Implemented**

| AC # | Description | Status | Evidence |
| :--- | :--- | :--- | :--- |
| 1 | A user can securely log in and be assigned a role. | **IMPLEMENTED** | `login/page.tsx:21` |
| 2 | A 'Shift Leader' is redirected to their personal report dashboard. | **IMPLEMENTED** | `middleware.ts:40` |
| 3 | A 'Manager' is authenticated and redirected to the main operations dashboard. | **IMPLEMENTED** | `middleware.ts:42` |
| 4 | An error message is displayed for invalid credentials. | **IMPLEMENTED** | `login/page.tsx:49` |
| 5 | Application routes under `/(app)` are protected. | **IMPLEMENTED** | `middleware.ts:32` |

**Task Completion Validation:**
All tasks, including review follow-ups, have been verified as complete.

**Action Items (All Resolved):**
- [x] [Medium] Modify `middleware.ts` to fetch the user's role after authentication and implement logic to redirect to the correct dashboard based on that role. (Resolved)
- [x] [Low] In `supabase.ts`, update the error messages to be more specific. (Resolved)
