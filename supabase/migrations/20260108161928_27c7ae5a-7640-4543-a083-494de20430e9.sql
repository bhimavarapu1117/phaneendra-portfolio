-- Allow authenticated users to insert projects
CREATE POLICY "Authenticated users can create projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update projects
CREATE POLICY "Authenticated users can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to delete projects
CREATE POLICY "Authenticated users can delete projects"
ON public.projects
FOR DELETE
TO authenticated
USING (true);

-- Allow authenticated users to view all projects (including hidden ones)
CREATE POLICY "Authenticated users can view all projects"
ON public.projects
FOR SELECT
TO authenticated
USING (true);