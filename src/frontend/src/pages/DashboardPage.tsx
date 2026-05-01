import { ExternalBlob } from "@/backend";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useFilesByFolder } from "@/hooks/useFiles";
import { useStorageStats, useUserProfile } from "@/hooks/useStorageStats";
import type { FileMeta } from "@/types";
import {
  STORAGE_QUOTA_BYTES,
  formatFileSize,
  getFileCategory,
  isImageFile,
} from "@/utils/fileUtils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import {
  CloudUpload,
  File,
  FileText,
  Image,
  LogOut,
  Shield,
  Upload,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const SEVEN_DAYS_NS = BigInt(7 * 24 * 60 * 60 * 1_000_000_000);

const CATEGORY_CONFIG = [
  {
    key: "photos",
    label: "Photos",
    icon: Image,
    mimePrefix: "image/",
    gradient: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/40",
  },
  {
    key: "videos",
    label: "Videos",
    icon: Video,
    mimePrefix: "video/",
    gradient: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-400",
    borderHover: "hover:border-purple-500/40",
  },
  {
    key: "documents",
    label: "Documents",
    icon: FileText,
    mimePrefix: "application/pdf",
    gradient: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/40",
  },
  {
    key: "other",
    label: "Other",
    icon: File,
    mimePrefix: "",
    gradient: "from-orange-500/20 to-orange-600/10",
    iconColor: "text-orange-400",
    borderHover: "hover:border-orange-500/40",
  },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function CircularGauge({
  percent,
  loading,
}: {
  percent: number;
  loading: boolean;
}) {
  const size = 96;
  const strokeWidth = 8;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        aria-label="Storage usage gauge"
        role="img"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="oklch(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {!loading && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="oklch(var(--accent))"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {loading ? (
          <Skeleton className="h-6 w-10 rounded" />
        ) : (
          <span className="text-sm font-bold text-accent">
            {percent.toFixed(0)}%
          </span>
        )}
      </div>
    </div>
  );
}

