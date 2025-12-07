CREATE TABLE public.shift_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    sr1_production_count INT NOT NULL,
    sr2_downtime_minutes INT NOT NULL,
    sr3_overtime_hours FLOAT NOT NULL,
    sr4_incidents_count INT NOT NULL,
    sr5_safety_notes TEXT,
    sr6_personnel_on_shift TEXT[] NOT NULL,
    sr7_materials_used JSONB,
    sr8_quality_checks TEXT NOT NULL,
    sr9_general_notes TEXT
);

-- Enable RLS on the new table
ALTER TABLE public.shift_reports ENABLE ROW LEVEL SECURITY;

-- Policies for 'shift_reports' table
DROP POLICY IF EXISTS "Shift leaders can insert their own reports." ON public.shift_reports;
CREATE POLICY "Shift leaders can insert their own reports."
ON public.shift_reports FOR INSERT
TO authenticated
WITH CHECK (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'shift_leader'
    AND profile_id = auth.uid()
);

DROP POLICY IF EXISTS "Users can view their own reports." ON public.shift_reports;
CREATE POLICY "Users can view their own reports."
ON public.shift_reports FOR SELECT
TO authenticated
USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Admins and managers can view all reports." ON public.shift_reports;
CREATE POLICY "Admins and managers can view all reports."
ON public.shift_reports FOR SELECT
TO authenticated
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'shift_manager'));
