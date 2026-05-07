-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Public can insert events (analytics tracking)
CREATE POLICY "Public can insert events"
  ON public.events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated users can read events
CREATE POLICY "Authenticated can read events"
  ON public.events
  FOR SELECT
  TO authenticated
  USING (true);

-- Indexes
CREATE INDEX idx_events_event_name ON public.events (event_name);
CREATE INDEX idx_events_created_at ON public.events (created_at);
