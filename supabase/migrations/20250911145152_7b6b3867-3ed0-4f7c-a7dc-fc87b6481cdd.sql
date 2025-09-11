-- Create table for user photo batches
CREATE TABLE public.photo_batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  batch_name TEXT,
  photos TEXT[] NOT NULL DEFAULT '{}', -- Array of photo URLs
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
  analysis_results JSONB, -- Store analysis results
  credits_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.photo_batches ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own photo batches" 
ON public.photo_batches 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own photo batches" 
ON public.photo_batches 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own photo batches" 
ON public.photo_batches 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own photo batches" 
ON public.photo_batches 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_photo_batches_updated_at
BEFORE UPDATE ON public.photo_batches
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_photo_batches_user_id ON public.photo_batches(user_id);
CREATE INDEX idx_photo_batches_status ON public.photo_batches(status);