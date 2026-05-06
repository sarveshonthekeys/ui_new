import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Trash2, ChevronRight } from "lucide-react";

export default function AccountSettings() {
  const [, navigate] = useLocation();
  const [displayName, setDisplayName] = useState("Sarvesh Kaijkar");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 sticky top-0 bg-black z-40 border-b border-white/8">
        <button onClick={() => navigate("/profile")} className="text-white">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white text-xl font-bold">Account Settings</h1>
      </div>

      <div className="px-4 mt-5">
        {/* Profile Information */}
        <h2 className="text-white font-bold text-lg mb-3">Profile Information</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-white/60 text-xs block mb-1.5">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm outline-none focus:border-amber-500/50"
            />
          </div>

          <div>
            <label className="text-white/60 text-xs block mb-1.5">Email</label>
            <input
              type="email"
              value="sarveshkaijkar501@gmail.com"
              disabled
              className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3.5 text-white/40 text-sm outline-none cursor-not-allowed"
            />
            <p className="text-white/30 text-xs mt-1.5">Email cannot be changed</p>
          </div>
        </div>

        {/* Account Actions */}
        <h2 className="text-white font-bold text-lg mt-7 mb-3">Account Actions</h2>

        <div
          className="bg-red-950/40 border border-red-800/40 rounded-xl px-4 py-4 flex items-center justify-between cursor-pointer active:opacity-80"
        >
          <div className="flex items-center gap-3">
            <Trash2 size={18} className="text-red-400" strokeWidth={1.5} />
            <span className="text-red-400 font-semibold text-[15px]">Delete Account</span>
          </div>
          <ChevronRight size={18} className="text-red-400/50" />
        </div>

        {/* Save Changes */}
        <button
          onClick={handleSave}
          className={`w-full mt-6 py-4 rounded-xl text-sm font-bold transition-colors ${
            saved ? "bg-green-600 text-white" : "bg-white/15 text-white/50"
          }`}
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
