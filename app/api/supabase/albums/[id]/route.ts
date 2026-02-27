import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = getSupabase()
    const { id } = await params

    // Fetch album
    const { data: album, error: albumError } = await supabase
      .from('albums')
      .select('*')
      .eq('id', id)
      .single()

    if (albumError || !album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }

    // Fetch songs for this album
    const { data: songs, error: songsError } = await supabase
      .from('songs')
      .select('*')
      .eq('album_id', id)
      .order('track_number', { ascending: true })

    if (songsError) {
      return NextResponse.json({ error: songsError.message }, { status: 500 })
    }

    return NextResponse.json({
      ...album,
      source: 'supabase',
      songs: songs.map((s: { id: string; title: string; duration: string; track_number: number }) => ({
        id: s.id,
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
