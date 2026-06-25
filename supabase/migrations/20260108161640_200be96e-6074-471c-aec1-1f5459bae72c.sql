-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Allow public read access
CREATE POLICY "Anyone can view project images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload project images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'project-images');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update project images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'project-images');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete project images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'project-images');