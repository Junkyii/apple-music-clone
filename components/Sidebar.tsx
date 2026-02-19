"use client";

import {
  Home,
  LayoutGrid,
  Radio,
  Search,
  PlaySquare,
  ListMusic,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutGrid, label: "Browse", href: "/browse" },
  { icon: Radio, label: "Radio", href: "/radio" },
];

const libraryItems = [
  { icon: PlaySquare, label: "Recently Added", href: "/library/recent" },
  { icon: ListMusic, label: "Artists", href: "/library/artists" },
  { icon: ListMusic, label: "Albums", href: "/library/albums" },
  { icon: ListMusic, label: "Songs", href: "/library/songs" },
];

const playlists = [
  "Chill Mix",
  "Top 100 Global",
  "Workout Energy",
  "Focus Flow",
  "Late Night Jazz",
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex bg-[#fbfbfd] dark:bg-[#1f1f1f] w-64 flex-col h-full border-r border-zinc-200 dark:border-zinc-800 pb-24 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 px-2 mb-6">
          {/* Apple Logo placeholder or text */}
          <span className="text-xl font-semibold tracking-tight">Music</span>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-9 pl-9 pr-4 rounded-md bg-zinc-100 dark:bg-[#2c2c2c] border-none text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-500/50 transition-all font-medium"
          />
        </div>

        <nav className="space-y-6">
          <div>
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-zinc-200/50 dark:bg-[#3a3a3a] text-red-500"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#2c2c2c] hover:text-zinc-900 dark:hover:text-zinc-100",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      pathname === item.href
                        ? "text-red-500"
                        : "text-zinc-500 dark:text-zinc-400",
                    )}
                  />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Library
            </h3>
            <div className="space-y-1">
              {libraryItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#2c2c2c] hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  <item.icon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Playlists
            </h3>
            <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              {playlists.map((playlist) => (
                <button
                  key={playlist}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-[#2c2c2c] hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors truncate"
                >
                  {playlist}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
