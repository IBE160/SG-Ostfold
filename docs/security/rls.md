# Supabase Row Level Security (RLS) Policies

This document outlines the Row Level Security (RLS) policies implemented for the application database, as per Story S-2.4.

## 1. Overview

RLS is enabled on the following tables to ensure that users can only access data they are permitted to see:
- `profiles`
- `departments`
- `employees`
- `shift_reports`
- `kpis`

All policies are based on the user's role, which is determined by the `get_my_role()` helper function. This function retrieves the role from the user's record in the `public.profiles` table.

## 2. Helper Functions

### `public.get_my_role()`

This function returns the role of the currently authenticated user. It is a `SECURITY DEFINER` function, allowing it to temporarily bypass RLS on the `profiles` table to read the role of the user making the query.

## 3. Role-Based Policies

### `profiles` Table
- **Users can view their own profile:** Allows a user to `SELECT` their own profile information.
- **Users can update their own profile:** Allows a user to `UPDATE` their own profile information.
- **Admins can manage all profiles:** Allows users with the `admin` role to perform any action (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) on any profile.
- **Managers can view all profiles:** Allows users with the `shift_manager` role to `SELECT` all profiles.

### `shift_reports` and `kpis` Tables
- **Users can view their own reports/kpis:** Allows any user to `SELECT` reports or KPIs that they have created (where `employee_profile_id` matches their user ID).
- **Shift leaders can create reports/kpis for themselves:** Allows users with the `shift_leader` role to `INSERT` new reports or KPIs, but only if they are the creator.
- **Managers and admins can view all reports/kpis:** Allows users with the `shift_manager` or `admin` role to `SELECT` all records from these tables.

### `employees` and `departments` Tables
- **Managers and admins can view all employees and departments:** Allows users with the `shift_manager` or `admin` role to `SELECT` all records from these tables.
- **Note:** More granular policies (e.g., for `shift_leader` to see employees in their own department) have not been implemented yet, as it would require a more complex data model to map leaders to departments. This can be added in a future iteration if required.

## 4. Rationale

The implemented RLS policies enforce a clear separation of data access based on user roles, which is a critical security requirement.
- By default, users have very limited access (only to their own data).
- The `shift_leader` role has specific, limited creation rights.
- The `shift_manager` and `admin` roles have broader read access, with `admin` having full control for administrative purposes.

This tiered approach ensures data privacy and integrity while providing the necessary access for each role to perform its functions. All data ownership is enforced via the `employee_profile_id` foreign key, which links back to the authenticated user's ID (`auth.uid()`).
