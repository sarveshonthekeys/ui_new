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
    episodeTitle: "",
    authorHost: "",
    description: "",
    coverImageUrl: "",
    duration: "",
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
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 sticky top-0 bg-black z-40 border-b border-white/8">
        <button onClick={() => navigate("/admin")} className="text-white text-sm font-medium flex items-center gap-1">
          <ArrowLeft size={16} />
          Back
        </button>
        <h1 className="text-white text-xl font-bold">Upload Clip</h1>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-4">
        {/* Podcast Information heading */}
        <h2 className="text-white text-lg font-bold">Podcast Information</h2>

        {/* Podcast URL */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">
            Podcast URL <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            placeholder="https://example.com/podcast-video"
            value={form.podcastUrl}
            onChange={(e) => handleChange("podcastUrl", e.target.value)}
            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50"
          />
          <p className="text-white/40 text-xs mt-1.5">Enter the direct URL to the full-length podcast video</p>
        </div>

        {/* Podcast Title */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">
            Podcast Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Name of the podcast"
            value={form.podcastTitle}
            onChange={(e) => handleChange("podcastTitle", e.target.value)}
            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Episode Title */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">Episode Title</label>
          <input
            type="text"
            placeholder="Episode name or number (optional)"
            value={form.episodeTitle}
            onChange={(e) => handleChange("episodeTitle", e.target.value)}
            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Author / Host */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">
            Author/Host <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Podcast host or creator name"
            value={form.authorHost}
            onChange={(e) => handleChange("authorHost", e.target.value)}
            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            placeholder="Brief description of the podcast episode"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50 resize-none"
          />
        </div>

        {/* Cover Image URL */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">Cover Image URL</label>
          <input
            type="url"
            placeholder="https://example.com/cover.jpg (optional)"
            value={form.coverImageUrl}
            onChange={(e) => handleChange("coverImageUrl", e.target.value)}
            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">Duration (minutes)</label>
          <input
            type="number"
            placeholder="e.g., 60 (optional)"
            value={form.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Hashtags */}
        <div>
          <label className="text-white font-semibold text-sm block mb-2">Hashtags</label>
          <input
            type="text"
            placeholder="#motivation #business #productivity"
            value={form.hashtags}
            onChange={(e) => handleChange("hashtags", e.target.value)}
            className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50"
          />
          <p className="text-white/40 text-xs mt-1.5">Enter hashtags separated by spaces or commas. Used for personalized recommendations.</p>
        </div>

        {/* Genres */}
        <div>
          <label className="text-white font-semibold text-sm block mb-3">
            Genres <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((genre) => {
              const active = selectedGenres.includes(genre);
              return (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className="px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                  style={{
                    background: active ? "rgba(255,255,255,0.15)" : "transparent",
                    borderColor: active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
                    color: "#fff",
                  }}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            onClick={() => navigate("/admin")}
            className="bg-white/10 text-white font-bold py-4 rounded-xl text-sm active:opacity-80"
          >
            Cancel
          </button>
          <button className="bg-white text-black font-bold py-4 rounded-xl text-sm active:opacity-80">
            Submit Podcast
          </button>
        </div>

        <p className="text-white/30 text-xs text-center pb-2">
          * Required fields. Vizard API will automatically clip the podcast and create a playlist.
        </p>
      </div>
    </div>
  );
}
