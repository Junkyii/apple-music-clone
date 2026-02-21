import Image from "next/image";
import { Play } from "lucide-react";

interface AlbumCardProps {
  title: string;
  artist: string;
  image: string;
}

export function AlbumCard({ title, artist, image }: AlbumCardProps) {
  return (
    <div className="group relative flex flex-col gap-2 cursor-pointer">
      {/* Album Art */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#1c1c1e] shadow-lg shadow-black/20">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#2c2c2e] text-[#6e6e73]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
            <Play className="h-5 w-5 text-black fill-black ml-0.5" />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <h3 className="text-[13px] font-semibold truncate text-[#f5f5f7] leading-tight">
          {title}
        </h3>
        <p className="text-[12px] text-[#86868b] truncate">
          {artist}
        </p>
      </div>
    </div>
  );
}
