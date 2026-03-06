import { NextResponse } from 'next/server';
import { getDeezerAlbum } from '@/lib/deezer-api';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const album = await getDeezerAlbum(id);
    return NextResponse.json(album);
  } catch (error) {
    console.error('Album API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch album' },
      { status: 500 }
    );
  }
}
