import { useState, useRef } from "react";
import { ArrowLeft, Heart, Bookmark, ThumbsDown, Volume2, VolumeX, MoreVertical, Play } from "lucide-react";
import { clips, type Clip } from "@/data/mockData";
import { useLocation } from "wouter";

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

function BitesCard({ clip, active }: { clip: Clip; active: boolean }) {
  const [liked, setLiked] = useState(clip.liked);
  const [likes, setLikes] = useState(clip.likes);
  const [saved, setSaved] = useState(clip.saved);
  const [muted, setMuted] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(2);
  const [playing, setPlaying] = useState(true);

  return (
    <div
      className="relative flex-shrink-0 snap-start"
      style={{ background: clip.thumbnailColor, width: "100%", height: "100%" }}
      onClick={() => setPlaying((p) => !p)}
    >
      {/* Play icon overlay when paused */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center">
            <Play size={28} className="text-white fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Right-side actions */}
      <div className="absolute right-3 bottom-36 flex flex-col items-center gap-6 z-10">
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
            className={liked ? "fill-red-500 text-red-500" : "text-white drop-shadow"}
            strokeWidth={1.5}
          />
          <span className="text-white text-xs drop-shadow">{likes}</span>
        </button>

        <button
          className="flex flex-col items-center gap-1"
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
        >
          <Bookmark
            size={26}
            className={saved ? "fill-amber-400 text-amber-400" : "text-white drop-shadow"}
            strokeWidth={1.5}
          />
        </button>

        <button
          className="flex flex-col items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <ThumbsDown size={26} className="text-white drop-shadow" strokeWidth={1.5} />
        </button>

        <button
          className="flex flex-col items-center gap-1"
          onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
        >
          {muted ? (
            <VolumeX size={26} className="text-white drop-shadow" strokeWidth={1.5} />
          ) : (
            <Volume2 size={26} className="text-white drop-shadow" strokeWidth={1.5} />
          )}
        </button>

        <button
          className="flex flex-col items-center"
          onClick={(e) => {
            e.stopPropagation();
            setSpeedIdx((i) => (i + 1) % speeds.length);
          }}
        >
          <span className="text-white text-sm font-bold drop-shadow">{speeds[speedIdx]}x</span>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-20 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">?</span>
          </div>
          <span className="text-white font-semibold text-sm">{clip.author}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-white text-sm leading-snug max-w-[80%]">{clip.title}</p>
          <button className="text-white/70" onClick={(e) => e.stopPropagation()}>
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Bites() {
  const [, navigate] = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  return (
    <div className="absolute inset-0 bg-black">
      {/* Back button */}
      <button
        className="absolute top-4 left-4 z-50 text-white"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={24} />
      </button>

      {/* Horizontal snap scroll */}
      <div
        ref={scrollRef}
        className="w-full h-full flex overflow-x-scroll snap-x snap-mandatory"
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollLeft / el.clientWidth);
          setCurrent(idx);
        }}
      >
        {clips.map((clip, i) => (
          <BitesCard key={clip.id} clip={clip} active={i === current} />
        ))}
      </div>
    </div>
  );
}
