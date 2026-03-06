"use client";

import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[76px] glass-panel border-t border-white/5 flex items-center justify-between px-6 z-50">
      
      {/* Current Song */}
      <div className="flex items-center gap-4 w-1/3 min-w-[200px]">
        <div className="h-[52px] w-[52px] rounded-xl overflow-hidden relative shadow-lg shadow-black/40 group cursor-pointer border border-white/5">
          <Image 
            src="https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png" 
            alt="Midnights" 
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <span className="text-[14px] font-semibold text-[#f5f5f7] tracking-tight truncate cursor-pointer hover:underline decoration-white/30">
            Anti-Hero
          </span>
          <span className="text-[12px] text-[#86868b] font-medium truncate cursor-pointer hover:underline decoration-white/30 mt-0.5">
            Taylor Swift — Midnights
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center w-1/3 max-w-[500px]">
        <div className="flex items-center gap-6">
          <button className="text-[#86868b] hover:text-[#f5f5f7] transition-colors">
            <Shuffle className="h-[15px] w-[15px]" strokeWidth={2.5} />
          </button>
          <button className="text-[#f5f5f7] hover:text-white transition-colors hover:scale-110 active:scale-95">
            <SkipBack className="h-5 w-5 fill-current" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
          >
            {isPlaying ? (
              <Pause className="h-[18px] w-[18px] text-black fill-black" />
            ) : (
              <Play className="h-[18px] w-[18px] text-black fill-black ml-1" />
            )}
          </button>
          <button className="text-[#f5f5f7] hover:text-white transition-colors hover:scale-110 active:scale-95">
            <SkipForward className="h-5 w-5 fill-current" />
          </button>
          <button className="text-[#86868b] hover:text-[#f5f5f7] transition-colors">
            <Repeat className="h-[15px] w-[15px]" strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full mt-2">
          <span className="text-[11px] text-[#86868b] font-medium tabular-nums w-10 text-right">1:04</span>
          
          <div className="flex-1 group relative h-1.5 bg-white/10 rounded-full cursor-pointer">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-white/80 rounded-full group-hover:bg-[#fc3c44] transition-colors" />
            <div className="absolute top-1/2 -translate-y-1/2 left-[33%] w-3.5 h-3.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md transform scale-50 group-hover:scale-100" />
          </div>
          
          <span className="text-[11px] text-[#86868b] font-medium tabular-nums w-10">3:20</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end gap-3 w-1/3 min-w-[200px]">
        <Volume2 className="h-[18px] w-[18px] text-[#86868b]" />
        <div className="w-[100px] group relative h-1.5 bg-white/10 rounded-full cursor-pointer">
          <div className="absolute top-0 left-0 h-full w-2/3 bg-white/50 rounded-full group-hover:bg-white/80 transition-colors" />
          <div className="absolute top-1/2 -translate-y-1/2 left-[66%] w-3.5 h-3.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md transform scale-50 group-hover:scale-100" />
        </div>
      </div>
    </div>
  );
}
