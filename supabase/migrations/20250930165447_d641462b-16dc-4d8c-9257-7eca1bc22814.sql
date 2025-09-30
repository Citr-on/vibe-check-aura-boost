-- Add columns to reviews table to store profile snapshot data at review time
ALTER TABLE public.reviews
ADD COLUMN profile_images text[] DEFAULT '{}',
ADD COLUMN profile_bio text,
ADD COLUMN profile_keywords text[] DEFAULT '{}',
ADD COLUMN profile_metadata jsonb DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.reviews.profile_images IS 'Snapshot of images from the profile at review time';
COMMENT ON COLUMN public.reviews.profile_bio IS 'Snapshot of bio/description from the profile at review time';
COMMENT ON COLUMN public.reviews.profile_keywords IS 'Snapshot of keywords/passions from the profile at review time';
COMMENT ON COLUMN public.reviews.profile_metadata IS 'Additional profile metadata at review time (gender, age, etc.)';