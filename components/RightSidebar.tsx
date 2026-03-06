import { ALBUMS } from "@/lib/data";
import Image from "next/image";
import { Plus, ListMusic, Heart } from "lucide-react";

export function RightSidebar() {
  const currentAlbum = ALBUMS[0];
  const currentSong = currentAlbum.songs ? currentAlbum.songs[0] : { title: "Unknown", duration: "0:00" };

  return (
    <div className="bg-[#1c1c1e]/40 backdrop-blur-3xl border-l border-white/5 p-6 h-full flex flex-col overflow-y-auto pb-24">
      {/* Now Playing Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[11px] font-semibold text-[#86868b] uppercase tracking-widest">Now Playing</h3>
      </div>

      {/* Album Artwork */}
      <div className="relative group rounded-2xl overflow-hidden mb-6 shadow-2xl shadow-black/50 border border-white/5">
        <div className="aspect-square relative w-full">
          <Image
            src={currentAlbum.image}
            alt={currentAlbum.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle Inner Shadow */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Song Info */}
      <div className="flex items-start justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-[19px] font-bold text-[#f5f5f7] leading-tight tracking-tight truncate">
            {currentSong.title}
          </h2>
          <p className="text-[14px] font-medium text-[#86868b] truncate mt-1">
            {currentAlbum.artist} — {currentAlbum.title}
          </p>
        </div>
        <div className="flex gap-2 ml-4 shrink-0">
          <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95">
            <Heart className="w-[18px] h-[18px] text-[#f5f5f7]" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95">
            <Plus className="w-[20px] h-[20px] text-[#f5f5f7]" />
          </button>
        </div>
      </div>

      {/* Lyrics Preview */}
      <div className="glass-panel rounded-2xl p-5 mb-8">
        <div className="text-[11px] font-semibold text-[#6e6e73] uppercase tracking-widest mb-4">Lyrics preview</div>
        <div className="space-y-2">
          <p className="text-[14px] text-[#86868b] leading-relaxed font-medium">It&apos;s me, hi</p>
          <p className="text-[15px] text-[#f5f5f7] font-bold leading-relaxed">I&apos;m the problem, it&apos;s me</p>
          <p className="text-[14px] text-[#86868b] leading-relaxed font-medium">At tea time, everybody agrees</p>
        </div>
      </div>

      {/* Up Next */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-widest">Up Next</span>
          <ListMusic className="w-[15px] h-[15px] text-[#86868b]" />
        </div>
        <div className="space-y-1.5">
          {ALBUMS.slice(0, 4).map((album, i) => (
            <div key={i} className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group">
              <div className="relative w-11 h-11 rounded-[10px] overflow-hidden shrink-0 shadow-md shadow-black/30 border border-white/5">
                <Image src={album.image} alt={album.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-[14px] font-semibold text-[#f5f5f7] group-hover:text-white transition-colors">
                  {album.songs?.[0]?.title || album.title}
                </p>
                <p className="truncate text-[12px] font-medium text-[#86868b]">{album.artist}</p>
              </div>
              <span className="text-[11px] font-medium text-[#6e6e73] tabular-nums">
                {album.songs?.[0]?.duration || '—'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

