import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const supabase = getSupabase()
    const { searchParams } = new URL(request.url)
    const albumId = searchParams.get('album_id')

    let query = supabase.from('songs').select('*').order('track_number', { ascending: true })

    if (albumId) {
      query = query.eq('album_id', albumId)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      songs: data?.map((s: { id: string; album_id: string; title: string; duration: string; track_number: number }) => ({
        id: s.id,
        albumId: s.album_id,
        title: s.title,
        duration: s.duration,
        trackNumber: s.track_number,
      })),
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
