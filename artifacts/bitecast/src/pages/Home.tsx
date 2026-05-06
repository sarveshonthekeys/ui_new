import { useState } from "react";
import { Bell, Heart, Eye, Bookmark, Play } from "lucide-react";
import { clips, type Clip } from "@/data/mockData";
import { Link } from "wouter";

function VideoCard({ clip, onUpdate }: { clip: Clip; onUpdate: (id: string, field: "liked" | "saved", val: boolean) => void }) {
  return (
    <div className="mb-1">
      {/* Video player area */}
      <Link href={`/player/${clip.id}`}>
        <div
          className="w-full relative cursor-pointer"
          style={{ background: clip.thumbnailColor, aspectRatio: "9/14" }}
        >
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Play size={24} className="text-white fill-white ml-1" />
            </div>
          </div>
        </div>
      </Link>

      {/* Title + stats */}
      <div className="px-3 py-2 bg-black">
        <p className="text-white font-semibold text-[15px] leading-snug mb-2">{clip.title}</p>
        <div className="flex items-center gap-5">
          <button
            className="flex items-center gap-1.5"
            onClick={() => onUpdate(clip.id, "liked", !clip.liked)}
          >
            <Heart
              size={18}
              className={clip.liked ? "fill-red-500 text-red-500" : "text-white/70"}
              strokeWidth={1.5}
            />
            <span className="text-white/70 text-sm">{clip.likes}</span>
          </button>
          <div className="flex items-center gap-1.5">
            <Eye size={18} className="text-white/70" strokeWidth={1.5} />
            <span className="text-white/70 text-sm">{clip.views}</span>
          </div>
          <button
            className="flex items-center gap-1.5"
            onClick={() => onUpdate(clip.id, "saved", !clip.saved)}
          >
            <Bookmark
              size={18}
              className={clip.saved ? "fill-amber-400 text-amber-400" : "text-white/70"}
              strokeWidth={1.5}
            />
            <span className="text-white/70 text-sm">{clip.bookmarks}</span>
          </button>
        </div>
      </div>

      {/* Author row */}
      <div className="px-3 py-2 flex items-center gap-2 bg-black border-t border-white/5">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">{clip.author[0].toUpperCase()}</span>
        </div>
        <span className="text-white/80 text-sm">{clip.author}</span>
      </div>
      <div className="h-px bg-white/8" />
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
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 sticky top-0 z-40 bg-black">
        <h1 className="text-white text-2xl font-bold tracking-tight">BiteCast</h1>
        <button className="text-white/70 hover:text-white">
          <Bell size={22} strokeWidth={1.5} />
        </button>
      </div>

      {/* Feed */}
      <div>
        {clipList.map((clip) => (
          <VideoCard key={clip.id} clip={clip} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  );
}
