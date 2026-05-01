import { useRouterState } from "@tanstack/react-router";
import { BottomNav } from "./BottomNav";
import { FloatingUploadButton } from "./FloatingUploadButton";

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  showNav?: boolean;
  showFab?: boolean;
}

export function Layout({
  children,
  header,
  showNav = true,
  showFab = true,
}: LayoutProps) {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const isUploadPage = currentPath === "/upload";
  const isLoginPage = currentPath === "/login";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {header && (
        <header className="sticky top-0 z-30 bg-card border-b border-border/60 shadow-subtle">
          {header}
        </header>
      )}
      <main className="flex-1 pb-20">{children}</main>
      {showNav && !isLoginPage && <BottomNav />}
      {showFab && !isLoginPage && !isUploadPage && <FloatingUploadButton />}
    </div>
  );
}
