
-- Create the hired_to_destinations table
-- This name is chosen for consistency with hired_from_sources
CREATE TABLE public.hired_to_destinations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add comments for clarity
COMMENT ON TABLE public.hired_to_destinations IS 'Stores predefined destinations to where employees can be hired out (e.g., other departments).';
COMMENT ON COLUMN public.hired_to_destinations.name IS 'The name of the destination department or location.';
COMMENT ON COLUMN public.hired_to_destinations.is_active IS 'Indicates if the destination is available for selection.';
COMMENT ON COLUMN public.hired_to_destinations.sort_order IS 'Determines the display order in dropdowns.';

-- Enable Row Level Security
ALTER TABLE public.hired_to_destinations ENABLE ROW LEVEL SECURITY;

-- Create Policies
-- 1. Allow authenticated users to read active destinations.
CREATE POLICY "Allow authenticated read access to active destinations"
ON public.hired_to_destinations
FOR SELECT
TO authenticated
USING (is_active = true);

-- 2. TODO: Create a policy to allow only users with an 'admin' role to write.
--    For now, this default-deny policy prevents any authenticated user from writing.
CREATE POLICY "Deny all write operations for non-admins"
ON public.hired_to_destinations
FOR ALL
USING (false)
WITH CHECK (false);

-- Seed the table with initial data
INSERT INTO public.hired_to_destinations (name, sort_order) VALUES
('Drift 1', 10),
('Drift 2', 20),
('Drift 3', 30),
('Ute', 40),
('Rørhall', 50),
('Sampakk', 60),
('Vedlikehold', 70),
('Varemottak', 80);
