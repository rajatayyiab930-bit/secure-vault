import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { FolderOpen, Home, Settings, Upload, User } from "lucide-react";
import { motion } from "motion/react";

const NAV_ITEMS = [
  { label: "Home", path: "/dashboard", icon: Home },
  { label: "Browse", path: "/browse", icon: FolderOpen },
  { label: "Upload", path: "/upload", icon: Upload },
  { label: "Settings", path: "/settings", icon: Settings },
  { label: "Profile", path: "/profile", icon: User },
];

export function BottomNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border/60 shadow-elevated"
      data-ocid="bottom_nav"
    >
      <div className="flex items-center justify-around px-2 py-1 max-w-lg mx-auto">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
          const isActive =
            currentPath === path || currentPath.startsWith(`${path}/`);
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-smooth relative min-w-0",
                isActive
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground",
              )}
              data-ocid={`nav.${label.toLowerCase()}_link`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl bg-accent/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className={cn("w-5 h-5 relative", isActive && "drop-shadow-sm")}
              />
              <span className="text-[10px] font-medium relative">{label}</span>
            </Link>
          );
        })}
      </div>
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
}
