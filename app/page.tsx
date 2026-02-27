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
          <span className="text-[10px] bg-[#fc3c44]/15 text-[#fc3c44] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>
      {href && (
        <Link href={href} className="flex items-center gap-0.5 text-[13px] font-medium text-[#fc3c44] hover:text-[#e0353c] transition-colors">
          See All
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
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
    <div className="px-8 pt-6 pb-28 min-h-full">
      
      {/* Search Bar */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex items-center gap-2.5 bg-white/[0.06] rounded-xl px-4 py-2.5 w-full max-w-lg border border-white/[0.04] focus-within:border-[#fc3c44]/30 focus-within:bg-white/[0.08] transition-all duration-300">
          <Search className="w-[18px] h-[18px] text-[#6e6e73] shrink-0" />
          <input
            type="text"
            placeholder="Search songs, albums, artists..."
            className="bg-transparent border-none focus:outline-none text-[14px] text-[#f5f5f7] placeholder-[#6e6e73] w-full font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Quick Access Grid */}
      <GreetingGrid />
      
      {/* Trending Now — From iTunes */}
      <section className="mb-10">
        <SectionHeader title="Trending Now" badge="Live" href="/search" />
        {trendingLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-[#fc3c44] animate-spin" />
          </div>
        ) : trending.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {trending.slice(0, 5).map((album) => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <AlbumCard title={album.title} artist={album.artist} image={album.image} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white/[0.03] rounded-xl p-8 text-center">
            <p className="text-[14px] text-[#6e6e73]">Loading trending music...</p>
          </div>
        )}
      </section>

      {/* Made For You */}
      <section className="mb-10">
        <SectionHeader title="Made For You" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {ALBUMS.slice(0, 4).map((album, i) => (
            <Link key={`made-for-${album.title}`} href={album.id ? `/album/${album.id}` : '#'}>
              <AlbumCard
                title={`Daily Mix 0${i + 1}`}
                artist={`${album.artist}, ${ALBUMS[(i+1)%ALBUMS.length].artist}...`}
                image={album.image}
              />
            </Link>
          ))}
        </div>
      </section>
      
      {/* Top Picks */}
      <section className="mb-10">
        <SectionHeader title="Top Picks" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {ALBUMS.map((album) => (
            <Link key={album.title} href={album.id ? `/album/${album.id}` : '#'}>
              <AlbumCard title={album.title} artist={album.artist} image={album.image} />
            </Link>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-10">
        <SectionHeader title="New Releases" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {ALBUMS.slice(0, 4).reverse().map((album) => (
            <Link key={`new-${album.title}`} href={album.id ? `/album/${album.id}` : '#'}>
              <AlbumCard title={album.title} artist={album.artist} image={album.image} />
            </Link>
          ))}
        </div>
      </section>

      {/* K-Pop */}
      <section className="mb-10">
        <SectionHeader title="K-Pop Essentials" badge="Supabase" />
        {kpopLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-[#fc3c44] animate-spin" />
          </div>
        ) : kpopAlbums.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {kpopAlbums.map((album) => (
              <Link key={`kpop-${album.id}`} href={`/album/${album.id}`}>
                <AlbumCard title={album.title} artist={album.artist} image={album.image} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {ALBUMS.slice(8).map((album) => (
              <Link key={`kpop-${album.title}`} href={album.id ? `/album/${album.id}` : '#'}>
                <AlbumCard title={album.title} artist={album.artist} image={album.image} />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* K-R&B */}
      <section className="mb-10">
        <SectionHeader title="K-R&B Essentials" badge="Supabase" />
        {kpopLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-[#fc3c44] animate-spin" />
          </div>
        ) : krnbAlbums.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {krnbAlbums.map((album) => (
              <Link key={`krnb-${album.id}`} href={`/album/${album.id}`}>
                <AlbumCard title={album.title} artist={album.artist} image={album.image} />
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
