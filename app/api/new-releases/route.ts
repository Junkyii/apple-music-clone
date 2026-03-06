import { NextResponse } from 'next/server';
import { getDeezerChart } from '@/lib/deezer-api';

export async function GET() {
  try {
    const data = await getDeezerChart(10);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Top albums API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top albums', albums: [] },
      { status: 500 }
    );
  }
}
