import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Heart, Bookmark, ThumbsDown, Volume2, VolumeX, MoreVertical } from "lucide-react";
import { clips, type Clip } from "@/data/mockData";
import { useLocation } from "wouter";

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

const longDescriptions: Record<string, string> = {
  "1": "I'll take a very basic business example. I had a client. Fashion designer. She used to make wedding lehengas. So, the target customers were to-be brides.\n\nShe opened her boutique in West Delhi. And when she came, she said, people find my collection expensive.\n\nNow, in today's date, even a middle class bride spends at least 1 lakh on a lehenga. But she was positioning herself in the wrong market. The problem was not the price. The problem was the positioning.",
  "2": "Lenin had a very specific definition of freedom. For Lenin, freedom meant freedom from exploitation. Freedom from class oppression.\n\nBut here's the paradox — Lenin's version of freedom required the suppression of dissent. This is what makes Leninist thought so controversial. It starts with liberation and ends with authoritarianism.",
  "3": "If you do not believe in my understanding of the ultimate supreme reality, you are a non-believer. This is the 'My Way or the Highway' dogma.\n\nAnd it's not limited to religion. We see it in politics, in business, in families. The moment a belief system says — if you don't agree with me, you are the enemy — that's when it becomes dangerous.",
  "4": "Your heart actually sends more signals to your brain than your brain sends to your heart. This means your emotional state is literally shaping your thoughts.\n\nWhen you're anxious, your heart sends chaotic signals. Your brain goes into threat mode. But when you slow your heart down — breathe deeply, feel gratitude — creativity flows. Problem-solving improves.",
  "5": "People think that because we have calculators, we don't need to understand math anymore. That's wrong. Deeply wrong.\n\nWhen you don't understand basic math, you can't catch errors. You can't estimate. A calculator gives you an answer — but it doesn't tell you if the answer makes sense.",
  "6": "I want to remove every slum in Mumbai. Not by demolishing homes. By creating opportunity. By giving people a reason to invest in their own lives.\n\nWhen you give someone dignity, they protect it. The problem with top-down urban development is that it treats people as problems to be managed, not citizens to be empowered.",
  "7": "Mindset is not a motivational concept. It's a survival tool. Your brain is wired to protect you. But the threats it was designed for are not the threats you face today.\n\nThe only way to override that response is mindset. The conscious choice to interpret challenge as opportunity. To reframe failure as data.",
  "8": "Black holes are the universe's ultimate erasers — or so we thought. For decades, physicists believed that anything that falls into a black hole is gone forever.\n\nBut that violates quantum mechanics: information cannot be destroyed. So where does it go? This is the black hole information paradox.",
  "9": "The argument for intelligent design: a watch is complex, so it requires a watchmaker. Dawkins demolished this with one idea: natural selection. A blind process with no foresight, no goal.\n\nBut given enough time, it produces complexity that looks designed. The eye. The wing. The immune system. No watchmaker required.",
  "10": "Traditional pricing is dead. Amazon changes prices millions of times a day. Uber prices surge based on demand.\n\nThe companies that win understand the psychology of pricing. Anchoring. Decoy effects. Subscription lock-in. The price is not just a number — it's a signal, a relationship, a commitment.",
};

interface ClipState {
  liked: boolean;
  likes: number;
  saved: boolean;
  disliked: boolean;
  muted: boolean;
  speedIdx: number;
}

