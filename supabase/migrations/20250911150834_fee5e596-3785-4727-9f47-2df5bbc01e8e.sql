-- Remove columns that are no longer needed from profiles table
ALTER TABLE public.profiles 
DROP COLUMN IF EXISTS height,
DROP COLUMN IF EXISTS ethnic_origin,
DROP COLUMN IF EXISTS religious_confession;