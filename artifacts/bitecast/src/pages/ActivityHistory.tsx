import { useLocation } from "wouter";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { activityHistory } from "@/data/mockData";

export default function ActivityHistory() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      <div
        className="flex items-center gap-3 px-4 pt-5 pb-4"
        style={{ background: "rgba(11,15,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <button onClick={() => navigate("/profile")} className="active:opacity-60">
          <ArrowLeft size={22} strokeWidth={1.5} style={{ color: "var(--text-primary)" }} />
        </button>
        <h1 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>Activity History</h1>
      </div>

      <div className="px-4 mt-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>Statistics</p>
        <div className="grid grid-cols-2 gap-3 mb-7">
          {[
            { label: "Clips Watched", value: "38" },
            { label: "Hours", value: "0.6" },
            { label: "Podcasts", value: "0" },
            { label: "Day Streak", value: "1" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl p-4 text-center" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="font-bold text-[24px]" style={{ color: "var(--text-primary)" }}>{value}</p>
              <p className="text-[11px] mt-1" style={{ color: "var(--text-secondary)" }}>{label}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>Recent Activity</p>
        <div className="flex flex-col gap-2">
          {activityHistory.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
              style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(109,74,255,0.12)" }}>
                <PlayCircle size={16} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate" style={{ color: "var(--text-primary)" }}>{item.clipTitle}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Watched · {item.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
