# ibe160 - Epic Breakdown

**Author:** BIP
**Date:** 2025-12-01
**Project Level:** Low Complexity
**Target Scale:** 5 years of data, 200 concurrent users

---

## Overview

This document provides the complete epic and story breakdown for ibe160, decomposing the requirements from the [PRD](./PRD.md) into implementable stories.

This breakdown organizes the project into five distinct epics. The first three epics cover the Minimum Viable Product (MVP), delivering core functionality and insights progressively. The subsequent epics outline a clear path for post-MVP growth and advanced features.

- **Epic 1: Foundation & Core Reporting:** Establishes the project foundation, including user authentication and the core ability for shift leaders to create, read, and update their reports.
- **Epic 2: Management Insights & Data Export:** Empowers managers by providing a historical view of all reports with robust filtering and CSV export capabilities.
- **Epic 3: KPI Dashboard & Visualization:** Delivers the primary "at-a-glance" value to management by introducing the dashboard with the three critical MVP KPIs and a trend graph.
- **Epic 4: Advanced Reporting & Workflow (Post-MVP):** Introduces the first set of growth features, including the manager approval workflow and automated alerts.
- **Epic 5: AI-Powered Intelligence (Post-MVP):** Groups future AI capabilities like automatic shift summaries, anomaly detection, and a query chatbot.

---

## Epic 1: Foundation & Core Reporting

Establishes the project foundation, including user authentication and the core ability for shift leaders to create, read, and update their reports.

### Story 1.1: Project Foundation & CI/CD

As a **Dev Team**,
I want **the initial project structure, database schema, and a CI/CD pipeline**,
So that **we have a stable, automated foundation for development and deployment**.

**Acceptance Criteria:**

**Given** the project repository is initialized
**When** the initial setup script from `architecture.md` is run
**Then** a Next.js application is created with all specified dependencies (Supabase, TailwindCSS, ShadCN/UI).
**And** the Supabase project is configured with the initial database schema for users, roles, and reports.
**And** a Vercel project is configured to automatically deploy the `main` branch to production.

**Prerequisites:** None

**Technical Notes:** Use Next.js App Router and the project structure defined in `architecture.md`. The database schema must include tables for `reports`, `users`, and `roles` with RLS enabled. Vercel integration should be set up for seamless deployments.

### Story 1.2: User Authentication & Role-Based Access

As a **User**,
I want **to securely log in and be assigned a role**,
So that **I can access the features relevant to my position**.

**Acceptance Criteria:**

**Given** a user is on the login page
**When** they enter valid credentials for a 'Shift Leader' account
**Then** they are authenticated and redirected to their personal report dashboard.
**And** when they enter valid credentials for a 'Manager' account, they are redirected to the main operations dashboard.
**And** when they enter invalid credentials, an error message is displayed, as per the UX specification.

**Prerequisites:** Story 1.1

**Technical Notes:** Implement using Supabase Auth as defined in `architecture.md`. Create two roles in the database: `shift_leader` and `manager`. Secure pages and API routes based on these roles using Supabase RLS policies.

### Story 1.3: Create & Submit Shift Report

As a **Shift Leader**,
I want **an intuitive form to create and submit a new shift report**,
So that **I can accurately capture my daily operational data with minimal effort**.

**Acceptance Criteria:**

**Given** a logged-in Shift Leader is on the "New Report" page
**When** they fill in the required fields (e.g., Overtime, Sick Leave, Orders per Hour)
**Then** the form provides real-time validation for numeric inputs, with error states as defined in the UX spec.
**And** when they click "Submit", the report data is saved to the `reports` table in the Supabase database.
**And** a success notification is displayed upon successful submission.

**Prerequisites:** Story 1.2

**Technical Notes:** The form must include all fields necessary for the MVP KPIs. Implement both client-side (for responsiveness) and server-side (for security) validation. API communication should follow the patterns in `architecture.md`.

### Story 1.4: View & Update Own Shift Reports

As a **Shift Leader**,
I want **to view a list of my past reports and edit them**,
So that **I can correct any mistakes or update information**.

**Acceptance Criteria:**

**Given** a logged-in Shift Leader navigates to their report history
**When** they view the list
**Then** they only see reports they have created, enforced by RLS.
**And** when they select a report, they can view its details and have an "Edit" option.
**And** when they edit and save a report, the changes are updated in the database.

**Prerequisites:** Story 1.3

**Technical Notes:** The report history view should be a simple, paginated list. The editing interface can reuse the creation form, pre-filled with the selected report's data.

---

## Epic 2: Management Insights & Data Export

Empowers managers by providing a historical view of all reports with robust filtering and CSV export capabilities.

### Story 2.1: Unified Historical Report View

