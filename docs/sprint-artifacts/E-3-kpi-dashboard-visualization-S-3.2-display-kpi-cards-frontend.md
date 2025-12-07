---
epic_key: E-3-kpi-dashboard-visualization
story_id: S-3.2
title: Display KPI Cards (Frontend)
status: drafted
---

# Story: Display KPI Cards (Frontend)

## As a frontend developer,

I want to display interactive KPI cards on the dashboard

## So that

managers can quickly view key metrics.

## Description

These cards should dynamically fetch data from the backend.

## Acceptance Criteria

- A new `KpiCard` component is created in `src/components/dashboard/kpi-card.tsx`.
- The `KpiCard` component accepts props for `title`, `value`, `unit`, and `change` (percentage change).
- The dashboard page (`src/app/(main)/dashboard/page.tsx`) displays multiple instances of `KpiCard` for 'Total Overtime', 'Sick Leave %', and 'Orders per Hour'.
- Each `KpiCard` dynamically fetches its data from the `/api/dashboard/kpis` endpoint.
- The `KpiCard` component is styled according to the UX design specification (e.g., Shadcn/ui card component, appropriate typography, conditional coloring for positive/negative change).
- Basic loading states (e.g., skeleton loaders) are displayed while data is being fetched.
- The component includes `aria-label` attributes for accessibility.
- Performance: KPI cards load and display within 1.5 seconds.
- Unit tests for the `KpiCard` component are created using React Testing Library.

## Definition of Done

- All acceptance criteria met.
- `KpiCard` component created and integrated into the dashboard.
- Unit tests for `KpiCard` pass.
- Story status updated to 'review'.

## Project Context

This story is part of the KPI Dashboard & Visualization epic. It focuses on the frontend display of aggregated KPI data. It depends on the backend API endpoint from S-3.1 being available.
