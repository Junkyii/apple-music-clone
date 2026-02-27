-- =============================================
-- Seed Data — K-Pop & K-R&B Albums + Songs
-- Run this AFTER schema.sql in Supabase SQL Editor
-- =============================================

-- ─── K-POP ALBUMS ────────────────────────────────────────────────────

INSERT INTO albums (id, title, artist, year, image, genre) VALUES
  ('get-up', 'Get Up', 'NewJeans', '2023', 'https://upload.wikimedia.org/wikipedia/en/2/23/NewJeans_-_Get_Up.png', 'kpop'),
  ('proof', 'Proof', 'BTS', '2022', 'https://upload.wikimedia.org/wikipedia/en/5/52/BTS_Proof_album_cover_art.jpg', 'kpop'),
  ('born-pink', 'Born Pink', 'BLACKPINK', '2022', 'https://upload.wikimedia.org/wikipedia/en/e/e7/Born_Pink_Digital.jpeg', 'kpop'),
  ('chill-kill', 'Chill Kill', 'Red Velvet', '2023', 'https://upload.wikimedia.org/wikipedia/en/e/ee/Red_Velvet_-_Chill_Kill.png', 'kpop'),
  ('my-world', 'MY WORLD', 'aespa', '2023', 'https://upload.wikimedia.org/wikipedia/en/4/40/Aespa_-_My_World.png', 'kpop'),
  ('fml', 'FML', 'SEVENTEEN', '2023', 'https://upload.wikimedia.org/wikipedia/en/6/60/Seventeen_-_FML.png', 'kpop'),
  ('5-star', '★★★★★ (5-STAR)', 'Stray Kids', '2023', 'https://upload.wikimedia.org/wikipedia/en/3/37/Stray_Kids_-_5-Star.png', 'kpop'),
  ('unforgiven', 'UNFORGIVEN', 'LE SSERAFIM', '2023', 'https://upload.wikimedia.org/wikipedia/en/1/1b/Le_Sserafim_-_Unforgiven.png', 'kpop')
ON CONFLICT (id) DO NOTHING;

-- ─── K-R&B ALBUMS ────────────────────────────────────────────────────

INSERT INTO albums (id, title, artist, year, image, genre) VALUES
  ('130-mood-trbl', '130 Mood: TRBL', 'DEAN', '2016', 'https://upload.wikimedia.org/wikipedia/en/3/3a/DEAN_130_Mood_TRBL_album_cover.png', 'krnb'),
  ('with-her', 'with HER', 'Crush', '2014', 'https://upload.wikimedia.org/wikipedia/en/3/33/Crush_-_Crush_on_You.jpg', 'krnb'),
  ('wish-and-wind', 'Wish & Wind', 'HEIZE', '2018', 'https://upload.wikimedia.org/wikipedia/en/1/15/Heize_-_Wish_%26_Wind.png', 'krnb'),
  ('oo', 'OO', 'Zion.T', '2017', 'https://upload.wikimedia.org/wikipedia/en/1/16/Zion.T_-_OO.png', 'krnb'),
  ('but-for-now', 'BUT FOR NOW LEAVE ME ALONE', 'pH-1', '2019', 'https://upload.wikimedia.org/wikipedia/en/a/a4/PH-1_-_But_for_Now_Leave_Me_Alone.jpg', 'krnb')
ON CONFLICT (id) DO NOTHING;

-- ─── K-POP SONGS ─────────────────────────────────────────────────────

-- NewJeans - Get Up
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('get-up', 'New Jeans', '1:48', 1),
  ('get-up', 'Super Shy', '2:34', 2),
  ('get-up', 'ETA', '2:31', 3),
  ('get-up', 'Cool With You', '2:27', 4),
  ('get-up', 'Get Up', '0:36', 5),
  ('get-up', 'ASAP', '2:14', 6);

-- BTS - Proof
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('proof', 'Born Singer', '4:02', 1),
  ('proof', 'No More Dream', '3:45', 2),
  ('proof', 'N.O', '3:29', 3),
  ('proof', 'Boy In Luv', '3:50', 4),
  ('proof', 'Danger', '4:03', 5),
  ('proof', 'Run BTS', '3:25', 6),
  ('proof', 'Yet To Come', '3:13', 7),
  ('proof', 'For Youth', '4:25', 8);

