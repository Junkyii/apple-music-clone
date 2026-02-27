-- =============================================
-- Apple Music Clone — K-Pop & K-R&B Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- =============================================

-- Albums table
CREATE TABLE IF NOT EXISTS albums (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  year TEXT,
  image TEXT,
  genre TEXT CHECK (genre IN ('kpop', 'krnb')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Songs table
CREATE TABLE IF NOT EXISTS songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id TEXT NOT NULL REFERENCES albums(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT NOT NULL DEFAULT '0:00',
  track_number INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_songs_album_id ON songs(album_id);
CREATE INDEX IF NOT EXISTS idx_albums_genre ON albums(genre);

-- Enable Row Level Security
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- Public read access (anon key can read, but not write)
CREATE POLICY "Public read access for albums"
  ON albums FOR SELECT
  USING (true);

CREATE POLICY "Public read access for songs"
  ON songs FOR SELECT
  USING (true);
