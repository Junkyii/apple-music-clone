import { ALBUMS } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export function GreetingGrid() {
  // Take first 6 albums for the grid
  const shortcuts = ALBUMS.slice(0, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {shortcuts.map((album, index) => (
        <Link
          key={`shortcut-${album.title}`}
          href={album.id ? `/album/${album.id}` : '#'}
          className="group relative flex items-center bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors rounded overflow-hidden pr-4"
        >
          <div className="relative w-16 h-16 flex-shrink-0 mr-4">
            <Image
              src={album.image}
              alt={album.title}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-bold text-sm text-zinc-100 truncate flex-1 py-2">
            {album.title}
          </span>
          
           {/* Play Button on Hover (Spotify Style) */}
           <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg bg-green-500 rounded-full p-2 flex items-center justify-center translate-y-2 group-hover:translate-y-0 duration-300">
               <Play className="w-5 h-5 text-black fill-black ml-1" />
           </div>
           
           {/* Playing Indicator Mockup (Show on specific items) */}
           {(index === 0 || index === 4) && (
               <div className="ml-2">
                   <div className="flex space-x-[2px] items-end h-4 w-4">
                        <span className="w-1 bg-green-500 animate-[music-bar_1s_ease-in-out_infinite] h-2"></span>
                        <span className="w-1 bg-green-500 animate-[music-bar_1.5s_ease-in-out_infinite] h-3"></span>
                        <span className="w-1 bg-green-500 animate-[music-bar_1.2s_ease-in-out_infinite] h-1.5"></span>
                   </div>
               </div>
           )}
        </Link>
      ))}
    </div>
  );
}