As a **Manager**,
I want **to view a list of all historical shift reports from all leaders**,
So that **I can get a complete, centralized overview of operations**.

**Acceptance Criteria:**

**Given** a user is logged in as a 'Manager'
**When** they navigate to the "All Reports" history page
**Then** they see a paginated list of all reports submitted by all shift leaders, sorted by date (newest first).

**Prerequisites:** Story 1.2

**Technical Notes:** This view requires a Supabase RLS policy that allows users with the 'manager' role to read all records from the `reports` table. The view should be distinct from the shift leader's personal report view.

### Story 2.2: Advanced Filtering

As a **Manager**,
I want **to filter the historical reports by date range, shift, and area**,
So that **I can quickly narrow down the data to find specific information for analysis**.

**Acceptance Criteria:**

**Given** a Manager is on the "All Reports" history page
**When** they apply a date range filter (e.g., last 7 days)
**Then** the list updates to show only reports within that date range.
**And** when they also apply a filter for 'Shift A', the list is further refined to show only 'Shift A' reports within the selected date range.

**Prerequisites:** Story 2.1

**Technical Notes:** Filters should be designed to be combinable. The UI must be intuitive, with clear indicators for active filters, as per the UX spec. The backend query must be updated to dynamically build the `WHERE` clause based on the filter parameters.

### Story 2.3: CSV Export

As a **Manager**,
I want **to export the currently filtered list of reports to a CSV file**,
So that **I can perform further analysis or share the data using external tools like Excel**.

**Acceptance Criteria:**

**Given** a Manager has a filtered list of reports on their screen
**When** they click the "Export to CSV" button
**Then** a CSV file is downloaded to their computer.
**And** the content of the CSV file exactly matches the reports and data fields shown in the filtered view.

**Prerequisites:** Story 2.2

**Technical Notes:** The export functionality must use the same query and filter parameters as the current view to ensure consistency. This can be implemented as a Next.js Route Handler that generates the CSV server-side.

---

## Epic 3: KPI Dashboard & Visualization

Delivers the primary "at-a-glance" value to management by introducing the dashboard with the three critical MVP KPIs and a trend graph.

### Story 3.1: Dashboard UI & Layout

As a **Manager**,
I want **a dedicated dashboard page that serves as a central hub for all KPIs and visualizations**,
So that **I have a single place to monitor operational health**.

**Acceptance Criteria:**

**Given** a user is logged in as a 'Manager'
**When** they navigate to the "/dashboard" route
**Then** they see a page with a clear title (e.g., "Operations Dashboard").
**And** the page has a grid-based layout with designated areas for KPI cards and charts, as defined in `ux-design-specification.md`.

**Prerequisites:** Story 1.2

**Technical Notes:** Create a new route for the dashboard. The layout should be responsive and use a grid system (e.g., CSS Grid) to accommodate multiple data visualization components.

### Story 3.2: "Critical 3" KPI Cards

As a **Manager**,
I want **to see the "Critical 3" KPIs displayed as prominent cards on the dashboard**,
So that **I can get an immediate snapshot of the most important metrics**.

**Acceptance Criteria:**

**Given** a Manager is on the dashboard
**Then** they see three distinct KPI cards: "Orders per Hour", "Overtime (hours)", and "Sick Leave (%)".
**And** each card displays the metric's title and its current value, calculated over a default time period (e.g., last 7 days).
**And** the cards show a loading state while data is being fetched.

**Prerequisites:** Story 3.1

**Technical Notes:** The data for these KPIs will need to be aggregated from the `reports` table. Create a new API endpoint or server function to calculate these metrics efficiently. The UI for the cards should match the component design in `ux-design-specification.md`.

### Story 3.3: Overtime Trend Graph

As a **Manager**,
I want **to see a trend graph for Overtime hours**,
So that **I can visualize performance over time and spot trends or anomalies**.

**Acceptance Criteria:**

**Given** a Manager is on the dashboard
**When** they view the trend graph section
**Then** they see a line chart showing the "Overtime (hours)" KPI plotted daily over the last 30 days.
**And** the chart is interactive, with tooltips showing the exact value for a given day on hover.

**Prerequisites:** Story 3.1

**Technical Notes:** Use a charting library like Recharts or Tremor, as suggested in `architecture.md`. The data will need to be aggregated by day.

### Story 3.4: Dashboard Date Range Filter

As a **Manager**,
I want **to filter the entire dashboard by a specific date range**,
So that **I can analyze operational performance during a particular period**.

**Acceptance Criteria:**

**Given** a Manager is on the dashboard
**When** they select a new date range using a date picker
**Then** all KPI cards and charts on the dashboard update to reflect the data from that selected period.

**Prerequisites:** Story 3.2, Story 3.3

