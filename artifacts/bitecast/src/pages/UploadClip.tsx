import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

const GENRES = [
  "Business & Finance",
  "Motivation & Mindset",
  "Science & Tech",
  "History, Culture & Daily Affairs",
  "Health & Fitness",
  "Philosophy",
];

export default function UploadClip() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({
    podcastUrl: "",
    podcastTitle: "",
    authorHost: "",
    description: "",
    hashtags: "",
  });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  function handleChange(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleGenre(genre: string) {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      <div
        className="flex items-center gap-3 px-4 pt-5 pb-4"
        style={{ background: "rgba(11,15,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <button onClick={() => navigate("/admin")} className="active:opacity-60">
          <ArrowLeft size={22} strokeWidth={1.5} style={{ color: "var(--text-primary)" }} />
        </button>
        <h1 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>Upload Podcast</h1>
      </div>

      <div className="px-4 mt-5 flex flex-col gap-4">
        <h2 className="text-[17px] font-bold" style={{ color: "var(--text-primary)" }}>Podcast Information</h2>

        {/* Podcast URL — no label, no helper text */}
        <input
          type="url"
          placeholder="https://example.com/podcast-video"
          value={form.podcastUrl}
          onChange={(e) => handleChange("podcastUrl", e.target.value)}
          className="w-full rounded-2xl px-4 py-3.5 text-[14px] outline-none"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--text-primary)",
          }}
        />

        {/* Podcast Title */}
        <div>
          <label className="block text-[13px] font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
            Podcast Title <span style={{ color: "#f87171" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Name of the podcast"
            value={form.podcastTitle}
            onChange={(e) => handleChange("podcastTitle", e.target.value)}
            className="w-full rounded-2xl px-4 py-3.5 text-[14px] outline-none"
            style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
          />
        </div>

        {/* Author / Host */}
        <div>
          <label className="block text-[13px] font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
            Author / Host <span style={{ color: "#f87171" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Podcast host or creator name"
            value={form.authorHost}
            onChange={(e) => handleChange("authorHost", e.target.value)}
            className="w-full rounded-2xl px-4 py-3.5 text-[14px] outline-none"
            style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[13px] font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
            Description <span style={{ color: "#f87171" }}>*</span>
          </label>
          <textarea
            placeholder="Brief description of the podcast episode"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="w-full rounded-2xl px-4 py-3.5 text-[14px] outline-none resize-none"
            style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
          />
        </div>

        {/* Hashtags */}
        <div>
          <label className="block text-[13px] font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Hashtags</label>
          <input
            type="text"
            placeholder="#motivation #business #productivity"
            value={form.hashtags}
            onChange={(e) => handleChange("hashtags", e.target.value)}
            className="w-full rounded-2xl px-4 py-3.5 text-[14px] outline-none"
            style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
          />
          <p className="text-[11px] mt-1.5" style={{ color: "var(--text-secondary)" }}>Separate hashtags with spaces or commas.</p>
        </div>

        {/* Genres */}
        <div>
          <label className="block text-[13px] font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>
            Genres <span style={{ color: "#f87171" }}>*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((genre) => {
              const active = selectedGenres.includes(genre);
              return (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className="px-4 py-2 rounded-full text-[13px] font-medium transition-colors"
                  style={{
                    background: active ? "rgba(109,74,255,0.2)" : "var(--bg-elevated)",
                    border: active ? "1px solid rgba(109,74,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
                    color: active ? "var(--accent-purple)" : "var(--text-secondary)",
                  }}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            onClick={() => navigate("/admin")}
            className="font-bold py-4 rounded-2xl text-[14px] active:opacity-80"
            style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            Cancel
          </button>
          <button
            className="font-bold py-4 rounded-2xl text-[14px] active:opacity-80"
            style={{ background: "var(--accent-purple)", color: "#fff" }}
          >
            Submit Podcast
          </button>
        </div>

        <p className="text-center text-[11px] pb-2" style={{ color: "var(--text-secondary)" }}>
          * Required fields. Vizard API will automatically clip the podcast.
        </p>
      </div>
    </div>
  );
}