function RecentFileThumbnail({ file }: { file: FileMeta }) {
  const isImage = isImageFile(file.mimeType);
  const category = getFileCategory(file.mimeType);
  const blob = ExternalBlob.fromURL(file.objectStorageKey);

  const Icon =
    category === "photos"
      ? Image
      : category === "videos"
        ? Video
        : category === "documents"
          ? FileText
          : File;

  return (
    <div className="gallery-item flex-shrink-0 w-20 h-20 bg-card">
      {isImage ? (
        <img
          src={blob.getDirectURL()}
          alt={file.name || "file thumbnail"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2">
          <Icon className="w-7 h-7 text-accent" />
          <p className="text-[9px] text-muted-foreground text-center line-clamp-2 leading-tight">
            {file.name}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Pull-to-refresh hook ─────────────────────────────────────────────────────

function usePullToRefresh(onRefresh: () => void) {
  const startY = useRef(0);
  const [isPulling, setIsPulling] = useState(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const dy = e.changedTouches[0].clientY - startY.current;
      if (dy > 60 && window.scrollY === 0) {
        setIsPulling(true);
        onRefresh();
        setTimeout(() => setIsPulling(false), 1000);
      }
    },
    [onRefresh],
  );

  return { isPulling, onTouchStart, onTouchEnd };
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { isAuthenticated, isInitializing, logout } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats,
  } = useStorageStats();
  const { data: profile } = useUserProfile();
  const {
    data: allFiles,
    isLoading: filesLoading,
    refetch: refetchFiles,
  } = useFilesByFolder(null);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing, router]);

  const handleRefresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["storage-stats"] });
    queryClient.invalidateQueries({ queryKey: ["files"] });
    refetchStats();
    refetchFiles();
  }, [queryClient, refetchStats, refetchFiles]);

  const { isPulling, onTouchStart, onTouchEnd } =
    usePullToRefresh(handleRefresh);

  // ── Derived data ──
  const usedBytes = stats ? Number(stats.totalBytes) : 0;
  const usagePercent = Math.min((usedBytes / STORAGE_QUOTA_BYTES) * 100, 100);
  const totalFiles = stats ? Number(stats.totalFiles) : 0;

  const now = BigInt(Date.now()) * 1_000_000n;
  const recentFiles = (allFiles ?? []).filter(
    (f) => now - f.uploadedAt < SEVEN_DAYS_NS,
  );
  const recentCount = recentFiles.length;

  const last6 = (allFiles ?? [])
    .slice()
    .sort((a, b) => Number(b.uploadedAt - a.uploadedAt))
    .slice(0, 6);

  const categoryCounts = (allFiles ?? []).reduce<Record<string, number>>(
    (acc, f) => {
      const cat = getFileCategory(f.mimeType);
      acc[cat] = (acc[cat] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const displayName = profile?.displayName ?? "My Vault";

  // ── Header ──
  const headerContent = (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
          <Shield className="w-4.5 h-4.5 text-accent" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground leading-none mb-0.5">
            Welcome back
          </p>
          <span className="font-semibold font-display text-foreground text-sm leading-none">
            {displayName}
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1.5 text-muted-foreground hover:text-foreground rounded-lg"
        onClick={logout}
        data-ocid="dashboard.logout_button"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span className="text-xs">Logout</span>
      </Button>
    </div>
  );

  const isEmpty = !filesLoading && (!allFiles || allFiles.length === 0);

  return (
    <Layout header={headerContent}>
      <div
        className="px-4 pt-4 pb-6 space-y-5"
        data-ocid="dashboard.page"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Pull to refresh indicator */}
        {isPulling && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center py-1"
          >
            <p className="text-xs text-accent">Refreshing…</p>
          </motion.div>
        )}

        {/* ── Storage Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border/60 rounded-2xl p-5 shadow-card"
          data-ocid="dashboard.storage_card"
        >
          <div className="flex items-center gap-5">
            <CircularGauge
              percent={statsLoading ? 0 : usagePercent}
              loading={statsLoading}
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-foreground mb-1">Storage</h2>
              {statsLoading ? (
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-2.5 w-20" />
                </div>
              ) : (
                <>
                  <p className="text-sm text-foreground font-medium">
                    {formatFileSize(stats?.totalBytes ?? 0n)}
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      / 1 GB
                    </span>
                  </p>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${usagePercent}%` }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.4,
                      }}
                      className="h-full rounded-full bg-accent"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/50">
            {[
              {
                label: "Total Files",
                value: statsLoading ? null : totalFiles,
                ocid: "dashboard.stat.total_files",
              },
              {
                label: "Last 7 Days",
                value: filesLoading ? null : recentCount,
                ocid: "dashboard.stat.recent_uploads",
              },
              {
                label: "Used",
                value: statsLoading ? null : `${usagePercent.toFixed(1)}%`,
                ocid: "dashboard.stat.usage_percent",
              },
            ].map(({ label, value, ocid }) => (
              <div key={label} className="text-center" data-ocid={ocid}>
                {value === null ? (
                  <Skeleton className="h-5 w-10 mx-auto mb-1" />
                ) : (
                  <p className="text-base font-bold text-accent">{value}</p>
                )}
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Category Cards 2×2 ── */}
        <div>
          <h2 className="font-semibold text-foreground mb-3 text-sm">
            Categories
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORY_CONFIG.map(
              (
                { key, label, icon: Icon, gradient, iconColor, borderHover },
                i,
              ) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                  className={`bg-card border border-border/60 ${borderHover} rounded-xl p-4 shadow-card cursor-pointer transition-smooth text-left bg-gradient-to-br ${gradient}`}
                  onClick={() => router.navigate({ to: "/browse" })}
                  data-ocid={`dashboard.category.${key}_card`}
                >
                  <Icon className={`w-7 h-7 ${iconColor} mb-2.5`} />
                  <p className="font-semibold text-foreground text-sm">
                    {label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {filesLoading ? (
                      <span className="inline-block w-8 h-3 bg-muted rounded animate-pulse" />
                    ) : (
                      `${categoryCounts[key] ?? 0} files`
                    )}
                  </p>
                </motion.button>
              ),
            )}
          </div>
        </div>

        {/* ── Empty State (no files at all) ── */}
        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-card border border-dashed border-border/60 rounded-2xl p-10 text-center"
            data-ocid="dashboard.files.empty_state"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <CloudUpload className="w-8 h-8 text-accent" />
            </div>
            <p className="font-semibold text-foreground text-base mb-1">
              Your vault is empty
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Upload your first file to get started
            </p>
            <Button
              size="sm"
              className="gap-2 rounded-xl"
              onClick={() => router.navigate({ to: "/upload" })}
              data-ocid="dashboard.empty.upload_button"
            >
              <Upload className="w-4 h-4" />
              Upload File
            </Button>
          </motion.div>
        ) : (
          /* ── Recent Uploads Horizontal Scroll ── */
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground text-sm">
                Recent Uploads
              </h2>
              <button
                type="button"
                className="text-xs text-accent transition-smooth hover:text-accent/70"
                onClick={() => router.navigate({ to: "/browse" })}
                data-ocid="dashboard.recent.see_all_link"
              >
                See all
              </button>
            </div>

            {filesLoading ? (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton
                    key={i}
                    className="flex-shrink-0 w-20 h-20 rounded-xl"
                  />
                ))}
              </div>
            ) : last6.length === 0 ? (
              <div
                className="bg-card border border-dashed border-border/50 rounded-xl p-6 text-center"
                data-ocid="dashboard.recent.empty_state"
              >
                <p className="text-sm text-muted-foreground">
                  No recent uploads
                </p>
              </div>
            ) : (
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {last6.map((file, i) => (
                  <motion.div
                    key={file.id.toString()}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                    data-ocid={`dashboard.recent.item.${i + 1}`}
                  >
                    <RecentFileThumbnail file={file} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
