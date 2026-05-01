import { createActor } from "@/backend";
import { Layout } from "@/components/Layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useStorageStats, useUserProfile } from "@/hooks/useStorageStats";
import { formatFileSize } from "@/utils/fileUtils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import {
  Edit2,
  Files,
  HardDrive,
  LogOut,
  Save,
  ShieldCheck,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");
}

export default function ProfilePage() {
  const { isAuthenticated, isInitializing, logout, principal } = useAuth();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: stats } = useStorageStats();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing, router]);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
    }
  }, [profile]);

  const saveProfile = async () => {
    if (!actor || !displayName.trim()) return;
    setSaving(true);
    try {
      await actor.setUserProfile(displayName.trim());
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast.success("Profile updated");
      setEditing(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/login" });
  };

  const principalStr = principal?.toString() ?? "";
  const shortPrincipal =
    principalStr.length > 20
      ? `${principalStr.slice(0, 10)}…${principalStr.slice(-8)}`
      : principalStr;

  const resolvedName = profile?.displayName ?? "Vault User";
  const initials = getInitials(resolvedName);

  const headerContent = (
    <div className="px-4 py-3">
      <h1 className="font-semibold font-display text-foreground">Profile</h1>
    </div>
  );

  return (
    <Layout header={headerContent}>
      <div className="px-4 pt-6 pb-8 space-y-5" data-ocid="profile.page">
        {/* Avatar + identity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Initials avatar */}
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-elevated select-none"
              aria-label="Avatar"
            >
              {profileLoading ? (
                <Skeleton className="w-24 h-24 rounded-full" />
              ) : (
                <span className="text-3xl font-bold font-display text-primary-foreground">
                  {initials || "?"}
                </span>
              )}
            </div>
            {/* Verified badge */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-card">
              <ShieldCheck className="w-4 h-4 text-accent-foreground" />
            </div>
          </div>

          {profileLoading ? (
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-4 w-48" />
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-semibold font-display text-foreground">
                {resolvedName}
              </h2>
              {principalStr && (
                <p
                  className="text-xs text-muted-foreground mt-1 font-mono"
                  title={principalStr}
                >
                  {shortPrincipal}
                </p>
              )}
            </div>
          )}
        </motion.div>

        {/* Edit display name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-card border border-border/60 rounded-2xl p-5 shadow-card"
          data-ocid="profile.name_section"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground text-sm">
              Display Name
            </h3>
            {!editing ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-lg gap-1"
                onClick={() => setEditing(true)}
                data-ocid="profile.edit_button"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg"
                  onClick={() => {
                    setEditing(false);
                    setDisplayName(profile?.displayName ?? "");
                  }}
                  data-ocid="profile.cancel_button"
                >
                  <X className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  className="h-8 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground gap-1"
                  onClick={saveProfile}
                  disabled={saving || !displayName.trim()}
                  data-ocid="profile.save_button"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Saving…" : "Save"}
                </Button>
              </div>
            )}
          </div>

          {editing ? (
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Display Name
              </Label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveProfile();
                  if (e.key === "Escape") {
                    setEditing(false);
                    setDisplayName(profile?.displayName ?? "");
                  }
                }}
                placeholder="Enter your display name"
                className="rounded-xl"
                autoFocus
                data-ocid="profile.name_input"
              />
            </div>
          ) : (
            <p className="text-foreground text-sm">
              {profile?.displayName ?? (
                <span className="text-muted-foreground italic">Not set</span>
              )}
            </p>
          )}
        </motion.div>

        {/* Account info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="bg-card border border-border/60 rounded-2xl p-5 shadow-card"
          data-ocid="profile.account_section"
        >
          <h3 className="font-semibold text-foreground text-sm mb-4">
            Account
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Auth Provider
              </span>
              <span className="text-xs font-medium text-foreground flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-accent" />
                Internet Identity
              </span>
            </div>
            <div className="h-px bg-border/40" />
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs text-muted-foreground flex-shrink-0">
                Principal ID
              </span>
              <span
                className="text-xs font-mono text-foreground text-right break-all"
                title={principalStr}
              >
                {shortPrincipal || "—"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="grid grid-cols-2 gap-3"
          data-ocid="profile.stats_section"
        >
          <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-card text-center">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2">
              <Files className="w-4 h-4 text-accent" />
            </div>
            <p className="text-2xl font-bold font-display text-foreground tabular-nums">
              {stats?.totalFiles?.toString() ?? "0"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Total Files</p>
          </div>
          <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-card text-center">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2">
              <HardDrive className="w-4 h-4 text-accent" />
            </div>
            <p className="text-2xl font-bold font-display text-foreground tabular-nums">
              {formatFileSize(stats?.totalBytes ?? 0n)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Used Storage</p>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl font-semibold border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/60 transition-smooth"
                data-ocid="profile.logout_open_modal_button"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent
              className="rounded-2xl border-border/60"
              data-ocid="profile.logout_dialog"
            >
              <AlertDialogHeader>
                <AlertDialogTitle className="font-display">
                  Sign out of Secure Vault?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will be returned to the login screen. Your files remain
                  safely stored.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="rounded-xl"
                  data-ocid="profile.logout_cancel_button"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                  onClick={handleLogout}
                  data-ocid="profile.logout_confirm_button"
                >
                  Sign Out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>

        {/* Branding */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-center text-xs text-muted-foreground"
        >
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline transition-colors duration-200"
          >
            caffeine.ai
          </a>
        </motion.p>
      </div>
    </Layout>
  );
}
