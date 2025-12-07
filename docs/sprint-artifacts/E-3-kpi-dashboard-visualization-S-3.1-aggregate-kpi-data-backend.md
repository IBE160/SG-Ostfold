---
epic_key: E-3-kpi-dashboard-visualization
story_id: S-3.1
title: Aggregate KPI Data (Backend)
status: drafted
---

# Story: Aggregate KPI Data (Backend)

## As a backend developer,

I want to implement the data aggregation logic for key performance indicators (KPIs)

## So that

the dashboard can display accurate and up-to-date metrics.

## Description

This will involve querying raw data and performing calculations (e.g., total overtime hours, sick leave percentage, orders per hour).

## Acceptance Criteria

- A new API endpoint '/api/dashboard/kpis' is created that accepts optional 'startDate' and 'endDate' query parameters.
- The API endpoint aggregates data for 'total overtime hours', 'sick leave percentage', and 'orders per hour' based on the provided date range.
- If no date range is provided, the API defaults to 'Last 7 days' aggregation.
- The aggregation logic is unit-tested.
- The API endpoint returns data in a consistent JSON format.
- Performance: API response time is under 200ms for typical date ranges.
- Documentation for the API endpoint is updated in the backend service.

## Definition of Done

- All acceptance criteria met.
- Unit tests for aggregation logic pass.
- API endpoint is functional and integrated with Supabase.
- API documentation updated.
- Story status updated to 'review'.

## Project Context

This story is part of the KPI Dashboard & Visualization epic. It focuses solely on the backend aggregation logic. The frontend will consume this API in subsequent stories.
