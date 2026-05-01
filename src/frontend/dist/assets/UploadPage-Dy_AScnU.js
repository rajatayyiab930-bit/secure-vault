import { c as createLucideIcon, j as jsxRuntimeExports, u as useAuth, a as useRouter, b as useQueryClient, r as reactExports, m as motion, d as ue } from "./index-D_QI1REW.js";
import { u as useActor, L as Layout, j as FolderOpen, d as getFileIcon, g as getFileCategory, f as formatFileSize, E as ExternalBlob, h as createActor } from "./fileUtils-Bj81fNaY.js";
import { S as Slot, c as cn, a as cva, B as Button } from "./button-DABsfT9_.js";
import { u as useFolders, A as AnimatePresence, S as Select, c as SelectTrigger, d as SelectValue, e as SelectContent, f as SelectItem, T as TriangleAlert } from "./useFolders-DulYRHWe.js";
import { C as CloudUpload } from "./cloud-upload-BmR5bcjh.js";
import { X } from "./x-B5r-FJei.js";
import "./index-DEJqk3cJ.js";
import "./index-BDE-iIY1.js";
import "./useMutation-DW6d4ORH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const ACCEPT = "image/*,video/*,.pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx,.csv,.zip,.tar,.gz";
const MAX_WARN_BYTES = 50 * 1024 * 1024;
function makeid(file) {
  return `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function UploadPage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const router = useRouter();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const fileInputRef = reactExports.useRef(null);
  const [items, setItems] = reactExports.useState([]);
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [selectedFolder, setSelectedFolder] = reactExports.useState("root");
  const { data: folders = [] } = useFolders(null);
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing, router]);
  const addFiles = reactExports.useCallback((files) => {
    const newItems = Array.from(files).map((f) => ({
      id: makeid(f),
      file: f,
      progress: 0,
      status: "pending",
      oversized: f.size > MAX_WARN_BYTES
    }));
    setItems((prev) => [...prev, ...newItems]);
  }, []);
  const uploadItem = async (item) => {
    if (!actor) return;
    setItems(
      (prev) => prev.map((i) => i.id === item.id ? { ...i, status: "uploading" } : i)
    );
    try {
      const bytes = new Uint8Array(await item.file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setItems(
          (prev) => prev.map((i) => i.id === item.id ? { ...i, progress: pct } : i)
        );
      });
      const objectStorageKey = blob.getDirectURL();
      const folderId = selectedFolder !== "root" ? BigInt(selectedFolder) : void 0;
      await actor.createFile({
        name: item.file.name,
        size: BigInt(item.file.size),
        mimeType: item.file.type || "application/octet-stream",
        objectStorageKey,
        folderId
      });
      setItems(
        (prev) => prev.map(
          (i) => i.id === item.id ? { ...i, status: "done", progress: 100 } : i
        )
      );
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["storage-stats"] });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Upload failed";
      setItems(
        (prev) => prev.map(
          (i) => i.id === item.id ? { ...i, status: "error", error: errorMsg, progress: 0 } : i
        )
      );
      ue.error(`Failed to upload ${item.file.name}`);
    }
  };
  const retryItem = (item) => {
    setItems(
      (prev) => prev.map(
        (i) => i.id === item.id ? { ...i, status: "pending", progress: 0, error: void 0 } : i
      )
    );
    uploadItem({ ...item, status: "pending", progress: 0, error: void 0 });
  };
  const uploadAll = () => {
    const pending = items.filter((i) => i.status === "pending");
    pending.forEach(uploadItem);
  };
  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };
  const clearAll = () => setItems([]);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };
  const doneCount = items.filter((i) => i.status === "done").length;
  const errorCount = items.filter((i) => i.status === "error").length;
  const hasPending = items.some((i) => i.status === "pending");
  const isUploading = items.some((i) => i.status === "uploading");
  const allSettled = items.length > 0 && items.every((i) => i.status === "done" || i.status === "error");
  const headerContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-semibold font-display text-foreground text-lg", children: "Upload Files" }),
    items.length > 0 && !isUploading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: clearAll,
        className: "text-xs text-muted-foreground hover:text-foreground transition-colors duration-200",
        "data-ocid": "upload.clear_all_button",
        children: "Clear all"
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { header: headerContent, showFab: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-4 pt-4 pb-28 space-y-5 max-w-xl mx-auto",
      "data-ocid": "upload.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
            onDragOver: (e) => {
              e.preventDefault();
              setIsDragging(true);
            },
            onDragLeave: () => setIsDragging(false),
            onDrop: handleDrop,
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            tabIndex: 0,
            "aria-label": "Drop files here or click to browse",
            onKeyDown: (e) => {
              var _a;
              return e.key === "Enter" && ((_a = fileInputRef.current) == null ? void 0 : _a.click());
            },
            className: [
              "relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer",
              "transition-smooth select-none outline-none focus-visible:ring-2 focus-visible:ring-accent",
              isDragging ? "border-accent bg-accent/10 scale-[1.01]" : "border-border/60 bg-card hover:border-accent/50 hover:bg-accent/5"
            ].join(" "),
            "data-ocid": "upload.dropzone",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: isDragging ? { scale: 1.15 } : { scale: 1 },
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                  className: "w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-8 h-8 text-accent" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Drop files here" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "or click to browse from your device" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: ["Images", "Videos", "PDF", "Docs", "Spreadsheets"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground",
                  children: t
                },
                t
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  multiple: true,
                  accept: ACCEPT,
                  className: "hidden",
                  onChange: (e) => e.target.files && addFiles(e.target.files),
                  "data-ocid": "upload.file_input"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -4 },
            transition: { duration: 0.25 },
            className: "flex items-center gap-3 bg-card border border-border/60 rounded-xl px-4 py-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-4 h-4 text-accent flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground flex-shrink-0", children: "Upload to:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedFolder, onValueChange: setSelectedFolder, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "h-8 rounded-lg border-border/60 bg-muted text-sm flex-1 min-w-0",
                    "data-ocid": "upload.folder_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Root" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "root", children: "Root" }),
                  folders.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(f.id), children: f.name }, String(f.id)))
                ] })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0 },
            transition: { duration: 0.25 },
            className: "space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium text-foreground text-sm", children: [
                    items.length,
                    " file",
                    items.length !== 1 ? "s" : "",
                    " queued"
                  ] }),
                  allSettled && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: errorCount > 0 ? "destructive" : "secondary",
                      className: "text-xs",
                      "data-ocid": "upload.summary_badge",
                      children: [
                        doneCount,
                        "/",
                        items.length,
                        " uploaded"
                      ]
                    }
                  )
                ] }),
                hasPending && !isUploading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "rounded-xl accent-pulse",
                    onClick: uploadAll,
                    "data-ocid": "upload.upload_all_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-3.5 h-3.5 mr-1.5" }),
                      "Upload All"
                    ]
                  }
                ),
                isUploading && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs text-accent animate-pulse",
                    "data-ocid": "upload.uploading_state",
                    children: "Uploading…"
                  }
                )
              ] }),
              (isUploading || allSettled) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.p,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "text-xs text-muted-foreground",
                  "data-ocid": "upload.progress_summary",
                  children: [
                    doneCount,
                    " of ",
                    items.length,
                    " files uploaded",
                    errorCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-destructive ml-1", children: [
                      "· ",
                      errorCount,
                      " failed"
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: items.map((item, i) => {
                const IconComp = getFileIcon(item.file.type || "");
                const category = getFileCategory(item.file.type || "");
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    exit: {
                      opacity: 0,
                      x: 20,
                      transition: { duration: 0.2 }
                    },
                    transition: {
                      duration: 0.35,
                      ease: [0.4, 0, 0.2, 1],
                      delay: Math.min(i * 0.04, 0.3)
                    },
                    className: "bg-card border border-border/60 rounded-xl p-3 shadow-card",
                    "data-ocid": `upload.file.item.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: [
                              "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                              category === "photos" ? "bg-violet-500/15" : category === "videos" ? "bg-rose-500/15" : category === "documents" ? "bg-amber-500/15" : "bg-accent/12"
                            ].join(" "),
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              IconComp,
                              {
                                className: [
                                  "w-5 h-5",
                                  category === "photos" ? "text-violet-400" : category === "videos" ? "text-rose-400" : category === "documents" ? "text-amber-400" : "text-accent"
                                ].join(" ")
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.file.name }),
                            item.oversized && item.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                              TriangleAlert,
                              {
                                className: "w-3.5 h-3.5 text-amber-400 flex-shrink-0",
                                "aria-label": "File exceeds 50 MB"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                            formatFileSize(item.file.size),
                            item.oversized && item.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 ml-1", children: "· Large file" })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                          item.status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              initial: { scale: 0 },
                              animate: { scale: 1 },
                              transition: {
                                type: "spring",
                                stiffness: 400,
                                damping: 20
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-emerald-500" })
                            }
                          ),
                          item.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-destructive" }),
                          item.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => removeItem(item.id),
                              className: "w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/15 transition-smooth",
                              "aria-label": `Remove ${item.file.name}`,
                              "data-ocid": `upload.file.remove_button.${i + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-muted-foreground" })
                            }
                          ),
                          item.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => retryItem(item),
                              className: "w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center hover:bg-accent/25 transition-smooth",
                              "aria-label": `Retry ${item.file.name}`,
                              "data-ocid": `upload.file.retry_button.${i + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 text-accent" })
                            }
                          )
                        ] })
                      ] }),
                      (item.status === "uploading" || item.status === "done") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-full rounded-full bg-accent",
                            style: {
                              width: `${item.progress}%`,
                              transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                            },
                            "data-ocid": `upload.file.progress_bar.${i + 1}`
                          }
                        ) }),
                        item.status === "uploading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-accent", children: [
                          item.progress,
                          "% uploaded"
                        ] })
                      ] }),
                      item.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs text-destructive mt-1.5",
                          "data-ocid": `upload.file.error_state.${i + 1}`,
                          children: item.error ?? "Upload failed. Tap retry to try again."
                        }
                      )
                    ]
                  },
                  item.id
                );
              }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: allSettled && doneCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.3 },
                  className: "pt-2 flex flex-col items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: doneCount === items.length ? "All files uploaded successfully!" : `${doneCount} of ${items.length} files uploaded` })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        className: "w-full rounded-xl",
                        onClick: () => router.navigate({ to: "/browse" }),
                        "data-ocid": "upload.go_to_browse_button",
                        children: "Go to Browse"
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ) }),
        items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.2 },
            className: "text-center text-muted-foreground text-sm py-4",
            "data-ocid": "upload.empty_state",
            children: "Select or drop files above to begin uploading to your vault."
          }
        )
      ]
    }
  ) });
}
export {
  UploadPage as default
};
