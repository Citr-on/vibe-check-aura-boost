-- Add aura column to profiles table
ALTER TABLE public.profiles
ADD COLUMN aura numeric DEFAULT 0 NOT NULL;

COMMENT ON COLUMN public.profiles.aura IS 'Aura points earned by reviewing profiles and photos';