## Case Title
Shift and KPI Reporting Solution (Next.js)

## Background
Shift reporting in warehouse and operations environments is often handled via spreadsheets or manual processes, resulting in inconsistent data quality, limited traceability, and difficulty in tracking performance over time. A digital system is needed to collect structured data and enable better decision-making through access to historical and real-time insights.

## Purpose
Develop a responsive web application where shift leaders can register operational data (e.g., hours, absence, orders), and department managers can filter, analyze, and export historical reports. The solution aims to enhance visibility into key performance indicators (KPIs), minimize reporting errors, and support data-driven decisions through intuitive dashboards and AI-powered tools.
## Target Users
- **Shift Leaders**: Input daily shift data (staffing, production, absences)
- **Department Managers**: Analyze historical reports, apply filters, review KPIs
- **Operations/Warehouse Management**: Monitor trends, detect deviations





## Core Functionality

These core features are designed to replace manual workflows and enable scalable reporting across shifts and departments.


### Must Have (MVP)
These core features address the current inefficiencies in manual reporting, while laying the groundwork for smarter analytics through data centralization and visualization.

- **Feature 1**: Secure login with role-based access (shift leader vs. manager)
  - **Shift Leaders**: Can only view and edit their own reports
  - **Managers**: Can view all reports, filter data, and (if enabled) approve or rollback reports
- **Feature 2**: Create, read, and update shift reports via validated form
- **Feature 3**: History view with filters (date, shift, area)
- **Feature 4**: Dashboard with KPI cards displaying:
  - **Overtime (hours)**
  - **Sick Leave (%)**
  - **Orders per hour**
  - **Staffing per area**


  - One trend graph (e.g., overtime trend over time)

- **Feature 5**: Field validation (e.g., required numeric inputs, date logic)
- **Feature 6**: Export filtered reports to CSV format

### Nice to Have (Optional Extensions)
- **Feature 7**: Approval workflow for managers (accept/reject/edit reports)
- **Feature 8**: Alerts for threshold breaches (e.g., overtime > 10 hours)
- **Feature 9**: Upload attachments (images, deviation notes)
- **Feature 10**: AI integration:
  - Auto-summarize shift notes using GPT-4
  - Anomaly detection using z-score or basic ML
  - Chatbot for querying reports (e.g., "show overtime trend last 4 weeks")
- **Feature 11**: Additional visualizations (e.g., reports per area/shift)

## Scope Limitations
- Mobile app support (native) is not part of the MVP; the web app will be responsive.
- Real-time notifications are not prioritized in this version.
- Detailed role/permission management beyond two roles (leader/manager) is out of scope.


## Data Requirements
- **Users**: `id`, `name`, `email`, `role`
- **ShiftReport**: `id`, `date`, `shift`, `responsible`, `ordersByArea`, `inboundsByArea`, `staffingByArea`, `overtimeHrs`, `fixedHrs`, `sickLeavePct`, `totalEffPerHr`, `note`, `noteSummaryAI`, `createdBy`, `createdAt`
- **Absence**: `id`, `reportId`, `name`, `reasonCode`, `hours`, `type` (sick/other)
- **Overtime / TempWorker / LoanedOut**: `id`, `reportId`, `name`, `hours`, `category`
- **Area**: `code`, `name`, `isActive`

### Data Relationships

Each `ShiftReport`:
- Is linked to **one** responsible `User`
- Has **many** related:
  - `Absence` records
  - `Overtime` / `TempWorker` / `LoanedOut` records
- Structured fields like `ordersByArea` may be stored as JSON or normalized tables, depending on filtering needs


## Field Validation Rules
- `date`: required, must be today or earlier
- `shift`: required, enum: morning/evening/night
- `overtimeHrs`: numeric, 0–24
- `sickLeavePct`: numeric, 0–100
- `ordersByArea`: must include at least one active area with value ≥ 0
- `note`: optional, max 1000 characters
- Conditional: `totalEffPerHr` = (orders + movements) / fixed hours

## CSV Export Details
- Export is triggered from filtered view
- Includes flat fields (shift, KPIs, note, summary)
- Nested fields (e.g., `ordersByArea`) will be flattened (e.g., `ORD_AREA_A`, `ORD_AREA_B`)
- Export schema is fixed (no dynamic column selection)

## Testing Strategy
- **Unit tests**:
  - Validation (required fields, numeric range)
  - Utility logic (e.g., data formatters, date checks)
- **Integration tests**:
  - API routes (create, update, get reports)
- **End-to-end (E2E)**:
  - User login and access based on role
  - Form submission and result rendering
- **Seed Data**:
  - Mock data generator script (5–10 reports across shifts)

## AI Integration Plan

### 🎯 Feature: Note Summarization with GPT-4
- **Purpose**: Help managers quickly understand key events, deviations, or issues from long free-text notes
- **Tool**: OpenAI GPT-4 via API
- **Trigger**: When shift report is submitted, server sends note to GPT API
- **Storage**: Summary is saved to `noteSummaryAI` field
- **Display**: Shown alongside original note in history view

#### 🧠 Prompt Example
```text
Summarize the following shift report note in 1–2 sentences.
Highlight key issues, unusual events, or performance notes.
Be clear and professional.

Note:
"{note_text}"
```
#### 🔄 Fallback Strategy
If the GPT-4 API is unavailable or returns an error, the shift note will still be saved as normal, but the `noteSummaryAI` field will be left blank. A message will notify the user.

