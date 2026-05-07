import { Home, Compass, Radio, BookOpen, User } from "lucide-react";
import { useLocation, Link } from "wouter";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Explore", icon: Compass, path: "/explore" },
  { label: "Bites", icon: Radio, path: "/bites" },
  { label: "Library", icon: BookOpen, path: "/library" },
  { label: "Profile", icon: User, path: "/profile" },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <nav
      className="absolute bottom-0 left-0 right-0 w-full z-50"
      style={{
        background: "rgba(11,15,20,0.92)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center justify-around py-2.5">
        {navItems.map(({ label, icon: Icon, path }) => {
          const active = location === path;
          return (
            <Link key={path} href={path}>
              <button className="flex flex-col items-center gap-1 px-3 py-1 min-w-[52px] relative">
                {active && (
                  <span
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                    style={{ background: "var(--accent-purple)" }}
                  />
                )}
                <Icon
                  size={22}
                  style={{ color: active ? "var(--accent-purple)" : "var(--text-secondary)" }}
                  strokeWidth={active ? 2 : 1.5}
                />
                <span
                  className="text-[10px] font-medium"
                  style={{ color: active ? "var(--accent-purple)" : "var(--text-secondary)" }}
                >
                  {label}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
