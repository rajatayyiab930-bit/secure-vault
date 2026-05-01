import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@tanstack/react-router";
import { CloudUpload, Lock, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuthenticated, isInitializing, isLoggingIn, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, router]);

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden"
      data-ocid="login.page"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-elevated">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center accent-pulse">
              <Lock className="w-3.5 h-3.5 text-accent-foreground" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold font-display text-foreground">
              Secure Vault
            </h1>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Your private cloud storage, secured.
            </p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            "End-to-end encrypted",
            "Multi-device sync",
            "Private by design",
          ].map((f) => (
            <span
              key={f}
              className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border/60"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Login card */}
        <div className="w-full bg-card border border-border/60 rounded-2xl p-6 shadow-elevated flex flex-col gap-5">
          <div className="flex items-center gap-3 text-foreground">
            <CloudUpload className="w-5 h-5 text-accent" />
            <div>
              <p className="font-medium text-sm">
                Sign in to access your vault
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Uses Internet Identity — no password needed
              </p>
            </div>
          </div>

          <Button
            onClick={login}
            disabled={isInitializing || isLoggingIn}
            className="w-full h-12 rounded-xl font-semibold text-base bg-accent hover:bg-accent/90 text-accent-foreground transition-smooth"
            data-ocid="login.submit_button"
          >
            {isInitializing
              ? "Loading..."
              : isLoggingIn
                ? "Opening login..."
                : "Sign in with Internet Identity"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            New users are automatically registered on first login.
          </p>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
