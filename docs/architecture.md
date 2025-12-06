### 1. High-Level System Architecture

The architecture is designed around a decoupled frontend and backend, leveraging Supabase for core backend-as-a-service capabilities. This hybrid model provides the flexibility of a custom backend for business logic while using a managed platform for data, auth, and real-time features.

```mermaid
graph TD
    subgraph User Browser
        A[React Frontend App]
    end

    subgraph Custom Backend (Node.js on Docker/Cloud)
        B[API Server - NestJS]
        B -- "Database Access" --> D
        B -- "Authentication" --> E
        B -- "File Storage" --> G
    end

    subgraph Supabase (BaaS)
        D[PostgreSQL Database]
        E[Auth]
        F[Edge Functions]
        G[Storage]
    end

    A -- "REST API Calls (for complex logic)" --> B
    A -- "Direct Supabase Calls (for simple data/auth/real-time)" --> D
    A -- "Sign-in/Sign-up" --> E
    D -- "Triggers" --> F
```

-   **Frontend (React)**: A single-page application built with React, Next.js (for structure and SSR benefits), and `shadcn/ui` for components. It communicates with both the custom backend API and Supabase directly.
-   **Backend (NestJS)**: A Node.js backend using the NestJS framework, chosen for its modularity, dependency injection, and TypeScript support, which aligns well with a structured, maintainable architecture. It handles complex business logic, data aggregation for KPIs, and secured endpoints.
-   **Supabase**: The core BaaS platform providing:
    -   **PostgreSQL Database**: The primary data store.
    -   **Auth**: Manages user authentication, roles, and JWT issuance.
    -   **Storage**: For any file uploads (e.g., incident photos).
    -   **Edge Functions**: For database triggers or asynchronous tasks (e.g., sending notifications).

### 2. Frontend Architecture

The frontend will be a Next.js application, which provides a robust framework for routing, rendering, and API routes if needed.

**Folder Structure:**

```
src/
├── app/
│   ├── (main)/
│   │   ├── dashboard/page.tsx
│   │   ├── reports/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # View a single report
│   │   │   └── new/
│   │   │       └── page.tsx      # 9-step shift report form
│   │   └── historical/page.tsx
│   ├── (auth)/
│   │   └── login/page.tsx
│   └── layout.tsx
├── components/
│   ├── dashboard/
│   │   ├── KpiCard.tsx
│   │   ├── TrendGraph.tsx
│   │   └── DateRangePicker.tsx
│   ├── reports/
│   │   ├── ShiftReportStepper.tsx
│   │   ├── Step1_Safety.tsx
│   │   └── ...                 # Components for each of the 9 steps
│   ├── shared/
│   │   └── DataTable.tsx
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── supabase/
│   │   └── client.ts           # Supabase client instance
│   └── utils.ts                # General utility functions
├── hooks/
│   ├── useAuth.ts              # Hook for user session and roles
│   └── useShiftReport.ts       # Hook for managing shift report form state
└── services/
    ├── api.ts                  # Axios or fetch wrapper for backend API calls
    └── supabase.ts             # Functions for direct Supabase interactions
```

### 3. Backend Architecture (NestJS)

The NestJS backend will be organized into domain-specific modules. This promotes separation of concerns and maintainability.

**Domain Modules:**

-   **Auth Module**: Integrates with Supabase Auth. A custom guard will validate JWTs from Supabase on protected routes.
-   **Reports Module**: Handles the submission, retrieval, and validation of complex shift report data.
-   **Dashboard Module**: Provides aggregated data for KPIs and trends. This is a key module as it will contain potentially heavy queries that are best processed on a dedicated backend rather than directly from the client.
-   **Users Module**: Manages user profiles and roles.
-   **Notifications Module**: Logic for sending out notifications (could be integrated with Supabase Functions).

**Interaction with Supabase:**

-   The backend will use the `supabase-js` library to interact with the Supabase database.
-   A central `SupabaseService` will be created and injected into other modules to provide a consistent client instance.
-   The backend operates with a `service_role` key, allowing it to bypass RLS for administrative tasks and data aggregation, while all client-side access is restricted by RLS.

