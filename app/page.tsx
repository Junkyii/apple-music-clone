"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlbumCard } from "@/components/AlbumCard";
import { ALBUMS } from "@/lib/data";
import Link from "next/link";
import { GreetingGrid } from "@/components/GreetingGrid";
import { Search, Loader2, ChevronRight } from "lucide-react";

interface TrendingAlbum {
  id: string;
  title: string;
  artist: string;
  image: string;
  year: string;
}

interface SupabaseAlbum {
  id: string;
  title: string;
  artist: string;
  image: string;
  year: string;
  genre: string;
}

function SectionHeader({ title, badge, href }: { title: string; badge?: string; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <h2 className="text-[22px] font-bold tracking-tight text-[#f5f5f7]">{title}</h2>
        {badge && (
          <span className="text-[10px] bg-[#fc3c44]/15 border border-[#fc3c44]/30 text-[#fc3c44] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest shadow-sm shadow-[#fc3c44]/20">
            {badge}
          </span>
        )}
      </div>
      {href && (
        <Link href={href} className="flex items-center gap-1 text-[13px] font-bold text-[#fc3c44] hover:text-[#ff4e56] transition-colors group">
          See All
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

// Horizontal scroll container component
function ScrollRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex overflow-x-auto pb-6 -mx-8 px-8 gap-5 snap-x snap-mandatory scrollbar-hide scroll-smooth" 
         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {children}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [trending, setTrending] = useState<TrendingAlbum[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [kpopAlbums, setKpopAlbums] = useState<SupabaseAlbum[]>([]);
  const [krnbAlbums, setKrnbAlbums] = useState<SupabaseAlbum[]>([]);
  const [kpopLoading, setKpopLoading] = useState(true);

  useEffect(() => {
    fetch("/api/new-releases")
      .then(res => res.json())
      .then(data => setTrending(data.albums || []))
      .catch(err => console.error("Failed to fetch trending:", err))
      .finally(() => setTrendingLoading(false));

    // Fetch K-Pop & K-R&B from Supabase
    Promise.all([
      fetch("/api/supabase/albums?genre=kpop").then(r => r.json()),
      fetch("/api/supabase/albums?genre=krnb").then(r => r.json()),
    ])
      .then(([kpopData, krnbData]) => {
        setKpopAlbums(kpopData.albums || []);
        setKrnbAlbums(krnbData.albums || []);
      })
      .catch(err => console.error("Failed to fetch K-Pop/K-R&B:", err))
      .finally(() => setKpopLoading(false));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="px-8 pt-8 pb-32 min-h-full max-w-[1600px] mx-auto">
      
      {/* Search Bar - Animated Entrance */}
      <div className="mb-10 animate-fade-in-up" style={{ '--delay': '0ms' } as React.CSSProperties}>
        <form onSubmit={handleSearch} className="flex items-center gap-3 glass-panel rounded-2xl px-5 py-3.5 w-full max-w-xl transition-all duration-300 focus-within:border-[#fc3c44]/50 focus-within:shadow-[0_0_20px_rgba(252,60,68,0.15)] group hover:bg-white/[0.08]">
          <Search className="w-5 h-5 text-[#86868b] shrink-0 group-focus-within:text-[#fc3c44] transition-colors" />
          <input
            type="text"
            placeholder="Search artists, songs, and albums"
            className="bg-transparent border-none focus:outline-none text-[15px] text-[#f5f5f7] placeholder-[#6e6e73] w-full font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Quick Access Grid */}
      <GreetingGrid />
      
      {/* Trending Now — From API */}
      <section className="mb-14 animate-fade-in-up" style={{ '--delay': '200ms' } as React.CSSProperties}>
        <SectionHeader title="Trending on Apple Music" badge="Deezer API" href="/search" />
        {trendingLoading ? (
          <div className="flex items-center justify-center py-16 w-full glass-panel rounded-2xl border-dashed">
            <Loader2 className="w-8 h-8 text-[#fc3c44] animate-spin" />
          </div>
        ) : trending.length > 0 ? (
          <ScrollRow>
            {trending.map((album) => (
              <div key={album.id} className="min-w-[160px] max-w-[200px] sm:min-w-[200px] w-full snap-start shrink-0">
                <Link href={`/album/${album.id}`}>
                  <AlbumCard title={album.title} artist={album.artist} image={album.image} />
                </Link>
              </div>
            ))}
          </ScrollRow>
        ) : (
          <div className="glass-panel rounded-2xl p-10 text-center">
            <p className="text-[15px] font-medium text-[#86868b]">Loading trending music...</p>
          </div>
        )}
      </section>

      {/* Made For You */}
      <section className="mb-14 animate-fade-in-up" style={{ '--delay': '300ms' } as React.CSSProperties}>
        <SectionHeader title="Made For You" />
        <ScrollRow>
          {ALBUMS.slice(0, 6).map((album, i) => (
            <div key={`made-for-${album.title}`} className="min-w-[160px] max-w-[200px] sm:min-w-[200px] w-full snap-start shrink-0">
              <Link href={album.id ? `/album/${album.id}` : '#'}>
                <AlbumCard
                  title={`Daily Mix 0${i + 1}`}
                  artist={`${album.artist}, ${ALBUMS[(i+1)%ALBUMS.length].artist}...`}
                  image={album.image}
                />
              </Link>
            </div>
          ))}
        </ScrollRow>
      </section>
      
      {/* Top Picks */}
      <section className="mb-14 animate-fade-in-up" style={{ '--delay': '400ms' } as React.CSSProperties}>
        <SectionHeader title="Top Picks" />
        <ScrollRow>
          {ALBUMS.slice(8, 16).map((album) => (
            <div key={album.title} className="min-w-[160px] max-w-[200px] sm:min-w-[200px] w-full snap-start shrink-0">
              <Link href={album.id ? `/album/${album.id}` : '#'}>
                <AlbumCard title={album.title} artist={album.artist} image={album.image} />
              </Link>
            </div>
          ))}
        </ScrollRow>
      </section>

      {/* Database Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 animate-fade-in-up" style={{ '--delay': '500ms' } as React.CSSProperties}>
        {/* K-Pop */}
        <section>
          <SectionHeader title="K-Pop Essentials" badge="Supabase" />
          {kpopLoading ? (
            <div className="flex items-center justify-center py-16 glass-panel rounded-2xl">
              <Loader2 className="w-8 h-8 text-[#fc3c44] animate-spin" />
            </div>
          ) : kpopAlbums.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {kpopAlbums.slice(0, 6).map((album) => (
                <Link key={`kpop-${album.id}`} href={`/album/${album.id}`}>
                  <AlbumCard title={album.title} artist={album.artist} image={album.image} />
                </Link>
              ))}
            </div>
          ) : null}
        </section>

        {/* K-R&B */}
        <section>
          <SectionHeader title="K-R&B Essentials" badge="Supabase" />
          {kpopLoading ? (
            <div className="flex items-center justify-center py-16 glass-panel rounded-2xl">
              <Loader2 className="w-8 h-8 text-[#fc3c44] animate-spin" />
            </div>
          ) : krnbAlbums.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {krnbAlbums.slice(0, 6).map((album) => (
                <Link key={`krnb-${album.id}`} href={`/album/${album.id}`}>
                  <AlbumCard title={album.title} artist={album.artist} image={album.image} />
                </Link>
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
