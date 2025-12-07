# Shift Reporting

This document describes the shift reporting feature.

## Creating a Shift Report

Shift leaders can create a daily shift report by navigating to the `/shift-report/create` page. The form captures key information about the shift, including production counts, downtime, incidents, and safety notes.

### SR Fields

*   **SR1: Production Count:** The total number of units produced during the shift.
*   **SR2: Downtime (minutes):** The total number of minutes of downtime during the shift.
*   **SR3: Overtime (hours):** The total number of overtime hours for the shift.
*   **SR4: Incidents Count:** The total number of incidents that occurred during the shift.
*   **SR5: Safety Notes:** Any notes related to safety.
*   **SR6: Personnel on Shift:** A comma-separated list of personnel who were on shift.
*   **SR7: Materials Used:** A JSON object representing the materials used during the shift.
*   **SR8: Quality Checks:** A description of the quality checks performed during the shift.
*   **SR9: General Notes:** Any other general notes about the shift.

### Submission

The form is submitted using a server action, which validates the data and inserts it into the `shift_reports` table in the Supabase database. The report is automatically linked to the authenticated user's profile.

### Constraints and Limitations

*   Only users with the `shift_leader` role can create shift reports.
*   Shift leaders can only create reports for themselves.
*   The `sr7_materials_used` field must be valid JSON.
