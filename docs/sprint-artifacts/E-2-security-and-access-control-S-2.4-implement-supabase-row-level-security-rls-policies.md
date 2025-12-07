---
epic_key: E-2-security-and-access-control
story_id: S-2.4
title: Implement Supabase Row Level Security (RLS) policies
status: in-review
---

# Story: Implement Supabase Row Level Security (RLS) policies

## As a system architect,

I want secure and correct Row Level Security (RLS) policies for all database tables

## So that

only authorized roles (shift_leader, shift_manager, admin) can read or modify permitted data.

## Description

This story includes enabling RLS, defining role-based policies, verifying foreign-key-based ownership rules, and ensuring compatibility with the application's auth logic.

## Acceptance Criteria

- RLS is enabled on all relevant tables: profiles, departments, employees, shift_reports, kpis.
- Policies created for: SELECT, INSERT, UPDATE (and DELETE where applicable).
- Profiles can only read/update their own data.
- Shift leaders can create shift reports and KPIs only for themselves.
- Shift managers/admins can read all records.
- All policies include correct `auth.uid()` or FKs to enforce ownership.
- Database schema compiles with no errors.
- Local Supabase tests verify that blocked operations are correctly denied.
- Documentation added under `/docs/security/rls.md`.

## Definition of Done

- All acceptance criteria met.
- Migration files generated, tested locally, and pushed without errors.
- RLS policies validated using Supabase SQL editor or automated tests.
- Code updated to match new policies where required (e.g., queries using user_id).
- Story status updated to 'review'.

## Project Context

This story is part of the Security & Access Control epic. Previous migrations have created tables and relationships, but RLS policies must now be formally defined and validated. Ensure compatibility with Supabase Auth and the system’s role logic.
