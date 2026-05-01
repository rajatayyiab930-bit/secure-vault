import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { useAuth } from "./hooks/useAuth";
import { useDarkMode } from "./hooks/useDarkMode";
import { router } from "./router";

function AppInner() {
  const { isInitializing, isAuthenticated } = useAuth();
  const { isDark } = useDarkMode();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      const path = window.location.pathname;
      if (path === "/" || path === "/login") {
        router.navigate({ to: "/dashboard" });
      }
    }
  }, [isAuthenticated, isInitializing]);

  if (isInitializing) {
    return <SplashScreen />;
  }

  return <RouterProvider router={router} />;
}

export default function App() {
  return <AppInner />;
}
