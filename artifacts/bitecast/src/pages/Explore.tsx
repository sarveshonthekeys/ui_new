import { categories, playlists } from "@/data/mockData";
import { Play, Search } from "lucide-react";

export default function Explore() {
  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      <div
        className="px-4 pt-5 pb-4 sticky top-0 z-40"
        style={{ background: "rgba(11,15,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <h1 className="text-[20px] font-bold mb-3" style={{ color: "var(--text-primary)" }}>Explore</h1>
        <div
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl"
          style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Search size={16} style={{ color: "var(--text-secondary)" }} strokeWidth={1.5} />
          <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>Search topics, creators…</span>
        </div>
      </div>

      {/* Categories — auto-height, no empty space */}
      <div className="px-4 mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>Categories</p>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-2xl px-4 py-3.5 cursor-pointer active:opacity-75 transition-opacity"
              style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <h3 className="font-semibold text-[13px] leading-snug mb-1" style={{ color: "var(--text-primary)" }}>{cat.name}</h3>
              <p className="text-[11px] leading-snug" style={{ color: "var(--text-secondary)" }}>{cat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Curated Playlists — rectangular 9:14 like library */}
      <div className="px-4 mt-7">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>Curated Playlists</p>
        <div className="grid grid-cols-2 gap-3">
          {playlists.map((pl) => (
            <div key={pl.id} className="cursor-pointer active:opacity-75 transition-opacity">
              <div
                className="w-full rounded-2xl relative overflow-hidden"
                style={{ background: pl.thumbnailColor, aspectRatio: "9/14", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,15,20,0.8) 0%, transparent 50%)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(109,74,255,0.12) 0%, transparent 60%)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(109,74,255,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(109,74,255,0.3)" }}
                  >
                    <Play size={16} className="text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="mt-2 px-0.5">
                <p className="font-semibold text-[12px] leading-snug line-clamp-2" style={{ color: "var(--text-primary)" }}>{pl.title}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>{pl.clipCount} clips</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
