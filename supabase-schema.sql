-- Thoughts table schema
-- Run this in Supabase SQL Editor

CREATE TABLE thoughts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  posted_to_x BOOLEAN DEFAULT FALSE,
  x_post_id VARCHAR(100),
  is_published BOOLEAN DEFAULT TRUE
);

-- Enable Row Level Security
ALTER TABLE thoughts ENABLE ROW LEVEL SECURITY;

-- Public read policy (only published thoughts)
CREATE POLICY "Public read" ON thoughts
  FOR SELECT
  USING (is_published = TRUE);

-- Create index for faster slug lookups
CREATE INDEX idx_thoughts_slug ON thoughts(slug);

-- Create index for faster date ordering
CREATE INDEX idx_thoughts_created_at ON thoughts(created_at DESC);
