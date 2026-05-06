import { useLocation } from "wouter";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { activityHistory } from "@/data/mockData";

export default function ActivityHistory() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 sticky top-0 bg-black z-40 border-b border-white/8">
        <button onClick={() => navigate("/profile")} className="text-white">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white text-xl font-bold">Activity History</h1>
      </div>

      <div className="px-4 mt-4">
        {/* Statistics */}
        <h2 className="text-white font-bold text-lg mb-3">Statistics</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "Clips Watched", value: "38" },
            { label: "Hours", value: "0.6" },
            { label: "Podcasts", value: "0" },
            { label: "Day Streak", value: "1" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white/5 border border-white/8 rounded-xl p-4 text-center"
            >
              <p className="text-white font-bold text-2xl">{value}</p>
              <p className="text-white/50 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <h2 className="text-white font-bold text-lg mb-3">Recent Activity</h2>
        <div className="flex flex-col gap-2">
          {activityHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/8 rounded-xl px-4 py-3.5 flex items-center gap-3"
            >
              <PlayCircle size={20} className="text-white/50 flex-shrink-0" strokeWidth={1.5} />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{item.clipTitle}</p>
                <p className="text-white/40 text-xs mt-0.5">Watched • {item.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
