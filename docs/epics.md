# {{project_name}} - Epic Breakdown

**Author:** {{user_name}}
**Date:** {{date}}
**Project Level:** {{project_level}}
**Target Scale:** {{target_scale}}

---

## Overview

This document provides the complete epic and story breakdown for {{project_name}}, decomposing the requirements from the [PRD](./PRD.md) into implementable stories.

This document breaks down the project into the following value-driven epics:

1.  **Epic 1: Project Foundation & Deployment Pipeline**
    *   **Value:** Establish a robust and automated foundation for all future development, ensuring consistency and quality from day one.
    *   **Scope:** Initialize project structure, set up CI/CD pipeline for automated builds and deployments, configure core dependencies, and define the initial database schema.

2.  **Epic 2: Secure User Access & Roles**
    *   **Value:** Ensure secure access to the application with appropriate permissions for different user roles.
    *   **Scope:** User registration, login/logout functionality, and role-based access control (Shift Leader vs. Manager).

3.  **Epic 3: Core Shift Reporting**
    *   **Value:** Enable the primary function of creating and managing shift reports, replacing the manual process.
    *   **Scope:** Create, view, and update shift reports through a validated form.

4.  **Epic 4: Historical Reporting & Export**
    *   **Value:** Provide managers with the ability to analyze past performance and export data for external use.
    *   **Scope:** Historical report view with filtering by date, shift, and area; CSV export functionality.

5.  **Epic 5: KPI Dashboard & Visualization**
    *   **Value:** Offer at-a-glance insights into operational health through a visual dashboard.
    *   **Scope:** Dashboard with KPI cards for the "Critical 3" MVP metrics (Orders per Hour, Overtime, Sick Leave) and one trend graph.

6.  **Epic 6: Advanced Reporting & Intelligence (Growth)**
    *   **Value:** Enhance decision-making with automated insights, alerts, and advanced analytics.
    *   **Scope:** Manager approval workflow, threshold alerts, AI-powered note summarization, anomaly detection, and additional visualizations.

7.  **Epic 7: Enterprise Integration (Vision)**
    *   **Value:** Transform the application into a fully integrated component of the enterprise ecosystem.
    *   **Scope:** WMS and ERP integration for two-way data synchronization.

---

<!-- Repeat for each epic (N = 1, 2, 3...) -->

## Epic 1: Project Foundation & Deployment Pipeline

**Value:** Establish a robust and automated foundation for all future development, ensuring consistency and quality from day one.
**Scope:** Initialize project structure, set up CI/CD pipeline for automated builds and deployments, configure core dependencies, and define the initial database schema.

<!-- Repeat for each story (M = 1, 2, 3...) within epic N -->

### Story 1.1: Initialize Project Repository & Structure

As a developer,
I want to set up the basic project repository and directory structure,
So that we have a clean, organized starting point for development.

**Acceptance Criteria:**

**Given** a new project,
**When** the project is initialized,
**Then** a Git repository is created.
**And** a standard directory structure (e.g., `src`, `public`, `config`, `tests`, `docs`) is established.
**And** a `.gitignore` file is configured to exclude common development artifacts.

**Prerequisites:** None.

**Technical Notes:** Use `npx create-next-app` or similar for initial scaffolding.

### Story 1.2: Implement Basic CI/CD Pipeline

As a developer,
I want to set up a basic Continuous Integration/Continuous Deployment pipeline,
So that code changes are automatically built, linted, and deployed to a staging environment.

**Acceptance Criteria:**

**Given** a code commit to the main branch,
**When** the CI/CD pipeline is triggered,
**Then** the application code is built successfully.
**And** code linting and formatting checks are run.
**And** the application is deployed to a designated staging environment (e.g., Vercel).

**Prerequisites:** Story 1.1.

**Technical Notes:** Integrate with GitHub Actions. Focus on build and linting for now; test execution will be added in later stories.

### Story 1.3: Configure Core Dependencies & Environment

As a developer,
I want to configure essential project dependencies and environment variables,
So that the application can run locally and in deployment environments.

**Acceptance Criteria:**

**Given** a fresh clone of the repository,
**When** `npm install` (or equivalent) is run,
**Then** all necessary frontend and backend packages are installed.
**And** a `.env.example` file is provided with placeholders for required environment variables (e.g., Supabase API keys, database connection strings).
**And** the application can be started locally without configuration errors.

