# Project Backlog: Epics & User Stories

This document outlines the epics and user stories for the Shift & KPI Reporting Solution. It is derived from the Product Brief, UX Design Specification, and System Architecture documents.

## Epics Overview

| Epic ID | Epic Name                               | Business Value                                                                 | Priority  |
| :------ | :-------------------------------------- | :----------------------------------------------------------------------------- | :-------- |
| **E-1** | Foundation & Setup                      | Establishes the technical groundwork for all future development.               | **MVP**   |
| **E-2** | Authentication & User Roles             | Secures the application and ensures users only access appropriate data.        | **MVP**   |
| **E-3** | Shift Report Completion & Submission    | The core data-entry mechanism for the entire platform.                         | **MVP**   |
| **E-4** | KPI Dashboard & Visualization           | Provides managers with at-a-glance insights into operational performance.      | **MVP**   |
| **E-5** | Historical Reporting & Analysis         | Enables deep-dive analysis and trend-spotting over time.                       | Post-MVP  |
| **E-6** | System Quality & NFRs                   | Ensures the application is performant, accessible, and maintainable.           | **MVP**   |

---

## E-1: Foundation & Setup

**Description:** This epic covers the initial setup of the project, including the frontend and backend repositories, CI/CD pipelines, and Supabase configuration.
**Business Value:** A solid foundation accelerates development, reduces integration issues, and ensures a stable deployment process.
**Priority:** **MVP**

### User Stories

| Story ID | User Story                                                                                             | Complexity | Priority | Dependencies |
| :------- | :----------------------------------------------------------------------------------------------------- | :--------- | :------- | :----------- |
| **S-1.1**  | As a Developer, I want a Next.js project initialized with TypeScript and Tailwind CSS, so that I can start building the frontend UI. | S          | High     | None         |
| **S-1.2**  | As a Developer, I want a NestJS project initialized for the backend API, so that I can create business logic endpoints. | S          | High     | None         |
| **S-1.3**  | As a Developer, I want a Supabase project set up with the initial database schema, so that the application has a data store. | M          | High     | None         |
| **S-1.4**  | As a Developer, I want a basic CI/CD pipeline that builds, tests, and deploys the app, so that we can automate releases. | L          | Medium   | S-1.1, S-1.2 |

---

## E-2: Authentication & User Roles

**Description:** This epic focuses on implementing user authentication and a simple role-based access control (RBAC) system for "Shift Leader" and "Manager" roles.
**Business Value:** Protects sensitive operational data and tailors the user experience to the user's responsibilities.
**Priority:** **MVP**

### User Stories

| Story ID | User Story                                                                                             | Complexity | Priority | Dependencies |
| :------- | :----------------------------------------------------------------------------------------------------- | :--------- | :------- | :----------- |
| **S-2.1**  | As a user, I want to log in with my email and password, so that I can securely access the application. | M          | High     | E-1          |
| **S-2.2**  | As a Shift Leader, I want the system to recognize my role, so that I see the shift reporting interface. | S          | High     | S-2.1        |
| **S-2.3**  | As a Manager, I want the system to recognize my role, so that I see the dashboard and historical reports. | S          | High     | S-2.1        |
| **S-2.4**  | As a Developer, I want to implement Supabase Row Level Security (RLS) policies, so that users can only access data they are permitted to see. | L          | High     | S-2.2, S-2.3 |

---

## E-3: Shift Report Completion & Submission

**Description:** This epic covers the entire 9-step workflow for a Shift Leader to create, fill out, and submit their shift report. This is the application's most critical feature.
**Business Value:** Captures structured, high-quality data from operations, which is the source of all insights.
**Priority:** **MVP**

### User Stories

