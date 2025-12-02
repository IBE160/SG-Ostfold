# Story: 1.2 - User Authentication & Role-Based Access

**Epic:** 1 - Foundation & Core Reporting
**Status:** Ready for Development
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

1.  **Login Page UI:** Create a new route and page at `src/app/(auth)/login/page.tsx`.
2.  **Login Form Component:** Build a reusable form component using ShadCN/UI (`Input`, `Button`, `Label`) for email and password fields.
3.  **Authentication Logic:** Use the Supabase client (`supabase.auth.signInWithPassword`) to handle the authentication request.
4.  **State Management:** Implement logic to manage the user's session state on the client-side, potentially using React Context or a similar pattern to make the user session available throughout the app.
5.  **Redirects:** Handle the client-side redirection after a successful login using the Next.js `useRouter` hook.

### Backend/API Requirements

1.  **Middleware for Route Protection:** Create a `src/middleware.ts` file. This middleware will run on requests to protected routes (e.g., `/dashboard/*`, `/reports/*`).
2.  **Session Verification:** The middleware will check for the user's session cookie, verify it with the Supabase client on the server-side, and refresh the session if needed.
3.  **Authorization Logic:** If the user is authenticated, the middleware allows the request to proceed. If not, it redirects the user to the `/login` page. This protects all routes within the `(app)` route group.

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
