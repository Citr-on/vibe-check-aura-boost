-- Create analyses table
CREATE TABLE public.analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('photo', 'profil-complet')),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'en-cours' CHECK (status IN ('en-cours', 'terminé', 'échoué')),
  analysis_option_id TEXT NOT NULL,
  cost_type TEXT NOT NULL CHECK (cost_type IN ('aura', 'credits')),
  cost_amount INTEGER NOT NULL,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  
  -- Analysis data
  images TEXT[] DEFAULT '{}',
  target_gender TEXT CHECK (target_gender IN ('men', 'women', 'both')),
  age_range_min INTEGER,
  age_range_max INTEGER,
  bio_text TEXT,
  keywords TEXT[],
  tone TEXT,
  bio_length TEXT,
  
  -- Results
  score DECIMAL(3,1),
  votes_received INTEGER DEFAULT 0,
  total_votes INTEGER,
  analysis_results JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own analyses" 
ON public.analyses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analyses" 
ON public.analyses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analyses" 
ON public.analyses 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analyses" 
ON public.analyses 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_analyses_updated_at
BEFORE UPDATE ON public.analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_analyses_user_id ON public.analyses(user_id);
CREATE INDEX idx_analyses_created_at ON public.analyses(created_at DESC);