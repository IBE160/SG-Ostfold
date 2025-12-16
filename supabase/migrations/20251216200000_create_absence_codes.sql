
-- Create the absence_codes table
CREATE TABLE public.absence_codes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add comments to the table and columns
COMMENT ON TABLE public.absence_codes IS 'Stores predefined codes for employee absences.';
COMMENT ON COLUMN public.absence_codes.code IS 'Short, unique code for the absence type (e.g., "S", "SM").';
COMMENT ON COLUMN public.absence_codes.label IS 'Human-readable label for the code (e.g., "Syk", "Ferie").';
COMMENT ON COLUMN public.absence_codes.is_active IS 'Indicates if the code is available for selection.';
COMMENT ON COLUMN public.absence_codes.sort_order IS 'Determines the display order in dropdowns.';

-- Enable Row Level Security
ALTER TABLE public.absence_codes ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- 1. Allow authenticated users to read active absence codes
CREATE POLICY "Allow authenticated read access to active codes"
ON public.absence_codes
FOR SELECT
TO authenticated
USING (is_active = true);

-- 2. Restrict write operations to service_role (admins) by default.
--    If a specific 'admin' role exists, this can be changed.
--    For now, this prevents any authenticated user from writing.
CREATE POLICY "Deny all write operations for non-admins"
ON public.absence_codes
FOR ALL
USING (false)
WITH CHECK (false);

-- Insert initial data
INSERT INTO public.absence_codes (code, label, sort_order) VALUES
('S', 'Syk (Short-term)', 10),
('SM', 'Sykemeldt (Long-term)', 20),
('F', 'Ferie (Vacation)', 30),
('P', 'Permisjon (Leave)', 40),
('AV', 'Avspasering (Time off in lieu)', 50);
