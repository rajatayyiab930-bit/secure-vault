import { c as createLucideIcon, u as useAuth, a as useRouter, b as useQueryClient, r as reactExports, j as jsxRuntimeExports, m as motion, S as Shield } from "./index-D_QI1REW.js";
import { g as getFileCategory, L as Layout, f as formatFileSize, F as FileText, a as File, U as Upload, S as STORAGE_QUOTA_BYTES, i as isImageFile, E as ExternalBlob } from "./fileUtils-Bj81fNaY.js";
import { B as Button } from "./button-DABsfT9_.js";
import { S as Skeleton } from "./skeleton-BpYUKzWV.js";
import { u as useFilesByFolder } from "./useFiles-CGoNupyn.js";
import { u as useStorageStats, a as useUserProfile, L as LogOut } from "./useStorageStats-D3VqqtQ8.js";
import { C as CloudUpload } from "./cloud-upload-BmR5bcjh.js";
import "./useMutation-DW6d4ORH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
const SEVEN_DAYS_NS = BigInt(7 * 24 * 60 * 60 * 1e9);
const CATEGORY_CONFIG = [
  {
    key: "photos",
    label: "Photos",
    icon: Image,
    mimePrefix: "image/",
    gradient: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/40"
  },
  {
    key: "videos",
    label: "Videos",
    icon: Video,
    mimePrefix: "video/",
    gradient: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-400",
    borderHover: "hover:border-purple-500/40"
  },
  {
    key: "documents",
    label: "Documents",
    icon: FileText,
    mimePrefix: "application/pdf",
    gradient: "from-emerald-500/20 to-emerald-600/10",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/40"
  },
  {
    key: "other",
    label: "Other",
    icon: File,
    mimePrefix: "",
    gradient: "from-orange-500/20 to-orange-600/10",
    iconColor: "text-orange-400",
    borderHover: "hover:border-orange-500/40"
  }
];
function CircularGauge({
  percent,
  loading
}) {
  const size = 96;
  const strokeWidth = 8;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - percent / 100 * circ;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex-shrink-0",
      style: { width: size, height: size },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: size,
            height: size,
            className: "-rotate-90",
            "aria-label": "Storage usage gauge",
            role: "img",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: size / 2,
                  cy: size / 2,
                  r,
                  fill: "none",
                  stroke: "oklch(var(--muted))",
                  strokeWidth
                }
              ),
              !loading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.circle,
                {
                  cx: size / 2,
                  cy: size / 2,
                  r,
                  fill: "none",
                  stroke: "oklch(var(--accent))",
                  strokeWidth,
                  strokeLinecap: "round",
                  strokeDasharray: circ,
                  initial: { strokeDashoffset: circ },
                  animate: { strokeDashoffset: offset },
                  transition: { duration: 1, ease: "easeOut", delay: 0.3 }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-10 rounded" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-accent", children: [
          percent.toFixed(0),
          "%"
        ] }) })
      ]
    }
  );
}
function RecentFileThumbnail({ file }) {
  const isImage = isImageFile(file.mimeType);
  const category = getFileCategory(file.mimeType);
  const blob = ExternalBlob.fromURL(file.objectStorageKey);
  const Icon = category === "photos" ? Image : category === "videos" ? Video : category === "documents" ? FileText : File;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gallery-item flex-shrink-0 w-20 h-20 bg-card", children: isImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: blob.getDirectURL(),
      alt: file.name || "file thumbnail",
      className: "w-full h-full object-cover",
      loading: "lazy"
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-1 p-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-7 h-7 text-accent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground text-center line-clamp-2 leading-tight", children: file.name })
  ] }) });
}
function usePullToRefresh(onRefresh) {
  const startY = reactExports.useRef(0);
  const [isPulling, setIsPulling] = reactExports.useState(false);
  const onTouchStart = reactExports.useCallback((e) => {
    startY.current = e.touches[0].clientY;
  }, []);
  const onTouchEnd = reactExports.useCallback(
    (e) => {
      const dy = e.changedTouches[0].clientY - startY.current;
      if (dy > 60 && window.scrollY === 0) {
        setIsPulling(true);
        onRefresh();
        setTimeout(() => setIsPulling(false), 1e3);
      }
    },
    [onRefresh]
  );
  return { isPulling, onTouchStart, onTouchEnd };
}
function DashboardPage() {
  const { isAuthenticated, isInitializing, logout } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: stats,
    isLoading: statsLoading,
    refetch: refetchStats
  } = useStorageStats();
  const { data: profile } = useUserProfile();
  const {
    data: allFiles,
    isLoading: filesLoading,
    refetch: refetchFiles
  } = useFilesByFolder(null);
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing, router]);
  const handleRefresh = reactExports.useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["storage-stats"] });
    queryClient.invalidateQueries({ queryKey: ["files"] });
    refetchStats();
    refetchFiles();
  }, [queryClient, refetchStats, refetchFiles]);
  const { isPulling, onTouchStart, onTouchEnd } = usePullToRefresh(handleRefresh);
  const usedBytes = stats ? Number(stats.totalBytes) : 0;
  const usagePercent = Math.min(usedBytes / STORAGE_QUOTA_BYTES * 100, 100);
  const totalFiles = stats ? Number(stats.totalFiles) : 0;
  const now = BigInt(Date.now()) * 1000000n;
  const recentFiles = (allFiles ?? []).filter(
    (f) => now - f.uploadedAt < SEVEN_DAYS_NS
  );
  const recentCount = recentFiles.length;
  const last6 = (allFiles ?? []).slice().sort((a, b) => Number(b.uploadedAt - a.uploadedAt)).slice(0, 6);
  const categoryCounts = (allFiles ?? []).reduce(
    (acc, f) => {
      const cat = getFileCategory(f.mimeType);
      acc[cat] = (acc[cat] ?? 0) + 1;
      return acc;
    },
    {}
  );
  const displayName = (profile == null ? void 0 : profile.displayName) ?? "My Vault";
  const headerContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4.5 h-4.5 text-accent" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-none mb-0.5", children: "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold font-display text-foreground text-sm leading-none", children: displayName })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: "h-8 gap-1.5 text-muted-foreground hover:text-foreground rounded-lg",
        onClick: logout,
        "data-ocid": "dashboard.logout_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Logout" })
        ]
      }
    )
  ] });
  const isEmpty = !filesLoading && (!allFiles || allFiles.length === 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { header: headerContent, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-4 pt-4 pb-6 space-y-5",
      "data-ocid": "dashboard.page",
      onTouchStart,
      onTouchEnd,
      children: [
        isPulling && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "flex justify-center py-1",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent", children: "Refreshing…" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "bg-card border border-border/60 rounded-2xl p-5 shadow-card",
            "data-ocid": "dashboard.storage_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircularGauge,
                  {
                    percent: statsLoading ? 0 : usagePercent,
                    loading: statsLoading
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-1", children: "Storage" }),
                  statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-28" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-20" })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground font-medium", children: [
                      formatFileSize((stats == null ? void 0 : stats.totalBytes) ?? 0n),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
                        " ",
                        "/ 1 GB"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { width: 0 },
                        animate: { width: `${usagePercent}%` },
                        transition: {
                          duration: 0.8,
                          ease: "easeOut",
                          delay: 0.4
                        },
                        className: "h-full rounded-full bg-accent"
                      }
                    ) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/50", children: [
                {
                  label: "Total Files",
                  value: statsLoading ? null : totalFiles,
                  ocid: "dashboard.stat.total_files"
                },
                {
                  label: "Last 7 Days",
                  value: filesLoading ? null : recentCount,
                  ocid: "dashboard.stat.recent_uploads"
                },
                {
                  label: "Used",
                  value: statsLoading ? null : `${usagePercent.toFixed(1)}%`,
                  ocid: "dashboard.stat.usage_percent"
                }
              ].map(({ label, value, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", "data-ocid": ocid, children: [
                value === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-10 mx-auto mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-accent", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight", children: label })
              ] }, label)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-3 text-sm", children: "Categories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: CATEGORY_CONFIG.map(
            ({ key, label, icon: Icon, gradient, iconColor, borderHover }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                initial: { opacity: 0, y: 12, scale: 0.96 },
                animate: { opacity: 1, y: 0, scale: 1 },
                transition: { delay: 0.1 + i * 0.07, duration: 0.35 },
                className: `bg-card border border-border/60 ${borderHover} rounded-xl p-4 shadow-card cursor-pointer transition-smooth text-left bg-gradient-to-br ${gradient}`,
                onClick: () => router.navigate({ to: "/browse" }),
                "data-ocid": `dashboard.category.${key}_card`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-7 h-7 ${iconColor} mb-2.5` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: filesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-8 h-3 bg-muted rounded animate-pulse" }) : `${categoryCounts[key] ?? 0} files` })
                ]
              },
              key
            )
          ) })
        ] }),
        isEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: 0.4 },
            className: "bg-card border border-dashed border-border/60 rounded-2xl p-10 text-center",
            "data-ocid": "dashboard.files.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-8 h-8 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base mb-1", children: "Your vault is empty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Upload your first file to get started" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "gap-2 rounded-xl",
                  onClick: () => router.navigate({ to: "/upload" }),
                  "data-ocid": "dashboard.empty.upload_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                    "Upload File"
                  ]
                }
              )
            ]
          }
        ) : (
          /* ── Recent Uploads Horizontal Scroll ── */
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground text-sm", children: "Recent Uploads" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "text-xs text-accent transition-smooth hover:text-accent/70",
                  onClick: () => router.navigate({ to: "/browse" }),
                  "data-ocid": "dashboard.recent.see_all_link",
                  children: "See all"
                }
              )
            ] }),
            filesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                className: "flex-shrink-0 w-20 h-20 rounded-xl"
              },
              i
            )) }) : last6.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-card border border-dashed border-border/50 rounded-xl p-6 text-center",
                "data-ocid": "dashboard.recent.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No recent uploads" })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 -mx-1 px-1", children: last6.map((file, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.85 },
                animate: { opacity: 1, scale: 1 },
                transition: { delay: 0.05 + i * 0.06 },
                "data-ocid": `dashboard.recent.item.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(RecentFileThumbnail, { file })
              },
              file.id.toString()
            )) })
          ] })
        )
      ]
    }
  ) });
}
export {
  DashboardPage as default
};
