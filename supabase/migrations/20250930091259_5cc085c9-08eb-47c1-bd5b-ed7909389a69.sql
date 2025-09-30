-- Create update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = 'public';

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  gender gender_type,
  age INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create photo_batches table
CREATE TABLE IF NOT EXISTS public.photo_batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  batch_name TEXT,
  photos TEXT[] NOT NULL DEFAULT '{}'::text[],
  status TEXT NOT NULL DEFAULT 'pending'::text,
  credits_used INTEGER DEFAULT 0,
  analysis_results JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.photo_batches ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own photo batches" ON public.photo_batches;
CREATE POLICY "Users can view their own photo batches"
  ON public.photo_batches FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own photo batches" ON public.photo_batches;
CREATE POLICY "Users can create their own photo batches"
  ON public.photo_batches FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own photo batches" ON public.photo_batches;
CREATE POLICY "Users can update their own photo batches"
  ON public.photo_batches FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own photo batches" ON public.photo_batches;
CREATE POLICY "Users can delete their own photo batches"
  ON public.photo_batches FOR DELETE
  USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_photo_batches_updated_at ON public.photo_batches;
CREATE TRIGGER update_photo_batches_updated_at
  BEFORE UPDATE ON public.photo_batches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create dev_accounts table
CREATE TABLE IF NOT EXISTS public.dev_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.dev_accounts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow read access to dev accounts" ON public.dev_accounts;
CREATE POLICY "Allow read access to dev accounts"
  ON public.dev_accounts FOR SELECT
  USING (true);

DROP TRIGGER IF EXISTS update_dev_accounts_updated_at ON public.dev_accounts;
CREATE TRIGGER update_dev_accounts_updated_at
  BEFORE UPDATE ON public.dev_accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create authenticate function for dev accounts
CREATE OR REPLACE FUNCTION public.authenticate_dev_account(p_email text, p_password text)
RETURNS TABLE(account_id uuid, account_email text, account_name text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT id, email, name
  FROM public.dev_accounts
  WHERE email = p_email
  AND password_hash = crypt(p_password, password_hash);
END;
$$;