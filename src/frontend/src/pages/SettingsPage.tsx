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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useStorageStats } from "@/hooks/useStorageStats";
import { STORAGE_QUOTA_BYTES, formatFileSize } from "@/utils/fileUtils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useRouter } from "@tanstack/react-router";
import { HardDrive, Info, Lock, LogOut, Moon, Shield, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

interface SettingRowProps {
  icon: React.ElementType;
  label: string;
  description?: string;
  action?: React.ReactNode;
  ocid?: string;
}

function SettingRow({
  icon: Icon,
  label,
  description,
  action,
  ocid,
}: SettingRowProps) {
  return (
    <div className="flex items-center gap-3 py-3" data-ocid={ocid}>
      <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

function SectionCard({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-card border border-border/60 rounded-2xl px-4 shadow-card"
    >
      <div className="py-3 border-b border-border/40">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
      </div>
      {children}
    </motion.div>
  );
}

const APP_VERSION = "1.0.0";
const APP_NAME = "Secure Vault";

export default function SettingsPage() {
  const { isAuthenticated, isInitializing, logout } = useAuth();
  const { isDark, toggle } = useDarkMode();
  const { data: stats } = useStorageStats();
  const { isFetching: actorFetching } = useActor(createActor);
  const router = useRouter();

  const totalBytes = stats?.totalBytes ?? 0n;
  const totalBytesNum = Number(totalBytes);
  const quotaBytes = STORAGE_QUOTA_BYTES;
  const usagePercent = Math.min((totalBytesNum / quotaBytes) * 100, 100);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing, router]);

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/login" });
  };

  const isLoading = actorFetching;

  const headerContent = (
    <div className="px-4 py-3">
      <h1 className="font-semibold font-display text-foreground">Settings</h1>
    </div>
  );

  return (
    <Layout header={headerContent}>
      <div className="px-4 pt-4 pb-6 space-y-4" data-ocid="settings.page">
        {/* Appearance */}
        <SectionCard title="Appearance" delay={0}>
          <SettingRow
            icon={isDark ? Moon : Sun}
            label="Dark Mode"
            description="Switch between light and dark theme"
            action={
              <Switch
                checked={isDark}
                onCheckedChange={toggle}
                data-ocid="settings.dark_mode_switch"
              />
            }
            ocid="settings.dark_mode_row"
          />
        </SectionCard>

        {/* Storage */}
        <SectionCard title="Storage" delay={0.06}>
          <div className="py-4 space-y-3" data-ocid="settings.storage_section">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <HardDrive className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  Storage Used
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isLoading
                    ? "Loading…"
                    : `${formatFileSize(totalBytes)} of ${formatFileSize(quotaBytes)} used`}
                </p>
              </div>
              <span className="text-xs font-semibold text-accent tabular-nums">
                {isLoading ? "—" : `${usagePercent.toFixed(1)}%`}
              </span>
            </div>
            {/* Progress bar */}
            <div
              className="h-2 rounded-full bg-muted overflow-hidden"
              aria-label={`Storage used: ${usagePercent.toFixed(1)}%`}
              data-ocid="settings.storage_progress"
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    usagePercent > 80
                      ? "oklch(var(--destructive))"
                      : "oklch(var(--accent))",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${usagePercent}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading
                ? "Calculating…"
                : `${formatFileSize(BigInt(Math.max(0, quotaBytes - totalBytesNum)))} available · ${stats?.totalFiles?.toString() ?? "0"} files stored`}
            </p>
          </div>
        </SectionCard>

        {/* Security */}
        <SectionCard title="Security" delay={0.12}>
          <SettingRow
            icon={Shield}
            label="Internet Identity"
            description="Secured via decentralized authentication"
            ocid="settings.auth_row"
          />
          <Separator className="opacity-40" />
          <SettingRow
            icon={Lock}
            label="End-to-End Encrypted"
            description="Your files are stored on a secure decentralized network"
            ocid="settings.encryption_row"
          />
        </SectionCard>

        {/* Account */}
        <SectionCard title="Account" delay={0.18}>
          <div className="py-3" data-ocid="settings.account_section">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3 w-full text-left group"
                  data-ocid="settings.logout_open_modal_button"
                >
                  <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/20 transition-colors duration-200">
                    <LogOut className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-destructive">
                      Sign Out
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      You will need to log in again
                    </p>
                  </div>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent
                className="rounded-2xl border-border/60"
                data-ocid="settings.logout_dialog"
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
                    data-ocid="settings.logout_cancel_button"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    onClick={handleLogout}
                    data-ocid="settings.logout_confirm_button"
                  >
                    Sign Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </SectionCard>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.24 }}
          className="bg-card border border-border/60 rounded-2xl px-4 shadow-card"
          data-ocid="settings.app_info_section"
        >
          <div className="py-3 border-b border-border/40">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              About
            </p>
          </div>
          <SettingRow
            icon={Info}
            label={APP_NAME}
            description={`Version ${APP_VERSION} · Built on the Internet Computer`}
            ocid="settings.app_info_row"
          />
        </motion.div>

        {/* Branding */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-center text-xs text-muted-foreground pt-2"
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