### 🧭 Application Flow – Shift and KPI Reporting Solution

This section describes how users interact with the web application from login to report submission, viewing dashboards, and using AI functionality.

---

## 1. 🔐 Login & Access

- User opens the application
- Logs in using email/password (via Supabase Auth)
- Access depends on user role:
  - **Shift Leader**: Can create and edit their own shift reports
  - **Manager**: Can access all reports, dashboards, filters, and exports

---

## 2. 📝 Submit Shift Report (Shift Leader)

- Navigate to **“New Report”**
- Fill out the shift report form:
  - Basic info: date, shift, responsible user
  - Operational data: orders, staffing, absence, overtime
  - Optional free-text note field
- Validation checks:
  - Required fields, numeric ranges, etc.
- On submit:
  - Report is stored in database
  - Note text is sent to **GPT-4 API**
  - AI-generated summary is saved to `noteSummaryAI`

---

## 3. 📚 View Report History (All Users)

- Navigate to **“History”**
- Filter reports by:
  - Date, shift, and area
- View full report:
  - All metrics, notes, and AI summary
- *(Managers can also approve or rollback reports if enabled)*

---

## 4. 📊 Dashboard (Manager Only)

- Navigate to **“Dashboard”**
- View:
  - KPI cards (e.g., overtime, absence rate, efficiency)
  - Trend graph showing key metrics over time
- Filters available:
  - Shift, area, date range

---

## 5. 📤 Export Reports to CSV (Manager)

- Filter reports as needed in **History**
- Click **“Export to CSV”**
- The system:
  - Applies current filters
  - Flattens nested fields like `ordersByArea`
  - Generates downloadable CSV file

---

## 6. 🔔 Optional: AI Alerts & Chatbot

- Alerts shown if data crosses critical thresholds (e.g., sick leave > 15%)
- Chatbot can respond to queries like:
  - “Show overtime trend for Area A last month”
  - “Summarize yesterday’s deviations”

---

## 🧩 Application Flow Diagram (Mermaid.js)

Paste this into any markdown file supported by Mermaid (e.g., GitHub, Obsidian):

```mermaid
flowchart TD
    A[Login] --> B{User Role}
    B -->|Shift Leader| C[Submit Report]
    B -->|Manager| D[View Dashboard & History]

    C --> E[Validate Form]
    E --> F[Store Report in Database]
    F --> G[Send Note to GPT-4 API]
    G --> H[Save AI Summary]

    D --> I[Filter Historical Reports]
    D --> J[View KPI Dashboard]
    D --> K[Export Filtered Data]

    K --> L[Generate CSV File]
    L --> M[Download CSV]

    G --> N{GPT API Available?}
    N -->|Yes| H
    N -->|No| O[Show Error – No Summary Generated]

    style A fill:#eef
    style M fill:#cfc
    style N fill:#ffc




## Timeline and Milestones

| **Week** | **Focus**                             | **Deliverables**                                      |
|----------|----------------------------------------|--------------------------------------------------------|
| Week 1   | Project setup                          | Initialize Next.js project, set up Supabase, configure RBAC, and create initial database schema |
| Week 2   | ShiftReport CRUD                       | Develop and validate shift report form (create/update), integrate with database |
| Week 3   | History view and filtering             | Implement report listing with filters (date, shift, area) |
| Week 4   | Dashboard development                  | Create dashboard with 3–4 KPI cards and at least one trend graph |
| Week 5   | CSV export and testing                 | Implement CSV export and complete unit, integration, and E2E tests |
| Week 6   | Optional features and AI integration   | Add AI-powered note summarization, polish UI, deploy app to Vercel |

## User Stories

1. As a **shift leader**, I want to register a shift report with validation so that the data is complete and accurate.
2. As a **department manager**, I want to filter historical reports by date, shift, and area so I can quickly find relevant information.
3. As a **manager**, I want to see KPI cards and trend graphs so I can detect developments and deviations.
4. As a **manager**, I want to export filtered reports to CSV so I can analyze and share them.

## Technical Constraints

- Built with **Next.js (App Router)**, responsive for desktop and mobile
- Uses **Supabase** for database and authentication
- Includes **server-side validation**
- Only stores **minimal personal data**
- Hosted on **Vercel**
- JSON fields or relational tables depending on complexity of filtering
- Authentication via **Supabase Auth** (email/password for MVP; OAuth optional)
- Auth middleware ensures protected routes are only accessible to correct roles


## Additional Considerations

### Internationalization
- Interface will be in English for simplicity; Norwegian version may be added later

### Data Privacy and GDPR
- Absence and user data will be handled carefully
- Data retention limit: 6 months
- Only non-sensitive data will be stored in shift notes

### Performance
- All filtered queries will be paginated
- KPI views will use indexed columns for speed

### Error Handling
- Inline error messages for form validation
- Toast notifications for success/failure
- Fallback error pages for unexpected issues

## Success Criteria
- ✅ Users can create, view, and update reports
- ✅ Managers can access full history with filters
- ✅ Dashboard shows at least 3–4 KPI cards and one graph
- ✅ CSV export matches active filters
- ✅ At least one working AI feature is implemented (note summary)

## Conclusion
This proposal outlines a modern, scalable solution for shift and KPI reporting. By combining role-based data collection, real-time dashboards, and AI-enhanced insights, the application will reduce errors, improve visibility, and empower managers to make informed operational decisions.
S