**Prerequisites:** Story 1.1.

**Technical Notes:** Include Next.js, React, Supabase client libraries, Tailwind CSS, ShadCN/UI.

### Story 1.4: Define Initial Database Schema (Supabase)

As a backend developer,
I want to define and apply the initial database schema for core entities using Supabase tools,
So that the application has a structured and version-controlled place to store its data.

**Acceptance Criteria:**

**Given** a Supabase project,
**When** the schema is applied,
**Then** tables for `Users`, `ShiftReport`, `Absence`, and `Overtime` are created in the development environment.
**And** primary keys, foreign keys, and basic data types are defined according to the PRD.
**And** a migration script is generated from the Supabase Studio changes and committed to the repository.
**And** Row Level Security (RLS) is enabled for relevant tables.

**Prerequisites:** Story 1.3.

**Technical Notes:** Use the Supabase Studio UI for initial table design, then use the Supabase CLI to generate and manage migration files.

### Story 1.5: Set Up Basic Logging & Monitoring

As a developer,
I want to set up basic logging and monitoring for the application,
So that we can observe application health and troubleshoot issues in the staging environment.

**Acceptance Criteria:**

**Given** the application is running in a deployed environment,
**When** an error occurs or a significant event happens,
**Then** a structured log message is generated and sent to a centralized logging service (e.g., Supabase logs, Vercel logs).
**And** basic application health metrics (e.g., response times, error rates) are visible in a monitoring dashboard.

**Prerequisites:** Story 1.2.

**Technical Notes:** Utilize the built-in logging and monitoring features of Vercel or Supabase for the MVP.

---

## Epic 2: Secure User Access & Roles

**Value:** Ensure secure access to the application with appropriate permissions for different user roles.
**Scope:** User registration, login/logout functionality, and role-based access control (Shift Leader vs. Manager).

**Reasoning for this Epic's Structure:**

The stories in this epic are structured to prioritize security and a controlled rollout, which is critical for an internal business application.

-   **Invitation-Only Registration (Story 2.1):** We have deliberately chosen an invitation-based system over open registration. This prevents unauthorized access and ensures that every user is known and has a pre-assigned role before they even create an account. This is a key security consideration.
-   **Decoupled Role Management (Story 2.4):** For the MVP, the assignment of roles is handled by an administrator through backend processes (seed scripts or the Supabase dashboard), not through a UI. This simplifies the initial development effort by deferring the complexity of building a user management interface, allowing us to focus on the core value proposition first.
-   **Standard User Flows (Stories 2.2 & 2.3):** Login, logout, and password recovery are standard, expected features that are crucial for a good user experience. We are leveraging the built-in, secure functionalities of our authentication provider (Supabase Auth) to implement these efficiently.

### Story 2.1 (Speedrun Version): Pre-provision Users via Seed Script

As a developer,
I want to pre-provision a set of test users with pre-defined roles using a database seed script,
So that we can quickly begin testing the application with different user roles without building a UI for user invitation.

**Acceptance Criteria:**

**Given** the database is seeded,
**When** the application starts,
**Then** at least two users (one 'Shift Leader', one 'Manager') exist in the `auth.users` table with known passwords.
**And** their corresponding roles are set in the database.

**Prerequisites:** Epic 1.

**Technical Notes:** Create a seed script that populates the necessary user and role information in Supabase. This bypasses the need for an invitation UI in the MVP.

### Story 2.2: Implement User Login & Logout

As a registered user,
I want to log in and out of the application,
So that I can access my authorized features and secure my session.

**Acceptance Criteria:**

**Given** I am on the login page,
**When** I enter my registered email and password and submit the form,
**Then** I am authenticated via Supabase Auth.
**And** I am redirected to the application dashboard.
**Given** I am logged in,
**When** I click the logout button,
**Then** my session is terminated.
**And** I am redirected to the login page.

**Prerequisites:** Story 2.1.

**Technical Notes:** Use Supabase Auth for session management. Handle authentication errors gracefully.

### Story 2.3 (was 2.4): Enforce Role-Based Access Control (RBAC)

As a user,
I want to only be able to see and do what my role permits,
So that the application data remains secure and relevant to my responsibilities.

**Acceptance Criteria:**

