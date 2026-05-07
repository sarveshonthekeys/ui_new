import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Trash2, ChevronRight, Bell, Shield, Target } from "lucide-react";

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${value ? "bg-amber-500" : "bg-white/15"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

function SectionRow({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3.5 border-b border-white/6 last:border-0">
      <div className="min-w-0">
        <p className="text-white text-sm font-medium">{label}</p>
        {desc && <p className="text-white/40 text-xs mt-0.5 leading-snug">{desc}</p>}
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );
}

export default function AccountSettings() {
  const [, navigate] = useLocation();
  const [displayName, setDisplayName] = useState("Sarvesh Kaijkar");
  const [saved, setSaved] = useState(false);

  // Notifications
  const [pushEnabled, setPushEnabled] = useState(true);
  const [newClips, setNewClips] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [streakReminders, setStreakReminders] = useState(true);

  // Privacy & Security
  const [privateProfile, setPrivateProfile] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  // Goals & Preferences
  const [dailyGoal, setDailyGoal] = useState(3);
  const [autoplay, setAutoplay] = useState(true);
  const [saveData, setSaveData] = useState(false);
  const [captions, setCaptions] = useState(false);

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

      <div className="px-4 mt-5 flex flex-col gap-6">
        {/* Profile Information */}
        <div>
          <h2 className="text-white font-bold text-[15px] mb-3">Profile Information</h2>
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
        </div>

        {/* Notifications */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Bell size={16} className="text-amber-400" strokeWidth={1.5} />
            <h2 className="text-white font-bold text-[15px]">Notifications</h2>
          </div>
          <div className="bg-white/5 border border-white/8 rounded-xl px-4">
            <SectionRow label="Push Notifications" desc="Enable all push notifications" value={pushEnabled} onChange={setPushEnabled} />
            <SectionRow label="New Clips" desc="Notify when new clips are available" value={newClips} onChange={setNewClips} />
            <SectionRow label="Weekly Digest" desc="Get a weekly summary of top clips" value={weeklyDigest} onChange={setWeeklyDigest} />
            <SectionRow label="Streak Reminders" desc="Daily reminders to keep your streak" value={streakReminders} onChange={setStreakReminders} />
          </div>
        </div>

        {/* Privacy & Security */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} className="text-amber-400" strokeWidth={1.5} />
            <h2 className="text-white font-bold text-[15px]">Privacy & Security</h2>
          </div>
          <div className="bg-white/5 border border-white/8 rounded-xl px-4">
            <SectionRow label="Private Profile" desc="Only you can see your activity" value={privateProfile} onChange={setPrivateProfile} />
            <SectionRow label="Show Activity History" desc="Display your watching history" value={showActivity} onChange={setShowActivity} />
            <SectionRow label="Personalisation Data" desc="Allow data use for recommendations" value={dataCollection} onChange={setDataCollection} />
            <SectionRow label="Two-Factor Authentication" desc="Add an extra layer of security" value={twoFactor} onChange={setTwoFactor} />
          </div>
          <button className="mt-2 w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3.5 flex items-center justify-between active:bg-white/10">
            <span className="text-white text-sm font-medium">Change Password</span>
            <ChevronRight size={16} className="text-white/40" />
          </button>
        </div>

        {/* Goals & Preferences */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} className="text-amber-400" strokeWidth={1.5} />
            <h2 className="text-white font-bold text-[15px]">Goals & Preferences</h2>
          </div>
          <div className="bg-white/5 border border-white/8 rounded-xl px-4">
            <SectionRow label="Autoplay Next Clip" desc="Automatically play the next bite" value={autoplay} onChange={setAutoplay} />
            <SectionRow label="Captions" desc="Show captions on video clips" value={captions} onChange={setCaptions} />
            <SectionRow label="Data Saver" desc="Reduce video quality to save data" value={saveData} onChange={setSaveData} />
          </div>
          {/* Daily goal picker */}
          <div className="mt-2 bg-white/5 border border-white/8 rounded-xl px-4 py-3.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Daily Clip Goal</p>
                <p className="text-white/40 text-xs mt-0.5">Clips to watch per day</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDailyGoal((g) => Math.max(1, g - 1))}
                  className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white font-bold active:bg-white/20"
                >
                  −
                </button>
                <span className="text-white font-bold text-base w-4 text-center">{dailyGoal}</span>
                <button
                  onClick={() => setDailyGoal((g) => Math.min(20, g + 1))}
                  className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white font-bold active:bg-white/20"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div>
          <h2 className="text-white font-bold text-[15px] mb-3">Account Actions</h2>
          <div className="bg-red-950/40 border border-red-800/40 rounded-xl px-4 py-4 flex items-center justify-between cursor-pointer active:opacity-80">
            <div className="flex items-center gap-3">
              <Trash2 size={18} className="text-red-400" strokeWidth={1.5} />
              <span className="text-red-400 font-semibold text-[15px]">Delete Account</span>
            </div>
            <ChevronRight size={18} className="text-red-400/50" />
          </div>
        </div>

        {/* Save Changes */}
        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-xl text-sm font-bold transition-colors ${
            saved ? "bg-green-600 text-white" : "bg-amber-500 text-black"
          }`}
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
