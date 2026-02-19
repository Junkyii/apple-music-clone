import { NextResponse } from 'next/server';
import { ALBUMS } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const lowercaseQuery = query.toLowerCase();

  const results = ALBUMS.filter((album) => {
    const titleMatch = album.title.toLowerCase().includes(lowercaseQuery);
    const artistMatch = album.artist.toLowerCase().includes(lowercaseQuery);
    const songMatch = album.songs?.some((song) => 
      song.title.toLowerCase().includes(lowercaseQuery)
    );

    return titleMatch || artistMatch || songMatch;
  });

  return NextResponse.json({ results });
}
