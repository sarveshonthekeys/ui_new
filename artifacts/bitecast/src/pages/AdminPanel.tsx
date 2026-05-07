import { Link, useLocation } from "wouter";
import { ArrowLeft, ChevronRight, Upload, Pencil, Film, BarChart3, Home } from "lucide-react";
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
          <ArrowLeft size={22} strokeWidth={1.5} style={{ color: "var(--text-primary)" }} />
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

        <Link href="/">
          <div className="rounded-2xl px-4 py-4 flex items-center gap-4 cursor-pointer active:opacity-80" style={{ background: "rgba(109,74,255,0.1)", border: "1px solid rgba(109,74,255,0.25)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(109,74,255,0.18)" }}>
              <Home size={20} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[14px]" style={{ color: "var(--text-primary)" }}>Go to Main App</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>View feed, explore clips, and manage your profile</p>
            </div>
            <ChevronRight size={18} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
          </div>
        </Link>

        {[
          { icon: Upload, label: "Upload Podcast", desc: "Upload full-length podcasts for automatic clipping", href: "/upload-clip" },
          { icon: Pencil, label: "Manage Clips", desc: "Edit, publish, or delete existing clips", href: null },
        ].map(({ icon: Icon, label, desc, href }) => {
          const inner = (
            <div className="rounded-2xl px-4 py-4 flex items-center gap-4 cursor-pointer active:opacity-75" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(109,74,255,0.12)" }}>
                <Icon size={20} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[14px]" style={{ color: "var(--text-primary)" }}>{label}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </div>
              <ChevronRight size={18} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
            </div>
          );
          return href ? <Link key={label} href={href}>{inner}</Link> : <div key={label}>{inner}</div>;
        })}

        <Link href="/upload-clip-demo">
          <div className="rounded-2xl px-4 py-4 flex items-center gap-4 cursor-pointer active:opacity-80" style={{ background: "rgba(47,163,154,0.08)", border: "1px dashed rgba(47,163,154,0.35)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(47,163,154,0.15)" }}>
              <Film size={20} strokeWidth={1.5} style={{ color: "var(--accent-teal)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[14px]" style={{ color: "var(--text-primary)" }}>Upload Clips (Demo)</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Manually upload video clips from local files</p>
            </div>
            <ChevronRight size={18} strokeWidth={1.5} style={{ color: "var(--accent-teal)" }} />
          </div>
        </Link>

        <p className="text-[11px] font-semibold uppercase tracking-widest mt-3 mb-1" style={{ color: "var(--text-secondary)" }}>Insights</p>

        <div className="rounded-2xl px-4 py-4 flex items-center gap-4 cursor-pointer active:opacity-75" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(109,74,255,0.12)" }}>
            <BarChart3 size={20} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[14px]" style={{ color: "var(--text-primary)" }}>Analytics</p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>View engagement metrics and performance data</p>
          </div>
          <ChevronRight size={18} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
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
