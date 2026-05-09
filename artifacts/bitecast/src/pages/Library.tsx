import { useState } from "react";
import { clips } from "@/data/mockData";
import { Heart, Bookmark } from "lucide-react";
import { useLocation } from "wouter";

export default function Library() {
  const [tab, setTab] = useState<"liked" | "saved">("liked");
  const [, navigate] = useLocation();
  const filtered = clips.filter((c) => (tab === "liked" ? c.liked : c.saved));

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      <div
        className="px-4 pt-5 pb-4"
        style={{ background: "rgba(11,15,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <h1 className="text-[20px] font-bold mb-3" style={{ color: "var(--text-primary)" }}>Library</h1>
        <div className="flex gap-2">
          {(["liked", "saved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200"
              style={{
                background: tab === t ? "#3D2A8A" : "var(--bg-elevated)",
                color: tab === t ? "#fff" : "var(--text-secondary)",
                border: tab === t ? "1px solid rgba(109,74,255,0.35)" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {t === "liked" ? <Heart size={14} strokeWidth={2} /> : <Bookmark size={14} strokeWidth={2} />}
              {t === "liked" ? "Liked" : "Saved"}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "var(--bg-elevated)" }}>
              {tab === "liked"
                ? <Heart size={24} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
                : <Bookmark size={24} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
              }
            </div>
            <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>No {tab === "liked" ? "liked" : "saved"} clips yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((clip) => (
              <div
                key={clip.id}
                className="cursor-pointer active:opacity-75 transition-opacity"
                onClick={() => navigate(`/bites?clip=${clip.id}`)}
              >
                <div
                  className="w-full rounded-2xl relative overflow-hidden"
                  style={{ background: clip.thumbnailColor, aspectRatio: "9/14", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,15,20,0.75) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                    <p className="font-semibold text-[11px] leading-snug line-clamp-2 text-white">{clip.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
