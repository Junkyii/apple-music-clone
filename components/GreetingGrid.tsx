import { ALBUMS } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export function GreetingGrid() {
  const shortcuts = ALBUMS.slice(0, 6);

  return (
    <div className="mb-10 animate-fade-in-up" style={{ '--delay': '100ms' } as React.CSSProperties}>
      
      {/* Animated Hero Banner */}
      <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 group cursor-pointer">
        <div className="absolute inset-0 bg-animated-gradient opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
        </div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.2em] text-[#fc3c44] uppercase mb-2">
            Featured Mix
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
            Discover Daily
          </h1>
          <p className="text-[#f5f5f7]/80 text-sm sm:text-base max-w-md font-medium">
            New tracks picked for you. Updated every morning.
          </p>
          
          <div className="absolute right-6 sm:right-8 bottom-6 sm:bottom-8">
            <button className="w-12 h-12 sm:w-14 sm:h-14 bg-[#fc3c44] hover:bg-[#ff4e56] rounded-full flex items-center justify-center shadow-lg shadow-[#fc3c44]/30 hover:scale-105 active:scale-95 transition-all duration-300">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {shortcuts.map((album, index) => (
          <Link
            key={`shortcut-${album.title}`}
            href={album.id ? `/album/${album.id}` : '#'}
            className="group relative flex items-center glass-panel hover:bg-white/[0.08] transition-all duration-300 rounded-xl overflow-hidden"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 shadow-md shadow-black/20">
              <Image
                src={album.image}
                alt={album.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 min-w-0 px-3 sm:px-4 py-2">
              <p className="font-bold text-[13px] sm:text-[14px] text-[#f5f5f7] truncate group-hover:text-white transition-colors">
                {album.title}
              </p>
              <p className="text-[11px] sm:text-[12px] text-[#86868b] truncate mt-0.5">
                {album.artist}
              </p>
            </div>
            
            {/* Play button on hover */}
            <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
              <div className="w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[#fc3c44] hover:border-[#fc3c44] rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300 text-white hover:text-white">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </div>

            {/* Playing indicator */}
            {(index === 0) && (
              <div className="absolute right-4 group-hover:opacity-0 transition-opacity">
                <div className="flex space-x-[2px] items-end h-4 w-3.5">
                  <span className="w-[3px] bg-[#fc3c44] rounded-full animate-[music-bar_1s_ease-in-out_infinite] h-2" />
                  <span className="w-[3px] bg-[#fc3c44] rounded-full animate-[music-bar_1.5s_ease-in-out_infinite] h-3" />
                  <span className="w-[3px] bg-[#fc3c44] rounded-full animate-[music-bar_1.2s_ease-in-out_infinite] h-1.5" />
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
