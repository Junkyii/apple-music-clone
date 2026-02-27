"use client";

import { useEffect, useState } from "react";
import { ALBUMS } from "@/lib/data";
import Image from "next/image";
import { Play, Pause, Plus, MoreHorizontal, Clock, Loader2, Heart } from "lucide-react";
import { useParams } from "next/navigation";

interface AlbumSong {
  id?: string;
  title: string;
  duration: string;
  trackNumber?: number;
  artist?: string;
}

interface AlbumData {
  id: string;
  title: string;
  artist: string;
  image: string;
  imageLarge?: string;
  year: string;
  totalTracks?: number;
  genre?: string;
  source: 'local' | 'itunes';
  songs: AlbumSong[];
}

export default function AlbumPage() {
  const params = useParams();
  const id = params.id as string;
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const localAlbum = ALBUMS.find((a) => a.id === id);
    if (localAlbum) {
      setAlbum({
        id: localAlbum.id || id,
        title: localAlbum.title,
        artist: localAlbum.artist,
        image: localAlbum.image,
        year: localAlbum.year || '',
        source: 'local',
        songs: localAlbum.songs.map((s, i) => ({
          title: s.title,
          duration: s.duration,
          trackNumber: i + 1,
        })),
      });
      setLoading(false);
      return;
    }

    // Try Supabase first, then fall back to iTunes
    fetch(`/api/supabase/albums/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          // Not in Supabase, try iTunes
          return fetch(`/api/albums/${id}`)
            .then(res => res.json())
            .then(itunesData => {
              if (itunesData.error) setError(true);
              else setAlbum({ ...itunesData, source: 'itunes' });
            });
        } else {
          setAlbum({ ...data, source: 'local' });
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-7 h-7 text-[#fc3c44] animate-spin" />
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="px-8 pt-20 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-[22px] font-bold text-[#f5f5f7] mb-2">Album Not Found</h2>
        <p className="text-[14px] text-[#6e6e73]">The album you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="px-8 pt-6 pb-28">
      {/* Album Header */}
      <div className="flex flex-col md:flex-row gap-8 items-end mb-8">
        {/* Artwork */}
        <div className="relative w-[240px] h-[240px] rounded-xl overflow-hidden shadow-2xl shadow-black/50 shrink-0">
          <Image
            src={album.imageLarge || album.image}
            alt={album.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 pb-1">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-semibold text-[#fc3c44] uppercase tracking-[0.1em]">Album</span>
            {album.source === 'itunes' && (
              <span className="text-[10px] bg-[#fc3c44]/15 text-[#fc3c44] px-2 py-0.5 rounded-full font-semibold">
                Apple Music
              </span>
            )}
          </div>
          <h1 className="text-[36px] md:text-[44px] font-extrabold text-[#f5f5f7] tracking-tight leading-none">
            {album.title}
          </h1>
          <div className="flex items-center gap-2 text-[14px] text-[#86868b] font-medium mt-1">
            <span className="text-[#f5f5f7]">{album.artist}</span>
            {album.year && (
              <>
                <span className="text-[#3a3a3c]">•</span>
                <span>{album.year}</span>
              </>
            )}
            <span className="text-[#3a3a3c]">•</span>
            <span>{album.songs.length} songs</span>
            {album.genre && (
              <>
                <span className="text-[#3a3a3c]">•</span>
                <span>{album.genre}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mb-8">
        <button className="flex items-center gap-2 bg-[#fc3c44] hover:bg-[#e0353c] text-white pl-5 pr-6 py-2.5 rounded-full font-semibold text-[14px] transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20 active:scale-95">
          <Play className="fill-current w-4 h-4" />
          Play
        </button>
        <button className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-[#f5f5f7] pl-5 pr-6 py-2.5 rounded-full font-semibold text-[14px] transition-all duration-200 active:scale-95 border border-white/[0.06]">
          <Pause className="w-4 h-4" />
          Shuffle
        </button>
        <button className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center transition-colors border border-white/[0.06]">
          <Heart className="w-[18px] h-[18px] text-[#86868b]" />
        </button>
        <button className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center transition-colors border border-white/[0.06]">
          <Plus className="w-[18px] h-[18px] text-[#86868b]" />
        </button>
        <button className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center transition-colors border border-white/[0.06]">
          <MoreHorizontal className="w-[18px] h-[18px] text-[#86868b]" />
        </button>
      </div>

      {/* Track List */}
      <div className="bg-white/[0.02] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[40px_1fr_60px] gap-3 px-5 py-3 text-[11px] font-semibold text-[#6e6e73] uppercase tracking-[0.06em] border-b border-white/[0.04]">
          <span className="text-center">#</span>
          <span>Title</span>
          <span className="flex justify-end">
            <Clock className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Tracks */}
        {album.songs.map((song, index) => (
          <div
            key={song.id || index}
            className="group grid grid-cols-[40px_1fr_60px] gap-3 px-5 py-3 hover:bg-white/[0.04] items-center transition-colors cursor-pointer border-b border-white/[0.02] last:border-b-0"
          >
            {/* Track Number / Play */}
            <div className="flex items-center justify-center">
              <span className="text-[13px] text-[#6e6e73] tabular-nums group-hover:hidden">
                {song.trackNumber || index + 1}
              </span>
              <Play className="w-3.5 h-3.5 text-[#f5f5f7] fill-current hidden group-hover:block" />
            </div>

            {/* Title & Artist */}
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-medium text-[#f5f5f7] truncate">{song.title}</span>
              {song.artist && album.source === 'itunes' && (
                <span className="text-[12px] text-[#6e6e73] truncate">{song.artist}</span>
              )}
            </div>

            {/* Duration */}
            <span className="text-[13px] text-[#6e6e73] tabular-nums text-right">{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
