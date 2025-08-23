-- Add religious confession enum and column to profiles table
CREATE TYPE public.religious_confession_type AS ENUM (
  'christianisme', 
  'islam', 
  'judaisme', 
  'bouddhisme', 
  'hinduisme', 
  'athéisme', 
  'agnosticisme', 
  'autre', 
  'préfère-ne-pas-dire'
);

-- Add the column to the existing profiles table
ALTER TABLE public.profiles 
ADD COLUMN religious_confession religious_confession_type;