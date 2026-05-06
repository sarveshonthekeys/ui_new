import { categories, playlists } from "@/data/mockData";
import { Play } from "lucide-react";
import { Link } from "wouter";

export default function Explore() {
  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-2 sticky top-0 bg-black z-40">
        <h1 className="text-white text-2xl font-bold">Explore</h1>
      </div>

      {/* Categories */}
      <div className="px-4 mt-2">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl p-4 cursor-pointer active:opacity-80"
              style={{ background: cat.color, border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <h3 className="text-white font-bold text-[15px] mb-1">{cat.name}</h3>
              <p className="text-white/60 text-xs leading-snug">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Podcast Playlists */}
      <div className="px-4 mt-6">
        <h2 className="text-white text-xl font-bold mb-3">Podcast Playlists</h2>
        <div className="grid grid-cols-2 gap-3">
          {playlists.map((pl) => (
            <div key={pl.id} className="cursor-pointer active:opacity-80">
              <div
                className="w-full rounded-xl relative overflow-hidden"
                style={{ background: pl.thumbnailColor, aspectRatio: "1/1", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                    <Play size={18} className="text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="mt-2 px-1">
                <p className="text-white font-semibold text-sm leading-snug">{pl.title}</p>
                <p className="text-white/50 text-xs mt-0.5">{pl.clipCount} clips</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
