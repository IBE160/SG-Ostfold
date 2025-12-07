---
epic_key: E-3-dashboard-and-reporting
story_id: S-3.1
title: Create & Submit Shift Report (SR1–SR9)
status: ready-for-dev
---

# Story: Create & Submit Shift Report (SR1–SR9)

## As a shift leader,

I want to fill out and submit a daily shift report (SR1–SR9)

## So that

production, incidents, safety data, and other shift-specific details are properly recorded and made available for managers and KPI analytics.

## Description

This story covers the creation and submission of a daily shift report, encompassing fields SR1 through SR9.

## Acceptance Criteria

- A new page exists at `/shift-report/create`.
- The page displays all required SR1–SR9 input fields with validation.
- A shift report can be submitted successfully and stored in Supabase.
- The report is always linked to the authenticated user's `profile_id`.
- Shift leaders can only submit reports for themselves.
- Validation errors are shown inline using `shadcn/ui` form components.
- After submission, a success confirmation is shown.
- Failed submissions show meaningful error messages.
- Submission is implemented via server action or secure API route.
- RLS must not block correct submissions.
- Documentation added at `docs/features/shift-reporting.md`.

## Definition of Done

- All acceptance criteria fulfilled.
- UI built with `shadcn/ui`, `react-hook-form`, `zod`.
- Server action implemented with secure Supabase insert.
- Local RLS tests confirm correct permissions.
- Documentation updated.
- Story context completed.
- Code passes dev code-review.

## Project Context

This is the first story of Sprint 2. It introduces the core shift-reporting flow, which managers and KPI analytics depend on.
