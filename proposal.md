## Case Title
Shift and KPI Reporting Solution (Next.js)

## Background
Shift reporting in warehouse and operations environments is often handled via spreadsheets or manual processes, leading to inconsistent data quality, poor traceability, and inefficient historical tracking. A digital solution can ensure reliable data collection, streamline reporting, and provide better insight into key performance indicators (KPIs) such as overtime, absence, and production output.

## Purpose
Develop a web application where shift leaders register operational data (hours, orders, absence, etc.), and department managers can access historical reports, apply filters, view basic analytics, and export data. The solution should be user-friendly, support role-based access control (RBAC), and provide a clear overview of operational KPIs.

## Target Users
- **Shift Leaders**: for registering daily shift reports with data such as absence, staffing, and production
- **Department Managers**: for retrieving, filtering, and analyzing historical data and KPIs
- **Operations/Warehouse Management**: for monitoring performance and identifying deviations

## Core Functionality

### Must Have (MVP)
- Feature 1: Authentication and role-based access (shift leader vs. manager)
- Feature 2: Create, read, and update shift reports via web form
- Feature 3: History view with filters (date, shift, area)
- Feature 4: Dashboard with KPI cards (e.g., overtime, absence, order lines, staffing) and at least one trend graph
- Feature 5: Validation of required fields and numeric input
- Feature 6: CSV export of filtered report data

### Nice to Have (Optional Extensions)
- Feature 7: Report approval and rollback by manager
- Feature 8: Alerts when thresholds are exceeded (e.g., high overtime or absence)
- Feature 9: Attachments such as images or comments for deviations
- Feature 10: AI features, including auto-generated note summaries, basic anomaly detection (z-score), and a chatbot for data insights
- Feature 11: Additional graphs (e.g., by area, by shift, by week)

## Data Requirements
- Data entity 1: **Users** – `id`, `name`, `email`, `role`
- Data entity 2: **ShiftReport** – `id`, `date`, `shift`, `responsible`, `ordersByArea`, `inboundsByArea`, `staffingByArea`, `overtimeHrs`, `fixedHrs`, `sickLeavePct`, `totalEffPerHr`, `note`, `noteSummaryAI`, `createdBy`, `createdAt`
- Data entity 3: **Absence** – `name`, `reasonCode` (F, A, S, SM, SB, P, ...), `hours`, `type` (sick leave / other)
- Data entity 4: **Overtime / TempWorker / LoanedOut** – `name`, `hours`, `category` or `assignedTo`
- Data entity 5: **Area** – `code`, `name`, `isActive`

## User Stories (Optional)
1. As a **shift leader**, I want to register a shift report with validation so that the data is complete and accurate.
2. As a **department manager**, I want to filter historical reports by date, shift, and area so I can quickly find relevant information.
3. As a **manager**, I want to see KPI cards and trend graphs so I can detect developments and deviations.
4. As a **manager**, I want to export filtered reports to CSV so I can analyze and share them.

## Technical Constraints
- Must be built using **Next.js (App Router)** and be responsive (mobile & desktop)
- Requires **authentication and role-based access control (RBAC)**
- Includes **server-side validation** of required fields and values
- Uses **minimal personal data** (only name and role where necessary)
- Database: **PostgreSQL** (via **Supabase**) with optional **Prisma** ORM
- Hosting on **Vercel** (free student plan recommended)

## Success Criteria
- Users can complete the full reporting workflow (create, view, update reports)
- Role-based access works correctly (shift leaders see only their own reports, managers see all)
- Dashboard displays at least **3–4 KPI cards** and one trend graph for a selected period
- CSV export matches active filters
- *(Optional)* At least one AI feature is demonstrated using real or seeded data
