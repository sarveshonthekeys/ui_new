import { useState } from "react";
import { clips } from "@/data/mockData";
import { Play } from "lucide-react";
import { Link } from "wouter";

export default function Library() {
  const [tab, setTab] = useState<"liked" | "saved">("liked");

  const filtered = clips.filter((c) => (tab === "liked" ? c.liked : c.saved));

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 sticky top-0 bg-black z-40">
        <h1 className="text-white text-2xl font-bold mb-4">Library</h1>

        {/* Tabs */}
        <div className="flex gap-3">
          <button
            onClick={() => setTab("liked")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              tab === "liked"
                ? "bg-white/15 text-white"
                : "bg-white/5 text-white/50"
            }`}
          >
            ♥ Liked
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              tab === "saved"
                ? "bg-white/15 text-white"
                : "bg-white/5 text-white/50"
            }`}
          >
            🔖 Saved
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-white/40 text-sm">
            No {tab === "liked" ? "liked" : "saved"} clips yet
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((clip) => (
              <Link key={clip.id} href={`/player/${clip.id}`}>
                <div className="cursor-pointer active:opacity-80">
                  <div
                    className="w-full rounded-xl relative overflow-hidden"
                    style={{
                      background: clip.thumbnailColor,
                      aspectRatio: "9/14",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                        <Play size={16} className="text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 px-0.5">
                    <p className="text-white font-semibold text-sm leading-snug line-clamp-2">
                      {clip.title}
                    </p>
                    <p className="text-white/50 text-xs mt-0.5">{clip.author}</p>
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
