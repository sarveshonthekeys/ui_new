import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function UploadClipDemo() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({
    podcastId: "",
    podcastName: "",
    youtubeLink: "",
    title: "",
    description: "",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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

      {/* Demo mode banner */}
      <div className="mx-4 mt-4 bg-amber-900/30 border border-amber-600/40 rounded-xl px-4 py-3 flex gap-3">
        <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-400 font-bold text-sm">DEMO MODE - Manual Upload</p>
          <p className="text-amber-400/70 text-xs mt-0.5">This feature is temporary. Production will use AI pipeline.</p>
        </div>
      </div>

      <div className="px-4 mt-5">
        <h2 className="text-white text-xl font-bold mb-5">Add Clip (Demo Only)</h2>

        <div className="flex flex-col gap-4">
          {/* Podcast ID */}
          <div>
            <label className="text-white font-semibold text-sm block mb-2">Podcast ID (optional)</label>
            <input
              type="text"
              placeholder="Enter podcast ID (optional - leave empty for standalone clip)"
              value={form.podcastId}
              onChange={(e) => handleChange("podcastId", e.target.value)}
              className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50"
            />
            <p className="text-white/40 text-xs mt-1.5">Leave empty to create a standalone clip without a podcast</p>
          </div>

          {/* Podcast Name */}
          <div>
            <label className="text-white font-semibold text-sm block mb-2">
              Podcast Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Name of the original podcast"
              value={form.podcastName}
              onChange={(e) => handleChange("podcastName", e.target.value)}
              className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50"
            />
          </div>

          {/* YouTube Link */}
          <div>
            <label className="text-white font-semibold text-sm block mb-2">
              YouTube Link <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={form.youtubeLink}
              onChange={(e) => handleChange("youtubeLink", e.target.value)}
              className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Title */}
          <div>
            <label className="text-white font-semibold text-sm block mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Clip title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-white font-semibold text-sm block mb-2">Description (optional)</label>
            <textarea
              placeholder="Clip description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none focus:border-amber-500/50 resize-none"
            />
          </div>

          {/* Video File */}
          <div>
            <label className="text-white font-semibold text-sm block mb-2">
              Video File <span className="text-red-400">*</span>
            </label>
            <div
              className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-4 cursor-pointer active:bg-white/15 flex items-center gap-3"
              onClick={() => fileRef.current?.click()}
            >
              <div className="text-sm text-white/50">
                {videoFile ? videoFile.name : "Select Video File"}
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <button className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl text-sm mt-2 active:opacity-80">
            Add Clip
          </button>
        </div>
      </div>
    </div>
  );
}
