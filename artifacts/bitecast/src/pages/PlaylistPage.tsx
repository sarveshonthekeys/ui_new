import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Youtube } from "lucide-react";
import { playlists, clips } from "@/data/mockData";
import { Link } from "wouter";

export default function PlaylistPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const playlist = playlists.find((p) => p.id === id);
  const [watched] = useState(0);

  if (!playlist) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <p style={{ color: "var(--text-secondary)" }}>Playlist not found</p>
      </div>
    );
  }

  const playlistClips = playlist.clipIds
    .map((cid) => clips.find((c) => c.id === cid))
    .filter(Boolean) as typeof clips;

  const total = playlistClips.length;
  const progress = total > 0 ? (watched / total) * 100 : 0;

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div className="px-4 pt-5 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1 as any)} className="active:opacity-60">
          <ArrowLeft size={22} strokeWidth={1.5} style={{ color: "var(--text-primary)" }} />
        </button>
        <h1 className="text-[18px] font-bold leading-tight line-clamp-1" style={{ color: "var(--text-primary)" }}>
          {playlist.title}
        </h1>
      </div>

      {/* Playlist info card */}
      <div className="mx-4 mb-5 rounded-2xl p-4" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Podcast + Creator */}
        <p className="font-bold text-[15px]" style={{ color: "var(--text-primary)" }}>{playlist.podcastName}</p>
        <p className="text-[12px] mt-0.5 mb-3" style={{ color: "var(--text-secondary)" }}>{playlist.author}</p>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, background: "var(--accent-purple)" }}
            />
          </div>
          <span className="text-[12px] font-semibold flex-shrink-0" style={{ color: "var(--text-secondary)" }}>
            {watched}/{total} watched
          </span>
        </div>

        {/* YouTube button */}
        <a
          href={playlist.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl active:opacity-70 transition-opacity w-fit"
          style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}
        >
          <Youtube size={15} strokeWidth={2} style={{ color: "#f87171" }} />
          <span className="text-[13px] font-semibold" style={{ color: "#f87171" }}>Watch on YouTube</span>
        </a>
      </div>

      {/* Clips grid */}
      <div className="px-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>
          Bites — {total}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {playlistClips.map((clip) => (
            <Link key={clip.id} href={`/bites?clip=${clip.id}`}>
              <div className="cursor-pointer active:opacity-75 transition-opacity">
                <div
                  className="w-full rounded-2xl relative overflow-hidden"
                  style={{ background: clip.thumbnailColor, aspectRatio: "9/14", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,15,20,0.75) 0%, transparent 55%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                    <p className="font-semibold text-[11px] leading-snug line-clamp-2 text-white">{clip.title}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
