import { useState } from "react";
import { Bell, Heart, Eye, Bookmark, Play, Clock } from "lucide-react";
import { clips, type Clip } from "@/data/mockData";
import { Link } from "wouter";

function VideoCard({ clip, onUpdate }: { clip: Clip; onUpdate: (id: string, field: "liked" | "saved", val: boolean) => void }) {
  return (
    <div className="mx-4 mb-4 rounded-[20px] overflow-hidden" style={{ background: "var(--bg-surface)" }}>
      <Link href={`/player/${clip.id}`}>
        <div
          className="w-full relative cursor-pointer"
          style={{ background: clip.thumbnailColor, aspectRatio: "16/9" }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(11,15,20,0.7) 0%, transparent 50%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(109,74,255,0.3)", backdropFilter: "blur(8px)", border: "1px solid rgba(109,74,255,0.4)" }}
            >
              <Play size={18} className="fill-white text-white ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-white text-[11px] font-medium" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
            {clip.duration}
          </div>
        </div>
      </Link>

      <div className="px-4 py-3">
        <p className="font-semibold text-[14px] leading-snug mb-1" style={{ color: "var(--text-primary)" }}>{clip.title}</p>
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--bg-elevated)" }}>
            <span className="text-[9px] font-bold" style={{ color: "var(--text-secondary)" }}>{clip.author[0].toUpperCase()}</span>
          </div>
          <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{clip.author}</span>
          <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>·</span>
          <Clock size={11} style={{ color: "var(--text-secondary)" }} />
          <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{clip.duration}</span>
        </div>

        <div className="flex items-center gap-4 pt-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <button
            className="flex items-center gap-1.5 active:scale-95 transition-transform"
            onClick={() => onUpdate(clip.id, "liked", !clip.liked)}
          >
            <Heart
              size={17}
              className={clip.liked ? "fill-current" : ""}
              style={{ color: clip.liked ? "#f87171" : "var(--text-secondary)" }}
              strokeWidth={1.5}
            />
            <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{clip.likes}</span>
          </button>
          <div className="flex items-center gap-1.5">
            <Eye size={17} style={{ color: "var(--text-secondary)" }} strokeWidth={1.5} />
            <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{clip.views}</span>
          </div>
          <button
            className="flex items-center gap-1.5 active:scale-95 transition-transform ml-auto"
            onClick={() => onUpdate(clip.id, "saved", !clip.saved)}
          >
            <Bookmark
              size={17}
              className={clip.saved ? "fill-current" : ""}
              style={{ color: clip.saved ? "var(--accent-purple)" : "var(--text-secondary)" }}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [clipList, setClipList] = useState<Clip[]>(clips);

  function handleUpdate(id: string, field: "liked" | "saved", val: boolean) {
    setClipList((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const delta = val ? 1 : -1;
        return {
          ...c,
          [field]: val,
          likes: field === "liked" ? c.likes + delta : c.likes,
          bookmarks: field === "saved" ? c.bookmarks + delta : c.bookmarks,
        };
      })
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--bg-primary)" }}>
      <div
        className="flex items-center justify-between px-4 py-4 sticky top-0 z-40"
        style={{ background: "rgba(11,15,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div>
          <h1 className="text-[20px] font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>BiteCast</h1>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Your daily dose of ideas</p>
        </div>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center active:opacity-70"
          style={{ background: "var(--bg-elevated)" }}
        >
          <Bell size={18} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
        </button>
      </div>

      <div className="pt-4">
        {clipList.map((clip) => (
          <VideoCard key={clip.id} clip={clip} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  );
}
