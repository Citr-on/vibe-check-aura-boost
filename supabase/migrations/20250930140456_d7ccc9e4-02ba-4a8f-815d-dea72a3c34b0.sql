-- Create reviews table to store profile evaluations
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reviewer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis_id uuid NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
  feeling_score integer NOT NULL CHECK (feeling_score >= 1 AND feeling_score <= 5),
  vibe_score integer NOT NULL CHECK (vibe_score >= 1 AND vibe_score <= 5),
  intrigue_score integer NOT NULL CHECK (intrigue_score >= 1 AND intrigue_score <= 5),
  positive_comment text,
  improvement_comment text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(reviewer_id, analysis_id)
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view all reviews"
  ON public.reviews
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own reviews"
  ON public.reviews
  FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update their own reviews"
  ON public.reviews
  FOR UPDATE
  USING (auth.uid() = reviewer_id);

CREATE POLICY "Users can delete their own reviews"
  ON public.reviews
  FOR DELETE
  USING (auth.uid() = reviewer_id);

-- Trigger for updating updated_at
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add review_count column to analyses table
ALTER TABLE public.analyses
ADD COLUMN review_count integer NOT NULL DEFAULT 0;

-- Function to update review count
CREATE OR REPLACE FUNCTION public.update_analysis_review_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.analyses
    SET review_count = review_count + 1
    WHERE id = NEW.analysis_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.analyses
    SET review_count = review_count - 1
    WHERE id = OLD.analysis_id;
  END IF;
  RETURN NULL;
END;
$$;

-- Trigger to automatically update review count
CREATE TRIGGER update_review_count_trigger
AFTER INSERT OR DELETE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_analysis_review_count();