| Story ID | User Story                                                                                             | Complexity | Priority | Dependencies |
| :------- | :----------------------------------------------------------------------------------------------------- | :--------- | :------- | :----------- |
| **S-3.1**  | As a Shift Leader, I want a multi-step form with a clear progress indicator (`ShiftReportStepper`), so that I can navigate the 9 report sections easily. | L          | High     | E-2          |
| **S-3.2**  | As a Shift Leader, I want the report to auto-save as a draft as I move between steps, so that I don't lose my work if I get interrupted. | M          | High     | S-3.1        |
| **S-3.3**  | As a Shift Leader, I want to see real-time validation feedback on form fields, so that I can correct errors as I make them. | M          | High     | S-3.1        |
| **S-3.4**  | As a Shift Leader, I want to review a summary of my entire report before submitting, so that I can perform a final check for accuracy. | M          | Medium   | S-3.1        |
| **S-3.5**  | As a Shift Leader, I want to submit the final report, which locks it from further editing, so that the data is officially recorded. | S          | High     | S-3.4        |

---

## E-4: KPI Dashboard & Visualization

**Description:** This epic involves creating the manager-facing dashboard that displays key performance indicators and trends based on the submitted shift reports.
**Business Value:** Provides immediate, actionable insights into operational health, enabling faster and better-informed decisions.
**Priority:** **MVP**

### User Stories

| Story ID | User Story                                                                                             | Complexity | Priority | Dependencies |
| :------- | :----------------------------------------------------------------------------------------------------- | :--------- | :------- | :----------- |
| **S-4.1**  | As a Manager, I want to see KPI cards for the most critical metrics (e.g., Overtime, Sick Leave, Orders per Hour), so that I get an instant overview of performance. | M          | High     | E-3          |
| **S-4.2**  | As a Manager, I want to see a trend graph for a primary KPI over the last 7 days, so that I can understand recent performance trends. | L          | High     | E-3          |
| **S-4.3**  | As a Manager, I want the dashboard to load quickly (<2 seconds), so that I can access insights efficiently. | M          | Medium   | S-4.1        |

---

## E-5: Historical Reporting & Analysis

**Description:** This epic focuses on building the historical data view, allowing managers to filter and analyze past shift reports.
**Business Value:** Enables deep-dive analysis, root cause identification, and long-term trend monitoring.
**Priority:** Post-MVP

### User Stories

| Story ID | User Story                                                                                             | Complexity | Priority | Dependencies |
| :------- | :----------------------------------------------------------------------------------------------------- | :--------- | :------- | :----------- |
| **S-5.1**  | As a Manager, I want to view a table of all submitted shift reports, so that I can see a complete history of operations. | M          | High (Post-MVP) | E-3          |
| **S-5.2**  | As a Manager, I want to filter the historical reports by date range, shift type, and production line, so that I can narrow down my analysis. | L          | High (Post-MVP) | S-5.1        |
| **S-5.3**  | As a Manager, I want to export the filtered historical data to a CSV file, so that I can perform offline analysis in other tools. | M          | Medium (Post-MVP) | S-5.2        |

---

## E-6: System Quality & NFRs

**Description:** This epic addresses non-functional requirements (NFRs) like accessibility, performance, and logging to ensure a high-quality, robust application.
**Business Value:** A high-quality application builds user trust, reduces support overhead, and is easier to maintain and scale.
**Priority:** **MVP**

### User Stories

| Story ID | User Story                                                                                             | Complexity | Priority | Dependencies |
| :------- | :----------------------------------------------------------------------------------------------------- | :--------- | :------- | :----------- |
| **S-6.1**  | As a user with disabilities, I want the application to be navigable via keyboard and compatible with screen readers (WCAG 2.1 AA), so that I can use the system effectively. | L          | High     | E-3, E-4     |
| **S-6.2**  | As a Developer, I want structured logging for all API requests and errors, so that I can debug issues in production. | M          | High     | E-1          |
| **S-6.3**  | As a user on a mobile device, I want the layout to be responsive and usable on a small screen, so that I can access the app from anywhere. | L          | Medium   | E-3, E-4     |
