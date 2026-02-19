import { ALBUMS } from "@/lib/data";
import Image from "next/image";
import { Plus, Speaker, ListMusic } from "lucide-react";

export function RightSidebar() {
  // Use the first album's first song as placeholder "Now Playing"
  const currentAlbum = ALBUMS[0];
  const currentSong = currentAlbum.songs ? currentAlbum.songs[0] : { title: "Unknown", duration: "0:00" };

  return (
    <div className="bg-zinc-900 border-l border-zinc-800 p-4 h-full flex flex-col text-zinc-100">
      <div className="mb-4 font-bold text-lg">in {currentAlbum.artist} we trust</div>

      <div className="relative group rounded-md overflow-hidden mb-4">
        {/* Large "Now Playing" Artwork */}
         <div className="aspect-square relative w-full">
             <Image
                src={currentAlbum.image}
                alt={currentAlbum.title}
                fill
                className="object-cover"
              />
         </div>
         {/* Overlay text on image */}
          <div className="absolute top-2 left-2 text-xs font-semibold bg-blue-500/80 px-2 py-0.5 rounded text-white backdrop-blur-md">
            soft
          </div>
      </div>

      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-2xl font-bold leading-tight">{currentSong.title}</h2>
          <p className="text-zinc-400 text-sm">{currentAlbum.artist}</p>
        </div>
        <button className="text-zinc-400 hover:text-white transition">
           <Plus className="w-6 h-6" />
        </button>  
      </div>
      
       {/* Credits / Next Up Section Mockup */}
      <div className="mt-6 space-y-4">
         <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span>Next Up</span>
                <ListMusic className="w-4 h-4"/>
            </div>
             <div className="flex items-center space-x-3">
                 <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    <Image src={ALBUMS[1].image} alt="Next" fill className="object-cover" />
                 </div>
                 <div className="flex-1 min-w-0">
                     <p className="truncate text-sm font-medium text-zinc-200">{ALBUMS[1].songs?.[0].title}</p>
                      <p className="truncate text-xs text-zinc-500">{ALBUMS[1].artist}</p>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
}
