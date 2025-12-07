---
story_id: S-2.4
title: Story Context - Implement Supabase Row Level Security (RLS) policies
epic_key: E-2-security-and-access-control
status: drafted
---

# Story Context: Implement Supabase Row Level Security (RLS) policies

This document provides architectural and technical context for implementing Story S-2.4, which focuses on securing database access using Supabase's Row Level Security (RLS).

## 1. Architectural Assumptions

*   **Authentication Provider**: The system uses Supabase Auth as the single source of truth for user identity. All database queries from the application are made by authenticated users.
*   **User Roles**: User roles (`shift_leader`, `shift_manager`, `admin`) are stored in a custom table (likely `profiles` or a dedicated `roles` table) linked to the `auth.users` table via `user_id`.
*   **Data Access**: All data access from the frontend application (Next.js) or backend (server actions/API routes) goes through the Supabase client, which respects RLS policies. There is no direct, privileged database access from the application layer.
*   **Ownership**: Data ownership is primarily determined by a `user_id` foreign key on relevant tables, linking back to the user who created or owns the record.

## 2. Involved Database Tables

RLS policies must be defined for the following tables:
*   `profiles`: Stores user-specific information and role. Linked to `auth.users`.
*   `departments`: Organizational units. Access may be restricted based on user's department.
*   `employees`: Employee records, likely linked to `departments`.
*   `shift_reports`: Reports created by shift leaders.
*   `kpis`: Key Performance Indicators, potentially linked to `shift_reports` or `employees`.

## 3. Data Flow & Role Model

The RLS policies must enforce the following access rules:

*   **Default User (`profiles`)**:
    *   **SELECT**: Can only read their own record from the `profiles` table.
    *   **UPDATE**: Can only update their own record in the `profiles` table.
    *   **INSERT/DELETE**: Generally not permitted on most tables, except where specified.

*   **`shift_leader`**:
    *   Inherits default user permissions.
    *   **SELECT**: Can read all `employees` within their own `department`.
    *   **INSERT**: Can create `shift_reports` and `kpis` for themselves (i.e., `user_id` must match `auth.uid()`).

*   **`shift_manager`**:
    *   **SELECT**: Can read all records from `profiles`, `departments`, `employees`, `shift_reports`, and `kpis`.
    *   **UPDATE**: Can update records in `employees` and `departments`.
    *   No delete permissions unless explicitly required.

*   **`admin`**:
    *   Full super-user permissions. Can perform SELECT, INSERT, UPDATE, and DELETE on all tables. This role should be used with caution and primarily for administrative tasks.

## 4. Foreign Key (FK) Ownership Logic

*   The `shift_reports` and `kpis` tables **must** have a `user_id` column that is a foreign key to `public.profiles(id)` or `auth.users(id)`.
*   Policies will heavily rely on the `auth.uid()` function to check against this `user_id` column. For example, an INSERT policy on `shift_reports` would include a `WITH CHECK` clause like: `(user_id = auth.uid())`.
*   For department-level access, a helper function might be needed to get the current user's department and check it against the `department_id` of the target row.

## 5. Security Constraints & Edge Cases

*   **Constraint**: RLS must be enabled on all tables listed. Bypassing RLS should be disabled for all roles except `postgres`.
*   **Edge Case**: Consider users who might change roles. Policies should not depend on session-cached role information and should re-evaluate the role on each query.
*   **Edge Case**: What happens when a user is deleted? The behavior of foreign keys (`ON DELETE SET NULL`, `ON DELETE CASCADE`) must be defined and tested to prevent orphaned records or unintended data loss. RLS policies should account for `NULL` user IDs if applicable.

## 6. Interaction with Frontend & Server Actions

*   **Frontend Queries (Client-Side)**: All queries made using the Supabase JS client from the browser will automatically be subject to the user's RLS policies. The frontend should be prepared to handle `401 Unauthorized` or empty result sets gracefully.
*   **Backend Queries (Server Actions/API Routes)**: Queries made from Next.js server components, API routes, or server actions using a *service role key* will bypass RLS. It is **critical** that only the standard *anon key* or a user-specific session is used for all user-facing data operations. The service role key should only be used for trusted administrative tasks or migrations.

This context provides a foundation for the development and testing of the RLS policies, ensuring they are robust, secure, and aligned with the application's architecture.
