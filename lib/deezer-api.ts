import { SimpleAlbum, SimpleTrack } from "./music-api";

// ─── Type Definitions ────────────────────────────────────────────────

export interface DeezerTrack {
  id: number;
  title: string;
  duration: number;
  track_position?: number;
  album: {
    id: number;
    title: string;
    cover_medium?: string;
    cover_xl?: string;
  };
  artist: {
    id: number;
    name: string;
  };
}

export interface DeezerAlbum {
  id: number;
  title: string;
  cover_medium: string;
  cover_xl: string;
  release_date?: string;
  genres?: { data: { name: string }[] };
  nb_tracks?: number;
  artist: {
    name: string;
  };
  tracks?: {
    data: DeezerTrack[];
  };
}

// ─── Constants ───────────────────────────────────────────────────────
const DEEZER_API_BASE = "https://api.deezer.com";

// ─── Helper Functions ────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function simplifyDeezerTrack(track: DeezerTrack): SimpleTrack {
  return {
    id: String(track.id),
    title: track.title,
    artist: track.artist.name,
    duration: formatDuration(track.duration),
    trackNumber: track.track_position || 1,
    albumId: String(track.album.id),
    albumTitle: track.album.title,
    albumImage: track.album.cover_xl || track.album.cover_medium || "",
  };
}

function simplifyDeezerAlbum(album: DeezerAlbum): SimpleAlbum {
  return {
    id: String(album.id),
    title: album.title,
    artist: album.artist.name,
    image: album.cover_medium,
    imageLarge: album.cover_xl,
    year: album.release_date
      ? new Date(album.release_date).getFullYear().toString()
      : "",
    genre: album.genres?.data?.[0]?.name,
    trackCount: album.nb_tracks,
    source: "deezer" as const,
  };
}

// ─── API Functions ───────────────────────────────────────────────────

/**
 * Search Deezer for tracks and albums
 */
export async function searchDeezer(query: string, limit: number = 20) {
  const trackParams = new URLSearchParams({ q: query, limit: limit.toString() });
  const albumParams = new URLSearchParams({ q: query, limit: limit.toString() });

  const [trackRes, albumRes] = await Promise.all([
    fetch(`${DEEZER_API_BASE}/search/track?${trackParams}`),
    fetch(`${DEEZER_API_BASE}/search/album?${albumParams}`),
  ]);

  if (!trackRes.ok || !albumRes.ok) throw new Error("Deezer search failed");

  const [trackData, albumData] = await Promise.all([
    trackRes.json(),
    albumRes.json(),
  ]);

  return {
    tracks: (trackData.data as DeezerTrack[]).map(simplifyDeezerTrack),
    albums: (albumData.data as DeezerAlbum[]).map(simplifyDeezerAlbum),
  };
}

/**
 * Get Top Chart from Deezer (Albums and Tracks)
 */
export async function getDeezerChart(limit: number = 10) {
  const response = await fetch(`${DEEZER_API_BASE}/chart/0?limit=${limit}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) throw new Error("Deezer chart failed");

  const data = await response.json();

  return {
    albums: (data.albums?.data || []).map((album: DeezerAlbum) =>
      simplifyDeezerAlbum(album)
    ),
    tracks: (data.tracks?.data || []).map((track: DeezerTrack) =>
      simplifyDeezerTrack(track)
    ),
  };
}

/**
 * Get Album Details from Deezer
 */
export async function getDeezerAlbum(albumId: string) {
  // Use sequential fetch for simplicity, or parallel if we needed genres/tracks separately
  const response = await fetch(`${DEEZER_API_BASE}/album/${albumId}`);

  if (!response.ok) throw new Error("Deezer album lookup failed");

  const album = await response.json();
  
  if (album.error) {
    throw new Error(`Deezer API Error: ${album.error.message}`);
  }

  const simpleAlbum = simplifyDeezerAlbum(album as DeezerAlbum);

  return {
    ...simpleAlbum,
    totalTracks: album.nb_tracks || 0,
    songs: (album.tracks?.data || []).map((track: DeezerTrack) => ({
      id: String(track.id),
      title: track.title,
      duration: formatDuration(track.duration),
      trackNumber: track.track_position || 0,
      artist: track.artist.name,
    })),
  };
}
