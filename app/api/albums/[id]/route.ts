import { NextResponse } from 'next/server';
import { getAlbum } from '@/lib/music-api';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const album = await getAlbum(id);
    return NextResponse.json(album);
  } catch (error) {
    console.error('Album API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch album' },
      { status: 500 }
    );
  }
}
