-- Corriger la fonction pour sécuriser le search_path
CREATE OR REPLACE FUNCTION public.authenticate_dev_account(p_email TEXT, p_password TEXT)
RETURNS TABLE(account_id UUID, account_email TEXT, account_name TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT id, email, name
  FROM public.dev_accounts
  WHERE email = p_email
  AND password_hash = crypt(p_password, password_hash);
END;
$$;