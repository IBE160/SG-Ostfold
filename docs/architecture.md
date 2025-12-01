# Architecture

## Executive Summary

A responsive web application designed to replace manual, error-prone shift reporting with structured data collection, analysis, and KPI dashboards for warehouse and operations management. This project focuses on transforming unreliable manual data into actionable insights, ensuring high data quality and empowering confident, data-driven decisions.

Key aspects include:
- **Core Functionality:** A responsive web application for structured shift reporting, data collection, analysis, and KPI dashboards.
- **Critical Non-Functional Requirements:** High performance (fast loads, quick data ops), robust security (auth, RBAC, encryption), scalability (5 years data, 200 concurrent users), and WCAG 2.1 AA accessibility.
- **UX Complexity & Requirements:** A clean, minimal dark-mode UI with responsive design, standard components, clear navigation, and integrated charting.
- **Unique Challenges:** Overcoming issues with manual data, ensuring user adoption, preventing metric manipulation, and planned future AI integration.

## Project Initialization

The project will be initialized using the Next.js starter template to establish a robust and modern foundation.

First implementation story should execute the following command (replace `my-app` with the actual project name):

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

This command establishes the base architecture with the following decisions pre-configured:
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linting:** ESLint
- **Routing:** Next.js App Router
- **Project Structure:** `src/` directory for application code, absolute imports (`@/*`)

## Decision Summary

| Category | Decision | Version (Verified: 2025-12-01) | Affects Epics | Rationale |
|---|---|---|---|---|
| Data Persistence | Supabase | 2.5.0 | All Epics | Provides a managed PostgreSQL database, along with authentication and storage, simplifying the tech stack and accelerating development. |
| Authentication | Supabase Auth | 2.5.0 | User & Access Management Epic (Epic 1) | Seamless integration with the chosen Supabase database, providing a complete authentication solution with email/password, social logins, JWTs, and RBAC management. |
| API Pattern | Next.js Route Handlers + Direct Supabase Client | Next.js (15.1.0), Supabase Client (2.5.0) | All Epics (especially data interactions, forms, dashboards) | Leverages Next.js's built-in server-side capabilities for custom logic and Supabase's auto-generated APIs and client for efficient data interactions, minimizing boilerplate and ensuring tight integration. |
| Deployment Target | Vercel | latest | All Epics | Seamless integration with Next.js, automatic deployments from Git, built-in serverless functions, global CDN, and optimized performance, simplifying deployment and operations. |
| Data Analytics / Visualization | Client-side Charting Library (e.g., Recharts or Tremor) + Server-side data aggregation (Next.js Route Handlers + Supabase SQL) | Tremor (3.18.7), Recharts (3.0.1) | Performance Monitoring & Dashboards (Epic 3) | Enables rich, interactive visualizations directly within the application, leveraging Next.js server capabilities for efficient data fetching and aggregation from Supabase. |
| File Storage | Supabase Storage | 2.5.0 | Shift Report Management Epic (Epic 1 - Growth feature) | Seamless integration with the chosen Supabase backend, providing secure and scalable object storage managed alongside the database and authentication, simplifying development and operations. |
| Background Jobs / Alerts | Supabase Database Triggers and Edge Functions | 2.5.0 | Performance Monitoring & Dashboards (Epic 3 - Growth feature) | Leverages the existing Supabase backend to efficiently handle event-driven alerts directly from database changes, using PostgreSQL functions and serverless Edge Functions for logic execution. |
| AI Application Integration | OpenAI API (e.g., GPT-4) | 2025-11-01 | AI-Powered Insights Epic (Epic 5 - Growth/Vision feature) | Leverages state-of-the-art Large Language Models (LLMs) from a leading provider for tasks like summarization and chatbot functionality, offering high performance and ease of integration via APIs. |

## Project Structure

