"use client";

import {
  Home,
  Search,
  Radio,
  ListMusic,
  Music2,
  Clock,
  Heart,
  Mic2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Listen Now", href: "/" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Radio, label: "Radio", href: "/radio" },
];

const libraryItems = [
  { icon: Clock, label: "Recently Added", href: "/library/recent" },
  { icon: Mic2, label: "Artists", href: "/library/artists" },
  { icon: Music2, label: "Albums", href: "/library/albums" },
  { icon: ListMusic, label: "Songs", href: "/library/songs" },
  { icon: Heart, label: "Favorites", href: "/library/favorites" },
];

const playlists = [
  "Chill Vibes",
  "Workout Energy",
  "Late Night Jazz",
  "Top 100 Global",
  "Focus Flow",
  "Road Trip Mix",
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#1c1c1e]/40 backdrop-blur-3xl border-r border-white/5 pb-24 overflow-y-auto">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <Link href="/" className="flex items-center gap-3 w-fit group">
          <div className="w-8 h-8 bg-gradient-to-br from-[#fc3c44] to-[#ff2b51] rounded-[9px] flex items-center justify-center shadow-[0_0_15px_rgba(252,60,68,0.3)] group-hover:shadow-[0_0_20px_rgba(252,60,68,0.5)] transition-shadow duration-300">
            <Music2 className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-[19px] font-bold tracking-tight text-[#f5f5f7]">Music</span>
        </Link>
      </div>

      <nav className="px-3 flex-1">
        {/* Main Navigation */}
        <div className="mb-8">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href === '/search' && pathname.startsWith('/search'));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-white/10 text-[#fc3c44]"
                      : "text-[#86868b] hover:bg-white/5 hover:text-[#f5f5f7]"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#fc3c44] rounded-r-full shadow-[0_0_8px_rgba(252,60,68,0.8)]" />
                  )}
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110",
                      isActive ? "text-[#fc3c44]" : ""
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Library */}
        <div className="mb-8">
          <h3 className="px-4 text-[11px] font-semibold text-[#6e6e73] uppercase tracking-widest mb-3">
            Library
          </h3>
          <div className="space-y-1">
            {libraryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#86868b] hover:bg-white/5 hover:text-[#f5f5f7] transition-all duration-200 group"
              >
                <item.icon className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110" strokeWidth={2} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Playlists */}
        <div>
          <h3 className="px-4 text-[11px] font-semibold text-[#6e6e73] uppercase tracking-widest mb-3">
            Playlists
          </h3>
          <div className="space-y-1">
            {playlists.map((playlist) => (
              <button
                key={playlist}
                className="w-full text-left px-4 py-1.5 rounded-lg text-[13px] font-medium text-[#86868b] hover:bg-white/5 hover:text-[#f5f5f7] transition-all duration-200 truncate"
              >
                {playlist}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
