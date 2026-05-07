import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Heart, Bookmark, ThumbsDown, Volume2, VolumeX, MoreVertical, Play, Pause } from "lucide-react";
import { clips } from "@/data/mockData";

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function VideoPlayer() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const clip = clips.find((c) => c.id === id) ?? clips[0];

  const [liked, setLiked] = useState(clip.liked);
  const [likes, setLikes] = useState(clip.likes);
  const [saved, setSaved] = useState(clip.saved);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [speedIdx, setSpeedIdx] = useState(2);

  function cyclSpeed() {
    setSpeedIdx((i) => (i + 1) % speeds.length);
  }

  return (
    <div className="absolute inset-0 bg-black flex flex-col">
      {/* Full-screen video area */}
      <div
        className="flex-1 relative flex items-center justify-center cursor-pointer"
        style={{ background: clip.thumbnailColor }}
        onClick={() => setPlaying((p) => !p)}
      >
        {/* Back button */}
        <button
          className="absolute top-4 left-4 z-10 text-white p-1"
          onClick={(e) => { e.stopPropagation(); navigate("/bites"); }}
        >
          <ArrowLeft size={24} />
        </button>

        {/* Play/pause overlay */}
        {!playing && (
          <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center">
            <Play size={28} className="text-white fill-white ml-1" />
          </div>
        )}

        {/* Right-side action buttons */}
        <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5">
          <button
            className="flex flex-col items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
              setLikes((l) => l + (liked ? -1 : 1));
            }}
          >
            <Heart
              size={28}
              className={liked ? "fill-red-500 text-red-500" : "text-white"}
              strokeWidth={1.5}
            />
            <span className="text-white text-xs">{likes}</span>
          </button>

          <button
            className="flex flex-col items-center gap-1"
            onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          >
            <Bookmark
              size={26}
              className={saved ? "fill-amber-400 text-amber-400" : "text-white"}
              strokeWidth={1.5}
            />
          </button>

          <button
            className="flex flex-col items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <ThumbsDown size={26} className="text-white" strokeWidth={1.5} />
          </button>

          <button
            className="flex flex-col items-center gap-1"
            onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
          >
            {muted ? (
              <VolumeX size={26} className="text-white" strokeWidth={1.5} />
            ) : (
              <Volume2 size={26} className="text-white" strokeWidth={1.5} />
            )}
          </button>

          <button
            className="flex flex-col items-center"
            onClick={(e) => { e.stopPropagation(); cyclSpeed(); }}
          >
            <span className="text-white text-sm font-bold">{speeds[speedIdx]}x</span>
          </button>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="bg-black px-4 py-3 flex items-center justify-between" style={{ paddingBottom: "env(safe-area-inset-bottom, 12px)" }}>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">?</span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold">{clip.author}</p>
            <p className="text-white/60 text-xs truncate">{clip.title}</p>
          </div>
        </div>
        <button className="text-white/60 ml-2">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
}
