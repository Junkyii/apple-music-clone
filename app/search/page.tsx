import { ALBUMS } from "@/lib/data";
import { AlbumCard } from "@/components/AlbumCard";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || "";

  if (!query) {
      return <div className="p-6 text-zinc-500">Please enter a search term.</div>;
  }

  // Filter Albums
  const matchingAlbums = ALBUMS.filter(
    (album) =>
      album.title.toLowerCase().includes(query) ||
      album.artist.toLowerCase().includes(query)
  );

  // Filter Songs
  const matchingSongs = ALBUMS.flatMap((album) =>
    album.songs
      .filter((song) => song.title.toLowerCase().includes(query))
      .map((song) => ({ ...song, album }))
  );

  return (
    <div className="p-6 pb-24">
      <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">Search for "{q}"</h1>

      {/* Songs Section - "Use art album more often" */}
      {matchingSongs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchingSongs.map((song, i) => (
              <div 
                key={`${song.title}-${i}`} 
                className="flex items-center gap-4 p-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors group cursor-pointer"
              >
                 {/* Album Art for Song */}
                 <div className="relative h-14 w-14 flex-shrink-0 rounded-md overflow-hidden bg-zinc-200">
                    <Image 
                        src={song.album.image} 
                        alt={song.album.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                 </div>
                 <div className="flex flex-col overflow-hidden">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{song.title}</span>
                    <span className="text-xs text-zinc-500 truncate">{song.album.artist} • {song.album.title}</span>
                 </div>
                 <div className="ml-auto text-xs text-zinc-400">
                    {song.duration}
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums Section */}
      {matchingAlbums.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {matchingAlbums.map((album) => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <AlbumCard
                  title={album.title}
                  artist={album.artist}
                  image={album.image}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      {matchingAlbums.length === 0 && matchingSongs.length === 0 && (
        <div className="text-zinc-500">No results found.</div>
      )}
    </div>
  );
}
