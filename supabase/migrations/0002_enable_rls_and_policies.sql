-- This migration enables Row-Level Security (RLS) and defines policies
-- for all user-facing tables as per Story S-1.3 specification, with fixes applied.

-- Enable RLS for all user-facing tables
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpis ENABLE ROW LEVEL SECURITY;

-- Helper function to get the current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE id = auth.uid());
END;
$$;

-- Helper function to get the current user's department ID
CREATE OR REPLACE FUNCTION get_user_department_id()
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN (SELECT department_id FROM public.profiles WHERE id = auth.uid());
END;
$$;

-- Policies for public.departments
-- All authenticated users can view departments
CREATE POLICY "Departments: Select authenticated users"
ON public.departments FOR SELECT
USING (auth.role() = 'authenticated');

-- Only admins can insert, update, or delete departments
CREATE POLICY "Departments: Manage by admin"
ON public.departments FOR ALL
USING (get_user_role() = 'admin') WITH CHECK (get_user_role() = 'admin');

-- Policies for public.profiles
-- Users can only see their own profile
CREATE POLICY "Profiles: Select own"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Profiles: Insert own"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Users can update their own profile (removed redundant WITH CHECK)
CREATE POLICY "Profiles: Update own"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Managers and Admins can view profiles in their department (simplified)
CREATE POLICY "Profiles: Select by manager/admin in department"
ON public.profiles FOR SELECT
USING (
    get_user_role() = 'admin' OR
    (
        get_user_role() = 'manager' AND
        department_id = get_user_department_id()
    )
);

-- Policies for public.employees
-- Employees can view their own record (simplified)
CREATE POLICY "Employees: Select own"
ON public.employees FOR SELECT
USING (profile_id = auth.uid());

-- Employees can insert their own employee record (if linked to their profile)
CREATE POLICY "Employees: Insert own"
ON public.employees FOR INSERT
WITH CHECK (profile_id = auth.uid());

-- Employees can update their own employee record
CREATE POLICY "Employees: Update own"
ON public.employees FOR UPDATE
USING (profile_id = auth.uid());

-- Managers and Admins can view employees in their department
CREATE POLICY "Employees: Select by manager/admin in department"
ON public.employees FOR SELECT
USING (
    get_user_role() = 'admin' OR
    (
        get_user_role() = 'manager' AND
        (SELECT department_id FROM public.profiles WHERE id = employees.profile_id) = get_user_department_id()
    )
);

-- Policies for public.shift_reports
-- Employees can view their own shift reports
CREATE POLICY "Shift Reports: Select own"
ON public.shift_reports FOR SELECT
USING (auth.uid() = employee_profile_id);

-- Employees can manage their own shift reports
CREATE POLICY "Shift Reports: Manage own"
ON public.shift_reports FOR ALL
USING (auth.uid() = employee_profile_id) WITH CHECK (auth.uid() = employee_profile_id);

-- Managers and Admins can view shift reports in their department
CREATE POLICY "Shift Reports: Select by manager/admin in department"
ON public.shift_reports FOR SELECT
USING (
    get_user_role() = 'admin' OR
    (
        get_user_role() = 'manager' AND
        (SELECT department_id FROM public.profiles WHERE id = employee_profile_id) = get_user_department_id()
    )
);


-- Policies for public.kpis
-- Employees can view KPIs associated with their reports or profile
CREATE POLICY "KPIs: Select own"
ON public.kpis FOR SELECT
USING (
    employee_profile_id = auth.uid() OR
    EXISTS (
        SELECT 1
        FROM public.shift_reports sr
        WHERE sr.id = shift_report_id AND sr.employee_profile_id = auth.uid()
    )
);

-- Only managers/admins can insert/update KPIs (refined to only INSERT/UPDATE)
CREATE POLICY "KPIs: Insert/Update by manager/admin"
ON public.kpis FOR INSERT, UPDATE
USING (get_user_role() IN ('manager', 'admin')) WITH CHECK (get_user_role() IN ('manager', 'admin'));

-- Managers and Admins can view KPIs in their department
CREATE POLICY "KPIs: Select by manager/admin in department"
ON public.kpis FOR SELECT
USING (
    get_user_role() = 'admin' OR
    (
        get_user_role() = 'manager' AND
        (
            (SELECT department_id FROM public.profiles WHERE id = employee_profile_id) = get_user_department_id()
            OR EXISTS (
                SELECT 1 FROM public.shift_reports sr
                JOIN public.profiles p ON sr.employee_profile_id = p.id
                WHERE sr.id = kpis.shift_report_id AND p.department_id = get_user_department_id()
            )
        )
    )
);
