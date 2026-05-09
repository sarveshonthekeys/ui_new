import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BottomNav from "@/components/BottomNav";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import Bites from "@/pages/Bites";
import Library from "@/pages/Library";
import Profile from "@/pages/Profile";
import VideoPlayer from "@/pages/VideoPlayer";
import AdminPanel from "@/pages/AdminPanel";
import UploadClip from "@/pages/UploadClip";
import UploadClipDemo from "@/pages/UploadClipDemo";
import ActivityHistory from "@/pages/ActivityHistory";
import AccountSettings from "@/pages/AccountSettings";
import HelpSupport from "@/pages/HelpSupport";
import GenrePage from "@/pages/GenrePage";
import PlaylistPage from "@/pages/PlaylistPage";

const queryClient = new QueryClient();

const HIDE_NAV_PATHS = ["/bites", "/player"];

function AppShell() {
  const [location] = useLocation();
  const hideNav = HIDE_NAV_PATHS.some((p) => location.startsWith(p));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      {/* 9:16 phone frame — always portrait regardless of surrounding viewport */}
      <div
        className="relative overflow-hidden bg-black"
        style={{
          width: "min(430px, calc(100vh * 9 / 16))",
          height: "min(100vh, calc(430px * 16 / 9))",
        }}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/explore" component={Explore} />
            <Route path="/bites" component={Bites} />
            <Route path="/library" component={Library} />
            <Route path="/profile" component={Profile} />
            <Route path="/player/:id" component={VideoPlayer} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/upload-clip" component={UploadClip} />
            <Route path="/upload-clip-demo" component={UploadClipDemo} />
            <Route path="/activity" component={ActivityHistory} />
            <Route path="/account-settings" component={AccountSettings} />
            <Route path="/help" component={HelpSupport} />
            <Route path="/genre/:id" component={GenrePage} />
            <Route path="/playlist/:id" component={PlaylistPage} />
            <Route component={Home} />
          </Switch>
        </div>
        {!hideNav && <BottomNav />}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppShell />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
