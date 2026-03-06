import { NextResponse } from 'next/server';
import { searchDeezer } from '@/lib/deezer-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ albums: [], tracks: [] });
  }

  try {
    const results = await searchDeezer(query, 20);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search', albums: [], tracks: [] },
      { status: 500 }
    );
  }
}
