-- =============================================
-- Seed Data — K-Pop & K-R&B Albums + Songs
-- Run this AFTER schema.sql in Supabase SQL Editor
-- =============================================

-- ─── K-POP ALBUMS ────────────────────────────────────────────────────

INSERT INTO albums (id, title, artist, year, image, genre) VALUES
  ('get-up', 'Get Up', 'NewJeans', '2023', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d3/4b/7e/d34b7e1e-af3b-43b6-2949-7a8c652a1bc9/196922462726_Cover.jpg/600x600bb.jpg', 'kpop'),
  ('proof', 'Proof', 'BTS', '2022', 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/f7/68/9c/f7689ce3-6d41-60cd-62d2-57a91ddf5b9d/196922067341_Cover.jpg/600x600bb.jpg', 'kpop'),
  ('born-pink', 'Born Pink', 'BLACKPINK', '2022', 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/52/8e/5a/528e5a30-52b0-b68c-f184-635fcf15e6d7/22UM1IM01017.rgb.jpg/600x600bb.jpg', 'kpop'),
  ('chill-kill', 'Chill Kill', 'Red Velvet', '2023', 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/52/a6/db/52a6dbad-8427-9b5c-e90f-34974cc5e3d0/00888735945847_Cover.jpg/600x600bb.jpg', 'kpop'),
  ('my-world', 'MY WORLD', 'aespa', '2023', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/af/2c/6d/af2c6d62-0ebc-2dff-17b3-8eeb2b3986a0/888735943621.jpg/600x600bb.jpg', 'kpop'),
  ('fml', 'FML', 'SEVENTEEN', '2023', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d1/66/eb/d166eb7e-7210-b3ff-be39-638cd37bfc89/196922401282_Cover.jpg/600x600bb.jpg', 'kpop'),
  ('5-star', '★★★★★ (5-STAR)', 'Stray Kids', '2023', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/5a/3b/1e/5a3b1e2f-1b70-a4b0-6d4d-a33a770f361f/738676860696_Cover.jpg/600x600bb.jpg', 'kpop'),
  ('unforgiven', 'UNFORGIVEN', 'LE SSERAFIM', '2023', 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/27/13/c3/2713c389-4f01-b5e7-59f5-3204b37cb594/196922444470_Cover.jpg/600x600bb.jpg', 'kpop'),
  ('ive-ive', 'I''ve IVE', 'IVE', '2023', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/3a/23/b7/3a23b7f4-0b43-df9d-b7e4-14f992443324/197188335663.jpg/600x600bb.jpg', 'kpop'),
  ('formula-of-love', 'Formula of Love: O+T=<3', 'TWICE', '2021', 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/87/f5/e0/87f5e0de-c909-f4e6-9621-123565dfbc80/738676858440_Cover.jpg/600x600bb.jpg', 'kpop'),
  ('xoxo', 'XOXO (Repackage)', 'EXO', '2013', 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3a/10/77/3a1077bc-cfb4-dc63-eb69-bf8bc7d7245e/asset.jpg/600x600bb.jpg', 'kpop'),
  ('crazy-in-love', 'CRAZY IN LOVE', 'ITZY', '2021', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e7/f3/d7/e7f3d7dc-4bf6-e15d-ca28-3105f713e693/192641938573_Cover.jpg/600x600bb.jpg', 'kpop'),
  ('sticker', 'Sticker', 'NCT 127', '2021', 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/8b/6f/19/8b6f19c6-9796-5757-f0e5-8152e8b34dfb/00888735938986_Cover.jpg/600x600bb.jpg', 'kpop'),
  ('chaos-chapter-freeze', 'The Chaos Chapter: FREEZE', 'TOMORROW X TOGETHER', '2021', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/35/e7/8a/35e78a57-4a16-03b7-fa63-50dd7cfcd5fa/192641750038_Cover.jpg/600x600bb.jpg', 'kpop'),
  ('i-never-die', 'I NEVER DIE', '(G)I-DLE', '2022', 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4c/da/91/4cda91b0-6fa2-805e-fd1a-e89bf87bb969/8804775250422.jpg/600x600bb.jpg', 'kpop')
ON CONFLICT (id) DO NOTHING;

-- ─── K-R&B ALBUMS ────────────────────────────────────────────────────

INSERT INTO albums (id, title, artist, year, image, genre) VALUES
  ('130-mood-trbl', '130 Mood: TRBL', 'DEAN', '2016', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8e/a2/d0/8ea2d001-0b52-a451-4a7c-de35d3502155/00602547860828.rgb.jpg/600x600bb.jpg', 'krnb'),
  ('with-her', 'with HER', 'Crush', '2014', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c1/7f/e4/c17fe487-3766-9698-d823-915e43d5d6e6/8809887700209.jpg/600x600bb.jpg', 'krnb'),
  ('wish-and-wind', 'Wish & Wind', 'HEIZE', '2018', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/83/5f/68/835f68ae-9d6f-e374-723f-0e6a6a034307/8809603540386_Cover.jpg/600x600bb.jpg', 'krnb'),
  ('oo', 'OO', 'Zion.T', '2017', 'https://is1-ssl.mzstatic.com/image/thumb/Music111/v4/51/a0/ff/51a0ffc1-e683-6517-015d-73415da75b28/dj.yghonlgs.jpg/600x600bb.jpg', 'krnb'),
  ('but-for-now', 'BUT FOR NOW LEAVE ME ALONE', 'pH-1', '2019', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/de/b8/ea/deb8eaf6-0e44-8286-37a4-a7ffe60e6d7e/8809704411707_Cover.jpg/600x600bb.jpg', 'krnb'),
  ('lowlife-princess', 'Lowlife Princess: Noir', 'BIBI', '2022', 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/7f/29/e7/7f29e7b3-532d-9d11-ab1b-f754bf3db26b/5054197387968.jpg/600x600bb.jpg', 'krnb'),
  ('boy', 'Boy.', 'offonoff', '2017', 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/83/6b/40/836b4093-0e77-2121-21b7-42765bc1a9f1/80928575.jpg/600x600bb.jpg', 'krnb'),
  ('4-only', '4 ONLY', 'Lee Hi', '2021', 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d9/5a/a9/d95aa943-0e9b-ae75-3157-ab372f5b831a/8809704422604_Cover.jpg/600x600bb.jpg', 'krnb'),
  ('departure', 'Departure', 'Hoody', '2019', 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/ee/ea/83/eeea832f-ec08-4127-9142-dbfafdb26b04/8809658318954_Cover.jpg/600x600bb.jpg', 'krnb')
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

-- IVE - I've IVE
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('ive-ive', 'I AM', '3:04', 1),
  ('ive-ive', 'Kitsch', '2:53', 2),
  ('ive-ive', 'ELEVEN', '3:14', 3),
  ('ive-ive', 'LOVE DIVE', '3:00', 4),
  ('ive-ive', 'After LIKE', '3:04', 5),
  ('ive-ive', 'Blue Blood', '2:54', 6),
  ('ive-ive', 'Either Way', '3:43', 7),
  ('ive-ive', 'OTT', '2:43', 8);

-- TWICE - Formula of Love
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('formula-of-love', 'SCIENTIST', '3:13', 1),
  ('formula-of-love', 'Moonlight', '3:16', 2),
  ('formula-of-love', 'Icon', '3:07', 3),
  ('formula-of-love', 'Cruel', '3:12', 4),
  ('formula-of-love', 'Real You', '3:14', 5),
  ('formula-of-love', 'F.I.L.A', '3:34', 6),
  ('formula-of-love', 'Last Waltz', '3:29', 7);

-- EXO - XOXO
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('xoxo', 'Growl', '3:33', 1),
  ('xoxo', 'Wolf', '3:52', 2),
  ('xoxo', 'Baby Don''t Cry', '4:28', 3),
  ('xoxo', 'Black Pearl', '4:09', 4),
  ('xoxo', 'Don''t Go', '4:06', 5),
  ('xoxo', 'Heart Attack', '3:23', 6);

-- ITZY - CRAZY IN LOVE
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('crazy-in-love', 'LOCO', '3:11', 1),
  ('crazy-in-love', 'SWIPE', '3:08', 2),
  ('crazy-in-love', 'SOOO LUCKY', '3:04', 3),
  ('crazy-in-love', 'LOVE is', '3:07', 4),
  ('crazy-in-love', 'CHILLIN'' CHILLIN''', '3:31', 5),
  ('crazy-in-love', 'GAS ME UP', '3:05', 6);

-- NCT 127 - Sticker
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('sticker', 'Sticker', '3:23', 1),
  ('sticker', 'Lemonade', '3:31', 2),
  ('sticker', 'Bring The Noize', '3:19', 3),
  ('sticker', 'Focus', '3:18', 4),
  ('sticker', 'Dreamer', '3:11', 5),
  ('sticker', 'Voltron', '2:37', 6);

-- TXT - The Chaos Chapter: FREEZE
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('chaos-chapter-freeze', 'Anti-Romantic', '3:21', 1),
  ('chaos-chapter-freeze', '0X1=LOVESONG', '3:26', 2),
  ('chaos-chapter-freeze', 'Magic', '3:33', 3),
  ('chaos-chapter-freeze', 'No Rules', '3:15', 4),
  ('chaos-chapter-freeze', 'Dear Sputnik', '3:38', 5),
  ('chaos-chapter-freeze', 'Frost', '3:12', 6);

-- (G)I-DLE - I NEVER DIE
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('i-never-die', 'TOMBOY', '3:16', 1),
  ('i-never-die', 'VILLAIN DIES', '3:23', 2),
  ('i-never-die', 'ALREADY', '3:42', 3),
  ('i-never-die', 'POLAROID', '3:05', 4),
  ('i-never-die', 'ESCAPE', '3:30', 5),
  ('i-never-die', 'LIAR', '3:28', 6),
  ('i-never-die', 'MY BAG', '3:12', 7);

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

-- BIBI - Lowlife Princess: Noir
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('lowlife-princess', 'Animal Farm', '2:56', 1),
  ('lowlife-princess', 'Best Lover', '2:54', 2),
  ('lowlife-princess', 'PADO', '3:14', 3),
  ('lowlife-princess', 'City Love', '3:02', 4),
  ('lowlife-princess', 'Vengeance', '3:23', 5),
  ('lowlife-princess', 'The Weekend', '3:08', 6);

-- offonoff - Boy.
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('boy', 'Cigarette', '3:12', 1),
  ('boy', 'bath', '3:43', 2),
  ('boy', 'gold', '3:28', 3),
  ('boy', 'Photograph', '3:54', 4),
  ('boy', 'midnight', '3:33', 5),
  ('boy', 'boy.', '3:19', 6);

-- Lee Hi - 4 ONLY
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('4-only', 'Red Lipstick', '2:54', 1),
  ('4-only', 'ONLY', '3:22', 2),
  ('4-only', 'Savior', '3:38', 3),
  ('4-only', 'Waterride', '3:01', 4),
  ('4-only', 'For Breakfast', '2:39', 5),
  ('4-only', 'H.S.K.T.', '2:53', 6);

-- Hoody - Departure
INSERT INTO songs (album_id, title, duration, track_number) VALUES
  ('departure', 'By Your Side', '3:22', 1),
  ('departure', 'Sunshine', '3:13', 2),
  ('departure', 'On and On', '3:38', 3),
  ('departure', 'Hangang', '3:46', 4),
  ('departure', 'Like You', '3:24', 5),
  ('departure', 'Departure', '3:52', 6);
