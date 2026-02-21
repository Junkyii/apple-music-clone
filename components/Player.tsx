"use client";

import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[72px] bg-[#1c1c1e]/95 backdrop-blur-2xl border-t border-white/[0.06] flex items-center justify-between px-4 z-50">
      
      {/* Current Song */}
      <div className="flex items-center gap-3 w-1/3 min-w-[180px]">
        <div className="h-12 w-12 rounded-lg overflow-hidden relative shadow-lg shadow-black/30 group cursor-pointer">
          <Image 
            src="https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png" 
            alt="Midnights" 
            width={48} 
            height={48}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <span className="text-[13px] font-semibold text-[#f5f5f7] truncate cursor-pointer hover:underline decoration-[#f5f5f7]/50">
            Anti-Hero
          </span>
          <span className="text-[11px] text-[#86868b] truncate cursor-pointer hover:underline decoration-[#86868b]/50">
            Taylor Swift — Midnights
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center w-1/3">
        <div className="flex items-center gap-5">
          <button className="text-[#86868b] hover:text-[#f5f5f7] transition-colors">
            <Shuffle className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <button className="text-[#f5f5f7] hover:text-white transition-colors">
            <SkipBack className="h-5 w-5 fill-current" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-full bg-[#f5f5f7] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-black fill-black" />
            ) : (
              <Play className="h-4 w-4 text-black fill-black ml-0.5" />
            )}
          </button>
          <button className="text-[#f5f5f7] hover:text-white transition-colors">
            <SkipForward className="h-5 w-5 fill-current" />
          </button>
          <button className="text-[#86868b] hover:text-[#f5f5f7] transition-colors">
            <Repeat className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full max-w-[420px] mt-1.5">
          <span className="text-[10px] text-[#86868b] tabular-nums w-8 text-right">1:04</span>
          <div className="flex-1 group relative h-[3px] bg-white/10 rounded-full cursor-pointer">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-[#f5f5f7]/70 rounded-full group-hover:bg-[#fc3c44] transition-colors" />
            <div className="absolute top-1/2 -translate-y-1/2 left-[33%] w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
          </div>
          <span className="text-[10px] text-[#86868b] tabular-nums w-8">3:20</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end gap-2.5 w-1/3 min-w-[180px]">
        <Volume2 className="h-4 w-4 text-[#86868b]" />
        <div className="w-24 group relative h-[3px] bg-white/10 rounded-full cursor-pointer">
          <div className="absolute top-0 left-0 h-full w-2/3 bg-[#f5f5f7]/50 rounded-full group-hover:bg-[#f5f5f7]/70 transition-colors" />
        </div>
      </div>
    </div>
  );
}
