import { useParams, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { playlists, genreNames } from "@/data/mockData";

const BASE = import.meta.env.BASE_URL;

const genreImages: Record<string, string> = {
  business:   `${BASE}cat-business.png`,
  mindset:    `${BASE}cat-mindset.png`,
  science:    `${BASE}cat-science.png`,
  history:    `${BASE}cat-history.png`,
  health:     `${BASE}cat-health.png`,
  philosophy: `${BASE}cat-philosophy.png`,
};

export default function GenrePage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const name = genreNames[id] ?? id;
  const image = genreImages[id];
  const filtered = playlists.filter((p) => p.genreId === id);

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      {/* Back button */}
      <div className="px-4 pt-5 pb-4 flex items-center gap-3">
        <button onClick={() => navigate("/explore")} className="active:opacity-60">
          <ArrowLeft size={22} strokeWidth={1.5} style={{ color: "var(--text-primary)" }} />
        </button>
        <h1 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>{name}</h1>
      </div>

      {/* Hero image */}
      {image && (
        <div className="px-4 mb-6">
          <img src={image} alt={name} className="w-full rounded-2xl block" draggable={false} />
        </div>
      )}

      {/* Playlists */}
      <div className="px-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>
          Playlists
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2">
            <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>No playlists yet for this genre</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((pl) => (
              <div
                key={pl.id}
                className="w-full rounded-2xl relative overflow-hidden cursor-pointer active:opacity-75 transition-opacity"
                style={{ background: pl.thumbnailColor, aspectRatio: "9/14", border: "1px solid rgba(255,255,255,0.05)" }}
                onClick={() => navigate(`/playlist/${pl.id}`)}
              >
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,15,20,0.88) 0%, rgba(11,15,20,0.2) 50%, transparent 75%)" }} />
                <div
                  className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[11px] font-bold"
                  style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.9)" }}
                >
                  {pl.clipIds.length}
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                  <p className="font-semibold text-[12px] leading-snug line-clamp-2 text-white">{pl.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
