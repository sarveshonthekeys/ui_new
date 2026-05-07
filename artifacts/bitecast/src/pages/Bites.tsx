import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Heart, Bookmark, ThumbsDown, Volume2, VolumeX, Play, Youtube, AlignJustify } from "lucide-react";
import { clips, type Clip } from "@/data/mockData";
import { useLocation } from "wouter";

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

const longDescriptions: Record<string, string> = {
  "1": "I'll take a very basic business example. I had a client. Fashion designer. She used to make wedding lehengas. So, the target customers were to-be brides. Girls who are going to get married.\n\nTo-be brides were the target customers. Now, she opened her boutique in West Delhi. And when she came, she said, people find my collection expensive.\n\nPeople say that 50,000 rupees lehenga is very expensive. Now, In today's date, even a middle class bride spends at least 1 lakh on a lehenga.\n\nIt's one of the most important days of your life. You will spend money. But she was positioning herself in the wrong market. The problem was not the price. The problem was the positioning.",
  "2": "Lenin had a very specific definition of freedom. For Lenin, freedom meant freedom from exploitation. Freedom from class oppression. But here's the paradox — Lenin's version of freedom required the suppression of dissent.\n\nIf you disagreed with the revolution, you were not exercising freedom. You were acting as an agent of the oppressor class. And that meant you had to be silenced.\n\nThis is what makes Leninist thought so controversial. It starts with liberation and ends with authoritarianism. The road to freedom, paved with the suppression of freedom.",
  "3": "If you do not believe in my understanding of what the ultimate supreme reality is, then you are a non-believer. You are called names. And there are also prescribed actions that can legitimately be taken against the non-believer, the pagans, the kafirs — all these people, to kill them, to destroy their places of worship, to destroy their centers of learning.\n\nAnd to convert them either by force or a payment of a tax. This is the 'My Way or the Highway' dogma. And it's not limited to religion. We see it in politics, in business, in families.\n\nThe moment a belief system says — if you don't agree with me, you are the enemy — that's when it becomes dangerous.",
  "4": "There's a game your heart plays with your brain that most people don't know about. Your heart actually sends more signals to your brain than your brain sends to your heart.\n\nThis means your emotional state — your heart rate, your feelings — is literally shaping your thoughts. Not the other way around.\n\nWhen you're anxious, your heart sends chaotic signals to your brain. Your brain goes into threat mode. You can't think clearly. But when you slow your heart down — when you breathe deeply and feel gratitude — your heart sends coherent signals.\n\nAnd your brain opens up. Creativity flows. Problem-solving improves. This is the heart-brain connection that changes everything.",
  "5": "People think that because we have calculators, we don't need to understand math anymore. That's wrong. Deeply wrong.\n\nWhen you don't understand basic math, you can't catch errors. You can't estimate. You can't reason about quantities. A calculator gives you an answer — but it doesn't tell you if the answer makes sense.\n\nAnd in the real world, whether you're running a business, managing your finances, or just making decisions — the ability to reason numerically is not optional. It's fundamental.",
  "6": "I want to remove every slum in Mumbai. Not by demolishing homes. By creating opportunity. By giving people a reason to invest in their own lives.\n\nWhen you give someone dignity, they protect it. When you give someone ownership, they care for it. The problem with top-down urban development is that it treats people as problems to be managed, not citizens to be empowered.\n\nWe need to flip the model. Community-led development. Local ownership. Micro-financing for home improvement. That's how you transform a city.",
  "7": "Mindset is not a motivational concept. It's a survival tool. Literally.\n\nYour brain is wired to protect you. But the threats it was designed for — predators, starvation, tribal exclusion — are not the threats you face today. Today's threats are rejection, failure, uncertainty.\n\nAnd your ancient brain responds to these modern threats the same way it responded to a lion. It shuts you down. It makes you freeze.\n\nThe only way to override that response is mindset. The conscious choice to interpret challenge as opportunity. To reframe failure as data. To see uncertainty as possibility.",
  "8": "Black holes are the universe's ultimate erasers — or so we thought. For decades, physicists believed that anything that falls into a black hole is gone forever. Information destroyed.\n\nBut that violates one of the most fundamental laws of quantum mechanics: information cannot be destroyed. It can be scrambled. It can be hidden. But it must be preserved somewhere.\n\nSo where does it go? This is the black hole information paradox. And it's one of the deepest unsolved problems in all of physics. Some say the information is encoded on the surface of the black hole — the event horizon. Others say it leaks out slowly as Hawking radiation.",
  "9": "The argument for intelligent design goes like this: a watch is complex. A watch requires a watchmaker. Therefore, something as complex as life must require a designer.\n\nDawkins demolished this argument with one elegant idea: natural selection. Natural selection is a blind process. It has no foresight. No goal. No designer.\n\nBut given enough time, it produces complexity that looks designed. The eye. The wing. The immune system. All built step by step by random variation and selection pressure. No watchmaker required.",
  "10": "Traditional pricing is dead. The idea that you set a price and it stays fixed — that model is being destroyed by data, by subscriptions, by dynamic pricing algorithms.\n\nAmazon changes prices millions of times a day. Uber prices surge based on demand. Airlines have been doing this for decades.\n\nThe companies that win are the ones that understand the psychology of pricing. Anchoring. Decoy effects. Subscription lock-in. The price is not just a number — it's a signal, a relationship, a commitment.",
};

