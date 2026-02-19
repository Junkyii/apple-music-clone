import { AlbumCard } from "@/components/AlbumCard";
import { ALBUMS } from "@/lib/data";
import Link from "next/link";
import { GreetingGrid } from "@/components/GreetingGrid";

export default function Home() {
  return (
    <div className="p-6 pb-24 bg-gradient-to-b from-zinc-900/50 to-black min-h-full">
      
      {/* Search Bar / Header Mockup (Visual Only for now) */}
      <div className="flex items-center justify-between mb-6">
         <div className="flex items-center space-x-2 bg-zinc-800/50 rounded-full px-4 py-2 w-full max-w-md">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
             <input type="text" placeholder="What do you want to play?" className="bg-transparent border-none focus:outline-none text-sm text-zinc-100 placeholder-zinc-400 w-full" />
         </div>
         <div className="flex items-center space-x-4">
             {/* Icons */}
         </div>
      </div>

       <GreetingGrid />
      
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-white">Made For You</h2>
            <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white">Show all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {ALBUMS.slice(0, 4).map((album, i) => (
            <Link key={`made-for-${album.title}`} href={album.id ? `/album/${album.id}` : '#'}>
                <AlbumCard
                title={`Daily Mix 0${i + 1}`}
                artist={`${album.artist}, ${ALBUMS[(i+1)%ALBUMS.length].artist}...`}
                image={album.image}
                />
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-100">Top Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {ALBUMS.map((album) => (
            <Link key={album.title} href={album.id ? `/album/${album.id}` : '#'}>
                <AlbumCard
                title={album.title}
                artist={album.artist}
                image={album.image}
                />
            </Link>
          ))}
        </div>
      </section>

       <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-zinc-100">New Releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {ALBUMS.slice(0, 4).reverse().map((album) => (
             <Link key={`new-${album.title}`} href={album.id ? `/album/${album.id}` : '#'}>
                <AlbumCard
                title={album.title}
                artist={album.artist}
                image={album.image}
                />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-zinc-100">K-Pop & KRnB Essentials</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {ALBUMS.slice(8).map((album) => (
             <Link key={`kpop-${album.title}`} href={album.id ? `/album/${album.id}` : '#'}>
                <AlbumCard
                title={album.title}
                artist={album.artist}
                image={album.image}
                />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