```
my-app/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # Authentication routes (login, signup)
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (app)/           # Protected application routes
│   │   │   ├── dashboard/   # Dashboard page
│   │   │   ├── reports/     # Shift report pages
│   │   │   │   ├── [id]/    # View/edit specific report
│   │   │   │   └── new/     # Create new report
│   │   │   └── layout.tsx   # Layout for protected app
│   │   ├── api/             # Next.js Route Handlers
│   │   │   └── ...
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Root page (e.g., landing or redirect)
│   ├── components/          # Reusable React components
│   │   ├── ui/              # Generic UI components (e.g., from Shadcn/UI)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── reports/         # Report-specific components
│   │   └── shared/          # Components shared across features
│   ├── lib/                 # Libraries and helper functions
│   │   ├── supabase.ts      # Supabase client setup
│   │   ├── utils.ts         # General utility functions
│   │   └── date.ts          # Date/time formatting with date-fns
│   ├── services/            # Backend services (e.g., interacting with OpenAI)
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Global styles (if needed beyond globals.css)
│   └── types/               # TypeScript type definitions
├── tests/
│   ├── e2e/                 # Playwright E2E tests
│   └── integration/         # Jest integration tests
├── public/                  # Static assets (images, fonts)
├── .env.local               # Environment variables
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore file
├── jest.config.js           # Jest configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Project dependencies
├── postcss.config.mjs       # PostCSS configuration (for Tailwind)
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Epic to Architecture Mapping

| Epic | Architectural Boundary | Key Components |
|---|---|---|
| Epic 1: Foundation & Core Reporting | `src/app/(auth)`, `src/app/(app)/reports/` | Supabase Auth, Next.js UI components for forms/lists, `src/lib/supabase.ts` |
| Epic 2: Management Insights & Data Export | `src/app/(app)/reports/`, `src/app/api/` | Filtering logic in UI and Supabase queries, API route for CSV export |
| Epic 3: KPI Dashboard & Visualization | `src/app/(app)/dashboard/` | Components from `src/components/dashboard/`, charting library (Recharts/Tremor) |
| Epic 4: Advanced Reporting & Workflow | `src/app/api/`, Supabase (Triggers/Edge Functions) | API routes for approvals, Supabase for alert logic and RLS |
| Epic 5: AI-Powered Intelligence | `src/services/`, `src/app/api/` | OpenAI client in `src/services/`, API routes to expose AI features to frontend |


## Technology Stack Details

### Core Technologies

| Category | Technology | Rationale |
|---|---|---|
| Frontend Framework | Next.js (with React) | Industry standard for full-stack React applications, providing SSR, SSG, and API routes. |
| Language | TypeScript | Ensures type safety, improving code quality and maintainability. |
| Styling | Tailwind CSS | Utility-first CSS framework for rapid and consistent UI development. |
| Database | Supabase (PostgreSQL) | Provides a robust, scalable relational database with a generous free tier. |
| Authentication | Supabase Auth | Seamlessly integrates with the database for secure user management and RLS. |
| UI Components | Shadcn/UI (recommended) | A collection of accessible and composable components built on Tailwind CSS. |
| Date Handling | `date-fns` | A modular and lightweight library for consistent date manipulation. |

### Integration Points

-   **AI Services:** The application will integrate with the **OpenAI API** via REST calls from the backend (Next.js Route Handlers) to provide AI-powered features like shift note summarization.
-   **Future Enterprise Systems (WMS/ERP):** The API-first design, using Next.js Route Handlers, will expose well-documented endpoints to facilitate future integration with external systems.
-   **Git & Deployment:** The project will be integrated with **Vercel** for continuous deployment from a Git repository (e.g., GitHub, GitLab).

## Novel Pattern Designs

All patterns in this project have established solutions. Proceeding with standard architectural patterns.

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents and developers, preventing conflicts and ensuring a coherent codebase.

### Naming Conventions

| Type | Convention | Example |
|---|---|---|
| REST Endpoints | `kebab-case`, plural | `/api/shift-reports` |
| Database Tables | `snake_case`, plural | `shift_reports` |
| Database Columns | `snake_case` | `user_id`, `created_at` |
| Component Files | `PascalCase.tsx` | `UserCard.tsx` |
| Other Source Files | `kebab-case.ts` | `date-utils.ts` |
| Component Names (in code) | `PascalCase` | `function UserCard() { ... }` |

### Code Organization

| Item | Convention | Example |
|---|---|---|
| Component Structure | By feature | All components for reports are in `src/components/reports/` |
| Test Files | Co-located with source | `UserCard.test.tsx` is next to `UserCard.tsx` |

### Data Formatting

| Item | Convention | Example |
|---|---|---|
| Date Format (in JSON/API) | ISO 8601 String (UTC) | `2025-11-30T10:00:00.000Z` |
| Date Format (in UI) | Locale-specific via `date-fns` | `MM/dd/yyyy` for en-US |
| API Response Format | Standardized `data` / `error` wrappers | `{ "data": { ... } }` or `{ "error": { ... } }` |

### Communication Patterns

| Pattern | Convention | Example |
|---|---|---|
| Inter-service (Post-MVP) | Asynchronous Events via Supabase Postgres Changes | A background service listens for new rows in a `jobs` table using `supabase.channel('public:jobs').on(...)` to trigger asynchronous tasks like sending emails. |
| Client-Server | Standardized API calls via Next.js Route Handlers | The frontend uses `fetch` to call API routes like `/api/reports`, which then interact with the Supabase client. |

### Lifecycle Patterns

| Pattern | Convention | Example |
|---|---|---|
| Loading State | Skeleton UI Components | When fetching data for the dashboard, display skeleton versions of the KPI cards and charts to prevent layout shift and indicate progress. |
| Error State | Toast Notifications & Error Boundaries | For non-critical errors (e.g., a single KPI fails to load), display a toast notification. For critical errors that break a page, use a React Error Boundary to show a user-friendly error message. |
| Empty State | Informative Placeholders | If the historical reports view has no data, display a message like "No reports found for the selected period" with a call-to-action to adjust filters or create a new report. |

## Consistency Rules

### Error Handling

**Strategy:** Centralized Error Handling

**Details:**
-   **Frontend (Next.js):** React Error Boundaries for UI rendering errors, toast notifications/alerts for transient errors, and dedicated custom error pages (e.g., 404, 500) for critical application errors.
-   **Backend (Next.js Route Handlers / Supabase Edge Functions):** Structured JSON error responses (`code`, `message`, `details`), centralized logging of unhandled exceptions, and graceful degradation for external service failures.

### Logging Strategy

**Strategy:** Structured Logging with Vercel's built-in logs and a library for backend.

**Details:**
-   **Vercel Built-in:** Utilizes Vercel's automatic log collection for Next.js server-side code (API Routes, Server Components) and Edge Functions.
-   **Backend Enhancement:** Integration of a structured logging library (e.g., Pino) for Next.js Route Handlers and Supabase Edge Functions to produce JSON-formatted logs for easier analysis and external log management platforms.
-   **Frontend:** Client-side errors and critical user interactions will be logged to the browser console during development, with selective reporting to a server-side endpoint or error tracking service (e.g., Sentry) in production.

### Date/Time Handling



**Strategy:** Standardized Date/Time Handling using `date-fns`



**Details:**

-   **Database (Supabase/PostgreSQL):** All date and time values will be stored in **UTC** using PostgreSQL's `timestamp with time zone` type.

-   **Backend (Next.js Route Handlers / Supabase Edge Functions):** The `date-fns` library will be used for parsing incoming dates, converting to UTC before storage, and formatting dates for API responses.

-   **Frontend (Next.js):** The `date-fns` library will be used to convert UTC dates received from the backend to the user's local timezone for display, and for consistent formatting based on user locale. User input for dates will be converted to UTC before sending to the backend.



## Testing Strategy



**Strategy:** Layered Testing Strategy



**Details:**

-   **Unit Tests:** Test individual functions and components in isolation using **Jest** and **React Testing Library**.

-   **Integration Tests:** Test interactions between different parts of the application (e.g., components and data fetching) using **Jest**.

-   **End-to-End (E2E) Tests:** Simulate full user journeys using **Playwright** to test critical workflows.

-   **CI/CD Integration:** All tests will be run automatically as part of the continuous integration pipeline on Vercel.



## Architectural Coherence

A validation check was performed to ensure all architectural decisions are compatible and collectively address the project's requirements.

-   **Decision Compatibility:** All chosen technologies (Next.js, Supabase, Vercel, `date-fns`, `Jest`, `Playwright`) form a cohesive and well-supported stack for modern web applications.
-   **Epic Coverage:** The architecture provides the necessary components and patterns to implement all functional and non-functional requirements outlined in the project epics.
-   **Pattern Completeness:** The defined implementation and consistency patterns are sufficient to prevent common conflicts and ensure a maintainable codebase.

No issues or conflicts were found. The architecture is sound and ready for implementation.

## Data Architecture

A high-level data model will be implemented in the Supabase (PostgreSQL) database.

-   **`users` table:** Stores user information, linked to Supabase Auth users.
-   **`roles` table:** Defines user roles (e.g., `shift_leader`, `manager`).
-   **`reports` table:** The core table for shift reports, with foreign keys to the `users` table.
-   **Relationships:** A one-to-many relationship between `users` and `reports`.

Row Level Security (RLS) policies will be heavily used to enforce data access rules (e.g., a `shift_leader` can only read/write their own reports).

## Security Architecture

-   **Authentication:** Handled by **Supabase Auth**, with JWTs used to manage user sessions.
-   **Authorization:** Role-Based Access Control (RBAC) will be implemented using Supabase's built-in roles and **Row Level Security (RLS)** policies in PostgreSQL to ensure users can only access the data they are permitted to see.
-   **Data Encryption:** All data will be encrypted in transit (HTTPS/SSL enforced by Vercel and Supabase) and at rest (managed by Supabase).
-   **API Security:** API endpoints (Next.js Route Handlers) will be protected, validating the user's JWT before executing any logic.
-   **Environment Variables:** All sensitive keys (Supabase keys, OpenAI API key) will be managed using Vercel's environment variable system.

## Performance Considerations

-   **Hosting:** The application will be deployed on **Vercel's Global CDN**, ensuring low latency for users worldwide.
-   **Rendering:** **Next.js's rendering strategies** (Server-Side Rendering, Static Site Generation, Incremental Static Regeneration) will be used where appropriate to optimize load times. Server Components will be preferred for data fetching.
-   **Code Optimization:** Next.js's automatic code splitting, and the modular nature of `date-fns`, will keep client-side JavaScript bundles small.
-   **Database Queries:** Database queries will be optimized with appropriate indexing in Supabase/PostgreSQL.
-   **Image Optimization:** Next.js's built-in `<Image>` component will be used to automatically optimize and lazy-load images.

## Deployment Architecture

-   **Continuous Deployment:** The application will be deployed to **Vercel** via a direct integration with a Git repository (e.g., GitHub). Pushes to the `main` branch will trigger automatic production deployments.
-   **Preview Deployments:** Every pull request will automatically generate a unique preview deployment URL for easy review and testing before merging.
-   **Serverless Functions:** Backend logic in Next.js Route Handlers and Supabase Edge Functions will run as serverless functions, scaling automatically with demand.
-   **Environment Management:** Different environments (production, preview) will be managed through Vercel's environment variables.

## Development Environment

### Prerequisites

-   Node.js (latest LTS version)
-   A JavaScript package manager (e.g., npm, yarn, or pnpm)
-   Access to a Supabase project
-   An OpenAI API key (for AI features)
-   A Vercel account

### Setup Commands

1.  **Initialize the project (if not already done):**
    ```bash
    npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
    ```
2.  **Install dependencies:**
    ```bash
    cd my-app
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env.local` file and add the necessary keys for Supabase and OpenAI.
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Architecture Decision Records (ADRs)

This document serves as a collection of ADRs. The key decisions made are summarized in the [Decision Summary](#decision-summary) table and include:
-   **Data Persistence:** Supabase (PostgreSQL)
-   **Authentication:** Supabase Auth
-   **API Pattern:** Next.js Route Handlers + Direct Supabase Client
-   **Deployment Target:** Vercel
-   **Supporting Libraries & Strategies:** `date-fns` for date handling, a layered testing strategy with `Jest` and `Playwright`, and standardized patterns for implementation and consistency.

## Validation Summary

The architecture document has been validated against the project's validation checklist. All sections are complete, decisions are compatible, and the architecture is ready to guide implementation.

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2025-12-01_
_For: BIP_