import { NextResponse } from 'next/server';
import { getTopAlbums } from '@/lib/music-api';

export async function GET() {
  try {
    const data = await getTopAlbums(10);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Top albums API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top albums', albums: [] },
      { status: 500 }
    );
  }
}
