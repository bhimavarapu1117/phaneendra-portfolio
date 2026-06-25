-- Drop and recreate the view policy to ensure it's correct
DROP POLICY IF EXISTS "Anyone can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

CREATE POLICY "Public can view project images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'project-images');