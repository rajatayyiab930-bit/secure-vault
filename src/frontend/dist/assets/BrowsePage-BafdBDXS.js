import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, u as useAuth, a as useRouter } from "./index-D_QI1REW.js";
import { E as ExternalBlob, f as formatFileSize, b as formatDate, g as getFileCategory, L as Layout, H as House, a as File, i as isImageFile, c as isVideoFile, d as getFileIcon } from "./fileUtils-Bj81fNaY.js";
import { B as Button, c as cn } from "./button-DABsfT9_.js";
import { A as AnimatePresence, u as useFolders, a as useDeleteFolder, b as useCreateFolder, S as Select, c as SelectTrigger, d as SelectValue, e as SelectContent, f as SelectItem, T as TriangleAlert } from "./useFolders-DulYRHWe.js";
import { X } from "./x-B5r-FJei.js";
import { R as Root, C as Content, a as Close, T as Title, P as Portal, O as Overlay } from "./index-DthWCLgE.js";
import { I as Input, L as Label } from "./label-CvkC2AAw.js";
import { S as Skeleton } from "./skeleton-BpYUKzWV.js";
import { u as useFilesByFolder, a as useFilesByCategory, b as useSearchFiles, c as useDeleteFile } from "./useFiles-CGoNupyn.js";
import "./index-DEJqk3cJ.js";
import "./index-BDE-iIY1.js";
import "./useMutation-DW6d4ORH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$a = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$a);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$9);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const FolderPlus = createLucideIcon("folder-plus", __iconNode$8);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const Folder = createLucideIcon("folder", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }]
];
const Grid2x2 = createLucideIcon("grid-2x2", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
];
const List = createLucideIcon("list", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomOut = createLucideIcon("zoom-out", __iconNode);
function ImagePreviewModal({ file, onClose }) {
  const [zoom, setZoom] = reactExports.useState(1);
  const [imageLoaded, setImageLoaded] = reactExports.useState(false);
  const overlayRef = reactExports.useRef(null);
  const imageUrl = file ? ExternalBlob.fromURL(file.objectStorageKey).getDirectURL() : "";
  const handleClose = reactExports.useCallback(() => {
    setZoom(1);
    setImageLoaded(false);
    onClose();
  }, [onClose]);
  const handleDownload = reactExports.useCallback(() => {
    if (!file) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = file.name;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [file, imageUrl]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.25, 4));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.25, 0.5));
    };
    if (file) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [file, handleClose]);
  reactExports.useEffect(() => {
    if (file) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [file]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: file && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref: overlayRef,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
      className: "fixed inset-0 z-50 flex flex-col bg-black/95",
      onClick: (e) => {
        if (e.target === overlayRef.current) handleClose();
      },
      "data-ocid": "image_preview.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border/20 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 pr-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm font-medium text-foreground truncate",
                title: file.name,
                children: file.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              formatFileSize(file.size),
              " · ",
              formatDate(file.uploadedAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground",
                onClick: () => setZoom((z) => Math.max(z - 0.25, 0.5)),
                disabled: zoom <= 0.5,
                "aria-label": "Zoom out",
                "data-ocid": "image_preview.zoom_out_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomOut, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-10 text-center font-mono", children: [
              Math.round(zoom * 100),
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground",
                onClick: () => setZoom((z) => Math.min(z + 0.25, 4)),
                disabled: zoom >= 4,
                "aria-label": "Zoom in",
                "data-ocid": "image_preview.zoom_in_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-border/40 mx-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 w-8 p-0 rounded-lg text-accent hover:text-accent",
                onClick: handleDownload,
                "aria-label": "Download file",
                "data-ocid": "image_preview.download_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground",
                onClick: handleClose,
                "aria-label": "Close preview",
                "data-ocid": "image_preview.close_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.92, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.92, opacity: 0 },
            transition: { duration: 0.25, ease: "easeOut" },
            style: {
              transform: `scale(${zoom})`,
              transformOrigin: "center center"
            },
            className: "transition-transform duration-200",
            children: [
              !imageLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-64 h-64 rounded-xl bg-muted animate-pulse flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Loading…" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageUrl,
                  alt: file.name,
                  className: `max-w-full max-h-[75vh] object-contain rounded-lg shadow-elevated transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0 w-0 h-0"}`,
                  onLoad: () => setImageLoaded(true),
                  draggable: false,
                  "data-ocid": "image_preview.canvas_target"
                }
              )
            ]
          }
        ) })
      ]
    }
  ) });
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
const CATEGORIES = [
  {
    label: "All",
    value: "all",
    color: "bg-accent/20 text-accent border-accent/40"
  },
  {
    label: "Photos",
    value: "photos",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/40"
  },
  {
    label: "Videos",
    value: "videos",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/40"
  },
  {
    label: "Documents",
    value: "documents",
    color: "bg-green-500/20 text-green-400 border-green-500/40"
  }
];
const CATEGORY_MIME = {
  photos: "image/",
  videos: "video/",
  documents: "application/pdf",
  other: ""
};
function ContextMenu({
  x,
  y,
  onDownload,
  onDelete,
  onClose
}) {
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref,
      initial: { opacity: 0, scale: 0.92 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.92 },
      transition: { duration: 0.12 },
      className: "fixed z-50 bg-popover border border-border/60 rounded-xl shadow-elevated py-1 min-w-[160px]",
      style: { left: x, top: y },
      "data-ocid": "browse.dropdown_menu",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors",
            onClick: () => {
              onDownload();
              onClose();
            },
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                onDownload();
                onClose();
              }
            },
            "data-ocid": "browse.context_download_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 text-accent" }),
              "Download"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors",
            onClick: () => {
              onDelete();
              onClose();
            },
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                onDelete();
                onClose();
              }
            },
            "data-ocid": "browse.context_delete_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
              "Delete"
            ]
          }
        )
      ]
    }
  );
}
function FileGridCard({
  file,
  index,
  onTap,
  onLongPress,
  onContextMenu
}) {
  const isImage = isImageFile(file.mimeType);
  const isVideo = isVideoFile(file.mimeType);
  const Icon = getFileIcon(file.mimeType);
  const imageUrl = isImage ? ExternalBlob.fromURL(file.objectStorageKey).getDirectURL() : null;
  const longPressTimer = reactExports.useRef(null);
  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      onLongPress();
    }, 600);
  };
  const handleTouchEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.92 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: index * 0.03, duration: 0.25 },
      className: "gallery-item bg-card aspect-square",
      onClick: onTap,
      onContextMenu,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
      "data-ocid": `browse.file.item.${index + 1}`,
      children: [
        isImage && imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: imageUrl,
            alt: file.name,
            className: "w-full h-full object-cover",
            loading: "lazy"
          }
        ) : isVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-black/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 text-white ml-0.5" }) }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-2 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-9 h-9 text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground text-center truncate w-full leading-tight", children: file.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 hover:opacity-100 transition-smooth pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs truncate font-medium", children: file.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-[10px]", children: formatFileSize(file.size) })
        ] })
      ]
    }
  );
}
function FileListRow({
  file,
  index,
  onTap,
  onDelete,
  onContextMenu
}) {
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const isImage = isImageFile(file.mimeType);
  const Icon = getFileIcon(file.mimeType);
  const imageUrl = isImage ? ExternalBlob.fromURL(file.objectStorageKey).getDirectURL() : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.04 },
      className: "flex items-center gap-3 bg-card border border-border/60 rounded-xl px-3 py-2.5 hover:border-accent/40 transition-smooth shadow-card",
      onContextMenu,
      "data-ocid": `browse.file.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer",
            onClick: onTap,
            "aria-label": `Open ${file.name}`,
            children: isImage && imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imageUrl,
                alt: file.name,
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-accent" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "min-w-0 flex-1 cursor-pointer text-left",
            onClick: onTap,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: file.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                formatFileSize(file.size),
                " · ",
                formatDate(file.uploadedAt)
              ] })
            ]
          }
        ),
        confirmDelete ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive mr-1", children: "Delete?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-7 px-2 text-xs rounded-lg text-destructive hover:text-destructive",
              onClick: onDelete,
              "data-ocid": `browse.delete_button.${index + 1}`,
              children: "Yes"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-7 px-2 text-xs rounded-lg",
              onClick: () => setConfirmDelete(false),
              "data-ocid": `browse.cancel_button.${index + 1}`,
              children: "No"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive flex-shrink-0",
            onClick: () => setConfirmDelete(true),
            "aria-label": `Delete ${file.name}`,
            "data-ocid": `browse.delete_button.${index + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
          }
        )
      ]
    }
  );
}
function BrowsePage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const router = useRouter();
  const [view, setView] = reactExports.useState(() => {
    try {
      return localStorage.getItem("sv-view") ?? "grid";
    } catch {
      return "grid";
    }
  });
  const [sort, setSort] = reactExports.useState("date");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const isSearchActive = searchQuery.trim().length >= 2;
  const [breadcrumb, setBreadcrumb] = reactExports.useState([
    { id: null, name: "Home" }
  ]);
  const currentFolderId = breadcrumb[breadcrumb.length - 1].id;
  const [activeCategory, setActiveCategory] = reactExports.useState(
    "all"
  );
  const [showCreateFolder, setShowCreateFolder] = reactExports.useState(false);
  const [newFolderName, setNewFolderName] = reactExports.useState("");
  const [previewFile, setPreviewFile] = reactExports.useState(null);
  const [contextMenu, setContextMenu] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data: folderFiles, isLoading: folderLoading } = useFilesByFolder(currentFolderId);
  const { data: categoryFiles, isLoading: categoryLoading } = useFilesByCategory(
    activeCategory !== "all" ? CATEGORY_MIME[activeCategory] : ""
  );
  const { data: searchResults, isLoading: searchLoading } = useSearchFiles(
    isSearchActive ? searchQuery.trim() : ""
  );
  const { data: folders, isLoading: foldersLoading } = useFolders(currentFolderId);
  const deleteFile = useDeleteFile();
  const deleteFolder = useDeleteFolder();
  const createFolder = useCreateFolder();
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing, router]);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem("sv-view", view);
    } catch {
    }
  }, [view]);
  let rawFiles = [];
  let isLoading = false;
  if (isSearchActive) {
    rawFiles = searchResults ?? [];
    isLoading = searchLoading;
  } else if (activeCategory !== "all") {
    rawFiles = (categoryFiles ?? []).filter(
      (f) => getFileCategory(f.mimeType) === activeCategory
    );
    isLoading = categoryLoading;
  } else {
    rawFiles = folderFiles ?? [];
    isLoading = folderLoading;
  }
  const sortedFiles = [...rawFiles].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "size") return Number(b.size - a.size);
    return Number(b.uploadedAt - a.uploadedAt);
  });
  const navigateIntoFolder = (folder) => {
    setBreadcrumb((prev) => [...prev, { id: folder.id, name: folder.name }]);
    setActiveCategory("all");
  };
  const navigateToBreadcrumb = (index) => {
    setBreadcrumb((prev) => prev.slice(0, index + 1));
  };
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    createFolder.mutate(
      {
        name: newFolderName.trim(),
        parentFolderId: currentFolderId ?? void 0
      },
      {
        onSuccess: () => {
          setShowCreateFolder(false);
          setNewFolderName("");
        }
      }
    );
  };
  const handleFileTap = (file) => {
    if (isImageFile(file.mimeType)) {
      setPreviewFile(file);
    } else {
      const url = ExternalBlob.fromURL(file.objectStorageKey).getDirectURL();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };
  const handleContextMenu = reactExports.useCallback(
    (e, file) => {
      e.preventDefault();
      const vw = window.innerWidth;
      const menuWidth = 170;
      const x = e.clientX + menuWidth > vw ? vw - menuWidth - 8 : e.clientX;
      setContextMenu({ file, x, y: e.clientY });
    },
    []
  );
  const handleDownload = (file) => {
    const a = document.createElement("a");
    a.href = ExternalBlob.fromURL(file.objectStorageKey).getDirectURL();
    a.download = file.name;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleDeleteFile = (file) => {
    deleteFile.mutate(file.id);
    setDeleteTarget(null);
  };
  const headerContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-3 pb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-semibold font-display text-foreground", children: "Browse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sort, onValueChange: (v) => setSort(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "h-8 w-[90px] text-xs rounded-lg border-border/60 bg-muted",
              "data-ocid": "browse.sort_select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "date", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "name", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "size", children: "Size" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: view === "grid" ? "default" : "ghost",
            size: "sm",
            className: "h-8 w-8 p-0 rounded-lg",
            onClick: () => setView("grid"),
            "aria-label": "Grid view",
            "data-ocid": "browse.grid_view_toggle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid2x2, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: view === "list" ? "default" : "ghost",
            size: "sm",
            className: "h-8 w-8 p-0 rounded-lg",
            onClick: () => setView("list"),
            "aria-label": "List view",
            "data-ocid": "browse.list_view_toggle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search files…",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-9 pr-9 rounded-xl bg-muted border-input text-sm",
          "data-ocid": "browse.search_input"
        }
      ),
      searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
          onClick: () => setSearchQuery(""),
          "aria-label": "Clear search",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
        }
      )
    ] }),
    !isSearchActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 scrollbar-none", children: CATEGORIES.map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          setActiveCategory(value);
          if (value !== "all")
            setBreadcrumb([{ id: null, name: "Home" }]);
        },
        className: `flex-shrink-0 text-xs font-medium px-3 py-1 rounded-full border transition-smooth ${activeCategory === value ? color : "bg-muted text-muted-foreground border-transparent hover:border-border/60"}`,
        "data-ocid": `browse.category_filter.${value}_tab`,
        children: label
      },
      value
    )) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { header: headerContent, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-3 pb-6", "data-ocid": "browse.page", children: [
      !isSearchActive && activeCategory === "all" && breadcrumb.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: -6 },
          animate: { opacity: 1, y: 0 },
          className: "flex items-center gap-1 mb-4 overflow-x-auto scrollbar-none",
          "data-ocid": "browse.breadcrumb",
          children: breadcrumb.map((crumb, i) => {
            var _a;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1 flex-shrink-0",
                children: [
                  i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground/60 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: `flex items-center gap-1 text-sm transition-colors rounded-md px-1 py-0.5 ${i === breadcrumb.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`,
                      onClick: () => navigateToBreadcrumb(i),
                      disabled: i === breadcrumb.length - 1,
                      "data-ocid": `browse.breadcrumb.item.${i + 1}`,
                      children: [
                        i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3.5 h-3.5" }),
                        crumb.name
                      ]
                    }
                  )
                ]
              },
              ((_a = crumb.id) == null ? void 0 : _a.toString()) ?? "root"
            );
          })
        }
      ),
      !isSearchActive && activeCategory === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Folders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-7 gap-1.5 text-xs rounded-lg text-accent hover:text-accent px-2",
              onClick: () => setShowCreateFolder(true),
              "data-ocid": "browse.create_folder_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "w-3.5 h-3.5" }),
                "New Folder"
              ]
            }
          )
        ] }),
        foldersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-xl" }, i)) }) : folders && folders.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: folders.map((folder, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { delay: i * 0.05 },
            className: "flex items-center justify-between gap-2 bg-card border border-border/60 rounded-xl px-3 py-2.5 hover:border-accent/40 transition-smooth cursor-pointer shadow-card group",
            onClick: () => navigateIntoFolder(folder),
            "data-ocid": `browse.folder.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "w-4 h-4 text-accent flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: folder.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "p-1 rounded text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all",
                    onClick: (e) => {
                      e.stopPropagation();
                      deleteFolder.mutate(folder.id);
                    },
                    "aria-label": `Delete folder ${folder.name}`,
                    "data-ocid": `browse.folder_delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground/60" })
              ] })
            ]
          },
          folder.id.toString()
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-1", children: "No folders yet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
          isSearchActive ? `Results for "${searchQuery.trim()}"` : "Files",
          sortedFiles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 font-normal normal-case", children: [
            "(",
            sortedFiles.length,
            ")"
          ] })
        ] }) }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: view === "grid" ? "grid grid-cols-3 sm:grid-cols-4 gap-2" : "space-y-2",
            children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                className: view === "grid" ? "aspect-square rounded-xl" : "h-14 rounded-xl",
                "data-ocid": "browse.loading_state"
              },
              i
            ))
          }
        ) : sortedFiles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            className: "bg-card border border-dashed border-border/60 rounded-2xl p-10 text-center",
            "data-ocid": "browse.files.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(File, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: isSearchActive ? "No files found" : "No files here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: isSearchActive ? "Try a different search term" : "Tap the + button to upload your first file" })
            ]
          }
        ) : view === "grid" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 gap-2", children: sortedFiles.map((file, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileGridCard,
          {
            file,
            index: i,
            onTap: () => handleFileTap(file),
            onLongPress: () => {
              const el = document.querySelector(
                `[data-ocid="browse.file.item.${i + 1}"]`
              );
              if (el) {
                const rect = el.getBoundingClientRect();
                setContextMenu({
                  file,
                  x: rect.left,
                  y: rect.bottom + 4
                });
              }
            },
            onContextMenu: (e) => handleContextMenu(e, file)
          },
          file.id.toString()
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: sortedFiles.map((file, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileListRow,
          {
            file,
            index: i,
            onTap: () => handleFileTap(file),
            onDelete: () => handleDeleteFile(file),
            onContextMenu: (e) => handleContextMenu(e, file)
          },
          file.id.toString()
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: contextMenu && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ContextMenu,
      {
        x: contextMenu.x,
        y: contextMenu.y,
        onDownload: () => handleDownload(contextMenu.file),
        onDelete: () => {
          setDeleteTarget(contextMenu.file);
        },
        onClose: () => setContextMenu(null)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!deleteTarget,
        onOpenChange: (open) => {
          if (!open) setDeleteTarget(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "rounded-2xl border-border/60 max-w-sm",
            "data-ocid": "browse.delete_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-base", children: "Delete File" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Are you sure you want to delete",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: deleteTarget == null ? void 0 : deleteTarget.name }),
                "? This cannot be undone."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    className: "rounded-xl flex-1",
                    onClick: () => setDeleteTarget(null),
                    "data-ocid": "browse.delete_cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "destructive",
                    className: "rounded-xl flex-1",
                    onClick: () => deleteTarget && handleDeleteFile(deleteTarget),
                    disabled: deleteFile.isPending,
                    "data-ocid": "browse.delete_confirm_button",
                    children: deleteFile.isPending ? "Deleting…" : "Delete"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCreateFolder, onOpenChange: setShowCreateFolder, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "rounded-2xl border-border/60 max-w-sm",
        "data-ocid": "browse.create_folder_dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "New Folder" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "folder-name",
                className: "text-sm text-muted-foreground mb-1.5 block",
                children: "Folder name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "folder-name",
                placeholder: "My Folder",
                value: newFolderName,
                onChange: (e) => setNewFolderName(e.target.value),
                className: "rounded-xl",
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleCreateFolder();
                },
                autoFocus: true,
                "data-ocid": "browse.folder_name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                className: "rounded-xl flex-1",
                onClick: () => {
                  setShowCreateFolder(false);
                  setNewFolderName("");
                },
                "data-ocid": "browse.create_folder_cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "rounded-xl flex-1",
                onClick: handleCreateFolder,
                disabled: !newFolderName.trim() || createFolder.isPending,
                "data-ocid": "browse.create_folder_submit_button",
                children: createFolder.isPending ? "Creating…" : "Create"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImagePreviewModal,
      {
        file: previewFile,
        onClose: () => setPreviewFile(null)
      }
    )
  ] });
}
export {
  BrowsePage as default
};
