import { Link } from "wouter";
import { ChevronRight, Activity, Settings, ShieldAlert, HelpCircle, LogOut, User } from "lucide-react";

const menuItems = [
  { icon: Activity, label: "Activity History", path: "/activity" },
  { icon: Settings, label: "Account Settings", path: "/account-settings" },
  { icon: ShieldAlert, label: "Admin Panel", path: "/admin" },
  { icon: HelpCircle, label: "Help & Support", path: "/help" },
];

export default function Profile() {
  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 sticky top-0 bg-black z-40 flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Profile</h1>
      </div>

      {/* Avatar + name */}
      <div className="flex flex-col items-center py-8">
        <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center mb-3">
          <User size={36} className="text-white/60" />
        </div>
        <h2 className="text-white text-xl font-bold">Sarvesh Kaijkar</h2>
        <p className="text-white/50 text-sm mt-0.5">sarveshkaijkar501@gmail.com</p>
      </div>

      {/* Stats row */}
      <div className="flex mx-4 gap-3 mb-6">
        {[
          { label: "Clips Watched", value: "38" },
          { label: "Hours", value: "0.6" },
          { label: "Day Streak", value: "1" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex-1 bg-white/5 rounded-xl p-3 text-center border border-white/8"
          >
            <p className="text-white font-bold text-lg">{value}</p>
            <p className="text-white/50 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="mx-4 flex flex-col gap-2">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Link key={path} href={path}>
            <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-4 cursor-pointer active:bg-white/10 border border-white/8">
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-white/70" strokeWidth={1.5} />
                <span className="text-white font-medium text-[15px]">{label}</span>
              </div>
              <ChevronRight size={18} className="text-white/40" />
            </div>
          </Link>
        ))}

        {/* Logout */}
        <button className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-4 w-full cursor-pointer active:bg-white/10 border border-white/8 mt-2">
          <div className="flex items-center gap-3">
            <LogOut size={20} className="text-red-400" strokeWidth={1.5} />
            <span className="text-red-400 font-medium text-[15px]">Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
}