function DescriptionOverlay({ clip, onClose }: { clip: Clip; onClose: () => void }) {
  const text = longDescriptions[clip.id] || clip.description;
  const paragraphs = text.split("\n\n");
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end" onClick={onClose}>
      <div
        className="h-2/3 rounded-t-3xl overflow-y-auto"
        style={{ background: "rgba(18,24,33,0.97)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-9 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
        </div>
        <div className="px-5 pt-2 pb-10">
          <h2 className="font-bold text-[16px] leading-snug mb-4" style={{ color: "var(--text-primary)" }}>{clip.title}</h2>
          <div className="flex flex-col gap-4">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Bites() {
  const [, navigate] = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [showDesc, setShowDesc] = useState(false);

  const [clipStates, setClipStates] = useState<Record<string, ClipState>>(() => {
    const init: Record<string, ClipState> = {};
    clips.forEach((c) => {
      init[c.id] = { liked: c.liked, likes: c.likes, saved: c.saved, disliked: false, muted: false, speedIdx: 2 };
    });
    return init;
  });

  const currentClip = clips[current];
  const state = clipStates[currentClip?.id] ?? { liked: false, likes: 0, saved: false, disliked: false, muted: false, speedIdx: 2 };

  function update(id: string, patch: Partial<ClipState>) {
    setClipStates((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  const showDescRef = useRef(showDesc);
  useEffect(() => { showDescRef.current = showDesc; }, [showDesc]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY < -20 && !showDescRef.current) { e.preventDefault(); setShowDesc(true); }
      else if (e.deltaY > 20 && showDescRef.current) { e.preventDefault(); setShowDesc(false); }
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
    if (deltaY < -50 && !showDescRef.current) setShowDesc(true);
    if (deltaY > 50 && showDescRef.current) setShowDesc(false);
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
      {/* Full-screen horizontal snap scroll */}
      <div
        ref={scrollRef}
        className="absolute inset-0 flex overflow-x-scroll snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
        onScroll={(e) => {
          const el = e.currentTarget;
          const idx = Math.round(el.scrollLeft / el.clientWidth);
          if (idx !== current) { setCurrent(idx); setShowDesc(false); }
        }}
      >
        {clips.map((clip) => (
          <div
            key={clip.id}
            className="relative flex-shrink-0 snap-start"
            style={{ width: "100%", height: "100%", background: clip.thumbnailColor }}
          >
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,15,20,0.3) 0%, transparent 25%, transparent 45%, rgba(11,15,20,0.75) 100%)" }} />
          </div>
        ))}
      </div>

      {/* Back button */}
      <button
        className="absolute top-4 left-4 z-50 w-9 h-9 rounded-full flex items-center justify-center active:opacity-70"
        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={18} className="text-white" />
      </button>

      {/* Right-side action buttons — large, comfortable, above bottom nav */}
      {!showDesc && (
        <div
          className="absolute right-3.5 flex flex-col items-center gap-6 z-10"
          style={{ bottom: "96px" }}
        >
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

          <button className="active:scale-90 transition-transform" onClick={() => update(currentClip.id, { saved: !state.saved })}>
            <Bookmark size={28} strokeWidth={1.5} style={{ color: state.saved ? "var(--accent-purple)" : "rgba(255,255,255,0.92)" }} />
          </button>

          <button
            className="active:scale-90 transition-transform"
            onClick={() => update(currentClip.id, { disliked: !state.disliked, liked: state.disliked ? state.liked : false })}
          >
            <ThumbsDown size={28} strokeWidth={1.5} style={{ color: state.disliked ? "var(--accent-teal)" : "rgba(255,255,255,0.92)" }} />
          </button>

          <button className="active:scale-90 transition-transform" onClick={() => update(currentClip.id, { muted: !state.muted })}>
            {state.muted
              ? <VolumeX size={28} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.92)" }} />
              : <Volume2 size={28} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.92)" }} />
            }
          </button>

          <button className="active:scale-90 transition-transform" onClick={() => update(currentClip.id, { speedIdx: (state.speedIdx + 1) % speeds.length })}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <span className="text-white text-[13px] font-bold">{speeds[state.speedIdx]}x</span>
            </div>
          </button>
        </div>
      )}

      {/* Bottom info overlay — on the video, left side, above nav */}
      {!showDesc && (
        <div
          className="absolute left-0 z-10"
          style={{ bottom: "76px", paddingLeft: "16px", paddingRight: "72px" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <span className="text-[12px] font-bold text-white">?</span>
            </div>
            <span className="font-semibold text-[14px] text-white">{currentClip.author}</span>
          </div>
          <div className="flex items-end gap-2">
            <p className="flex-1 text-[13px] leading-snug text-white/85">{currentClip.title}</p>
            <button className="flex-shrink-0 active:opacity-60 mb-0.5" onClick={() => setShowDesc(true)}>
              <MoreVertical size={18} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.7)" }} />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {currentClip.hashtags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[11px]" style={{ color: "var(--accent-purple)" }}>{tag}</span>
            ))}
          </div>
        </div>
      )}

      {/* Description sheet */}
      {showDesc && <DescriptionOverlay clip={currentClip} onClose={() => setShowDesc(false)} />}
    </div>
  );
}
