-- Create page_views table
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Public can insert page views (analytics tracking)
CREATE POLICY "Public can insert page views"
  ON public.page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated users can read page views
CREATE POLICY "Authenticated can read page views"
  ON public.page_views
  FOR SELECT
  TO authenticated
  USING (true);

-- Indexes
CREATE INDEX idx_page_views_page ON public.page_views (page);
CREATE INDEX idx_page_views_created_at ON public.page_views (created_at);
