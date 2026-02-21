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
    <div className="flex flex-col h-full bg-[#1c1c1e]/80 backdrop-blur-2xl border-r border-white/[0.06] pb-24 overflow-y-auto">
      {/* Logo */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-[#fc3c44] to-[#d42f36] rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">
            <Music2 className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Music</span>
        </div>
      </div>

      <nav className="px-3 flex-1">
        {/* Main Navigation */}
        <div className="mb-6">
          <div className="space-y-0.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href === '/search' && pathname.startsWith('/search'));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200",
                    isActive
                      ? "bg-white/10 text-[#fc3c44]"
                      : "text-[#86868b] hover:bg-white/[0.05] hover:text-[#f5f5f7]"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px]",
                      isActive ? "text-[#fc3c44]" : ""
                    )}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Library */}
        <div className="mb-6">
          <h3 className="px-3 text-[11px] font-semibold text-[#6e6e73] uppercase tracking-[0.08em] mb-2">
            Library
          </h3>
          <div className="space-y-0.5">
            {libraryItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-[#86868b] hover:bg-white/[0.05] hover:text-[#f5f5f7] transition-all duration-200"
              >
                <item.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Playlists */}
        <div>
          <h3 className="px-3 text-[11px] font-semibold text-[#6e6e73] uppercase tracking-[0.08em] mb-2">
            Playlists
          </h3>
          <div className="space-y-0.5">
            {playlists.map((playlist) => (
              <button
                key={playlist}
                className="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium text-[#86868b] hover:bg-white/[0.05] hover:text-[#f5f5f7] transition-all duration-200 truncate"
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
