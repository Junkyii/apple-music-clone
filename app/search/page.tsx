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

  useEffect(() => {
    const timer = setTimeout(() => search(query), 400);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <div className="px-8 pt-6 pb-28 min-h-full">
      {/* Search Input */}
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#f5f5f7] mb-5">Search</h1>
        <div className="flex items-center gap-2.5 bg-white/[0.06] rounded-xl px-4 py-3 w-full max-w-2xl border border-white/[0.04] focus-within:border-[#fc3c44]/30 focus-within:bg-white/[0.08] transition-all duration-300">
          <Search className="w-[18px] h-[18px] text-[#6e6e73] shrink-0" />
          <input
            type="text"
            placeholder="Artists, songs, albums..."
            className="bg-transparent border-none focus:outline-none text-[14px] text-[#f5f5f7] placeholder-[#6e6e73] w-full font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {loading && <Loader2 className="w-[18px] h-[18px] text-[#86868b] animate-spin shrink-0" />}
        </div>
      </div>

      {/* Empty State */}
      {!searched && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-5">
            <Search className="w-9 h-9 text-[#3a3a3c]" />
          </div>
          <h2 className="text-[18px] font-semibold text-[#86868b] mb-1.5">Search Apple Music</h2>
          <p className="text-[13px] text-[#6e6e73]">Find your favorite songs, albums, and artists</p>
        </div>
      )}

      {/* Songs */}
      {tracks.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[20px] font-bold text-[#f5f5f7] mb-4">Songs</h2>
          <div className="bg-white/[0.03] rounded-xl overflow-hidden divide-y divide-white/[0.04]">
            {tracks.slice(0, 8).map((track, i) => (
              <div
                key={`${track.id}-${i}`}
                className="flex items-center gap-4 px-4 py-2.5 hover:bg-white/[0.04] transition-colors group cursor-pointer"
              >
                {/* Album Art */}
                <div className="relative h-11 w-11 shrink-0 rounded-lg overflow-hidden bg-[#1c1c1e] shadow-md shadow-black/20">
                  {track.albumImage ? (
                    <Image src={track.albumImage} alt={track.albumTitle} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#2c2c2e] text-[#6e6e73] text-xs">♪</div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[13px] font-semibold text-[#f5f5f7] truncate">{track.title}</span>
                  <span className="text-[11px] text-[#86868b] truncate">{track.artist} — {track.albumTitle}</span>
                </div>

                <span className="text-[12px] text-[#6e6e73] tabular-nums shrink-0">{track.duration}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums */}
      {albums.length > 0 && (
        <section>
          <h2 className="text-[20px] font-bold text-[#f5f5f7] mb-4">Albums</h2>
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
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-[16px] font-medium text-[#86868b]">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-[13px] text-[#6e6e73] mt-1.5">Try a different search</p>
        </div>
      )}
    </div>
  );
}
