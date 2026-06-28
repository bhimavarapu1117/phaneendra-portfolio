
-- Revoke direct API execution of SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_admin() FROM PUBLIC, anon, authenticated;

-- Keep service_role access for admin/trigger contexts
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.handle_new_user_admin() TO service_role;

-- Drop the broad public SELECT (listing) policy on project-images.
-- Public URLs (/storage/v1/object/public/...) bypass RLS so images remain viewable.
DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
