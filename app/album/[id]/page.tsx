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
  source: 'local' | 'itunes' | 'deezer';
  songs: AlbumSong[];
}

export default function AlbumPage() {
  const params = useParams();
  const id = params.id as string;
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check local data first
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

    // Try Supabase first, then external API
    fetch(`/api/supabase/albums/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          // If not in Supabase, fetch from external API via generic search if we use id as query, or direct album
          return fetch(`/api/search?q=${id}`)
            .then(res => res.json())
            .then(searchData => {
                // To keep it simple, we just fallback to the album id endpoint
                return fetch(`/api/albums/${id}`).then(r => r.json());
            })
            .then(apiData => {
              if (apiData.error) setError(true);
              else setAlbum(apiData);
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
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="w-10 h-10 text-[#fc3c44] animate-spin" />
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="px-8 flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-in-up">
        <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center mb-6 shadow-xl border border-white/5">
          <Loader2 className="w-10 h-10 text-[#6e6e73]" />
        </div>
        <h2 className="text-[24px] font-bold text-[#f5f5f7] mb-2 tracking-tight">Album Not Found</h2>
        <p className="text-[15px] font-medium text-[#86868b]">This album might be unavailable or the link is incorrect.</p>
      </div>
    );
  }

  return (
    <div className="px-8 pt-8 pb-32 max-w-[1200px] mx-auto min-h-screen">
      {/* Background Blur Effect */}
      <div className="fixed top-0 left-0 w-full h-[500px] -z-10 overflow-hidden opacity-30 select-none pointer-events-none">
        <Image 
          src={album.imageLarge || album.image} 
          alt="" 
          fill 
          className="object-cover blur-[100px] scale-150 saturate-200"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#141414]/80 to-[#141414]" />
      </div>
      {/* Album Header */}
      <div className="flex flex-col md:flex-row gap-8 items-end mb-10 animate-fade-in-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
        {/* Artwork */}
        <div className="relative w-[240px] h-[240px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] shrink-0 group border border-white/5 transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src={album.imageLarge || album.image}
            alt={album.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2.5 pb-2">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-bold text-[#fc3c44] uppercase tracking-widest">Album</span>
            {album.source !== 'local' && (
              <span className="text-[10px] glass-panel border border-[#fc3c44]/30 text-[#fc3c44] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm">
                Apple Music
              </span>
            )}
          </div>
          <h1 className="text-[40px] md:text-[56px] font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
            {album.title}
          </h1>
          <div className="flex items-center gap-2.5 text-[15px] font-semibold text-[#86868b] mt-1">
            <span className="text-[#f5f5f7] hover:underline cursor-pointer transition-colors decoration-white/30">{album.artist}</span>
            {album.year && (
              <>
                <span className="text-white/20">•</span>
                <span>{album.year}</span>
              </>
            )}
            <span className="text-white/20">•</span>
            <span>{album.songs.length} songs</span>
            {album.genre && (
              <>
                <span className="text-white/20">•</span>
                <span>{album.genre}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mb-10 animate-fade-in-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
        <button className="flex items-center gap-2.5 bg-[#fc3c44] hover:bg-[#ff4e56] text-white pl-6 pr-7 py-3 rounded-full font-bold text-[15px] transition-all duration-300 shadow-lg shadow-[#fc3c44]/25 hover:shadow-xl hover:shadow-[#fc3c44]/40 hover:scale-105 active:scale-95">
          <Play className="fill-current w-[18px] h-[18px]" />
          Play
        </button>
        <button className="flex items-center gap-2.5 glass-panel hover:bg-white/[0.08] text-[#f5f5f7] pl-6 pr-7 py-3 rounded-full font-bold text-[15px] transition-all duration-300 hover:scale-105 active:scale-95 group border border-white/5">
          <Pause className="w-[18px] h-[18px] text-[#f5f5f7] group-hover:text-white transition-colors" />
          Shuffle
        </button>
        <div className="h-6 w-px bg-white/10 mx-1" />
        <button className="w-[46px] h-[46px] rounded-full glass-panel hover:bg-white/[0.08] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group border border-white/5">
          <Heart className="w-5 h-5 text-[#f5f5f7] group-hover:text-[#fc3c44] group-hover:fill-[#fc3c44] transition-colors" />
        </button>
        <button className="w-[46px] h-[46px] rounded-full glass-panel hover:bg-white/[0.08] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/5">
          <Plus className="w-6 h-6 text-[#f5f5f7]" />
        </button>
        <button className="w-[46px] h-[46px] rounded-full glass-panel hover:bg-white/[0.08] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/5">
          <MoreHorizontal className="w-[22px] h-[22px] text-[#f5f5f7]" />
        </button>
      </div>

      {/* Track List */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/5 animate-fade-in-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
        {/* Header */}
        <div className="grid grid-cols-[50px_1fr_80px] gap-4 px-6 py-4 text-[12px] font-bold text-[#86868b] uppercase tracking-widest border-b border-white/[0.06]">
          <span className="text-center">#</span>
          <span>Title</span>
          <span className="flex justify-end items-center gap-1.5 pr-2">
            <Clock className="w-[14px] h-[14px]" strokeWidth={2.5} />
          </span>
        </div>

        {/* Tracks */}
        <div className="divide-y divide-white/[0.03]">
          {album.songs.map((song, index) => (
            <div
              key={song.id || index}
              className="group grid grid-cols-[50px_1fr_80px] gap-4 px-6 py-3.5 hover:bg-white/5 items-center transition-all duration-200 cursor-pointer"
            >
              {/* Track Number / Play */}
              <div className="flex items-center justify-center w-full h-full">
                <span className="text-[14px] font-medium text-[#86868b] tabular-nums group-hover:hidden">
                  {song.trackNumber || index + 1}
                </span>
                <Play className="w-[18px] h-[18px] text-white fill-current hidden group-hover:block transition-transform transform scale-90 group-hover:scale-100" />
              </div>

              {/* Title & Artist */}
              <div className="flex flex-col min-w-0 justify-center">
                <span className="text-[15px] font-semibold text-[#f5f5f7] truncate group-hover:text-white transition-colors">{song.title}</span>
                {song.artist && album.source !== 'local' && (
                  <span className="text-[13px] font-medium text-[#86868b] truncate mt-0.5">{song.artist}</span>
                )}
              </div>

              {/* Duration */}
              <div className="flex items-center justify-end pr-2">
                <span className="text-[13px] font-medium text-[#86868b] tabular-nums">{song.duration}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Album Footer */}
        <div className="px-6 py-6 border-t border-white/[0.06] bg-black/20">
          <p className="text-[13px] font-medium text-[#86868b]">
            {album.year} • {album.songs.length} Songs, {Math.floor(album.songs.reduce((acc, song) => {
              const parts = song.duration.split(':');
              const m = parseInt(parts[0], 10) || 0;
              const s = parseInt(parts[1], 10) || 0;
              return acc + (m * 60) + s;
            }, 0) / 60)} minutes
          </p>
          <p className="text-[12px] text-[#6e6e73] mt-1.5">℗ {album.year} {album.artist}</p>
        </div>
      </div>
    </div>
  );
}
