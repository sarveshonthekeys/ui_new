import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ChevronRight, FileText, MessageCircle, FileCheck, Shield, BookOpen, Wrench, X } from "lucide-react";

export default function HelpSupport() {
  const [, navigate] = useLocation();
  const [showModal, setShowModal] = useState(false);

  const helpItems = [
    { icon: FileText, label: "FAQ", desc: "Frequently asked questions" },
    { icon: MessageCircle, label: "Contact Support", desc: "Get help from our team" },
    { icon: FileCheck, label: "Terms of Service", desc: "" },
    { icon: Shield, label: "Privacy Policy", desc: "" },
    { icon: BookOpen, label: "Community Guidelines", desc: "" },
  ];

  return (
    <div className="min-h-screen bg-black pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 sticky top-0 bg-black z-40 border-b border-white/8">
        <button onClick={() => navigate("/profile")} className="text-white">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-white text-xl font-bold">Help & Support</h1>
      </div>

      <div className="px-4 mt-4">
        <h2 className="text-white font-bold text-lg mb-3">Get Help</h2>

        <div className="flex flex-col gap-2">
          {helpItems.slice(0, 2).map(({ icon: Icon, label, desc }) => (
            <button
              key={label}
              className="bg-white/5 border border-white/8 rounded-xl px-4 py-4 flex items-center gap-4 w-full cursor-pointer active:bg-white/10"
              onClick={() => setShowModal(true)}
            >
              <Icon size={20} className="text-white/60 flex-shrink-0" strokeWidth={1.5} />
              <div className="flex-1 text-left min-w-0">
                <p className="text-white font-medium text-[15px]">{label}</p>
                {desc && <p className="text-white/40 text-xs mt-0.5">{desc}</p>}
              </div>
              <ChevronRight size={18} className="text-white/40 flex-shrink-0" />
            </button>
          ))}
        </div>

        <h2 className="text-white font-bold text-lg mt-5 mb-3">Legal</h2>
        <div className="flex flex-col gap-2">
          {helpItems.slice(2).map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="bg-white/5 border border-white/8 rounded-xl px-4 py-4 flex items-center gap-4 w-full cursor-pointer active:bg-white/10"
            >
              <Icon size={20} className="text-white/60 flex-shrink-0" strokeWidth={1.5} />
              <p className="flex-1 text-left text-white font-medium text-[15px]">{label}</p>
              <ChevronRight size={18} className="text-white/40 flex-shrink-0" />
            </button>
          ))}
        </div>

        <h2 className="text-white font-bold text-lg mt-5 mb-3">About</h2>
        <div className="bg-white/5 border border-white/8 rounded-xl px-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-sm">Version</span>
            <span className="text-white text-sm">1.0.0</span>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-white/60 text-sm">App</span>
            <span className="text-white text-sm font-bold">BiteCast</span>
          </div>
        </div>
      </div>

      {/* Coming soon modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6" onClick={() => setShowModal(false)}>
          <div
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 max-w-xs w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Wrench size={28} className="text-white/70" strokeWidth={1.5} />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Help & Support Coming Soon</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              This feature is under development and will be available in a future update.
            </p>
            <button
              className="mt-5 w-full bg-white/10 text-white rounded-xl py-3 text-sm font-semibold active:bg-white/20"
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
