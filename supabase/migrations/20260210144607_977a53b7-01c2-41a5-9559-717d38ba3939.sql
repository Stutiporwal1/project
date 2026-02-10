
-- Create cyber incidents table matching CSV schema
CREATE TABLE public.cyber_incidents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_id TEXT NOT NULL UNIQUE,
  timestamp TIMESTAMPTZ NOT NULL,
  threat_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  attack_source TEXT NOT NULL,
  target_system TEXT NOT NULL,
  country TEXT NOT NULL,
  status TEXT NOT NULL,
  affected_systems INTEGER NOT NULL DEFAULT 0,
  detection_time_minutes NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS (public read for dashboard)
ALTER TABLE public.cyber_incidents ENABLE ROW LEVEL SECURITY;

-- Allow public read access for dashboard
CREATE POLICY "Allow public read access" ON public.cyber_incidents
  FOR SELECT USING (true);

-- Create indexes for common queries
CREATE INDEX idx_incidents_severity ON public.cyber_incidents (severity);
CREATE INDEX idx_incidents_threat_type ON public.cyber_incidents (threat_type);
CREATE INDEX idx_incidents_country ON public.cyber_incidents (country);
CREATE INDEX idx_incidents_status ON public.cyber_incidents (status);
CREATE INDEX idx_incidents_timestamp ON public.cyber_incidents (timestamp DESC);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.cyber_incidents;
