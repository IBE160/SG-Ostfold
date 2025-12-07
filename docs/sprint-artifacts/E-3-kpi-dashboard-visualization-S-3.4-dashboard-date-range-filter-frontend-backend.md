---
epic_key: E-3-kpi-dashboard-visualization
story_id: S-3.4
title: Dashboard Date Range Filter
status: drafted
---

# Story: Dashboard Date Range Filter

## As a manager,

I want to filter all dashboard KPIs and graphs by a selectable date range

## So that

I can focus performance insights on a specific period and improve decision-making on staffing, workload, and trends.

## Description

This will involve implementing a UI component and modifying backend API calls to accept date range parameters.

## Acceptance Criteria

- **Presets:** The filter must offer the following predefined date range presets: Today, Yesterday, Last 7 days, Last 30 days.
- **Custom Range:** Users must be able to select a custom date range using a date picker.
- **Validation:** For custom ranges, the `startDate` must be less than or equal to the `endDate`. An appropriate error message should be displayed for invalid selections.
- **Integration:** The selected date range must apply consistently to all KPI cards and the Overtime Trend Graph on the dashboard.
- **Default State:** When no date range is explicitly selected, the dashboard should default to displaying data for "Last 7 days".
- **Persistence:** The selected date range (both preset and custom) must be persisted via URL query parameters (`startDate`, `endDate`) to maintain state across page reloads and shares.
- **Accessibility (A11y):** The main filter button must have `aria-label="Select date range"` and be keyboard-friendly.
- **Queries:** All UI queries in tests must rely on ARIA roles (e.g., `getByRole`, `findByRole`) rather than fragile CSS selectors.
- **Test Performance:** Dashboard tests must not time out due to improperly mocked data or incorrect querying patterns.
- **Date Consistency:** Date formatting and handling must be consistent across the UI, automated tests, and API filter calls to prevent discrepancies.
- **Mocking:** `fetch`, `useRouter`, and date utilities must be mocked correctly in tests to ensure stability and isolation.

## Definition of Done

- All acceptance criteria met.
- Date range filter component implemented and integrated into the dashboard.
- All dashboard components (KPI cards, trend graph) correctly respond to date range changes.
- Backend API endpoints are updated to accept and process date range parameters.
- Comprehensive unit and integration tests for the filter component and its integration pass.
- Story status updated to 'review'.

## Project Context

This story is part of the KPI Dashboard & Visualization epic. It focuses on providing dynamic data filtering for the dashboard. It depends on the KPI cards (S-3.2) and the Overtime Trend Graph (S-3.3) being implemented, and on backend API endpoints accepting date range parameters (S-3.1 and S-3.3's API).
