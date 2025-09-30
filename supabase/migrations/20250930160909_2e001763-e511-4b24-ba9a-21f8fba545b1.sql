-- Add photo_index column to reviews table to track which photo was being viewed during evaluation
ALTER TABLE public.reviews
ADD COLUMN photo_index integer DEFAULT 0;