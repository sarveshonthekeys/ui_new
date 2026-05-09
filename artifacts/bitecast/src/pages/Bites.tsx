import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Heart, Bookmark, ThumbsDown, Volume2, VolumeX, Youtube, AlignJustify, Eye } from "lucide-react";
import { clips, type Clip } from "@/data/mockData";
import { useLocation, useSearch } from "wouter";

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

const longDescriptions: Record<string, string> = {
  "1": "I'll take a very basic business example. I had a client. Fashion designer. She used to make wedding lehengas.\n\nShe opened her boutique in West Delhi. People said the collection was expensive — 50,000 rupees. But in today's date, even a middle class bride spends at least 1 lakh on a lehenga.\n\nShe was positioning herself in the wrong market. The problem was not the price. The problem was the positioning.",
  "2": "Lenin had a very specific definition of freedom. For Lenin, freedom meant freedom from exploitation.\n\nBut here's the paradox — Lenin's version of freedom required the suppression of dissent. This is what makes Leninist thought so controversial. It starts with liberation and ends with authoritarianism.",
  "3": "If you do not believe in my understanding of the ultimate supreme reality, you are a non-believer.\n\nThis is the 'My Way or the Highway' dogma. And it's not limited to religion. The moment a belief system says — if you don't agree with me, you are the enemy — that's when it becomes dangerous.",
  "4": "Your heart actually sends more signals to your brain than your brain sends to your heart. This means your emotional state is literally shaping your thoughts.\n\nWhen you're anxious, your heart sends chaotic signals. But when you slow your heart down — breathe deeply, feel gratitude — creativity flows. Problem-solving improves.",
  "5": "People think that because we have calculators, we don't need to understand math anymore. That's wrong.\n\nWhen you don't understand basic math, you can't catch errors. A calculator gives you an answer — but it doesn't tell you if the answer makes sense.",
  "6": "I want to remove every slum in Mumbai. Not by demolishing homes. By creating opportunity.\n\nWhen you give someone dignity, they protect it. The problem with top-down urban development is that it treats people as problems to be managed, not citizens to be empowered.",
  "7": "Mindset is not a motivational concept. It's a survival tool. Your brain is wired to protect you.\n\nThe only way to override that response is mindset. The conscious choice to interpret challenge as opportunity. To reframe failure as data.",
  "8": "Black holes are the universe's ultimate erasers — or so we thought.\n\nBut that violates quantum mechanics: information cannot be destroyed. So where does it go? This is the black hole information paradox.",
  "9": "The argument for intelligent design: a watch requires a watchmaker. Dawkins demolished this with natural selection — a blind process with no foresight.\n\nBut given enough time, it produces complexity that looks designed. No watchmaker required.",
  "10": "Traditional pricing is dead. Amazon changes prices millions of times a day.\n\nThe companies that win understand the psychology of pricing. Anchoring. Decoy effects. The price is not just a number — it's a signal, a relationship, a commitment.",
};

interface ClipState {
  liked: boolean;
  likes: number;
  saved: boolean;
  disliked: boolean;
  muted: boolean;
  speedIdx: number;
}

