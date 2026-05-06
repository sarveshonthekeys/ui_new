import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function UploadClip() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({
    episodeTitle: "",
    authorHost: "",
    description: "",
    coverImageUrl: "",
    duration: "",
    hashtags: "",
  });

  function handleChange(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 sticky top-0 bg-black z-40 border-b border-white/8">
        <button onClick={() => navigate("/admin")} className="text-white">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white text-xl font-bold">Upload Clip</h1>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-4">
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

        <button className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl text-sm mt-2 active:opacity-80">
          Upload Clip
        </button>
      </div>
    </div>
  );
}
