import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ChevronRight, FileText, MessageCircle, FileCheck, Shield, BookOpen, Wrench } from "lucide-react";

export default function HelpSupport() {
  const [, navigate] = useLocation();
  const [showModal, setShowModal] = useState(false);

  const helpItems = [
    { icon: FileText, label: "FAQ", desc: "Frequently asked questions" },
    { icon: MessageCircle, label: "Contact Support", desc: "Get help from our team" },
  ];
  const legalItems = [
    { icon: FileCheck, label: "Terms of Service" },
    { icon: Shield, label: "Privacy Policy" },
    { icon: BookOpen, label: "Community Guidelines" },
  ];

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--bg-primary)" }}>
      <div
        className="flex items-center gap-3 px-4 pt-5 pb-4"
        style={{ background: "rgba(11,15,20,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <button onClick={() => navigate("/profile")} className="active:opacity-60">
          <ArrowLeft size={22} strokeWidth={1.5} style={{ color: "var(--text-primary)" }} />
        </button>
        <h1 className="text-[20px] font-bold" style={{ color: "var(--text-primary)" }}>Help & Support</h1>
      </div>

      <div className="px-4 mt-5 flex flex-col gap-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>Get Help</p>
          <div className="flex flex-col gap-2">
            {helpItems.map(({ icon: Icon, label, desc }) => (
              <button
                key={label}
                className="rounded-2xl px-4 py-4 flex items-center gap-4 w-full cursor-pointer active:opacity-75"
                style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}
                onClick={() => setShowModal(true)}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(109,74,255,0.14)" }}>
                  <Icon size={16} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium text-[14px]" style={{ color: "var(--text-primary)" }}>{label}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                </div>
                <ChevronRight size={16} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>Legal</p>
          <div className="flex flex-col gap-2">
            {legalItems.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="rounded-2xl px-4 py-3.5 flex items-center gap-4 w-full cursor-pointer active:opacity-75"
                style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <Icon size={16} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
                </div>
                <p className="flex-1 text-left text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>{label}</p>
                <ChevronRight size={16} strokeWidth={1.5} style={{ color: "var(--text-secondary)" }} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-secondary)" }}>About</p>
          <div className="rounded-2xl px-4 py-4 flex flex-col gap-3" style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex justify-between items-center">
              <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>Version</span>
              <span className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>1.0.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>App</span>
              <span className="text-[13px] font-bold" style={{ color: "var(--accent-purple)" }}>BiteCast</span>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center z-50 px-6" style={{ background: "rgba(0,0,0,0.7)" }} onClick={() => setShowModal(false)}>
          <div
            className="rounded-3xl p-6 max-w-xs w-full text-center"
            style={{ background: "var(--bg-elevated)", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(109,74,255,0.15)" }}>
              <Wrench size={28} strokeWidth={1.5} style={{ color: "var(--accent-purple)" }} />
            </div>
            <h3 className="font-bold text-[18px] mb-2" style={{ color: "var(--text-primary)" }}>Coming Soon</h3>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Help & Support is under development and will be available in a future update.
            </p>
            <button
              className="mt-5 w-full py-3 rounded-2xl text-[14px] font-semibold active:opacity-70"
              style={{ background: "var(--accent-purple)", color: "#fff" }}
              onClick={() => setShowModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
