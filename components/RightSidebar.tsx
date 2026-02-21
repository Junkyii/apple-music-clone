import { ALBUMS } from "@/lib/data";
import Image from "next/image";
import { Plus, ListMusic, Heart } from "lucide-react";

export function RightSidebar() {
  const currentAlbum = ALBUMS[0];
  const currentSong = currentAlbum.songs ? currentAlbum.songs[0] : { title: "Unknown", duration: "0:00" };

  return (
    <div className="bg-[#1c1c1e]/60 backdrop-blur-2xl border-l border-white/[0.06] p-5 h-full flex flex-col overflow-y-auto pb-24">
      {/* Now Playing Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-semibold text-[#86868b] uppercase tracking-[0.08em]">Now Playing</h3>
      </div>

      {/* Album Artwork */}
      <div className="relative group rounded-xl overflow-hidden mb-5 shadow-2xl shadow-black/40">
        <div className="aspect-square relative w-full">
          <Image
            src={currentAlbum.image}
            alt={currentAlbum.title}
            fill
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Song Info */}
      <div className="flex items-start justify-between mb-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-[#f5f5f7] leading-tight truncate">
            {currentSong.title}
          </h2>
          <p className="text-[13px] text-[#86868b] truncate mt-0.5">
            {currentAlbum.artist} — {currentAlbum.title}
          </p>
        </div>
        <div className="flex gap-1.5 ml-3 shrink-0">
          <button className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center transition-colors">
            <Heart className="w-4 h-4 text-[#86868b]" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center transition-colors">
            <Plus className="w-4 h-4 text-[#86868b]" />
          </button>
        </div>
      </div>

      {/* Lyrics Preview */}
      <div className="bg-white/[0.04] rounded-xl p-4 mb-5">
        <div className="text-[11px] font-semibold text-[#6e6e73] uppercase tracking-[0.08em] mb-3">Lyrics</div>
        <div className="space-y-1.5">
          <p className="text-[13px] text-[#86868b] leading-relaxed">It&apos;s me, hi</p>
          <p className="text-[14px] text-[#f5f5f7] font-semibold leading-relaxed">I&apos;m the problem, it&apos;s me</p>
          <p className="text-[13px] text-[#86868b] leading-relaxed">At tea time, everybody agrees</p>
        </div>
      </div>

      {/* Up Next */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold text-[#6e6e73] uppercase tracking-[0.08em]">Up Next</span>
          <ListMusic className="w-4 h-4 text-[#6e6e73]" />
        </div>
        <div className="space-y-1">
          {ALBUMS.slice(0, 3).map((album, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer group">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 shadow-md shadow-black/20">
                <Image src={album.image} alt={album.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-[13px] font-medium text-[#f5f5f7]">
                  {album.songs?.[0]?.title || album.title}
                </p>
                <p className="truncate text-[11px] text-[#6e6e73]">{album.artist}</p>
              </div>
              <span className="text-[11px] text-[#6e6e73] tabular-nums">
                {album.songs?.[0]?.duration || '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