### 4. Database Schema (Supabase/PostgreSQL)

The schema is designed to be relational and scalable.

```sql
-- User and Role Management (leveraging Supabase Auth)
-- The 'users' table is in the 'auth' schema and managed by Supabase.
-- We add a public 'profiles' table to store app-specific user data.
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'shift_leader' -- 'shift_leader' or 'manager'
);

-- Shift Reports
CREATE TABLE shift_reports (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'completed'
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  shift TEXT, -- 'Day', 'Night'
  production_line TEXT,
  machine TEXT
);

-- Individual steps of a report, linked to the main report
CREATE TABLE report_steps (
  id SERIAL PRIMARY KEY,
  report_id INTEGER NOT NULL REFERENCES shift_reports(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  data JSONB, -- Flexible JSON to store data for each step
  is_valid BOOLEAN DEFAULT FALSE,
  UNIQUE(report_id, step_number)
);

-- Incidents logged during a shift
CREATE TABLE incidents (
  id SERIAL PRIMARY KEY,
  report_id INTEGER NOT NULL REFERENCES shift_reports(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL,
  description TEXT NOT NULL,
  severity TEXT -- 'Low', 'Medium', 'High'
);

-- KPI snapshots (can be generated by a recurring function)
CREATE TABLE kpi_snapshots (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  kpi_name TEXT NOT NULL,
  value NUMERIC,
  UNIQUE(date, kpi_name)
);
```

### 5. API Layer Outline (NestJS)

The API will be RESTful. The frontend can use the Supabase client for simple data fetching (like a list of historical reports), but will use the NestJS API for actions that require complex logic or elevated privileges.

-   **`POST /api/reports`**: Submit a new shift report.
    -   **Body**: `{ report_data: { ... }, steps_data: [ ... ] }`
    -   **Action**: Creates entries in `shift_reports` and `report_steps` within a transaction. Triggers the "Shift Report Submitted" event.
-   **`PUT /api/reports/:id/draft`**: Autosave a draft.
    -   **Body**: `{ step_number: 1, data: { ... } }`
    -   **Action**: Updates or inserts a record in `report_steps`.
-   **`GET /api/dashboard/kpis`**: Get aggregated KPI data.
    -   **Query Params**: `?startDate=...&endDate=...`
    -   **Action**: Runs complex SQL queries against the database to calculate KPIs (e.g., overtime, incidents). This is a backend responsibility to optimize performance.
    -   **Response**: `{ overtime_hours: 120, incident_count: 5, ... }`
-   **`GET /api/dashboard/trend`**: Get data for the trend graph.
    -   **Query Params**: `?kpi=overtime&startDate=...&endDate=...`
    -   **Action**: Queries and aggregates time-series data.
    -   **Response**: `[{ date: '2025-11-01', value: 10 }, ...]`

### 6. Event Flow: "Shift Report Submitted"

1.  **User Action**: Shift Leader clicks "Submit" on the final step of the report in the frontend.
2.  **API Call**: The frontend sends a `POST` request to `/api/reports` with the complete report data.
3.  **Backend Logic (NestJS)**:
    -   The `ReportsController` receives the request.
    -   The `ReportsService` validates the data.
    -   It uses a database transaction to:
        -   Update the `shift_reports` status from `draft` to `completed`.
        -   Set the `completed_at` timestamp.
    -   The transaction is committed.
4.  **Database Trigger (Optional but Recommended)**:
    -   A PostgreSQL trigger on the `shift_reports` table detects the status change to `completed`.
    -   The trigger calls a Supabase Edge Function named `on-report-submitted`.
5.  **Edge Function Logic**:
    -   The function can perform post-submission tasks asynchronously:
        -   Generate KPI data and save it to `kpi_snapshots`.
        -   Send a notification to managers (e.g., via email or a real-time channel).
6.  **API Response**: The backend API immediately returns a `201 Created` response to the frontend, ensuring the UI is not blocked.

