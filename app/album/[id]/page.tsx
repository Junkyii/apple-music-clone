import { ALBUMS } from "@/lib/data";
import Image from "next/image";
import { Play, Plus, MoreHorizontal, Clock } from "lucide-react";

export async function generateStaticParams() {
    return ALBUMS.filter(a => a.id).map((album) => ({
      id: album.id,
    }));
  }

export default async function AlbumPage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    // Await params in Next.js 15
    const { id } = await params;
    const album = ALBUMS.find((a) => a.id === id);
  
    if (!album) {
      return <div>Album not found</div>;
    }

  return (
    <div className="p-6 pb-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 items-end mb-8">
            <div className="relative w-64 h-64 shadow-2xl rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                <Image 
                    src={album.image} 
                    alt={album.title} 
                    fill 
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-red-500 uppercase tracking-wide">Album</h2>
                <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">{album.title}</h1>
                <div className="flex items-center gap-2 text-lg font-medium text-zinc-600 dark:text-zinc-300">
                    <span>{album.artist}</span>
                    <span>•</span>
                    <span className="text-zinc-500">{album.year}</span>
                    <span>•</span>
                    <span className="text-zinc-500">{album.songs?.length || 0} songs</span>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mb-8">
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors">
                <Play className="fill-current w-5 h-5" />
                Play
            </button>
            <button className="p-3 border border-zinc-300 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-red-500 transition-colors">
                <Plus className="w-5 h-5" />
            </button>
            <button className="p-3 border border-zinc-300 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-red-500 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
            </button>
        </div>

        {/* Songs List */}
        <div className="flex flex-col">
            <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2">
                <span className="w-8 text-center">#</span>
                <span>Title</span>
                <Clock className="w-4 h-4" />
            </div>
            {album.songs?.map((song, index) => (
                <div 
                    key={index} 
                    className="group grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/50 items-center text-sm transition-colors cursor-pointer"
                >
                    <span className="w-8 text-center text-zinc-500 group-hover:hidden">{index + 1}</span>
                    <span className="w-8 text-center hidden group-hover:block text-zinc-900 dark:text-zinc-100">
                        <Play className="w-4 h-4 fill-current ml-2" />
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{song.title}</span>
                    <span className="text-zinc-500">{song.duration}</span>
                </div>
            ))}
        </div>
    </div>
  );
}
