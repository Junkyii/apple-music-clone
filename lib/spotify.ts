/**
 * Spotify Web API Helper
 * Uses Client Credentials flow from:
 * https://github.com/spotify/web-api-examples/blob/master/authorization/client_credentials/app.js
 */

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

// Token cache
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Get a Spotify access token using Client Credentials flow
 */
export async function getSpotifyToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
    },
  });

  if (!response.ok) {
    throw new Error(`Spotify auth failed: ${response.status}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  // Cache for slightly less than the expiry time (subtract 60s buffer)
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;

  return cachedToken!;
}

// ─── Type Definitions ────────────────────────────────────────────────

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  track_number: number;
  artists: SpotifyArtist[];
  album: {
    id: string;
    name: string;
    images: SpotifyImage[];
    artists: SpotifyArtist[];
  };
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  images: SpotifyImage[];
  release_date: string;
  total_tracks: number;
  tracks?: {
    items: {
      id: string;
      name: string;
      duration_ms: number;
      track_number: number;
      artists: SpotifyArtist[];
    }[];
  };
}

// ─── Simplified Types for Frontend ───────────────────────────────────

export interface SimpleAlbum {
  id: string;
  title: string;
  artist: string;
  image: string;
  year: string;
  source: 'spotify';
}

export interface SimpleTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  trackNumber: number;
  albumId: string;
  albumTitle: string;
  albumImage: string;
}

// ─── Helper Functions ────────────────────────────────────────────────

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function getBestImage(images: SpotifyImage[]): string {
  if (!images || images.length === 0) return '';
  // Prefer 300x300 size, fallback to first available
  const medium = images.find(img => img.width === 300);
  return medium?.url || images[0].url;
}

function simplifyAlbum(album: SpotifyAlbum): SimpleAlbum {
  return {
    id: album.id,
    title: album.name,
    artist: album.artists.map(a => a.name).join(', '),
    image: getBestImage(album.images),
    year: album.release_date?.split('-')[0] || '',
    source: 'spotify',
  };
}

function simplifyTrack(track: SpotifyTrack): SimpleTrack {
  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    duration: formatDuration(track.duration_ms),
    trackNumber: track.track_number,
    albumId: track.album.id,
    albumTitle: track.album.name,
    albumImage: getBestImage(track.album.images),
  };
}

// ─── API Functions ───────────────────────────────────────────────────

/**
 * Search Spotify for tracks and albums
 */
export async function searchSpotify(query: string, type: string = 'track,album', limit: number = 10) {
  const token = await getSpotifyToken();

  const params = new URLSearchParams({
    q: query,
    type,
    limit: limit.toString(),
    market: 'US',
  });

  const response = await fetch(`https://api.spotify.com/v1/search?${params}`, {
    headers: { 'Authorization': 'Bearer ' + token },
  });

  if (!response.ok) {
    throw new Error(`Spotify search failed: ${response.status}`);
  }

  const data = await response.json();

  return {
    albums: data.albums?.items?.map((a: SpotifyAlbum) => simplifyAlbum(a)) || [],
    tracks: data.tracks?.items?.map((t: SpotifyTrack) => simplifyTrack(t)) || [],
  };
}

/**
 * Get album details by Spotify album ID
 */
export async function getAlbum(albumId: string) {
  const token = await getSpotifyToken();

  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: { 'Authorization': 'Bearer ' + token },
  });

  if (!response.ok) {
    throw new Error(`Spotify get album failed: ${response.status}`);
  }

  const album: SpotifyAlbum = await response.json();

  return {
    id: album.id,
    title: album.name,
    artist: album.artists.map(a => a.name).join(', '),
    image: getBestImage(album.images),
    imageLarge: album.images?.[0]?.url || '',
    year: album.release_date?.split('-')[0] || '',
    totalTracks: album.total_tracks,
    source: 'spotify' as const,
    songs: album.tracks?.items.map(t => ({
      id: t.id,
      title: t.name,
      duration: formatDuration(t.duration_ms),
      trackNumber: t.track_number,
      artist: t.artists.map(a => a.name).join(', '),
    })) || [],
  };
}

/**
 * Get new releases from Spotify
 */
export async function getNewReleases(limit: number = 10) {
  const token = await getSpotifyToken();

  const params = new URLSearchParams({
    limit: limit.toString(),
    country: 'US',
  });

  const response = await fetch(`https://api.spotify.com/v1/browse/new-releases?${params}`, {
    headers: { 'Authorization': 'Bearer ' + token },
  });

  if (!response.ok) {
    throw new Error(`Spotify new releases failed: ${response.status}`);
  }

  const data = await response.json();

  return {
    albums: data.albums?.items?.map((a: SpotifyAlbum) => simplifyAlbum(a)) || [],
  };
}
