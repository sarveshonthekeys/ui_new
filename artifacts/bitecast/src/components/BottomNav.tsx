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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-black border-t border-white/10 z-50">
      <div className="flex items-center justify-around py-2 pb-safe">
        {navItems.map(({ label, icon: Icon, path }) => {
          const active = location === path;
          return (
            <Link key={path} href={path}>
              <button className="flex flex-col items-center gap-1 px-4 py-1 min-w-[60px]">
                <Icon
                  size={22}
                  className={active ? "text-white" : "text-white/40"}
                  strokeWidth={active ? 2.5 : 1.5}
                />
                <span
                  className={`text-[10px] font-medium ${active ? "text-white" : "text-white/40"}`}
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
