# Epic Technical Context: Sprint 1

**Project:** Shift & KPI Reporting Solution
**Sprint:** 1
**Epics:** E-1 (Foundation & Setup), E-2 (Authentication & User Roles)
**Author:** Bob, Scrum Master
**Date:** 2025-12-06

---

This document provides a detailed technical guide for the development agent tasked with implementing the stories for Sprint 1. Its purpose is to consolidate all relevant information from the UX, architecture, and planning documents into a single, actionable source of truth.

## 1. Purpose & Scope of the Epics

-   **E-1 (Foundation & Setup):** The purpose of this epic is to establish the technical groundwork for all future development. This includes initializing the frontend (Next.js) and backend (NestJS) projects, and provisioning the Supabase database with its initial schema.
-   **E-2 (Authentication & User Roles):** The purpose of this epic is to secure the application by implementing a robust user login flow and a foundational Role-Based Access Control (RBAC) system. This ensures only authenticated users can access the system and sets the stage for role-specific permissions.

The **scope of Sprint 1** is limited to these two epics. The sprint will be considered a success when a developer can run the projects locally and a user can log in, with their access governed by a basic RLS policy.

## 2. Relevant User Stories

The following stories are in scope for Sprint 1:

-   **S-1.1:** As a Developer, I want a Next.js project initialized with TypeScript and Tailwind CSS...
-   **S-1.2:** As a Developer, I want a NestJS project initialized for the backend API...
-   **S-1.3:** As a Developer, I want a Supabase project set up with the initial database schema.
-   **S-2.1:** As a user, I want to log in with my email and password...
-   **S-2.4:** As a Developer, I want to implement Supabase Row Level Security (RLS) policies...

## 3. UX Requirements

-   **Screens:**
    -   A **Login Page** at the `/auth/login` route. The design should be minimal, featuring an email input, a password input, and a primary "Sign In" button.
    -   A **Main Application Layout** which includes a persistent left sidebar (width `w-72`) and a main content area. For this sprint, the content area can be a simple placeholder (e.g., displaying "Dashboard").
-   **Components:**
    -   The login form will require `Input` and `Button` components from `shadcn/ui`.
    -   The main layout will require a `Sidebar` and `Menu Link` components.
-   **Interactions:**
    -   **Form Validation:** The login form should provide on-blur validation for the email and password fields.
    -   **Feedback:** Display a "Toast" notification for successful login and an "Alert" for a failed login attempt. The login button should show a loading spinner while authenticating.
    -   **Navigation:** Upon successful login, the user should be redirected to the main dashboard page (`/`).

## 4. Architecture Requirements

-   **Modules Involved:**
    -   **Frontend:** The Next.js `app/(auth)/login` route will be created. The `hooks/useAuth.ts` hook will encapsulate Supabase authentication logic.
    -   **Backend (NestJS):** The `Auth`, `Users`, and `Reports` modules should be created as placeholders. A database connection to Supabase must be established.
-   **API Boundaries:** For this sprint, no new NestJS API endpoints will be created. All authentication will be handled directly between the Next.js frontend and the Supabase Auth endpoint.
-   **Data Models (Supabase Schema):**
    -   `profiles`: Must be created with `id (UUID, FK to auth.users)`, `full_name (TEXT)`, and `role (TEXT, NOT NULL)`.
    -   `shift_reports`, `report_steps`, `incidents`: These tables must be created as per the schema in `architecture.md` to fulfill S-1.3, though they will not be heavily used in this sprint.
-   **RLS Requirements:**
    -   A policy must be created on the `profiles` table to allow users to view their own profile.
    -   A policy must be created on the `shift_reports` table allowing a user to manage reports where `auth.uid() = user_id`.

## 5. Technical Decisions for Implementation

1.  **Authentication Flow:** The authentication sequence will be client-side. The Next.js frontend will use the `supabase-js` library to directly call Supabase's `signInWithPassword` function.
2.  **JWT Handling:** Upon successful login, the JWT received from Supabase will be stored securely in the browser (e.g., in a cookie or local storage, managed by the `supabase-js` client). This token will be automatically sent by the client on subsequent requests to Supabase.
3.  **Role Management:** User roles (`shift_leader`, `manager`) will be stored in the `role` column of the public `profiles` table. For this sprint, roles can be set manually in the database.
4.  **Database Migrations:** SQL migration scripts for the initial schema should be created and managed using Supabase's built-in migration tooling.

## 6. Constraints and Assumptions

-   **Constraints:**
    -   The UI must use `shadcn/ui` components.
    -   The visual style must adhere to the dark theme defined in the UX specification.
    -   The backend framework is NestJS.
    -   The database and auth provider is Supabase.
-   **Assumptions:**
    -   The developer has access to the Supabase project credentials.
    -   For Sprint 1, it is assumed that a UI for managing user roles is not needed and can be handled via the database directly.

## 7. Expected Integration Points

The primary integration point for this sprint is:
-   **Frontend ↔ Supabase Auth:** The login form in the Next.js app will communicate directly with the Supabase `/auth/v1/token` endpoint via the `supabase-js` client library.

## 8. Required Components

-   **`shadcn/ui`:**
    -   `Button`: For the "Sign In" action.
    -   `Input`: For email and password fields.
    -   `Label`: For form field labels.
    -   `Toast`: For displaying success/error notifications.
-   **Custom Components:**
    -   `Sidebar`: A persistent navigation component for the main app layout.
    -   `LoginForm`: A client-side component encapsulating the login form logic.

## 9. Technical Interpretation of Acceptance Criteria

-   **S-2.1 (Login):**
    -   A user entering correct credentials into the login UI successfully authenticates against Supabase.
    -   A JWT is returned and stored in the browser.
    -   The user is redirected to the application's root dashboard page.
    -   A user entering incorrect credentials sees a clear error message.
-   **S-2.4 (RLS Policies):**
    -   An automated integration test proves that a user authenticated with a `shift_leader` role *can* select from the `shift_reports` table where the `user_id` matches their own ID.
    -   An automated integration test proves that the same user *cannot* select from `shift_reports` where the `user_id` belongs to another user. The query must return zero rows.

## 10. Risks, Open Questions, and Mitigation

-   **Primary Risk:** **Flawed RLS Implementation** (High). A mistake in the RLS policies could compromise the entire security model.
    -   **Mitigation:** This risk is directly addressed by story **S-2.4**. The Definition of Done for this story *requires* automated integration tests that prove both positive and negative access cases. The sprint cannot be considered complete without these passing tests.
-   **Open Question:** How will user roles be assigned initially?
    -   **Decision for Sprint 1:** Roles will be assigned manually in the Supabase database. A task should be added to the backlog for a future sprint to build a UI for role management by an Operations Manager.

## 11. References

-   **Product Backlog:** `docs/epics.md`
-   **UX Specification:** `docs/ux-design-specification.md`
-   **Architecture:** `docs/architecture.md`
-   **Test Design:** `docs/test-design-system.md`
-   **Sprint Plan:** `docs/sprint-plan-1.md`
