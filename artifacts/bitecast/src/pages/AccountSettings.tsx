import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Trash2, ChevronRight, Bell, Shield, Target } from "lucide-react";

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
      style={{ background: value ? "var(--accent-purple)" : "rgba(255,255,255,0.12)" }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
        style={{ transform: value ? "translateX(20px)" : "translateX(0)" }}
      />
    </button>
  );
}

function SectionRow({ label, desc, value, onChange }: { label: string; desc?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="min-w-0">
        <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>{label}</p>
        {desc && <p className="text-[11px] mt-0.5 leading-snug" style={{ color: "var(--text-secondary)" }}>{desc}</p>}
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  );
}

function SectionCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "rgba(109,74,255,0.14)" }}>
          <Icon size={14} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>{title}</p>
      </div>
      <div className="rounded-2xl px-4" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
        {children}
      </div>
    </div>
  );
}

export default function AccountSettings() {
  const [, navigate] = useLocation();
  const [displayName, setDisplayName] = useState("Sarvesh Kaijkar");
  const [saved, setSaved] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [newClips, setNewClips] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [streakReminders, setStreakReminders] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(3);
  const [autoplay, setAutoplay] = useState(true);
  const [saveData, setSaveData] = useState(false);
  const [captions, setCaptions] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      <div
        className="flex items-center gap-3 px-4 pt-5 pb-4 sticky top-0 z-40"
        style={{ background: "rgba(11,15,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <button onClick={() => navigate("/profile")} className="active:opacity-60">
          <ArrowLeft size={22} strokeWidth={1.5} style={{ color: "var(--text-primary)" }} />
        </button>
        <h1 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>Account Settings</h1>
      </div>

      <div className="px-4 mt-5 flex flex-col gap-6">
        {/* Profile Information */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>Profile Information</p>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[11px] block mb-1.5" style={{ color: "var(--text-secondary)" }}>Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-2xl px-4 py-3.5 text-[13px] outline-none"
                style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
              />
            </div>
            <div>
              <label className="text-[11px] block mb-1.5" style={{ color: "var(--text-secondary)" }}>Email</label>
              <input
                type="email"
                value="sarveshkaijkar501@gmail.com"
                disabled
                className="w-full rounded-2xl px-4 py-3.5 text-[13px] outline-none cursor-not-allowed"
                style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)", color: "var(--text-secondary)", opacity: 0.6 }}
              />
              <p className="text-[11px] mt-1.5" style={{ color: "var(--text-secondary)", opacity: 0.5 }}>Email cannot be changed</p>
            </div>
          </div>
        </div>

        <SectionCard icon={Bell} title="Notifications">
          <SectionRow label="Push Notifications" desc="Enable all push notifications" value={pushEnabled} onChange={setPushEnabled} />
          <SectionRow label="New Clips" desc="Notify when new clips are available" value={newClips} onChange={setNewClips} />
          <SectionRow label="Weekly Digest" desc="Get a weekly summary of top clips" value={weeklyDigest} onChange={setWeeklyDigest} />
          <div className="py-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>Streak Reminders</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Daily reminders to keep your streak</p>
            </div>
            <Toggle value={streakReminders} onChange={setStreakReminders} />
          </div>
        </SectionCard>

        <SectionCard icon={Shield} title="Privacy & Security">
          <SectionRow label="Private Profile" desc="Only you can see your activity" value={privateProfile} onChange={setPrivateProfile} />
          <SectionRow label="Show Activity History" desc="Display your watching history" value={showActivity} onChange={setShowActivity} />
          <SectionRow label="Personalisation Data" desc="Allow data use for recommendations" value={dataCollection} onChange={setDataCollection} />
          <div className="py-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>Two-Factor Auth</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Add an extra layer of security</p>
            </div>
            <Toggle value={twoFactor} onChange={setTwoFactor} />
          </div>
        </SectionCard>

        <button
          className="w-full rounded-2xl px-4 py-3.5 flex items-center justify-between active:opacity-70"
          style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>Change Password</span>
          <ChevronRight size={16} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
        </button>

        <SectionCard icon={Target} title="Goals & Preferences">
          <SectionRow label="Autoplay Next Clip" desc="Automatically play the next bite" value={autoplay} onChange={setAutoplay} />
          <SectionRow label="Captions" desc="Show captions on video clips" value={captions} onChange={setCaptions} />
          <div className="py-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>Data Saver</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Reduce video quality to save data</p>
            </div>
            <Toggle value={saveData} onChange={setSaveData} />
          </div>
        </SectionCard>

        {/* Daily goal */}
        <div className="rounded-2xl px-4 py-3.5" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>Daily Clip Goal</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>Clips to watch per day</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setDailyGoal((g) => Math.max(1, g - 1))} className="w-7 h-7 rounded-full flex items-center justify-center active:opacity-60" style={{ background: "rgba(255,255,255,0.08)", color: "var(--text-primary)" }}>−</button>
              <span className="font-bold text-[15px] w-4 text-center" style={{ color: "var(--text-primary)" }}>{dailyGoal}</span>
              <button onClick={() => setDailyGoal((g) => Math.min(20, g + 1))} className="w-7 h-7 rounded-full flex items-center justify-center active:opacity-60" style={{ background: "rgba(255,255,255,0.08)", color: "var(--text-primary)" }}>+</button>
            </div>
          </div>
        </div>

        {/* Delete account */}
        <div className="rounded-2xl px-4 py-4 flex items-center justify-between cursor-pointer active:opacity-80" style={{ background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.15)" }}>
          <div className="flex items-center gap-3">
            <Trash2 size={18} style={{ color: "#f87171" }} strokeWidth={1.5} />
            <span className="font-semibold text-[14px]" style={{ color: "#f87171" }}>Delete Account</span>
          </div>
          <ChevronRight size={16} style={{ color: "rgba(248,113,113,0.5)" }} strokeWidth={1.5} />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl text-[14px] font-bold transition-colors"
          style={{ background: saved ? "var(--accent-teal)" : "var(--accent-purple)", color: "#fff" }}
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