**Given** I am logged in as a 'Shift Leader',
**When** I access the application,
**Then** I can only view and edit my own shift reports.
**Given** I am logged in as a 'Manager',
**When** I access the application,
**Then** I can view all shift reports and access filtering options.

**Prerequisites:** Story 2.2.

**Technical Notes:** Implement RBAC using Supabase's Row Level Security (RLS) policies.

**Deferred to Post-MVP:**
-   **User Invitation UI:** A user-friendly interface for administrators to invite new users.
-   **Self-Serve Password Recovery:** The automated "Forgot Password" email flow. (Password resets can be handled manually by an admin in the Supabase dashboard for the initial MVP).

---

## Epic 3: Core Shift Reporting

**Value:** Enable the primary function of creating and managing shift reports, replacing the manual process.
**Scope:** Create, view, and update shift reports through a validated form.

### Story 3.1: Implement Shift Report Form UI (Basic Fields)

As a Shift Leader,
I want to see a form with basic shift details,
So that I can begin to record the essential information for my shift.

**Acceptance Criteria:**

**Given** I am logged in as a Shift Leader,
**When** I navigate to the "New Report" page,
**Then** a responsive form is displayed with fields for date, shift type, responsible user, and notes, with appropriate client-side validation.

**Prerequisites:** Epic 2.

**Technical Notes:** Implement using ShadCN/UI components.

### Story 3.2: Implement Shift Report Form UI (Operational Data Fields)

As a Shift Leader,
I want to see and interact with fields for operational data on the shift report form,
So that I can input all necessary performance metrics.

**Acceptance Criteria:**

**Given** the shift report form is displayed,
**When** I view the form,
**Then** it includes validated numeric input fields for all operational data (e.g., overtime, orders).

**Prerequisites:** Story 3.1.

**Technical Notes:** Consider how to handle the `ordersByArea` and `staffingByArea` inputs, perhaps with a dynamic list of input fields based on a predefined list of areas.

### Story 3.3: Create API Endpoint for Report Submission

As a backend developer,
I want to create a secure API endpoint for submitting new shift reports,
So that the frontend has a way to save report data.

**Acceptance Criteria:**

**Given** a POST request with valid report data is sent to `/api/reports`,
**When** the endpoint is processed,
**Then** a new record is created in the `ShiftReport` table.
**And** the API returns a success response with the new report's ID.
**And** the endpoint includes robust server-side validation for all fields.
**And** the endpoint is protected and can only be accessed by authenticated users with the 'Shift Leader' role.

**Prerequisites:** Epic 1 (Database Schema).

**Technical Notes:** Implement as a Next.js API route. Use Supabase client for database interaction.

### Story 3.4: Connect Report Form to Submission API

As a Shift Leader,
I want to submit my completed shift report and have it saved,
So that the data is persisted and available for review.

**Acceptance Criteria:**

**Given** I have filled out the shift report form,
**When** I click the "Submit" button,
**Then** a POST request is sent to the `/api/reports` endpoint with the form data.
**And** upon a successful response, I see a success notification and am redirected.
**And** upon an error response, I see a relevant error message.

**Prerequisites:** Story 3.2, Story 3.3.

**Technical Notes:** Handle form state and submission logic in the frontend.

### Story 3.5: Implement "View Own Reports" List

As a Shift Leader,
I want to see a list of my previously submitted reports,
So that I can track my reporting history.

**Acceptance Criteria:**

**Given** I am logged in as a Shift Leader,
**When** I navigate to the "My Reports" page,
**Then** an API call is made to fetch my reports.
**And** a list of my reports (e.g., showing date and shift type) is displayed.

**Prerequisites:** Story 3.4.

**Technical Notes:** Create a new API endpoint `GET /api/reports/mine` that uses RLS to return only the logged-in user's reports.

### Story 3.6: Implement "Edit Own Report" Functionality

As a Shift Leader,
I want to edit one of my previously submitted reports,
So that I can correct mistakes.

**Acceptance Criteria:**

**Given** I am viewing my list of reports,
**When** I click an "Edit" button on a report,
**Then** I am taken to the report form, pre-filled with that report's data.
**When** I change the data and click "Save Changes",
**Then** a PUT/PATCH request is sent to an endpoint like `/api/reports/[id]`.
**And** the report is updated in the database.

**Prerequisites:** Story 3.5.

**Technical Notes:** Create a new API endpoint `PUT /api/reports/[id]` for updates. Ensure RLS prevents users from editing reports that are not their own.

