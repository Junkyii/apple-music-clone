import { ALBUMS } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export function GreetingGrid() {
  const shortcuts = ALBUMS.slice(0, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
      {shortcuts.map((album, index) => (
        <Link
          key={`shortcut-${album.title}`}
          href={album.id ? `/album/${album.id}` : '#'}
          className="group relative flex items-center bg-white/[0.05] hover:bg-white/[0.08] transition-all duration-300 rounded-lg overflow-hidden"
        >
          <div className="relative w-[56px] h-[56px] shrink-0">
            <Image
              src={album.image}
              alt={album.title}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-semibold text-[13px] text-[#f5f5f7] truncate flex-1 px-3 py-2">
            {album.title}
          </span>
          
          {/* Play button on hover */}
          <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-8 h-8 bg-[#fc3c44] rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            </div>
          </div>

          {/* Playing indicator */}
          {(index === 0) && (
            <div className="absolute right-3 group-hover:opacity-0 transition-opacity">
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
  );
}
