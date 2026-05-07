import { useState, useRef } from "react";
import { ArrowLeft, Heart, Bookmark, ThumbsDown, Volume2, VolumeX, MoreVertical, Play, Youtube, AlignJustify } from "lucide-react";
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
    <div className="absolute inset-0 z-30 flex flex-col bg-black/60">
      {/* Scrollable content — nearly full screen */}
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-2xl overflow-y-auto"
        style={{ top: "8%", background: "#111" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-[#111] z-10">
          <div className="w-10 h-1 rounded-full bg-white/25" />
        </div>

        {/* Back arrow */}
        <button onClick={onClose} className="text-white px-4 pb-2">
          <ArrowLeft size={22} />
        </button>

        <div className="px-4 pb-8 flex flex-col gap-6">
          {/* About */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-1">About</h2>
            <p className="text-white/80 text-sm leading-snug">{clip.title}</p>
          </div>

          {/* Creator */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Creator</h2>
            <div className="bg-white/8 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">?</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-snug">{clip.podcastName}</p>
                <p className="text-white/50 text-xs mt-0.5">Podcast</p>
              </div>
            </div>
          </div>

          {/* Watch Full Episode */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Watch Full Episode</h2>
            <div className="bg-white/8 rounded-xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center flex-shrink-0">
                <Youtube size={16} className="text-white" strokeWidth={2} />
              </div>
              <span className="text-white font-semibold text-sm">Watch on YouTube</span>
            </div>
          </div>

          {/* Podcast */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Podcast</h2>
            <div className="bg-white/8 rounded-xl px-4 py-3.5 flex items-center gap-3 cursor-pointer active:opacity-70">
              <AlignJustify size={20} className="text-white/70" strokeWidth={1.5} />
              <span className="text-white font-semibold text-sm">View Playlist</span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-white text-2xl font-bold mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-white/80 text-sm border border-white/20"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Likes / Views */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/8 rounded-xl py-4 text-center">
              <p className="text-white text-2xl font-bold">{likes}</p>
              <p className="text-white/50 text-xs mt-0.5">Likes</p>
            </div>
            <div className="bg-white/8 rounded-xl py-4 text-center">
              <p className="text-white text-2xl font-bold">{clip.views}</p>
              <p className="text-white/50 text-xs mt-0.5">Views</p>
            </div>
          </div>

          {/* Dismiss hint */}
          <p className="text-white/35 text-xs text-center">Swipe down to dismiss</p>
        </div>
      </div>
    </div>
  );
}

function DescriptionOverlay({ clip, onClose }: { clip: Clip; onClose: () => void }) {
  const text = longDescriptions[clip.id] || clip.description;
  const paragraphs = text.split("\n\n");

  return (
    <div
      className="absolute inset-0 z-30 flex flex-col justify-end"
      onClick={onClose}
    >
      <div
        className="h-1/2 rounded-t-2xl overflow-y-auto"
        style={{ background: "rgba(10,10,10,0.96)", backdropFilter: "blur(8px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-9 h-1 rounded-full bg-white/25" />
        </div>
        <div className="px-4 pt-2 pb-8">
          <h2 className="text-white font-bold text-base leading-snug mb-3">{clip.title}</h2>
          <div className="flex flex-col gap-3">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-white/80 text-sm leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BitesCard({ clip, active }: { clip: Clip; active: boolean }) {
  const [liked, setLiked] = useState(clip.liked);
  const [likes, setLikes] = useState(clip.likes);
  const [saved, setSaved] = useState(clip.saved);
  const [muted, setMuted] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(2);
  const [playing, setPlaying] = useState(true);
  const [showDesc, setShowDesc] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartY.current = null;
    touchStartX.current = null;

    // Only handle vertical swipes (not horizontal, which are for clip navigation)
    if (Math.abs(deltaX) > Math.abs(deltaY)) return;

    if (deltaY < -50 && !showAbout && !showDesc) {
      setShowAbout(true);
    } else if (deltaY > 50 && showAbout) {
      setShowAbout(false);
    }
  }

  return (
    <div
      className="relative flex-shrink-0 snap-start"
      style={{ background: clip.thumbnailColor, width: "100%", height: "100%" }}
      onClick={() => { if (!showDesc && !showAbout) setPlaying((p) => !p); }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Play icon overlay when paused */}
      {!playing && !showDesc && !showAbout && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center">
            <Play size={28} className="text-white fill-white ml-1" />
          </div>
        </div>
      )}

      {/* About panel (swipe-up) */}
      {showAbout && (
        <AboutPanel clip={clip} likes={likes} onClose={() => setShowAbout(false)} />
      )}

      {/* Description overlay (three-dot) */}
      {showDesc && !showAbout && (
        <DescriptionOverlay clip={clip} onClose={() => setShowDesc(false)} />
      )}

      {/* Right-side actions */}
      {!showDesc && !showAbout && (
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
      )}

      {/* Bottom info */}
      {!showDesc && !showAbout && (
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-20 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">?</span>
            </div>
            <span className="text-white font-semibold text-sm">{clip.author}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white text-sm leading-snug max-w-[80%]">{clip.title}</p>
            <button
              className="text-white/70 p-1"
              onClick={(e) => { e.stopPropagation(); setShowDesc(true); }}
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      )}
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
