-- Add coins column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN coins integer NOT NULL DEFAULT 100;

-- Create function to initialize coins for new users
CREATE OR REPLACE FUNCTION public.initialize_user_coins()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Set coins to 100 for new profiles
  NEW.coins = 100;
  RETURN NEW;
END;
$function$;

-- Create trigger to set coins on profile creation
CREATE TRIGGER set_initial_coins
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.initialize_user_coins();