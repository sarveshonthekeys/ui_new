import { categories, playlists } from "@/data/mockData";
import { Search } from "lucide-react";

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

      {/* Categories */}
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

      {/* Curated Playlists — count top-right, title bottom-inside, no play button, no text outside */}
      <div className="px-4 mt-7">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>Curated Playlists</p>
        <div className="grid grid-cols-2 gap-3">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              className="w-full rounded-2xl relative overflow-hidden cursor-pointer active:opacity-75 transition-opacity"
              style={{ background: pl.thumbnailColor, aspectRatio: "9/14", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,15,20,0.88) 0%, rgba(11,15,20,0.2) 50%, transparent 75%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(109,74,255,0.1) 0%, transparent 60%)" }} />

              {/* Clip count — top right */}
              <div
                className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[11px] font-bold"
                style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.9)" }}
              >
                {pl.clipCount}
              </div>

              {/* Title — bottom inside */}
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                <p className="font-semibold text-[12px] leading-snug line-clamp-2" style={{ color: "var(--text-primary)" }}>{pl.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
