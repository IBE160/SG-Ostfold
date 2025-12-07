---
story_id: S-3.1
title: Story Context - Create & Submit Shift Report (SR1–SR9)
epic_key: E-3-dashboard-and-reporting
status: drafted
---

# Story Context: Create & Submit Shift Report (SR1–SR9)

This document provides architectural and technical context for implementing Story S-3.1.

## 1. Architectural Details

*   **Interaction with Supabase:** The shift report form will be submitted using a **Next.js Server Action**. This is the preferred approach as it keeps the data insertion logic on the server, enhancing security. The server action will use the Supabase client (with the user's session) to insert a new record into the `shift_reports` table.
*   **Database Fields:** The `shift_reports` table must contain the following fields:
    *   `id`: Primary key (UUID)
    *   `profile_id`: Foreign key to `public.profiles(id)`, linking to the user who submitted the report. This will be populated in the server action using the authenticated user's ID.
    *   `created_at`: Timestamp of report creation.
    *   `SR1_production_count` (INTEGER, required)
    *   `SR2_downtime_minutes` (INTEGER, required)
    *   `SR3_overtime_hours` (FLOAT, required)
    *   `SR4_incidents_count` (INTEGER, required)
    *   `SR5_safety_notes` (TEXT, optional)
    *   `SR6_personnel_on_shift` (TEXT[], required)
    *   `SR7_materials_used` (JSONB, optional)
    *   `SR8_quality_checks` (TEXT, required)
    *   `SR9_general_notes` (TEXT, optional)
*   **RLS Policies:** The existing RLS policy on the `shift_reports` table must allow `INSERT` operations for users with the `shift_leader` role, provided that the `profile_id` in the new record matches `auth.uid()`. The server action will run with the user's permissions, so a correct RLS policy is critical for the insert to succeed.

## 2. UI/UX Context

*   **Component Library:** All UI components must be from the `shadcn/ui` library.
*   **Form Management:** The form will be built using `react-hook-form` for state management and `zod` for validation. A `zod` schema will be defined to match the validation rules below.
*   **Layout:** The form will be on a new page at `/shift-report/create`. It should use the standard application layout (with sidebar). The form itself should be a single-column layout, with clear labels for each field.
*   **User Flow:**
    1.  User navigates to `/shift-report/create`.
    2.  User fills out the form fields.
    3.  On-blur validation provides immediate feedback on invalid fields.
    4.  User clicks the "Submit Report" button.
    5.  On success, a success toast/notification is displayed, and the form is reset.
    6.  On failure, an error toast/notification is displayed with a meaningful message, and the form remains populated.

## 3. Data and Validation Rules

The `zod` schema for the form should enforce the following rules:

*   `SR1_production_count`: Must be a non-negative integer.
*   `SR2_downtime_minutes`: Must be a non-negative integer.
*   `SR3_overtime_hours`: Must be a non-negative number.
*   `SR4_incidents_count`: Must be a non-negative integer.
*   `SR5_safety_notes`: Optional string.
*   `SR6_personnel_on_shift`: Array of strings, must contain at least one name.
*   `SR7_materials_used`: Optional JSON object.
*   `SR8_quality_checks`: Required string, non-empty.
*   `SR9_general_notes`: Optional string.

## 4. Security Considerations

*   **Data Insertion:** The server action must explicitly get the authenticated user's ID from the session and use it as the `profile_id` for the new report. The `profile_id` should **not** be a hidden field in the form that can be manipulated by the user.
*   **Privilege Escalation:** By using a server action that runs in the user's context, we avoid the need for service role keys. The RLS policy is the ultimate authority, ensuring a user cannot submit a report on behalf of someone else.
*   **RLS:** The `INSERT` policy on `shift_reports` is the primary security gate. It must be tested to ensure it correctly blocks inserts where `profile_id` does not match `auth.uid()`.

## 5. Dependencies

*   **Authentication:** The user must be authenticated, and their session must be available to the server action to retrieve their user ID.
*   **Database:** The `profiles` and `shift_reports` tables must exist in the database with the correct schema.
*   **Future Dependencies:** The data collected in this story is a critical dependency for all future KPI aggregation and dashboard visualization stories in Sprint 2. The data schema should be considered stable once implemented.