-- BLACKPINK - Born Pink
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('born-pink', 'Pink Venom', '3:06', 1),
  ('born-pink', 'Shut Down', '2:55', 2),
  ('born-pink', 'Typa Girl', '2:59', 3),
  ('born-pink', 'Yeah Yeah Yeah', '3:17', 4),
  ('born-pink', 'Hard to Love', '2:42', 5),
  ('born-pink', 'The Happiest Girl', '3:29', 6),
  ('born-pink', 'Tally', '2:53', 7),
  ('born-pink', 'Ready for Love', '2:52', 8);

-- Red Velvet - Chill Kill
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('chill-kill', 'Chill Kill', '3:34', 1),
  ('chill-kill', 'Knock Knock', '3:15', 2),
  ('chill-kill', 'Nightmare', '3:21', 3),
  ('chill-kill', 'Underwater', '3:30', 4),
  ('chill-kill', 'Bamboleo', '3:17', 5);

-- aespa - MY WORLD
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('my-world', 'Welcome to MY World', '3:21', 1),
  ('my-world', 'Spicy', '3:15', 2),
  ('my-world', 'Salty & Sweet', '2:53', 3),
  ('my-world', 'Thirsty', '3:20', 4),
  ('my-world', 'I''m Unhappy', '3:03', 5),
  ('my-world', 'YOLO', '3:04', 6);

-- SEVENTEEN - FML
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('fml', 'F*ck My Life', '3:17', 1),
  ('fml', 'Super', '2:58', 2),
  ('fml', 'Fire', '3:01', 3),
  ('fml', 'Dust', '3:33', 4),
  ('fml', 'I Don''t Understand But I Luv U', '3:12', 5);

-- Stray Kids - 5-STAR
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('5-star', '★★★★★ (5-STAR)', '3:18', 1),
  ('5-star', 'S-Class', '2:56', 2),
  ('5-star', 'ITEM', '3:23', 3),
  ('5-star', 'Super Board', '3:14', 4),
  ('5-star', 'Topline', '2:52', 5),
  ('5-star', 'DLC', '3:28', 6);

-- LE SSERAFIM - UNFORGIVEN
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('unforgiven', 'UNFORGIVEN', '3:18', 1),
  ('unforgiven', 'ANTIFRAGILE', '3:12', 2),
  ('unforgiven', 'Fire in the Belly', '2:49', 3),
  ('unforgiven', 'No Celestial', '3:28', 4),
  ('unforgiven', 'Eve, Psyche & the Bluebeard''s Wife', '3:22', 5);

-- ─── K-R&B SONGS ─────────────────────────────────────────────────────

-- DEAN - 130 Mood: TRBL
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('130-mood-trbl', 'Pour Up', '3:30', 1),
  ('130-mood-trbl', 'What 2 Do', '4:40', 2),
  ('130-mood-trbl', 'Bonnie & Clyde', '3:44', 3),
  ('130-mood-trbl', 'D (Half Moon)', '3:50', 4),
  ('130-mood-trbl', 'I Love It', '4:35', 5),
  ('130-mood-trbl', 'And You?', '3:23', 6);

-- Crush - with HER
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('with-her', 'Sometimes', '3:48', 1),
  ('with-her', 'Hug Me', '4:17', 2),
  ('with-her', 'Sofa', '3:32', 3),
  ('with-her', 'Adorable', '3:15', 4),
  ('with-her', 'Woo Ah', '3:42', 5);

-- HEIZE - Wish & Wind
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('wish-and-wind', 'Jenga', '3:39', 1),
  ('wish-and-wind', 'First Sight', '3:32', 2),
  ('wish-and-wind', 'We Don''t Talk Together', '3:22', 3),
  ('wish-and-wind', 'Dispatch', '3:29', 4);

-- Zion.T - OO
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('oo', 'Cinema', '4:01', 1),
  ('oo', 'The Song', '3:37', 2),
  ('oo', 'Complex', '3:43', 3),
  ('oo', 'Snow', '3:49', 4),
  ('oo', 'Eat', '3:14', 5);

-- pH-1 - BUT FOR NOW LEAVE ME ALONE
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('but-for-now', 'Malibu', '3:12', 1),
  ('but-for-now', 'Homebody', '3:33', 2),
  ('but-for-now', 'Nerdy Love', '3:19', 3),
  ('but-for-now', 'Packitup!', '2:48', 4),
  ('but-for-now', 'Like Me', '3:15', 5);
