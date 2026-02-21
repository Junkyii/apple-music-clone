/**
 * iTunes Search API Helper
 * Completely free — no API key, no auth, no account needed.
 * Docs: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/
 */

// ─── Type Definitions ────────────────────────────────────────────────

export interface iTunesResult {
  trackId?: number;
  collectionId?: number;
  trackName?: string;
  collectionName?: string;
  artistName: string;
  artworkUrl100: string;
  artworkUrl60?: string;
  trackTimeMillis?: number;
  trackNumber?: number;
  trackCount?: number;
  releaseDate?: string;
  primaryGenreName?: string;
  collectionType?: string;
  wrapperType: 'track' | 'collection' | 'artist';
  kind?: string;
}

// ─── Simplified Types for Frontend ───────────────────────────────────

export interface SimpleAlbum {
  id: string;
  title: string;
  artist: string;
  image: string;
  imageLarge: string;
  year: string;
  genre?: string;
  trackCount?: number;
  source: 'itunes';
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

/** Upgrade artwork URL to higher resolution (iTunes supports dynamic sizes) */
function getHighResArt(url: string, size: number = 600): string {
  if (!url) return '';
  return url.replace('100x100bb', `${size}x${size}bb`);
}

function simplifyAlbum(item: iTunesResult): SimpleAlbum {
  return {
    id: String(item.collectionId || item.trackId || ''),
    title: item.collectionName || item.trackName || 'Unknown',
    artist: item.artistName,
    image: getHighResArt(item.artworkUrl100, 300),
    imageLarge: getHighResArt(item.artworkUrl100, 600),
    year: item.releaseDate ? new Date(item.releaseDate).getFullYear().toString() : '',
    genre: item.primaryGenreName,
    trackCount: item.trackCount,
    source: 'itunes',
  };
}

function simplifyTrack(item: iTunesResult): SimpleTrack {
  return {
    id: String(item.trackId || ''),
    title: item.trackName || 'Unknown',
    artist: item.artistName,
    duration: item.trackTimeMillis ? formatDuration(item.trackTimeMillis) : '0:00',
    trackNumber: item.trackNumber || 1,
    albumId: String(item.collectionId || ''),
    albumTitle: item.collectionName || '',
    albumImage: getHighResArt(item.artworkUrl100, 300),
  };
}

// ─── API Functions ───────────────────────────────────────────────────

/**
 * Search iTunes for songs and albums
 */
export async function searchMusic(query: string, limit: number = 20) {
  // Search for songs
  const trackParams = new URLSearchParams({
    term: query,
    media: 'music',
    entity: 'song',
    limit: limit.toString(),
  });

  // Search for albums
  const albumParams = new URLSearchParams({
    term: query,
    media: 'music',
    entity: 'album',
    limit: limit.toString(),
  });

  const [trackRes, albumRes] = await Promise.all([
    fetch(`https://itunes.apple.com/search?${trackParams}`),
    fetch(`https://itunes.apple.com/search?${albumParams}`),
  ]);

  if (!trackRes.ok || !albumRes.ok) {
    throw new Error('iTunes search failed');
  }

  const [trackData, albumData] = await Promise.all([
    trackRes.json(),
    albumRes.json(),
  ]);

  return {
    tracks: (trackData.results as iTunesResult[]).map(simplifyTrack),
    albums: (albumData.results as iTunesResult[])
      .filter((item: iTunesResult) => item.wrapperType === 'collection')
      .map(simplifyAlbum),
  };
}

/**
 * Get album details by iTunes collection ID — returns album info + all tracks
 */
export async function getAlbum(collectionId: string) {
  const params = new URLSearchParams({
    id: collectionId,
    entity: 'song',
  });

  const response = await fetch(`https://itunes.apple.com/lookup?${params}`);

  if (!response.ok) {
    throw new Error('iTunes album lookup failed');
  }

  const data = await response.json();
  const results = data.results as iTunesResult[];

  if (results.length === 0) {
    throw new Error('Album not found');
  }

  // First result is the album/collection itself
  const albumInfo = results[0];
  // Remaining results are the tracks
  const tracks = results.slice(1).filter((r: iTunesResult) => r.wrapperType === 'track');

  return {
    id: String(albumInfo.collectionId),
    title: albumInfo.collectionName || 'Unknown Album',
    artist: albumInfo.artistName,
    image: getHighResArt(albumInfo.artworkUrl100, 300),
    imageLarge: getHighResArt(albumInfo.artworkUrl100, 600),
    year: albumInfo.releaseDate ? new Date(albumInfo.releaseDate).getFullYear().toString() : '',
    genre: albumInfo.primaryGenreName,
    totalTracks: albumInfo.trackCount || tracks.length,
    source: 'itunes' as const,
    songs: tracks.map((t: iTunesResult) => ({
      id: String(t.trackId),
      title: t.trackName || 'Unknown',
      duration: t.trackTimeMillis ? formatDuration(t.trackTimeMillis) : '0:00',
      trackNumber: t.trackNumber || 0,
      artist: t.artistName,
    })),
  };
}

/**
 * Get top/trending songs (uses iTunes RSS feed for top songs)
 */
export async function getTopAlbums(limit: number = 10, genre: string = '') {
  // iTunes RSS Generator — free, no auth
  const genrePart = genre ? `/genre=${genre}` : '';
  const url = `https://itunes.apple.com/us/rss/topalbums/limit=${limit}${genrePart}/json`;

  const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour

  if (!response.ok) {
    throw new Error('iTunes top albums failed');
  }

  const data = await response.json();
  const entries = data?.feed?.entry || [];

  return {
    albums: entries.map((entry: Record<string, unknown>) => {
      const images = entry['im:image'] as { label: string; attributes: { height: string } }[];
      const bestImage = images?.[images.length - 1]?.label || '';

      return {
        id: (entry.id as { attributes: { 'im:id': string } })?.attributes?.['im:id'] || '',
        title: (entry['im:name'] as { label: string })?.label || 'Unknown',
        artist: (entry['im:artist'] as { label: string })?.label || 'Unknown',
        image: bestImage.replace('170x170bb', '300x300bb'),
        imageLarge: bestImage.replace('170x170bb', '600x600bb'),
        year: (entry['im:releaseDate'] as { label: string })?.label
          ? new Date((entry['im:releaseDate'] as { label: string }).label).getFullYear().toString()
          : '',
        genre: ((entry.category as { attributes: { label: string } })?.attributes?.label) || '',
        source: 'itunes' as const,
      };
    }),
  };
}
