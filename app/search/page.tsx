"use client";

import { useState, useEffect, useCallback } from "react";
import { AlbumCard } from "@/components/AlbumCard";
import Link from "next/link";
import Image from "next/image";
import { Play, Search, Loader2 } from "lucide-react";

interface SearchTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  albumId: string;
  albumTitle: string;
  albumImage: string;
}

interface SearchAlbum {
  id: string;
  title: string;
  artist: string;
  image: string;
  year: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<SearchTrack[]>([]);
  const [albums, setAlbums] = useState<SearchAlbum[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setTracks([]);
      setAlbums([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setTracks(data.tracks || []);
      setAlbums(data.albums || []);
      setSearched(true);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <div className="p-6 pb-24 bg-gradient-to-b from-zinc-900/50 to-black min-h-full">
      {/* Search Input */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 bg-zinc-800/60 rounded-xl px-5 py-3.5 w-full max-w-2xl border border-zinc-700/50 focus-within:border-red-500/50 transition-colors">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Search for songs, albums, or artists..."
            className="bg-transparent border-none focus:outline-none text-base text-zinc-100 placeholder-zinc-500 w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {loading && <Loader2 className="w-5 h-5 text-zinc-400 animate-spin shrink-0" />}
        </div>
      </div>

      {/* No query state */}
      {!searched && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="w-16 h-16 text-zinc-700 mb-4" />
          <h2 className="text-xl font-semibold text-zinc-400 mb-2">Search Apple Music</h2>
          <p className="text-sm text-zinc-600">Find songs, albums, and artists from the Apple Music catalog</p>
        </div>
      )}

      {/* Songs Section */}
      {tracks.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-zinc-100">Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {tracks.map((track, i) => (
              <div
                key={`${track.id}-${i}`}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors group cursor-pointer"
              >
                {/* Album Art for Song */}
                <div className="relative h-14 w-14 shrink-0 rounded-md overflow-hidden bg-zinc-800 shadow-md">
                  {track.albumImage ? (
                    <Image
                      src={track.albumImage}
                      alt={track.albumTitle}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-700 text-zinc-500 text-xs">
                      ♪
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-5 h-5 text-white fill-current" />
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden flex-1">
                  <span className="font-medium text-zinc-100 truncate">{track.title}</span>
                  <span className="text-xs text-zinc-500 truncate">
                    {track.artist} • {track.albumTitle}
                  </span>
                </div>
                <div className="text-xs text-zinc-500 flex-shrink-0">
                  {track.duration}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums Section */}
      {albums.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-100">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {albums.map((album) => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <AlbumCard
                  title={album.title}
                  artist={album.artist}
                  image={album.image}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* No results */}
      {searched && !loading && tracks.length === 0 && albums.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg text-zinc-500">No results found for &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-zinc-600 mt-2">Try searching for something else</p>
        </div>
      )}
    </div>
  );
}