---

## Epic 4: Historical Reporting & Export

**Value:** Provide managers with the ability to analyze past performance and export data for external use.
**Scope:** Historical report view with filtering by date, shift, and area; CSV export functionality.

### Story 4.1: View All Reports (Manager)

As a Manager,
I want to view a list of all submitted shift reports,
So that I can oversee operational performance across all shifts.

**Acceptance Criteria:**

**Given** I am logged in as a Manager,
**When** I navigate to the "All Reports" section,
**Then** an API call is made to fetch all reports.
**And** a list of all reports (e.g., showing date, shift type, responsible user) is displayed.

**Prerequisites:** Epic 3.

**Technical Notes:** Create a new API endpoint `GET /api/reports/all` that uses RLS to return all reports for Managers.

### Story 4.2: Filter Reports by Date, Shift, Area

As a Manager,
I want to filter the list of reports by date range, shift type, and operational area,
So that I can quickly find specific data for analysis.

**Acceptance Criteria:**

**Given** I am viewing the list of all reports,
**When** I apply filters for date range, shift type (morning/evening/night), or operational area,
**Then** the displayed list of reports updates to show only those matching the criteria.
**And** the filters are clearly visible and can be reset.

**Prerequisites:** Story 4.1.

**Technical Notes:** Implement filter parameters for the `GET /api/reports/all` endpoint.

### Story 4.3: Export Filtered Reports to CSV

As a Manager,
I want to export the currently filtered list of reports to a CSV file,
So that I can perform further analysis in external tools or share the data.

**Acceptance Criteria:**

**Given** I have applied filters to the reports list,
**When** I click the "Export to CSV" button,
**Then** a CSV file containing the filtered report data is downloaded.
**And** nested fields (e.g., `ordersByArea`) are flattened into separate columns in the CSV.

**Prerequisites:** Story 4.2.

**Technical Notes:** Implement a new API endpoint `GET /api/reports/export-csv` that accepts filter parameters and returns a CSV file.

---

## Epic 5: KPI Dashboard & Visualization

**Value:** Offer at-a-glance insights into operational health through a visual dashboard.
**Scope:** Dashboard with KPI cards for the "Critical 3" MVP metrics (Orders per Hour, Overtime, Sick Leave) and one trend graph.

### Story 5.1: Display Critical 3 KPIs on Dashboard

As a Manager,
I want to see the "Critical 3" KPIs (Orders per Hour, Overtime, Sick Leave) prominently displayed on a dashboard,
So that I can quickly assess the operational health of the shifts.

**Acceptance Criteria:**

**Given** I am logged in as a Manager,
**When** I navigate to the Dashboard,
**Then** I see distinct cards for "Orders per Hour", "Overtime (hours)", and "Sick Leave (%)".
**And** each card displays the current value for the selected period.
**And** the data is aggregated from the submitted shift reports.

**Prerequisites:** Epic 4 (Data available).

**Technical Notes:** Create API endpoints to fetch aggregated KPI data. Implement frontend components to display KPI cards.

### Story 5.2: Implement KPI Trend Graph

As a Manager,
I want to see a trend graph for at least one key KPI (e.g., Overtime),
So that I can identify patterns and changes in performance over time.

**Acceptance Criteria:**

**Given** I am viewing the Dashboard,
**When** I select a KPI (e.g., Overtime),
**Then** a line graph displays the trend of that KPI over a configurable period (e.g., last 7 days, last 30 days).
**And** the graph is interactive (e.g., hover to see specific data points).

**Prerequisites:** Story 5.1.

**Technical Notes:** Utilize a charting library (e.g., Recharts, Chart.js) for frontend visualization. Create API endpoints to fetch historical KPI data suitable for charting.

---

## Epic 6: Advanced Reporting & Intelligence (Growth)

**Value:** Enhance decision-making with automated insights, alerts, and advanced analytics.
**Scope:** Manager approval workflow, threshold alerts, AI-powered note summarization, anomaly detection, and additional visualizations.

### Story 6.1: Implement Manager Approval Workflow

As a Manager,
I want to approve or reject submitted shift reports,
So that I can ensure data accuracy and compliance before reports are finalized.

**Acceptance Criteria:**

**Given** I am viewing a submitted shift report,
**When** I click "Approve" or "Reject",
**Then** the report's status is updated accordingly.
**And** if rejected, the Shift Leader is notified and can resubmit.

