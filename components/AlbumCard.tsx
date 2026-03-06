import Image from "next/image";
import { Play } from "lucide-react";

interface AlbumCardProps {
  title: string;
  artist: string;
  image: string;
}

export function AlbumCard({ title, artist, image }: AlbumCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 cursor-pointer">
      {/* Artwork Container */}
      <div className="relative aspect-square w-full">
        {/* Glow behind image (Inherits color somewhat by blurring the actual image behind) */}
        {image && (
          <div className="absolute -inset-1 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none -z-10">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover rounded-full"
            />
          </div>
        )}

        {/* Vinyl Record (Slides out on hover) */}
        <div className="absolute right-0 top-0 bottom-0 aspect-square rounded-full bg-[#111] border border-white/10 shadow-xl opacity-0 transform translate-x-0 group-hover:translate-x-6 group-hover:opacity-100 transition-all duration-500 ease-out z-0 flex items-center justify-center">
          <div className="w-1/3 h-1/3 rounded-full border border-[#222] bg-[#1a1a1a] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-black shadow-inner" />
          </div>
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/5 m-2" />
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/5 m-4" />
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/5 m-8" />
        </div>

        {/* Main Cover Art */}
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#1c1c1e] shadow-lg shadow-black/40 z-10 border border-white/[0.04]">
          {image ? (
            <Image
              src={image}
              alt={title}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#2c2c2e] text-[#6e6e73]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-400 ease-out">
              <Play className="h-5 w-5 text-black fill-black ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Text Info */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-[14px] font-semibold truncate text-[#f5f5f7] tracking-tight group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-[13px] text-[#86868b] truncate font-medium">
          {artist}
        </p>
      </div>
    </div>
  );
}
