-- Enable RLS on all relevant tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kpis ENABLE ROW LEVEL SECURITY;

-- Helper function to get the role of the current user
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role FROM public.profiles WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Policies for 'profiles' table
DROP POLICY IF EXISTS "Users can view their own profile." ON public.profiles;
CREATE POLICY "Users can view their own profile."
ON public.profiles FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;
CREATE POLICY "Users can update their own profile."
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can manage all profiles." ON public.profiles;
CREATE POLICY "Admins can manage all profiles."
ON public.profiles FOR ALL
USING (public.get_my_role() = 'admin')
WITH CHECK (public.get_my_role() = 'admin');


-- Policies for 'shift_reports' and 'kpis'
-- Assuming shift_reports and kpis have an 'employee_profile_id' column linking to profiles.id
DROP POLICY IF EXISTS "Users can view their own reports." ON public.shift_reports;
CREATE POLICY "Users can view their own reports."
ON public.shift_reports FOR SELECT
USING (auth.uid() = employee_profile_id);

DROP POLICY IF EXISTS "Shift leaders can create reports for themselves." ON public.shift_reports;
CREATE POLICY "Shift leaders can create reports for themselves."
ON public.shift_reports FOR INSERT
WITH CHECK (
  (public.get_my_role() = 'shift_leader') AND (auth.uid() = employee_profile_id)
);

DROP POLICY IF EXISTS "Managers and admins can view all reports." ON public.shift_reports;
CREATE POLICY "Managers and admins can view all reports."
ON public.shift_reports FOR SELECT
USING (public.get_my_role() IN ('shift_manager', 'admin'));

-- Repeat similar policies for 'kpis' table
DROP POLICY IF EXISTS "Users can view their own kpis." ON public.kpis;
CREATE POLICY "Users can view their own kpis."
ON public.kpis FOR SELECT
USING (auth.uid() = employee_profile_id);

DROP POLICY IF EXISTS "Shift leaders can create kpis for themselves." ON public.kpis;
CREATE POLICY "Shift leaders can create kpis for themselves."
ON public.kpis FOR INSERT
WITH CHECK (
  (public.get_my_role() = 'shift_leader') AND (auth.uid() = employee_profile_id)
);

DROP POLICY IF EXISTS "Managers and admins can view all kpis." ON public.kpis;
CREATE POLICY "Managers and admins can view all kpis."
ON public.kpis FOR SELECT
USING (public.get_my_role() IN ('shift_manager', 'admin'));


-- Policies for 'employees' and 'departments'
DROP POLICY IF EXISTS "Managers and admins can view all employees and departments." ON public.employees;
CREATE POLICY "Managers and admins can view all employees and departments."
ON public.employees FOR SELECT
USING (public.get_my_role() IN ('shift_manager', 'admin'));

DROP POLICY IF EXISTS "Managers and admins can view all employees and departments." ON public.departments;
CREATE POLICY "Managers and admins can view all employees and departments."
ON public.departments FOR SELECT
USING (public.get_my_role() IN ('shift_manager', 'admin'));

-- More granular policies would be needed if shift_leaders can see employees in their department
-- This would require joining with a table that maps leaders to departments.
-- For now, keeping it simple as per the context.
