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

// Dummy genres since we don't have a Deezer genre endpoint hooked up yet
const BROWSE_GENRES = [
  { id: '132', name: 'Pop', color: 'from-pink-500 to-rose-500' },
  { id: '116', name: 'Rap/Hip Hop', color: 'from-orange-500 to-amber-500' },
  { id: '152', name: 'Rock', color: 'from-red-500 to-rose-600' },
  { id: '113', name: 'Dance', color: 'from-blue-500 to-cyan-500' },
  { id: '16', name: 'Asian Music', color: 'from-purple-500 to-indigo-500' },
  { id: '153', name: 'Blues', color: 'from-sky-500 to-blue-600' },
  { id: '85', name: 'Alternative', color: 'from-emerald-500 to-teal-500' },
  { id: '106', name: 'Electro', color: 'from-fuchsia-500 to-purple-600' },
];

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

  useEffect(() => {
    const timer = setTimeout(() => search(query), 400);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <div className="px-8 pt-8 pb-32 min-h-full max-w-[1600px] mx-auto">
      {/* Search Input */}
      <div className="mb-10 animate-fade-in-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
        <h1 className="text-3xl font-black text-[#f5f5f7] tracking-tight mb-6">Search</h1>
        <div className="flex items-center gap-3 glass-panel rounded-2xl px-5 py-3.5 w-full max-w-2xl transition-all duration-300 focus-within:border-[#fc3c44]/50 focus-within:shadow-[0_0_20px_rgba(252,60,68,0.15)] group hover:bg-white/[0.08]">
          <Search className="w-5 h-5 text-[#86868b] shrink-0 group-focus-within:text-[#fc3c44] transition-colors" />
          <input
            type="text"
            placeholder="Artists, songs, albums..."
            className="bg-transparent border-none focus:outline-none text-[15px] text-[#f5f5f7] placeholder-[#6e6e73] w-full font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {loading && <Loader2 className="w-5 h-5 text-[#fc3c44] animate-spin shrink-0" />}
        </div>
      </div>

      {/* Empty State / Browse */}
      {!searched && !loading && (
        <div className="animate-fade-in-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
          <h2 className="text-[20px] font-bold text-[#f5f5f7] mb-6">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {BROWSE_GENRES.map((genre, i) => (
              <div 
                key={genre.id} 
                className={`relative aspect-[3/2] rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br ${genre.color} shadow-lg shadow-black/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
                style={{ animationDelay: `${(i % 5) * 50}ms` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg leading-tight w-3/4 drop-shadow-md">
                  {genre.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Songs */}
      {tracks.length > 0 && (
        <section className="mb-12 animate-fade-in-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
          <h2 className="text-[22px] font-bold text-[#f5f5f7] mb-5 tracking-tight">Songs</h2>
          <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-white/5 border border-white/5">
            {tracks.slice(0, 8).map((track, i) => (
              <div
                key={`${track.id}-${i}`}
                className="flex items-center gap-4 px-5 py-3 hover:bg-white/5 transition-all duration-200 group cursor-pointer"
              >
                {/* Album Art */}
                <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-[#1c1c1e] shadow-md shadow-black/20 border border-white/5 group-hover:shadow-lg transition-all duration-300">
                  {track.albumImage ? (
                    <Image src={track.albumImage} alt={track.albumTitle} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#2c2c2e] text-[#6e6e73] text-xs">♪</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <Play className="w-5 h-5 text-white fill-current transform scale-75 group-hover:scale-100 transition-transform duration-300" />
                  </div>
                </div>

                <div className="flex flex-col min-w-0 flex-1 justify-center">
                  <span className="text-[14px] font-semibold text-[#f5f5f7] truncate group-hover:text-white transition-colors">{track.title}</span>
                  <span className="text-[12px] font-medium text-[#86868b] truncate mt-0.5">{track.artist} — {track.albumTitle}</span>
                </div>

                <span className="text-[12px] font-medium text-[#6e6e73] tabular-nums shrink-0">{track.duration}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums */}
      {albums.length > 0 && (
        <section className="animate-fade-in-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
          <h2 className="text-[22px] font-bold text-[#f5f5f7] mb-5 tracking-tight">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {albums.map((album) => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <AlbumCard title={album.title} artist={album.artist} image={album.image} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* No results */}
      {searched && !loading && tracks.length === 0 && albums.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in-up">
          <div className="w-24 h-24 rounded-3xl glass-panel flex items-center justify-center mb-6 shadow-xl border border-white/5">
            <Search className="w-10 h-10 text-[#6e6e73]" />
          </div>
          <p className="text-[18px] font-semibold text-[#f5f5f7]">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-[14px] font-medium text-[#86868b] mt-2">Check the spelling or try a different search</p>
        </div>
      )}
    </div>
  );
}
