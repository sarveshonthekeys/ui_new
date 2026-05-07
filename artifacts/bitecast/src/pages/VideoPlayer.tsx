import { useState, useRef } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Heart, Bookmark, ThumbsDown, Volume2, VolumeX, Play, Pause, SkipBack, SkipForward } from "lucide-react";
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
  const [progress, setProgress] = useState(0.3);
  const sliderRef = useRef<HTMLDivElement>(null);

  function handleSliderClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setProgress(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
  }

  const totalSecs = parseInt(clip.duration.split(":")[0]) * 60 + parseInt(clip.duration.split(":")[1]);
  const currentSecs = Math.round(totalSecs * progress);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "var(--bg-primary)" }}>
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: clip.thumbnailColor, filter: "blur(60px)", transform: "scale(1.2)" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,15,20,0.5) 0%, rgba(11,15,20,0.1) 30%, rgba(11,15,20,0.85) 70%, rgba(11,15,20,0.98) 100%)" }} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between px-4 pt-5 pb-2">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center active:opacity-70"
            style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
            onClick={() => navigate("/bites")}
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <span className="text-[13px] font-semibold text-white opacity-70">Now Playing</span>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center active:opacity-70"
            style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
            onClick={() => setMuted(!muted)}
          >
            {muted ? <VolumeX size={16} className="text-white" /> : <Volume2 size={16} className="text-white" />}
          </button>
        </div>

        <div
          className="mx-5 rounded-[24px] overflow-hidden flex-shrink-0"
          style={{ background: clip.thumbnailColor, aspectRatio: "1/1", border: "1px solid rgba(255,255,255,0.08)" }}
          onClick={() => setPlaying((p) => !p)}
        >
          <div className="w-full h-full flex items-center justify-center">
            {!playing && (
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(109,74,255,0.3)", backdropFilter: "blur(12px)", border: "1px solid rgba(109,74,255,0.5)" }}
              >
                <Play size={24} className="text-white fill-white ml-1" />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between px-5 pt-4 pb-6">
          <div>
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1 min-w-0 pr-3">
                <h2 className="text-white font-bold text-[16px] leading-snug">{clip.title}</h2>
                <p className="text-[13px] mt-1" style={{ color: "var(--text-secondary)" }}>{clip.author} · {clip.podcastName}</p>
              </div>
              <button
                className="active:scale-90 transition-transform flex-shrink-0 mt-0.5"
                onClick={() => { setSaved(!saved); }}
              >
                <Bookmark
                  size={22}
                  className={saved ? "fill-current" : ""}
                  style={{ color: saved ? "var(--accent-purple)" : "rgba(255,255,255,0.5)" }}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <div
                ref={sliderRef}
                className="h-1 rounded-full cursor-pointer mb-2 relative"
                style={{ background: "rgba(255,255,255,0.12)" }}
                onClick={handleSliderClick}
              >
                <div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ width: `${progress * 100}%`, background: "var(--accent-purple)" }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md"
                  style={{ left: `calc(${progress * 100}% - 7px)` }}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>{fmt(currentSecs)}</span>
                <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>{clip.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-5">
              <button
                className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                onClick={() => { setLiked(!liked); setLikes((l) => l + (liked ? -1 : 1)); }}
              >
                <Heart size={22} className={liked ? "fill-current" : ""} style={{ color: liked ? "#f87171" : "rgba(255,255,255,0.5)" }} strokeWidth={1.5} />
                <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>{likes}</span>
              </button>

              <div className="flex items-center gap-6">
                <button className="active:opacity-70" onClick={() => setProgress(p => Math.max(0, p - 0.1))}>
                  <SkipBack size={22} className="text-white" strokeWidth={1.5} />
                </button>
                <button
                  className="w-14 h-14 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                  style={{ background: "var(--accent-purple)", boxShadow: "0 0 24px rgba(109,74,255,0.4)" }}
                  onClick={() => setPlaying((p) => !p)}
                >
                  {playing
                    ? <Pause size={22} className="text-white fill-white" />
                    : <Play size={22} className="text-white fill-white ml-0.5" />
                  }
                </button>
                <button className="active:opacity-70" onClick={() => setProgress(p => Math.min(1, p + 0.1))}>
                  <SkipForward size={22} className="text-white" strokeWidth={1.5} />
                </button>
              </div>

              <button
                className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                onClick={() => setSpeedIdx((i) => (i + 1) % speeds.length)}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="text-white text-[12px] font-bold">{speeds[speedIdx]}x</span>
                </div>
                <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Speed</span>
              </button>
            </div>

            <div className="flex gap-3">
              {clip.hashtags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: "var(--accent-purple-dim)", color: "var(--accent-purple)", border: "1px solid rgba(109,74,255,0.2)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
