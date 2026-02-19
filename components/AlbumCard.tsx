import Image from "next/image";
import { Play } from "lucide-react";

interface AlbumCardProps {
  title: string;
  artist: string;
  image: string;
}

export function AlbumCard({ title, artist, image }: AlbumCardProps) {
  return (
    <div className="group relative flex flex-col gap-3 rounded-md p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-800 shadow-md">
        {/* We would use Next/Image here with a real src, but for now we might use a placeholder or div if src is empty */}
        {image ? (
            <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
        ) : (
             <div className="w-full h-full flex items-center justify-center bg-zinc-300 dark:bg-zinc-700 text-zinc-500">
                No Image
             </div>
        )}
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2">
           <div className="bg-red-500 rounded-full p-2 text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
               <Play className="h-5 w-5 fill-current" />
           </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold truncate text-zinc-900 dark:text-zinc-100 leading-tight">{title}</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{artist}</p>
      </div>
    </div>
  );
}
