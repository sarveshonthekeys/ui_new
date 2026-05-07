import { Link, useLocation } from "wouter";
import { ChevronRight, Upload, Film, BarChart3, Pencil } from "lucide-react";
import { quickStats } from "@/data/mockData";

export default function AdminPanel() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      <div
        className="flex items-center gap-3 px-4 pt-5 pb-4 sticky top-0 z-40"
        style={{ background: "rgba(11,15,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <button onClick={() => navigate("/profile")} className="active:opacity-60">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-primary)" }}><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <h1 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>Admin Panel</h1>
      </div>

      <div className="px-4 mt-5 flex flex-col gap-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-[18px] font-bold" style={{ color: "var(--text-primary)" }}>Admin Panel</h2>
            <p className="text-[12px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Welcome, Sarvesh Kaijkar</p>
          </div>
          <button className="px-4 py-1.5 rounded-xl text-[13px] font-semibold active:opacity-70" style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}>
            Logout
          </button>
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-widest mt-2 mb-1" style={{ color: "var(--text-secondary)" }}>Content Management</p>

        {/* Upload Podcast + Upload Clips side by side */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/upload-clip">
            <div className="rounded-2xl px-4 py-4 flex flex-col gap-3 cursor-pointer active:opacity-75 h-full" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(109,74,255,0.12)" }}>
                <Upload size={20} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
              </div>
              <div>
                <p className="font-semibold text-[14px]" style={{ color: "var(--text-primary)" }}>Upload Podcast</p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Upload full-length podcasts</p>
              </div>
            </div>
          </Link>

          <Link href="/upload-clip-demo">
            <div className="rounded-2xl px-4 py-4 flex flex-col gap-3 cursor-pointer active:opacity-75 h-full" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(109,74,255,0.12)" }}>
                <Film size={20} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
              </div>
              <div>
                <p className="font-semibold text-[14px]" style={{ color: "var(--text-primary)" }}>Upload Clips</p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Upload video clips manually</p>
              </div>
            </div>
          </Link>
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-widest mt-3 mb-1" style={{ color: "var(--text-secondary)" }}>Insights</p>

        {/* Analytics (contains Manage Clips) */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="px-4 py-4 flex items-center gap-4 cursor-pointer active:opacity-75">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(109,74,255,0.12)" }}>
              <BarChart3 size={20} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[14px]" style={{ color: "var(--text-primary)" }}>Analytics</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>View engagement metrics and performance data</p>
            </div>
            <ChevronRight size={18} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
          </div>
          <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />
          <div className="px-4 py-4 flex items-center gap-4 cursor-pointer active:opacity-75">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(109,74,255,0.12)" }}>
              <Pencil size={20} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[14px]" style={{ color: "var(--text-primary)" }}>Manage Clips</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Edit, publish, or delete existing clips</p>
            </div>
            <ChevronRight size={18} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
          </div>
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-widest mt-3 mb-1" style={{ color: "var(--text-secondary)" }}>Quick Stats</p>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Clips", value: quickStats.totalClips },
            { label: "Published", value: quickStats.published },
            { label: "Total Views", value: quickStats.totalViews },
            { label: "Total Likes", value: quickStats.totalLikes },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl p-4 text-center" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="font-bold text-[24px]" style={{ color: "var(--text-primary)" }}>{value}</p>
              <p className="text-[11px] mt-1" style={{ color: "var(--text-secondary)" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