function AboutPanel({ clip, likes, onClose }: { clip: Clip; likes: number; onClose: () => void }) {
  const tags = clip.hashtags.map((h) => h.replace("#", ""));
  return (
    <div className="absolute inset-0 z-40 flex flex-col" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl overflow-y-auto"
        style={{ top: "10%", background: "var(--bg-surface)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex justify-center pt-3 pb-2 sticky top-0 z-10" style={{ background: "var(--bg-surface)" }}>
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
        </div>
        <button onClick={onClose} className="px-4 pb-2" style={{ color: "var(--text-secondary)" }}>
          <ArrowLeft size={20} />
        </button>
        <div className="px-5 pb-10 flex flex-col gap-6">
          <div>
            <h2 className="font-bold text-[20px] mb-1" style={{ color: "var(--text-primary)" }}>About</h2>
            <p className="text-[13px] leading-snug" style={{ color: "var(--text-secondary)" }}>{clip.title}</p>
          </div>
          <div>
            <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--text-primary)" }}>Creator</h2>
            <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent-purple-dim)", border: "1px solid rgba(109,74,255,0.2)" }}>
                <span className="font-bold text-sm" style={{ color: "var(--accent-purple)" }}>?</span>
              </div>
              <div>
                <p className="font-semibold text-[13px]" style={{ color: "var(--text-primary)" }}>{clip.podcastName}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Podcast</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--text-primary)" }}>Watch Full Episode</h2>
            <div className="rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                <Youtube size={15} className="text-white" strokeWidth={2} />
              </div>
              <span className="font-semibold text-[13px]" style={{ color: "var(--text-primary)" }}>Watch on YouTube</span>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--text-primary)" }}>Podcast</h2>
            <div className="rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <AlignJustify size={18} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
              <span className="font-semibold text-[13px]" style={{ color: "var(--text-primary)" }}>View Playlist</span>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-[16px] mb-3" style={{ color: "var(--text-primary)" }}>Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full text-[12px] font-medium" style={{ background: "var(--accent-purple-dim)", color: "var(--accent-purple)", border: "1px solid rgba(109,74,255,0.2)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl py-4 text-center" style={{ background: "var(--bg-elevated)" }}>
              <p className="font-bold text-[22px]" style={{ color: "var(--text-primary)" }}>{likes}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Likes</p>
            </div>
            <div className="rounded-2xl py-4 text-center" style={{ background: "var(--bg-elevated)" }}>
              <p className="font-bold text-[22px]" style={{ color: "var(--text-primary)" }}>{clip.views}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Views</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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

function BitesCard({ clip, showAbout }: { clip: Clip; showAbout: boolean }) {
  const [liked, setLiked] = useState(clip.liked);
  const [likes, setLikes] = useState(clip.likes);
  const [saved, setSaved] = useState(clip.saved);
  const [muted, setMuted] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(2);
  const [playing, setPlaying] = useState(true);
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 snap-start"
      style={{ background: clip.thumbnailColor, width: "100%", height: "100%" }}
      onClick={() => { if (!showDesc && !showAbout) setPlaying((p) => !p); }}
    >
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,15,20,0.95) 0%, rgba(11,15,20,0.2) 50%, transparent 75%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(109,74,255,0.06) 0%, transparent 50%)" }} />

      {!playing && !showDesc && !showAbout && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div
            className="rounded-full flex items-center justify-center"
            style={{ background: "rgba(109,74,255,0.25)", backdropFilter: "blur(12px)", border: "1px solid rgba(109,74,255,0.4)", width: 72, height: 72 }}
          >
            <Play size={28} className="text-white fill-white ml-1" />
          </div>
        </div>
      )}

      {showDesc && <DescriptionOverlay clip={clip} onClose={() => setShowDesc(false)} />}

      {/* Right-side action buttons — positioned in the middle-lower area, clear of bottom info */}
      {!showDesc && !showAbout && (
        <div className="absolute right-3 flex flex-col items-center gap-5 z-10" style={{ bottom: "160px" }}>
          <button
            className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); setLikes((l) => l + (liked ? -1 : 1)); }}
          >
            <Heart
              size={26}
              strokeWidth={1.5}
              style={{ color: liked ? "#f87171" : "rgba(255,255,255,0.85)" }}
            />
            <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{likes}</span>
          </button>

          <button
            className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
            onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          >
            <Bookmark
              size={24}
              strokeWidth={1.5}
              style={{ color: saved ? "var(--accent-purple)" : "rgba(255,255,255,0.85)" }}
            />
          </button>

          <button
            className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <ThumbsDown size={24} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.85)" }} />
          </button>

          <button
            className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
            onClick={(e) => { e.stopPropagation(); setMuted(!muted); }}
          >
            {muted
              ? <VolumeX size={24} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.85)" }} />
              : <Volume2 size={24} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.85)" }} />
            }
          </button>

          <button
            className="flex flex-col items-center active:scale-90 transition-transform"
            onClick={(e) => { e.stopPropagation(); setSpeedIdx((i) => (i + 1) % speeds.length); }}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
              <span className="text-white text-[12px] font-bold">{speeds[speedIdx]}x</span>
            </div>
          </button>
        </div>
      )}

      {/* Bottom info — fixed height area at bottom */}
      {!showDesc && !showAbout && (
        <div className="absolute bottom-0 left-0 right-0 px-4 z-10" style={{ paddingBottom: "80px", paddingRight: "60px" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent-purple-dim)", border: "1px solid rgba(109,74,255,0.3)" }}>
              <span className="text-[10px] font-bold" style={{ color: "var(--accent-purple)" }}>?</span>
            </div>
            <span className="text-white/80 font-semibold text-[13px]">{clip.author}</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-white font-semibold text-[15px] leading-snug flex-1 mr-2">{clip.title}</p>
            <button
              className="active:opacity-70 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}
              onClick={(e) => { e.stopPropagation(); setShowDesc(true); }}
            >
              <AlignJustify size={15} className="text-white" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {clip.hashtags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[11px]" style={{ color: "var(--accent-purple)" }}>{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Bites() {
  const [, navigate] = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [showAbout, setShowAbout] = useState(false);

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

  const currentClip = clips[current];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ background: "var(--bg-primary)" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Back button only */}
      <button
        className="absolute top-4 left-4 z-50 w-9 h-9 rounded-full flex items-center justify-center active:opacity-70"
        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={18} className="text-white" />
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
          <BitesCard key={clip.id} clip={clip} showAbout={showAbout && i === current} />
        ))}
      </div>

      {showAbout && currentClip && (
        <AboutPanel clip={currentClip} likes={currentClip.likes} onClose={() => setShowAbout(false)} />
      )}
    </div>
  );
}
