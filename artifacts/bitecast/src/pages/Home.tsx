import { useState } from "react";
import { Bell, Heart, Eye, Bookmark, Play } from "lucide-react";
import { clips, type Clip } from "@/data/mockData";
import { Link } from "wouter";

function VideoCard({ clip, onUpdate }: { clip: Clip; onUpdate: (id: string, field: "liked" | "saved", val: boolean) => void }) {
  return (
    <div className="mb-5 px-4">
      {/* Author row — above the thumbnail */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-[12px] font-bold" style={{ color: "var(--text-secondary)" }}>
            {clip.author[0].toUpperCase()}
          </span>
        </div>
        <span className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>
          {clip.author}
        </span>
      </div>

      {/* Thumbnail */}
      <Link href={`/player/${clip.id}`}>
        <div
          className="w-full rounded-2xl relative overflow-hidden cursor-pointer"
          style={{ background: clip.thumbnailColor, aspectRatio: "9/12" }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(11,15,20,0.5) 0%, transparent 40%)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-13 h-13 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
                width: 52,
                height: 52,
              }}
            >
              <Play size={20} className="fill-white text-white ml-0.5" />
            </div>
          </div>
        </div>
      </Link>

      {/* Title */}
      <p
        className="text-[15px] font-semibold leading-snug mt-2.5 mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {clip.title}
      </p>

      {/* Stats row */}
      <div className="flex items-center gap-5">
        <button
          className="flex items-center gap-1.5 active:scale-95 transition-transform"
          onClick={() => onUpdate(clip.id, "liked", !clip.liked)}
        >
          <Heart
            size={18}
            className={clip.liked ? "fill-current" : ""}
            style={{ color: clip.liked ? "#f87171" : "var(--text-secondary)" }}
            strokeWidth={1.5}
          />
          <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>{clip.likes}</span>
        </button>

        <div className="flex items-center gap-1.5">
          <Eye size={18} style={{ color: "var(--text-secondary)" }} strokeWidth={1.5} />
          <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>{clip.views}</span>
        </div>

        <button
          className="flex items-center gap-1.5 active:scale-95 transition-transform"
          onClick={() => onUpdate(clip.id, "saved", !clip.saved)}
        >
          <Bookmark
            size={18}
            className={clip.saved ? "fill-current" : ""}
            style={{ color: clip.saved ? "var(--accent-purple)" : "var(--text-secondary)" }}
            strokeWidth={1.5}
          />
          <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>{clip.bookmarks}</span>
        </button>
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
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-4 sticky top-0 z-40"
        style={{
          background: "rgba(11,15,20,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
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

      {/* Feed */}
      <div className="pt-4">
        {clipList.map((clip) => (
          <VideoCard key={clip.id} clip={clip} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  );
}
