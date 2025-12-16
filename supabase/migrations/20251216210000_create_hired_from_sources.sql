
-- Create the hired_from_sources table
CREATE TABLE public.hired_from_sources (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add comments for clarity
COMMENT ON TABLE public.hired_from_sources IS 'Stores predefined sources from where employees can be hired (e.g., other departments).';
COMMENT ON COLUMN public.hired_from_sources.name IS 'The name of the source department or location.';
COMMENT ON COLUMN public.hired_from_sources.is_active IS 'Indicates if the source is available for selection.';
COMMENT ON COLUMN public.hired_from_sources.sort_order IS 'Determines the display order in dropdowns.';

-- Enable Row Level Security
ALTER TABLE public.hired_from_sources ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- 1. Allow authenticated users to read active sources.
CREATE POLICY "Allow authenticated read access to active sources"
ON public.hired_from_sources
FOR SELECT
TO authenticated
USING (is_active = true);

-- 2. TODO: Create a policy to allow only users with an 'admin' role to write.
--    For now, this default-deny policy prevents any authenticated user from writing.
CREATE POLICY "Deny all write operations for non-admins"
ON public.hired_from_sources
FOR ALL
USING (false)
WITH CHECK (false);

-- Seed the table with initial data
INSERT INTO public.hired_from_sources (name, sort_order) VALUES
('Drift 1', 10),
('Drift 2', 20),
('Drift 3', 30),
('Ute', 40),
('Rørhall', 50),
('Sampakk', 60),
('Vedlikehold', 70),
('Varemottak', 80);
