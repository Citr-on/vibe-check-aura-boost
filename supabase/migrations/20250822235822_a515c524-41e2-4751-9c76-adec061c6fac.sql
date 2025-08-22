-- Create enum types for profile data
CREATE TYPE public.gender_type AS ENUM ('homme', 'femme', 'non-binaire', 'préfère-ne-pas-dire');
CREATE TYPE public.ethnic_origin_type AS ENUM ('européenne', 'africaine', 'asiatique', 'hispanique', 'moyen-orientale', 'métisse', 'autre', 'préfère-ne-pas-dire');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  gender gender_type,
  age INTEGER CHECK (age >= 16 AND age <= 100),
  height INTEGER CHECK (height >= 100 AND height <= 250), -- height in cm
  ethnic_origin ethnic_origin_type,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (user_id::text = 'temp-user-id');

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (user_id::text = 'temp-user-id');

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (user_id::text = 'temp-user-id');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();