function AboutPanel({ clip, state, onClose }: { clip: Clip; state: ClipState; onClose: () => void }) {
  const tags = clip.hashtags.map((h) => h.replace("#", ""));
  const description = longDescriptions[clip.id] || clip.description;

  return (
    <div className="absolute inset-0 z-40" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}>
      <div
        className="absolute bottom-0 left-0 right-0 overflow-y-auto rounded-t-3xl"
        style={{ top: "5%", background: "var(--bg-primary)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Drag handle + back */}
        <div
          className="flex items-center justify-between px-4 pt-3 pb-2 sticky top-0 z-10"
          style={{ background: "var(--bg-primary)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <button onClick={onClose} className="active:opacity-60">
            <ArrowLeft size={20} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
          </button>
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
          <div className="w-6" />
        </div>

        <div className="px-5 pt-5 pb-12 flex flex-col gap-5">

          {/* Creator */}
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(109,74,255,0.15)", border: "2px solid rgba(109,74,255,0.3)" }}
            >
              <span className="text-[20px] font-bold" style={{ color: "var(--accent-purple)" }}>?</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[16px]" style={{ color: "var(--text-primary)" }}>{clip.author}</p>
              <p className="text-[12px] mt-0.5" style={{ color: "var(--text-secondary)" }}>{clip.podcastName}</p>
            </div>
          </div>

          {/* Title */}
          <p className="font-bold text-[17px] leading-snug" style={{ color: "var(--text-primary)" }}>{clip.title}</p>

          {/* YouTube + Playlist — above description */}
          <div className="flex flex-col gap-2">
            <div className="rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                <Youtube size={15} className="text-white" strokeWidth={2} />
              </div>
              <span className="font-semibold text-[13px]" style={{ color: "var(--text-primary)" }}>Watch Full Episode on YouTube</span>
            </div>
            <div className="rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(109,74,255,0.15)" }}>
                <AlignJustify size={15} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
              </div>
              <span className="font-semibold text-[13px]" style={{ color: "var(--text-primary)" }}>View Playlist</span>
            </div>
          </div>

          {/* Description — continuous, no box, no label */}
          <div>
            {description.split("\n\n").map((para, i) => (
              <p key={i} className={`text-[13px] leading-relaxed${i > 0 ? " mt-3" : ""}`} style={{ color: "var(--text-secondary)" }}>{para}</p>
            ))}
          </div>

          {/* Hashtags */}
          {tags.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-secondary)" }}>Tags</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-[12px] font-medium" style={{ background: "rgba(109,74,255,0.12)", color: "var(--accent-purple)", border: "1px solid rgba(109,74,255,0.2)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats — 2×2 grid */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--text-secondary)" }}>Stats</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Likes",    value: state.likes,               icon: Heart,      color: "#f87171" },
                { label: "Views",    value: clip.views,                icon: Eye,        color: "var(--accent-teal)" },
                { label: "Saves",    value: state.saved ? clip.bookmarks + 1 : clip.bookmarks, icon: Bookmark, color: "var(--accent-purple)" },
                { label: "Dislikes", value: state.disliked ? 1 : 0,   icon: ThumbsDown, color: "#5b5478" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="rounded-2xl py-3.5 px-4 flex items-center gap-3" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <Icon size={16} strokeWidth={1.5} style={{ color }} />
                  <div>
                    <p className="font-bold text-[16px]" style={{ color: "var(--text-primary)" }}>{value}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-secondary)" }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-[11px]" style={{ color: "var(--text-secondary)" }}>Swipe down to dismiss</p>
        </div>
      </div>
    </div>
  );
}

export default function Bites() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(() => {
    const params = new URLSearchParams(search);
    const clipId = params.get("clip");
    if (clipId) {
      const idx = clips.findIndex((c) => c.id === clipId);
      if (idx >= 0) return idx;
    }
    return 0;
  });
  const [showAbout, setShowAbout] = useState(false);
  const didScrollRef = useRef(false);

  const [clipStates, setClipStates] = useState<Record<string, ClipState>>(() => {
    const init: Record<string, ClipState> = {};
    clips.forEach((c) => {
      init[c.id] = { liked: c.liked, likes: c.likes, saved: c.saved, disliked: false, muted: false, speedIdx: 2 };
    });
    return init;
  });

  useEffect(() => {
    if (didScrollRef.current) return;
    didScrollRef.current = true;
    const params = new URLSearchParams(search);
    const clipId = params.get("clip");
    if (!clipId) return;
    const idx = clips.findIndex((c) => c.id === clipId);
    if (idx <= 0) return;
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = idx * scrollRef.current.clientWidth;
      }
    });
  }, [search]);

  const currentClip = clips[current];
  const state = clipStates[currentClip?.id] ?? { liked: false, likes: 0, saved: false, disliked: false, muted: false, speedIdx: 2 };

  function update(id: string, patch: Partial<ClipState>) {
    setClipStates((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  const showAboutRef = useRef(showAbout);
  useEffect(() => { showAboutRef.current = showAbout; }, [showAbout]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY < -20 && !showAboutRef.current) { e.preventDefault(); setShowAbout(true); }
      else if (e.deltaY > 20 && showAboutRef.current) { e.preventDefault(); setShowAbout(false); }
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartY.current = null; touchStartX.current = null;
    if (Math.abs(deltaX) > Math.abs(deltaY)) return;
    if (deltaY < -50 && !showAboutRef.current) setShowAbout(true);
    if (deltaY > 50 && showAboutRef.current) setShowAbout(false);
  }, []);

  if (!currentClip) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ background: "var(--bg-primary)" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Horizontal snap scroll */}
      <div
        ref={scrollRef}
        className="absolute inset-0 flex overflow-x-scroll snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollLeft / el.clientWidth);
          if (idx !== current) { setCurrent(idx); setShowAbout(false); }
        }}
      >
        {clips.map((clip) => (
          <div
            key={clip.id}
            className="relative flex-shrink-0 snap-start"
            style={{ width: "100%", height: "100%", background: clip.thumbnailColor }}
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,15,20,0.25) 0%, transparent 20%, transparent 45%, rgba(11,15,20,0.85) 100%)" }} />
          </div>
        ))}
      </div>

      {/* Back button — hidden when about panel is open */}
      {!showAbout && (
        <button
          className="absolute top-4 left-4 z-50 w-9 h-9 rounded-full flex items-center justify-center active:opacity-70"
          style={{ background: "rgba(255,255,255,0.04)" }}
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} style={{ color: "rgba(255,255,255,0.35)" }} />
        </button>
      )}

      {/* Right-side action buttons — order: Heart, Dislike, Save, Volume, Speed */}
      {!showAbout && (
        <div className="absolute right-3.5 flex flex-col items-center gap-6 z-10" style={{ bottom: "96px" }}>
          <button
            className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
            onClick={() => {
              const s = clipStates[currentClip.id];
              update(currentClip.id, { liked: !s.liked, likes: s.likes + (s.liked ? -1 : 1), disliked: false });
            }}
          >
            <Heart size={30} strokeWidth={1.5} style={{ color: state.liked ? "#f87171" : "rgba(255,255,255,0.92)" }} />
            <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{state.likes}</span>
          </button>

          <button
            className="active:scale-90 transition-transform"
            onClick={() => update(currentClip.id, { disliked: !state.disliked, liked: state.disliked ? state.liked : false })}
          >
            <ThumbsDown size={28} strokeWidth={1.5} style={{ color: state.disliked ? "#5b5478" : "rgba(255,255,255,0.92)" }} />
          </button>

          <button className="active:scale-90 transition-transform" onClick={() => update(currentClip.id, { saved: !state.saved })}>
            <Bookmark size={28} strokeWidth={1.5} style={{ color: state.saved ? "var(--accent-purple)" : "rgba(255,255,255,0.92)" }} />
          </button>

          <button className="active:scale-90 transition-transform" onClick={() => update(currentClip.id, { muted: !state.muted })}>
            {state.muted
              ? <VolumeX size={28} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.92)" }} />
              : <Volume2 size={28} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.92)" }} />
            }
          </button>

          <button className="active:scale-90 transition-transform" onClick={() => update(currentClip.id, { speedIdx: (state.speedIdx + 1) % speeds.length })}>
            <span className="text-white text-[13px] font-bold inline-block text-center" style={{ width: "32px" }}>{speeds[state.speedIdx]}x</span>
          </button>
        </div>
      )}

      {/* Bottom info overlay */}
      {!showAbout && (
        <div
          className="absolute left-0 z-10"
          style={{ bottom: "16px", paddingLeft: "16px", paddingRight: "68px" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.2)" }}
            >
              <span className="text-[16px] font-bold text-white">?</span>
            </div>
            <span className="font-bold text-[18px] text-white">{currentClip.author}</span>
          </div>
          <p className="text-[13px] leading-snug" style={{ color: "rgba(255,255,255,0.85)" }}>
            {currentClip.title}
          </p>
        </div>
      )}

      {/* About panel */}
      {showAbout && <AboutPanel clip={currentClip} state={state} onClose={() => setShowAbout(false)} />}
    </div>
  );
}
