-- This migration sets up the initial schema for the application, including:
-- departments, profiles, employees, shift_reports, and kpis tables.

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create departments table
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger for departments table
CREATE TRIGGER set_timestamp_departments
BEFORE UPDATE ON public.departments
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Create profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    full_name TEXT,
    avatar_url TEXT,
    -- Default role 'employee' as per spec, with CHECK constraint for allowed roles
    role TEXT DEFAULT 'employee' CHECK (role IN ('manager', 'employee', 'admin')),
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    -- Add email column to profiles for convenience and consistency with signUpUser
    email TEXT UNIQUE
);

-- Trigger for profiles table
CREATE TRIGGER set_timestamp_profiles
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


-- Create employees table (distinct from profiles as per spec, if needed)
-- This table is considered if `profiles` doesn't hold all necessary employee-specific data.
-- It links to `profiles` for user authentication context.
CREATE TABLE IF NOT EXISTS public.employees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE, -- One-to-one with profiles
    employee_id_number TEXT UNIQUE NOT NULL, -- Unique identifier for an employee
    hire_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger for employees table
CREATE TRIGGER set_timestamp_employees
BEFORE UPDATE ON public.employees
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Create shift_reports table
CREATE TABLE IF NOT EXISTS public.shift_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    -- Link to employee's profile
    employee_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, 
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (end_time > start_time)
);

-- Trigger for shift_reports table
CREATE TRIGGER set_timestamp_shift_reports
BEFORE UPDATE ON public.shift_reports
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Create kpis table
CREATE TABLE IF NOT EXISTS public.kpis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    metric_name TEXT NOT NULL,
    value NUMERIC NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    shift_report_id UUID REFERENCES public.shift_reports(id) ON DELETE SET NULL,
    -- Direct link to profile for KPIs not tied to a specific report, or for easy filtering
    employee_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger for kpis table
CREATE TRIGGER set_timestamp_kpis
BEFORE UPDATE ON public.kpis
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Ensure department_id exists on profiles even if the table was created earlier without it
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL;

-- Add indexes for common lookup fields to improve performance
CREATE INDEX IF NOT EXISTS idx_profiles_department_id ON public.profiles (department_id);
CREATE INDEX IF NOT EXISTS idx_employees_profile_id ON public.employees (profile_id);
CREATE INDEX IF NOT EXISTS idx_shift_reports_employee_profile_id ON public.shift_reports (employee_profile_id);
CREATE INDEX IF NOT EXISTS idx_kpis_employee_profile_id ON public.kpis (employee_profile_id);
CREATE INDEX IF NOT EXISTS idx_kpis_shift_report_id ON public.kpis (shift_report_id);
CREATE INDEX IF NOT EXISTS idx_kpis_metric_name ON public.kpis (metric_name);
