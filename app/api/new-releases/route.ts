import { NextResponse } from 'next/server';
import { getNewReleases } from '@/lib/spotify';

export async function GET() {
  try {
    const data = await getNewReleases(10);
    return NextResponse.json(data);
  } catch (error) {
    console.error('New releases API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch new releases', albums: [] },
      { status: 500 }
    );
  }
}
