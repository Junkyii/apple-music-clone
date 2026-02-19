"use client";

import { Play, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react";
import Image from "next/image";
import { Slider } from "@/components/ui/slider"; // We'll need to create this or mock it for now. I'll mock a simple one inline or use standard input range for MVP.

export function Player() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#fbfbfd]/90 dark:bg-[#1f1f1f]/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 z-50">
      
      {/* Current Song */}
      <div className="flex items-center gap-3 w-1/3 min-w-[200px]">
        <div className="h-12 w-12 bg-zinc-200 rounded-md overflow-hidden relative shadow-sm group">
           <Image 
             src="https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png" 
             alt="Midnights" 
             width={48} 
             height={48}
             className="object-cover"
           />
           {/* Hover expand indicator (optional aesthetic detail) */}
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate hover:underline cursor-pointer">Anti-Hero</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate hover:underline cursor-pointer">Taylor Swift</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center w-1/3 text-center">
        <div className="flex items-center gap-6">
          <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            <Shuffle className="h-4 w-4" />
          </button>
          <button className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors fill-current">
            <SkipBack className="h-6 w-6 fill-current" />
          </button>
          <button className="text-zinc-900 dark:text-zinc-100 hover:scale-105 transition-transform">
            <Play className="h-8 w-8 fill-current" />
          </button>
          <button className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            <SkipForward className="h-6 w-6 fill-current" />
          </button>
          <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            <Repeat className="h-4 w-4" />
          </button>
        </div>
        {/* Progress Bar Placeholder */}
        <div className="w-full max-w-[400px] mt-2 group relative h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full cursor-pointer">
           <div className="absolute top-0 left-0 h-full w-1/3 bg-zinc-500 dark:bg-zinc-400 rounded-full group-hover:bg-red-500 transition-colors"></div>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end gap-3 w-1/3 min-w-[200px]">
        <Volume2 className="h-5 w-5 text-zinc-500" />
        <div className="w-24 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full cursor-pointer relative group">
          <div className="absolute top-0 left-0 h-full w-2/3 bg-zinc-500 dark:bg-zinc-400 rounded-full"></div>
        </div>
      </div>

    </div>
  );
}