### 7. Security Model

Security is enforced at multiple layers, with Supabase RLS as the foundation.

-   **Roles**:
    -   `shift_leader`: Can create/update their own reports. Can view their own historical data.
    -   `manager`: Can view all reports and dashboards. Cannot create reports.
-   **Authentication**: Handled by Supabase Auth. The frontend client gets a JWT, which is sent with every API/database request.
-   **Backend Authorization**: The NestJS API uses a guard to validate the JWT and check the user's role (from the JWT claims) before allowing access to protected endpoints.
-   **Supabase Row-Level Security (RLS)**: This is the critical layer for direct database access from the client.

**RLS Policy Examples:**

```sql
-- Shift leaders can only see and edit their own draft reports.
CREATE POLICY "Allow leaders to manage their own reports"
ON shift_reports FOR ALL
USING (auth.uid() = user_id);

-- Managers can view all completed reports.
CREATE POLICY "Allow managers to view all completed reports"
ON shift_reports FOR SELECT
TO manager -- assuming 'manager' is a postgres role mapped from JWT
USING (status = 'completed');

-- Allow users to see their own profile.
CREATE POLICY "Allow users to view their own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);
```

### 8. Scaling Strategy

-   **Stateless Backend**: The NestJS application will be stateless, allowing it to be scaled horizontally by running multiple instances in a container orchestrator (like Docker Swarm or Kubernetes).
-   **Supabase Scaling**: Supabase is built to scale. We can upgrade the database instance as needed. Proper indexing on tables (`shift_reports`, `kpi_snapshots`) is crucial for query performance.
-   **Database Read Replicas**: For read-heavy workloads like the manager dashboard, we can introduce read replicas to offload queries from the primary database.
-   **Asynchronous Processing**: Using Supabase Edge Functions for background tasks (notifications, KPI calculations) prevents blocking user-facing API calls and improves responsiveness.
-   **Deployment**:
    -   **Frontend**: Deploy as a static/SSR site on Vercel or Netlify for optimal performance and CDN caching.
    -   **Backend**: Package the NestJS app into a Docker container and deploy it to a cloud provider like AWS Fargate, Google Cloud Run, or DigitalOcean App Platform. This provides easy scaling and management.

### 9. Implementation Roadmap

This roadmap prioritizes delivering core value quickly (MVP) and then iterating.

**Phase 1: MVP (Core Reporting & Viewing)**

1.  **Setup**: Initialize Next.js project and Supabase.
2.  **Auth**: Implement login for Shift Leaders using Supabase Auth.
3.  **Shift Report**: Build the 9-step form (`ShiftReportStepper`). Implement client-side state management and autosaving drafts to Supabase directly.
4.  **Submission**: Create the `POST /api/reports` backend endpoint for final submission.
5.  **Historical View**: A simple list view for managers to see completed reports with basic filtering.
6.  **Security**: Implement basic RLS policies for `shift_reports`.

**Phase 2: Manager Dashboard & KPIs**

1.  **KPI Backend**: Build the `/api/dashboard/kpis` endpoint with performant aggregation queries.
2.  **Dashboard UI**: Create the manager dashboard page, integrating the `KpiCard` and `DateRangePicker` components.
3.  **Trend Graph**: Build the `/api/dashboard/trend` endpoint and integrate the `TrendGraph` component.
4.  **Roles**: Formalize `manager` vs. `shift_leader` roles in Supabase and refine RLS policies.

**Phase 3: Full Feature Set & Polish**

1.  **Advanced Historical View**: Enhance the historical data page with advanced filters (`HistoricalDataFilter`).
2.  **Notifications**: Implement the "Shift Report Submitted" event flow using Edge Functions to notify managers.
3.  **Accessibility & Mobile**: Conduct thorough testing and refinement to meet WCAG 2.1 AA standards and ensure a polished mobile experience.
4.  **Deployment & Scaling**: Set up the full Docker-based deployment pipeline and configure scaling rules.