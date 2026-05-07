import { Link } from "wouter";
import { ChevronRight, Activity, Settings, ShieldAlert, HelpCircle, LogOut, Flame, Play, Clock } from "lucide-react";

const menuItems = [
  { icon: Activity, label: "Activity History", path: "/activity" },
  { icon: Settings, label: "Account Settings", path: "/account-settings" },
  { icon: ShieldAlert, label: "Admin Panel", path: "/admin" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

const stats = [
  { label: "Watched", value: "38", icon: Play },
  { label: "Hours", value: "0.6", icon: Clock },
  { label: "Streak", value: "1", icon: Flame },
];

export default function Profile() {
  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div
        className="px-4 pt-5 pb-3 sticky top-0 z-40"
        style={{ background: "rgba(11,15,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <h1 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>Profile</h1>
      </div>

      {/* Avatar + name */}
      <div className="flex flex-col items-center pt-8 pb-6 px-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4 relative"
          style={{
            background: "linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-surface) 100%)",
            border: "2px solid rgba(109,74,255,0.35)",
            boxShadow: "0 0 24px rgba(109,74,255,0.18)",
          }}
        >
          <span className="text-3xl font-bold" style={{ color: "var(--accent-purple)" }}>S</span>
          <div
            className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "var(--accent-teal)", border: "2px solid var(--bg-primary)" }}
          >
            <Flame size={10} className="text-white" />
          </div>
        </div>
        <h2 className="text-[18px] font-bold" style={{ color: "var(--text-primary)" }}>Sarvesh Kaijkar</h2>
        <p className="text-[12px] mt-0.5" style={{ color: "var(--text-secondary)" }}>sarveshkaijkar501@gmail.com</p>

        <div
          className="mt-3 px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5"
          style={{
            background: "rgba(47,163,154,0.12)",
            color: "var(--accent-teal)",
            border: "1px solid rgba(47,163,154,0.25)",
          }}
        >
          <Flame size={11} strokeWidth={2} />
          1 Day Streak
        </div>
      </div>

      {/* Stats */}
      <div className="flex mx-4 gap-3 mb-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex-1 rounded-2xl p-3.5 text-center"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2"
              style={{ background: "rgba(109,74,255,0.15)" }}
            >
              <Icon size={15} style={{ color: "var(--accent-purple)" }} strokeWidth={1.5} />
            </div>
            <p className="font-bold text-[18px]" style={{ color: "var(--text-primary)" }}>{value}</p>
            <p className="text-[10px] mt-0.5" style={{ color: "var(--text-secondary)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="mx-4 flex flex-col gap-2">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Link key={path} href={path}>
            <div
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 cursor-pointer active:opacity-75 transition-opacity"
              style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(109,74,255,0.14)" }}
                >
                  <Icon size={16} style={{ color: "var(--accent-purple)" }} strokeWidth={1.5} />
                </div>
                <span className="font-medium text-[14px]" style={{ color: "var(--text-primary)" }}>{label}</span>
              </div>
              <ChevronRight size={16} style={{ color: "var(--text-secondary)" }} strokeWidth={1.5} />
            </div>
          </Link>
        ))}

        <button
          className="flex items-center gap-3 rounded-2xl px-4 py-3.5 w-full cursor-pointer active:opacity-75 transition-opacity mt-2"
          style={{ background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.14)" }}
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(248,113,113,0.12)" }}>
            <LogOut size={16} style={{ color: "#f87171" }} strokeWidth={1.5} />
          </div>
          <span className="font-medium text-[14px]" style={{ color: "#f87171" }}>Log Out</span>
        </button>
      </div>
    </div>
  );
}
