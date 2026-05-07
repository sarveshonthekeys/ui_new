import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function UploadClipDemo() {
  const [, navigate] = useLocation();
  const [form, setForm] = useState({
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
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      <div
        className="flex items-center gap-3 px-4 pt-5 pb-4 sticky top-0 z-40"
        style={{ background: "rgba(11,15,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <button onClick={() => navigate("/admin")} className="active:opacity-60">
          <ArrowLeft size={22} strokeWidth={1.5} style={{ color: "var(--text-primary)" }} />
        </button>
        <h1 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>Upload Clips</h1>
      </div>

      <div className="px-4 mt-5 flex flex-col gap-4">
        <h2 className="text-[17px] font-bold" style={{ color: "var(--text-primary)" }}>Clip Information</h2>

        {/* Podcast Name */}
        <div>
          <label className="block text-[13px] font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
            Podcast Name <span style={{ color: "#f87171" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Name of the original podcast"
            value={form.podcastName}
            onChange={(e) => handleChange("podcastName", e.target.value)}
            className="w-full rounded-2xl px-4 py-3.5 text-[14px] outline-none"
            style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
          />
        </div>

        {/* YouTube Link */}
        <div>
          <label className="block text-[13px] font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
            YouTube Link <span style={{ color: "#f87171" }}>*</span>
          </label>
          <input
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={form.youtubeLink}
            onChange={(e) => handleChange("youtubeLink", e.target.value)}
            className="w-full rounded-2xl px-4 py-3.5 text-[14px] outline-none"
            style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-[13px] font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
            Title <span style={{ color: "#f87171" }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Clip title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full rounded-2xl px-4 py-3.5 text-[14px] outline-none"
            style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[13px] font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>Description</label>
          <textarea
            placeholder="Clip description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={4}
            className="w-full rounded-2xl px-4 py-3.5 text-[14px] outline-none resize-none"
            style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
          />
        </div>

        {/* Video File */}
        <div>
          <label className="block text-[13px] font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
            Video File <span style={{ color: "#f87171" }}>*</span>
          </label>
          <div
            className="w-full rounded-2xl px-4 py-4 cursor-pointer active:opacity-70 transition-opacity flex items-center gap-3"
            style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={() => fileRef.current?.click()}
          >
            <span className="text-[14px]" style={{ color: videoFile ? "var(--text-primary)" : "var(--text-secondary)" }}>
              {videoFile ? videoFile.name : "Select video file…"}
            </span>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
          />
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
            Add Clip
          </button>
        </div>

        <p className="text-center text-[11px] pb-2" style={{ color: "var(--text-secondary)" }}>
          * Required fields.
        </p>
      </div>
    </div>
  );
}
