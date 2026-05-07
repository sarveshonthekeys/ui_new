import { Link, useLocation } from "wouter";
import { ArrowLeft, ChevronRight, Upload, Pencil, Film, BarChart3, Home } from "lucide-react";
import { quickStats } from "@/data/mockData";

export default function AdminPanel() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 sticky top-0 bg-black z-40 border-b border-white/8">
        <button onClick={() => navigate("/profile")} className="text-white">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white text-xl font-bold">Admin Panel</h1>
      </div>

      <div className="px-4 mt-5 flex flex-col gap-3">
        {/* Title + Logout */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-white text-2xl font-bold">Admin Panel</h2>
            <p className="text-white/50 text-sm mt-0.5">Welcome, Sarvesh Kaijkar</p>
          </div>
          <button className="border border-red-500 text-red-400 text-sm font-semibold px-4 py-1.5 rounded-lg active:opacity-70">
            Logout
          </button>
        </div>

        {/* Content Management */}
        <h2 className="text-white text-base font-bold mt-3">Content Management</h2>

        {/* Go to Main App - purple border */}
        <Link href="/">
          <div
            className="rounded-xl px-4 py-4 flex items-center gap-4 cursor-pointer active:opacity-80"
            style={{ border: "1.5px solid rgba(139,92,246,0.7)", background: "rgba(139,92,246,0.08)" }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(139,92,246,0.18)" }}>
              <Home size={20} className="text-violet-400" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-[15px]">Go to Main App</p>
              <p className="text-white/50 text-xs mt-0.5">View feed, explore clips, and manage your profile</p>
            </div>
            <ChevronRight size={18} className="text-white/40 flex-shrink-0" />
          </div>
        </Link>

        {/* Upload Podcast */}
        <Link href="/upload-clip">
          <div className="bg-white/5 border border-white/8 rounded-xl px-4 py-4 flex items-center gap-4 cursor-pointer active:bg-white/10">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Upload size={20} className="text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-[15px]">Upload Podcast</p>
              <p className="text-white/50 text-xs mt-0.5">Upload full-length podcasts for automatic clipping via Vizard API</p>
            </div>
            <ChevronRight size={18} className="text-white/40 flex-shrink-0" />
          </div>
        </Link>

        {/* Manage Clips */}
        <div className="bg-white/5 border border-white/8 rounded-xl px-4 py-4 flex items-center gap-4 cursor-pointer active:bg-white/10">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <Pencil size={20} className="text-white" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-[15px]">Manage Clips</p>
            <p className="text-white/50 text-xs mt-0.5">Edit, publish, or delete existing clips</p>
          </div>
          <ChevronRight size={18} className="text-white/40 flex-shrink-0" />
        </div>

        {/* Upload Clips Demo - highlighted */}
        <Link href="/upload-clip-demo">
          <div
            className="border-2 rounded-xl px-4 py-4 flex items-center gap-4 cursor-pointer active:opacity-80"
            style={{ borderColor: "#b45309", borderStyle: "dashed", background: "rgba(180,83,9,0.10)" }}
          >
            <div className="w-10 h-10 rounded-lg bg-amber-900/40 flex items-center justify-center flex-shrink-0">
              <Film size={20} className="text-amber-400" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-[15px]">Upload Clips (Demo)</p>
              <p className="text-white/50 text-xs mt-0.5">Manually upload video clips from local files</p>
            </div>
            <ChevronRight size={18} className="text-amber-400/60 flex-shrink-0" />
          </div>
        </Link>

        {/* Insights */}
        <h2 className="text-white text-base font-bold mt-3">Insights</h2>

        <div className="bg-white/5 border border-white/8 rounded-xl px-4 py-4 flex items-center gap-4 cursor-pointer active:bg-white/10">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
            <BarChart3 size={20} className="text-amber-400" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-[15px]">Analytics</p>
            <p className="text-white/50 text-xs mt-0.5">View engagement metrics and performance data</p>
          </div>
          <ChevronRight size={18} className="text-white/40 flex-shrink-0" />
        </div>

        {/* Quick Stats */}
        <h2 className="text-white text-base font-bold mt-3">Quick Stats</h2>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Clips", value: quickStats.totalClips },
            { label: "Published", value: quickStats.published },
            { label: "Total Views", value: quickStats.totalViews },
            { label: "Total Likes", value: quickStats.totalLikes },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white/5 border border-white/8 rounded-xl p-4 text-center"
            >
              <p className="text-white text-2xl font-bold">{value}</p>
              <p className="text-white/50 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