**Prerequisites:** Epic 3 (Shift Report Management).

**Technical Notes:** Add a `status` field to the `ShiftReport` table. Implement API endpoints for approval/rejection.

### Story 6.2: Implement Threshold Alerts

As a Manager,
I want to receive alerts when key KPIs (e.g., overtime, sick leave) exceed predefined thresholds,
So that I can proactively address potential issues.

**Acceptance Criteria:**

**Given** a shift report is submitted,
**When** a KPI value (e.g., overtime hours) exceeds a configured threshold,
**Then** an alert is triggered (e.g., email notification to manager).
**And** thresholds can be configured by an administrator (via seed script for MVP).

**Prerequisites:** Epic 5 (KPI data available).

**Technical Notes:** Implement server-side logic to check thresholds upon report submission or on a scheduled basis.

### Story 6.3: Auto-Summarize Shift Notes with AI

As a Manager,
I want to see an AI-generated summary of shift notes,
So that I can quickly grasp key events and deviations without reading long texts.

**Acceptance Criteria:**

**Given** a shift report with a note is submitted,
**When** the report is saved,
**Then** the note text is sent to an AI service (e.g., GPT-4).
**And** an AI-generated summary is saved to the `noteSummaryAI` field in the database.
**And** the summary is displayed alongside the original note in the report view.

**Prerequisites:** Epic 3 (Shift Report Management).

**Technical Notes:** Integrate with OpenAI GPT-4 API. Implement fallback strategy if AI service is unavailable.

### Story 6.4: Implement Anomaly Detection

As a Manager,
I want the system to flag unusual patterns or outliers in operational data,
So that I can investigate potential issues or opportunities.

**Acceptance Criteria:**

**Given** a new shift report is submitted,
**When** the operational data deviates significantly from historical averages (e.g., using z-score),
**Then** the report is flagged as potentially anomalous.
**And** the anomaly is visible in the report view or dashboard.

**Prerequisites:** Epic 5 (Historical KPI data).

**Technical Notes:** Implement basic statistical anomaly detection (e.g., z-score calculation) on relevant KPI data.

### Story 6.5: Implement Chatbot for Report Querying

As a Manager,
I want to ask natural language questions about shift reports and KPIs,
So that I can get quick answers without manually filtering or navigating.

**Acceptance Criteria:**

**Given** I am on the dashboard or reports page,
**When** I type a question like "show overtime trend last 4 weeks" into a chatbot interface,
**Then** the chatbot provides a relevant answer or data visualization.

**Prerequisites:** Epic 5 (KPI data), Epic 6.3 (AI integration).

**Technical Notes:** Integrate with a conversational AI platform (e.g., custom GPT, LangChain).

---

## Epic 7: Enterprise Integration (Vision)

**Value:** Transform the application into a fully integrated component of the enterprise ecosystem, creating a single source of truth.
**Scope:** WMS and ERP integration for two-way data synchronization.

### Story 7.1: Integrate with WMS for Automated Data Population

As a Shift Leader,
I want the shift report form to be pre-populated with data from the Warehouse Management System (WMS),
So that I can reduce manual data entry and minimize errors.

**Acceptance Criteria:**

**Given** I am creating a new shift report,
**When** the form loads,
**Then** fields like order numbers, employee schedules, and inventory levels are automatically populated from the WMS.
**And** I can override the pre-populated data if necessary.

**Prerequisites:** Epic 3 (Core Shift Reporting).

**Technical Notes:** Requires API access to the WMS. Implement a data mapping layer to translate WMS data into the shift report format.

### Story 7.2: Integrate with ERP for Two-Way Data Sync

As a Manager,
I want validated shift report data to be automatically pushed to the Enterprise Resource Planning (ERP) system,
So that payroll and financial reporting are always based on the most accurate data.

**Acceptance Criteria:**

**Given** a shift report is approved,
**When** the approval is finalized,
**Then** key data points (e.g., actual hours worked, overtime, production numbers) are sent to the ERP system.
**And** the ERP system confirms successful receipt of the data.

**Prerequisites:** Epic 6 (Manager Approval Workflow).

**Technical Notes:** Requires API access to the ERP system. Implement a robust error handling and retry mechanism for data synchronization.

---

<!-- End epic repeat -->

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._
