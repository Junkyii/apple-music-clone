import { AlbumCard } from "@/components/AlbumCard";
import { ALBUMS } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Listen Now</h1>
      </div>
      
      <section>
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Top Picks</h2>
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
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">New Releases</h2>
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
        <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">K-Pop & KRnB Essentials</h2>
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
