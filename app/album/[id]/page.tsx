"use client";

import { useEffect, useState } from "react";
import { ALBUMS } from "@/lib/data";
import Image from "next/image";
import { Play, Plus, MoreHorizontal, Clock, Loader2 } from "lucide-react";
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
  source: 'local' | 'spotify';
  songs: AlbumSong[];
}

export default function AlbumPage() {
  const params = useParams();
  const id = params.id as string;
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // First try local data
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

    // Otherwise fetch from Spotify API
    fetch(`/api/albums/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setAlbum({ ...data, source: 'spotify' });
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-zinc-300 mb-2">Album not found</h2>
        <p className="text-zinc-500">The album you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="p-6 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-end mb-8">
        <div className="relative w-64 h-64 shadow-2xl rounded-md overflow-hidden bg-zinc-800">
          <Image
            src={album.imageLarge || album.image}
            alt={album.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-red-500 uppercase tracking-wide">Album</h2>
            {album.source === 'spotify' && (
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-medium">
                Spotify
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-50 tracking-tight">
            {album.title}
          </h1>
          <div className="flex items-center gap-2 text-lg font-medium text-zinc-300">
            <span>{album.artist}</span>
            {album.year && (
              <>
                <span>•</span>
                <span className="text-zinc-500">{album.year}</span>
              </>
            )}
            <span>•</span>
            <span className="text-zinc-500">{album.songs.length} songs</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mb-8">
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors">
          <Play className="fill-current w-5 h-5" />
          Play
        </button>
        <button className="p-3 border border-zinc-700 rounded-full hover:bg-zinc-800 text-red-500 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
        <button className="p-3 border border-zinc-700 rounded-full hover:bg-zinc-800 text-red-500 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Songs List */}
      <div className="flex flex-col">
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 border-b border-zinc-800 text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">
          <span className="w-8 text-center">#</span>
          <span>Title</span>
          <Clock className="w-4 h-4" />
        </div>
        {album.songs.map((song, index) => (
          <div
            key={song.id || index}
            className="group grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-3 rounded-md hover:bg-zinc-800/50 items-center text-sm transition-colors cursor-pointer"
          >
            <span className="w-8 text-center text-zinc-500 group-hover:hidden">
              {song.trackNumber || index + 1}
            </span>
            <span className="w-8 text-center hidden group-hover:block text-zinc-100">
              <Play className="w-4 h-4 fill-current ml-2" />
            </span>
            <div className="flex flex-col">
              <span className="font-medium text-zinc-100">{song.title}</span>
              {song.artist && album.source === 'spotify' && (
                <span className="text-xs text-zinc-500">{song.artist}</span>
              )}
            </div>
            <span className="text-zinc-500">{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
