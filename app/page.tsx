"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlbumCard } from "@/components/AlbumCard";
import { ALBUMS } from "@/lib/data";
import Link from "next/link";
import { GreetingGrid } from "@/components/GreetingGrid";
import { Search, Loader2 } from "lucide-react";

interface TrendingAlbum {
  id: string;
  title: string;
  artist: string;
  image: string;
  year: string;
}

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [trending, setTrending] = useState<TrendingAlbum[]>([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  // Fetch trending/new releases from Spotify
  useEffect(() => {
    fetch("/api/new-releases")
      .then(res => res.json())
      .then(data => {
        setTrending(data.albums || []);
      })
      .catch(err => console.error("Failed to fetch trending:", err))
      .finally(() => setTrendingLoading(false));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="p-6 pb-24 bg-gradient-to-b from-zinc-900/50 to-black min-h-full">
      
      {/* Search Bar */}
      <div className="flex items-center justify-between mb-6">
        <form onSubmit={handleSearch} className="flex items-center space-x-2 bg-zinc-800/50 rounded-full px-4 py-2 w-full max-w-md border border-zinc-700/30 focus-within:border-red-500/40 transition-colors">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-transparent border-none focus:outline-none text-sm text-zinc-100 placeholder-zinc-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="flex items-center space-x-4">
            {/* Icons */}
        </div>
      </div>

       <GreetingGrid />
      
      {/* Trending Now - From Spotify API */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-white">Trending Now</h2>
            <span className="text-xs bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full font-medium">
              Apple Music
            </span>
          </div>
          <Link href="/search" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            Show all
          </Link>
        </div>
        {trendingLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
          </div>
        ) : trending.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {trending.slice(0, 5).map((album) => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <AlbumCard
                  title={album.title}
                  artist={album.artist}
                  image={album.image}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">Connect to see trending music from Apple Music.</p>
        )}
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Made For You</h2>
            <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white">Show all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
      
      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-100">Top Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {ALBUMS.map((album) => (
            <Link key={album.title} href={album.id ? `/album/${album.id}` : '#'}>
                <AlbumCard
                title={album.title}
                artist={album.artist}
                image={album.image}
                />
            </Link>
          ))}
        </div>
      </section>

       <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-zinc-100">New Releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {ALBUMS.slice(0, 4).reverse().map((album) => (
             <Link key={`new-${album.title}`} href={album.id ? `/album/${album.id}` : '#'}>
                <AlbumCard
                title={album.title}
                artist={album.artist}
                image={album.image}
                />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-zinc-100">K-Pop & KRnB Essentials</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {ALBUMS.slice(8).map((album) => (
             <Link key={`kpop-${album.title}`} href={album.id ? `/album/${album.id}` : '#'}>
                <AlbumCard
                title={album.title}
                artist={album.artist}
                image={album.image}
                />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
