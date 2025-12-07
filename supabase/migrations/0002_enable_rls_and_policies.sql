-- Enable Row Level Security (RLS) on all relevant tables
ALTER TABLE public.profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_reports  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpis           ENABLE ROW LEVEL SECURITY;

-- =========================================================
-- PROFILES
-- =========================================================

-- Clean up old policies if they exist
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

-- Only the owner can SELECT their own profile
CREATE POLICY "profiles_select_own"
ON public.profiles
FOR SELECT
USING (id = auth.uid());

-- Only the owner can INSERT their own profile row
CREATE POLICY "profiles_insert_own"
ON public.profiles
FOR INSERT
WITH CHECK (id = auth.uid());

-- Only the owner can UPDATE their own profile
CREATE POLICY "profiles_update_own"
ON public.profiles
FOR UPDATE
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- =========================================================
-- DEPARTMENTS
-- =========================================================

DROP POLICY IF EXISTS "departments_select_authenticated" ON public.departments;
DROP POLICY IF EXISTS "departments_insert_managers" ON public.departments;
DROP POLICY IF EXISTS "departments_update_managers" ON public.departments;
DROP POLICY IF EXISTS "departments_delete_managers" ON public.departments;

-- Any authenticated user can read departments
CREATE POLICY "departments_select_authenticated"
ON public.departments
FOR SELECT
USING (auth.role() = 'authenticated');

-- Only managers/admin can INSERT departments (INSERT: only WITH CHECK allowed)
CREATE POLICY "departments_insert_managers"
ON public.departments
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
);

-- Only managers/admin can UPDATE departments
CREATE POLICY "departments_update_managers"
ON public.departments
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
);

-- Only managers/admin can DELETE departments
CREATE POLICY "departments_delete_managers"
ON public.departments
FOR DELETE
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
);

-- =========================================================
-- EMPLOYEES
-- =========================================================

DROP POLICY IF EXISTS "employees_select_own" ON public.employees;
DROP POLICY IF EXISTS "employees_insert_managers" ON public.employees;
DROP POLICY IF EXISTS "employees_update_managers" ON public.employees;
DROP POLICY IF EXISTS "employees_delete_managers" ON public.employees;

-- Employees can view their own employee record (through profile link)
CREATE POLICY "employees_select_own"
ON public.employees
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.id = employees.profile_id
  )
);

-- Only managers/admin can INSERT employee rows (INSERT: only WITH CHECK)
CREATE POLICY "employees_insert_managers"
ON public.employees
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
);

-- Only managers/admin can UPDATE employee rows
CREATE POLICY "employees_update_managers"
ON public.employees
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
);

-- Only managers/admin can DELETE employee rows
CREATE POLICY "employees_delete_managers"
ON public.employees
FOR DELETE
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
);

-- =========================================================
-- SHIFT REPORTS
-- =========================================================

DROP POLICY IF EXISTS "shift_reports_manage_own" ON public.shift_reports;

-- Employees can manage (CRUD) only their own shift reports
CREATE POLICY "shift_reports_manage_own"
ON public.shift_reports
FOR ALL
USING (employee_profile_id = auth.uid())
WITH CHECK (employee_profile_id = auth.uid());

-- =========================================================
-- KPIS
-- =========================================================

DROP POLICY IF EXISTS "kpis_select_own" ON public.kpis;
DROP POLICY IF EXISTS "kpis_insert_managers" ON public.kpis;
DROP POLICY IF EXISTS "kpis_update_managers" ON public.kpis;
DROP POLICY IF EXISTS "kpis_delete_managers" ON public.kpis;

-- Employees can read KPIs related to themselves
CREATE POLICY "kpis_select_own"
ON public.kpis
FOR SELECT
USING (
  employee_profile_id = auth.uid()
  OR EXISTS (
    SELECT 1
    FROM public.shift_reports sr
    WHERE sr.id = kpis.shift_report_id
      AND sr.employee_profile_id = auth.uid()
  )
);

-- Only manager/admin can INSERT KPIs (INSERT: only WITH CHECK)
CREATE POLICY "kpis_insert_managers"
ON public.kpis
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
);

-- Only manager/admin can UPDATE KPIs
CREATE POLICY "kpis_update_managers"
ON public.kpis
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
);

-- Only manager/admin can DELETE KPIs
CREATE POLICY "kpis_delete_managers"
ON public.kpis
FOR DELETE
USING (
  EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role IN ('manager', 'admin')
  )
);
