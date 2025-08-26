-- Créer une table pour les comptes de développement
CREATE TABLE public.dev_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur la table
ALTER TABLE public.dev_accounts ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture des comptes dev (pour l'authentification)
CREATE POLICY "Allow read access to dev accounts"
ON public.dev_accounts
FOR SELECT
USING (true);

-- Insérer un compte de développement par défaut
-- Mot de passe: "dev123" (hashé avec bcrypt)
INSERT INTO public.dev_accounts (email, password_hash, name)
VALUES (
  'dev@aura.com',
  '$2b$10$K7L/5KJHgAlwm2Z3N4dJVeUyNGczJr5MS4GEvKJq7VSDfx.Ycnxya',
  'Développeur Aura'
);

-- Créer une fonction pour l'authentification des développeurs
CREATE OR REPLACE FUNCTION public.authenticate_dev_account(p_email TEXT, p_password TEXT)
RETURNS TABLE(account_id UUID, account_email TEXT, account_name TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT id, email, name
  FROM public.dev_accounts
  WHERE email = p_email
  AND password_hash = crypt(p_password, password_hash);
END;
$$;