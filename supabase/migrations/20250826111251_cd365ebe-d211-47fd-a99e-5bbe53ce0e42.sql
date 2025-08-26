-- Fix critical RLS policies to use auth.uid() instead of 'temp-user-id'
-- This will properly isolate user data and fix the security vulnerability

-- Drop existing broken policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Create proper RLS policies with correct user isolation
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Ensure RLS is enabled (should already be, but being explicit)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;