**Technical Notes:** This introduces interactivity. The filter component can be reused or adapted from the reports page. All data queries for the dashboard must be parameterized to use the selected date range.

---

## Epic 4: Advanced Reporting & Workflow (Post-MVP)

Introduces the first set of growth features, including the manager approval workflow and automated alerts.

### Story 4.1: Report Approval Workflow

As a **Manager**,
I want **to approve or reject a shift report**,
So that **I can formally sign off on the data's accuracy and lock it from further edits**.

**Acceptance Criteria:**

**Given** a Manager is viewing a submitted report that is not yet approved
**When** they view the report
**Then** they see "Approve" and "Reject" buttons.
**And** when they click "Approve", the report's status changes to 'Approved' and it becomes read-only for the Shift Leader.
**And** when they click "Reject", the report's status changes to 'Rejected' and it is flagged for the Shift Leader to review and resubmit.

**Prerequisites:** Story 2.1

**Technical Notes:** Add a `status` column to the `reports` table with possible values: 'Submitted', 'Approved', 'Rejected'. Implement UI changes to show status clearly. Access control logic must be updated to prevent edits on approved reports.

### Story 4.2: Threshold-Based Alerts

As a **Manager**,
I want **to be notified when a key metric breaches a predefined threshold**,
So that **I can proactively address potential issues without having to constantly monitor the dashboard**.

**Acceptance Criteria:**

**Given** a threshold is configured for "Overtime (hours)" > 10
**When** a shift report is submitted with an overtime value of 12
**Then** an alert is generated.
**And** the alert is displayed in a dedicated "Alerts" section on the Manager's dashboard.

**Prerequisites:** Story 1.3, Story 3.1

**Technical Notes:** This requires a new table for `alert_thresholds` and another for `alerts`. A mechanism, like a Supabase Database Trigger as defined in `architecture.md`, is needed to check reports against these thresholds.

### Story 4.3: Report Attachments

As a **Shift Leader**,
I want **to upload attachments (e.g., images, documents) to a shift report**,
So that **I can provide additional context or evidence for deviations and incidents**.

**Acceptance Criteria:**

**Given** a Shift Leader is creating or editing a shift report
**When** they use the file upload control
**Then** they can select a file (e.g., .png, .jpg, .pdf) to attach to the report.
**And** when a Manager views the report, they can see a link to download the attachment.

**Prerequisites:** Story 1.4

**Technical Notes:** Use Supabase Storage to handle file uploads securely, as decided in `architecture.md`. The `reports` table will need a way to reference the stored files.

---

## Epic 5: AI-Powered Intelligence (Post-MVP)

Groups future AI capabilities like automatic shift summaries, anomaly detection, and a query chatbot.

### Story 5.1: AI-Powered Shift Note Summarization

As a **Manager**,
I want **AI to automatically summarize shift notes**,
So that **I can quickly grasp the key points without reading through lengthy text**.

**Acceptance Criteria:**

**Given** a shift report contains detailed notes
**When** the report is submitted or viewed
**Then** an AI model (e.g., GPT-4) generates a concise summary of the notes.
**And** the summary is displayed prominently alongside the full notes in the report view.

**Prerequisites:** Story 1.3

**Technical Notes:** Integrate with the OpenAI API as defined in `architecture.md`. Implement a mechanism to send shift notes to the AI service and store the generated summary. Consider caching summaries to manage API costs.

### Story 5.2: Anomaly Detection in KPIs

As a **Manager**,
I want **the system to automatically detect statistically significant anomalies in KPI trends**,
So that **I can be alerted to unusual operational performance and investigate proactively**.

**Acceptance Criteria:**

**Given** a KPI (e.g., Orders per Hour) shows a sudden, statistically significant deviation from its historical pattern
**When** new report data is processed
**Then** an anomaly alert is generated.
**And** the alert is displayed in the "Alerts" section on the Manager's dashboard.

**Prerequisites:** Story 3.2

**Technical Notes:** Implement a basic anomaly detection algorithm (e.g., z-score, moving average with standard deviation) on historical KPI data. This could be a scheduled background job or triggered by new data ingestion.

### Story 5.3: Chatbot for Report Querying

As a **Manager**,
I want **to ask natural language questions about reports and KPIs**,
So that **I can get quick, conversational answers without manually filtering or navigating complex interfaces**.

**Acceptance Criteria:**

**Given** I am on the dashboard or a dedicated chat interface
**When** I type a question like "Show me overtime trends for last month in Area B"
**Then** the chatbot processes my query and provides a relevant graph, data summary, or direct answer.

**Prerequisites:** Story 2.2, Story 3.3

**Technical Notes:** Integrate with a natural language processing (NLP) service. This will require mapping natural language queries to database queries or API calls to retrieve and present the requested data.
