import { useState } from "react";
import { clips } from "@/data/mockData";
import { Play, Heart, Bookmark } from "lucide-react";
import { Link } from "wouter";

export default function Library() {
  const [tab, setTab] = useState<"liked" | "saved">("liked");
  const filtered = clips.filter((c) => (tab === "liked" ? c.liked : c.saved));

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      <div
        className="px-4 pt-5 pb-4 sticky top-0 z-40"
        style={{ background: "rgba(11,15,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <h1 className="text-[20px] font-bold mb-3" style={{ color: "var(--text-primary)" }}>Library</h1>
        <div
          className="flex gap-2 p-1 rounded-2xl"
          style={{ background: "var(--bg-elevated)" }}
        >
          {(["liked", "saved"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200"
              style={{
                background: tab === t ? "var(--accent-purple)" : "transparent",
                color: tab === t ? "#fff" : "var(--text-secondary)",
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
              {tab === "liked" ? <Heart size={24} style={{ color: "var(--text-secondary)" }} strokeWidth={1.5} /> : <Bookmark size={24} style={{ color: "var(--text-secondary)" }} strokeWidth={1.5} />}
            </div>
            <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>No {tab === "liked" ? "liked" : "saved"} clips yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((clip) => (
              <Link key={clip.id} href={`/player/${clip.id}`}>
                <div className="cursor-pointer active:opacity-75 transition-opacity">
                  <div
                    className="w-full rounded-2xl relative overflow-hidden"
                    style={{ background: clip.thumbnailColor, aspectRatio: "9/14", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,15,20,0.8) 0%, transparent 50%)" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(109,74,255,0.25)", backdropFilter: "blur(6px)" }}>
                        <Play size={14} className="text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 px-0.5">
                    <p className="font-semibold text-[12px] leading-snug line-clamp-2" style={{ color: "var(--text-primary)" }}>{clip.title}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>{clip.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
