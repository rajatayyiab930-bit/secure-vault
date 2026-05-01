import { ExternalBlob } from "@/backend";
import { ImagePreviewModal } from "@/components/ImagePreviewModal";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  useDeleteFile,
  useFilesByCategory,
  useFilesByFolder,
  useSearchFiles,
} from "@/hooks/useFiles";
import {
  useCreateFolder,
  useDeleteFolder,
  useFolders,
} from "@/hooks/useFolders";
import type { FileCategory, FileMeta, Folder } from "@/types";
import {
  formatDate,
  formatFileSize,
  getFileCategory,
  getFileIcon,
  isImageFile,
  isVideoFile,
} from "@/utils/fileUtils";
import { useRouter } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronRight,
  Download,
  File,
  FolderIcon,
  FolderPlus,
  Grid2x2,
  Home,
  List,
  Play,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortKey = "name" | "date" | "size";
type ViewMode = "grid" | "list";

interface BreadcrumbEntry {
  id: bigint | null;
  name: string;
}

const CATEGORIES: {
  label: string;
  value: FileCategory | "all";
  color: string;
}[] = [
  {
    label: "All",
    value: "all",
    color: "bg-accent/20 text-accent border-accent/40",
  },
  {
    label: "Photos",
    value: "photos",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  },
  {
    label: "Videos",
    value: "videos",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/40",
  },
  {
    label: "Documents",
    value: "documents",
    color: "bg-green-500/20 text-green-400 border-green-500/40",
  },
];

const CATEGORY_MIME: Record<FileCategory, string> = {
  photos: "image/",
  videos: "video/",
  documents: "application/pdf",
  other: "",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ContextMenu({
  x,
  y,
  onDownload,
  onDelete,
  onClose,
}: {
  x: number;
  y: number;
  onDownload: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handle = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.12 }}
      className="fixed z-50 bg-popover border border-border/60 rounded-xl shadow-elevated py-1 min-w-[160px]"
      style={{ left: x, top: y }}
      data-ocid="browse.dropdown_menu"
    >
      <button
        type="button"
        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
        onClick={() => {
          onDownload();
          onClose();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onDownload();
            onClose();
          }
        }}
        data-ocid="browse.context_download_button"
      >
        <Download className="w-4 h-4 text-accent" />
        Download
      </button>
      <button
        type="button"
        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors"
        onClick={() => {
          onDelete();
          onClose();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onDelete();
            onClose();
          }
        }}
        data-ocid="browse.context_delete_button"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </motion.div>
  );
}

function FileGridCard({
  file,
  index,
  onTap,
  onLongPress,
  onContextMenu,
}: {
  file: FileMeta;
  index: number;
  onTap: () => void;
  onLongPress: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}) {
  const isImage = isImageFile(file.mimeType);
  const isVideo = isVideoFile(file.mimeType);
  const Icon = getFileIcon(file.mimeType);
  const imageUrl = isImage
    ? ExternalBlob.fromURL(file.objectStorageKey).getDirectURL()
    : null;

  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => {
      onLongPress();
    }, 600);
  };
  const handleTouchEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      className="gallery-item bg-card aspect-square"
      onClick={onTap}
      onContextMenu={onContextMenu}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      data-ocid={`browse.file.item.${index + 1}`}
    >
      {isImage && imageUrl ? (
        <img
          src={imageUrl}
          alt={file.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : isVideo ? (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
              <Play className="w-5 h-5 text-white ml-0.5" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3">
          <Icon className="w-9 h-9 text-accent" />
          <p className="text-[10px] text-muted-foreground text-center truncate w-full leading-tight">
            {file.name}
          </p>
        </div>
      )}
      {/* Hover overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 hover:opacity-100 transition-smooth pointer-events-none">
        <p className="text-white text-xs truncate font-medium">{file.name}</p>
        <p className="text-white/60 text-[10px]">{formatFileSize(file.size)}</p>
      </div>
    </motion.div>
  );
}

function FileListRow({
  file,
  index,
  onTap,
  onDelete,
  onContextMenu,
}: {
  file: FileMeta;
  index: number;
  onTap: () => void;
  onDelete: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isImage = isImageFile(file.mimeType);
  const Icon = getFileIcon(file.mimeType);
  const imageUrl = isImage
    ? ExternalBlob.fromURL(file.objectStorageKey).getDirectURL()
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex items-center gap-3 bg-card border border-border/60 rounded-xl px-3 py-2.5 hover:border-accent/40 transition-smooth shadow-card"
      onContextMenu={onContextMenu}
      data-ocid={`browse.file.item.${index + 1}`}
    >
      {/* Thumb */}
      <button
        type="button"
        className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer"
        onClick={onTap}
        aria-label={`Open ${file.name}`}
      >
        {isImage && imageUrl ? (
          <img
            src={imageUrl}
            alt={file.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <Icon className="w-5 h-5 text-accent" />
        )}
      </button>

      {/* Info */}
      <button
        type="button"
        className="min-w-0 flex-1 cursor-pointer text-left"
        onClick={onTap}
      >
        <p className="text-sm font-medium text-foreground truncate">
          {file.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(file.size)} · {formatDate(file.uploadedAt)}
        </p>
      </button>
      {confirmDelete ? (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xs text-destructive mr-1">Delete?</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs rounded-lg text-destructive hover:text-destructive"
            onClick={onDelete}
            data-ocid={`browse.delete_button.${index + 1}`}
          >
            Yes
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs rounded-lg"
            onClick={() => setConfirmDelete(false)}
            data-ocid={`browse.cancel_button.${index + 1}`}
          >
            No
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive flex-shrink-0"
          onClick={() => setConfirmDelete(true)}
          aria-label={`Delete ${file.name}`}
          data-ocid={`browse.delete_button.${index + 1}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BrowsePage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const router = useRouter();

  // View + sort (persisted)
  const [view, setView] = useState<ViewMode>(() => {
    try {
      return (localStorage.getItem("sv-view") as ViewMode) ?? "grid";
    } catch {
      return "grid";
    }
  });
  const [sort, setSort] = useState<SortKey>("date");

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const isSearchActive = searchQuery.trim().length >= 2;

  // Folder navigation breadcrumb
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbEntry[]>([
    { id: null, name: "Home" },
  ]);
  const currentFolderId = breadcrumb[breadcrumb.length - 1].id;

  // Category filter
  const [activeCategory, setActiveCategory] = useState<FileCategory | "all">(
    "all",
  );

  // Create folder dialog
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Image preview
  const [previewFile, setPreviewFile] = useState<FileMeta | null>(null);

  // Context menu
  const [contextMenu, setContextMenu] = useState<{
    file: FileMeta;
    x: number;
    y: number;
  } | null>(null);

  // Delete confirmation dialog
  const [deleteTarget, setDeleteTarget] = useState<FileMeta | null>(null);

  // Data hooks
  const { data: folderFiles, isLoading: folderLoading } =
    useFilesByFolder(currentFolderId);
  const { data: categoryFiles, isLoading: categoryLoading } =
    useFilesByCategory(
      activeCategory !== "all" ? CATEGORY_MIME[activeCategory] : "",
    );
  const { data: searchResults, isLoading: searchLoading } = useSearchFiles(
    isSearchActive ? searchQuery.trim() : "",
  );
  const { data: folders, isLoading: foldersLoading } =
    useFolders(currentFolderId);
  const deleteFile = useDeleteFile();
  const deleteFolder = useDeleteFolder();
  const createFolder = useCreateFolder();

  // Auth guard
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing, router]);

  // Persist view
  useEffect(() => {
    try {
      localStorage.setItem("sv-view", view);
    } catch {
      /* ignore */
    }
  }, [view]);

  // Determine displayed files
  let rawFiles: FileMeta[] = [];
  let isLoading = false;

  if (isSearchActive) {
    rawFiles = searchResults ?? [];
    isLoading = searchLoading;
  } else if (activeCategory !== "all") {
    rawFiles = (categoryFiles ?? []).filter(
      (f) => getFileCategory(f.mimeType) === activeCategory,
    );
    isLoading = categoryLoading;
  } else {
    rawFiles = folderFiles ?? [];
    isLoading = folderLoading;
  }

  // Sort
  const sortedFiles = [...rawFiles].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "size") return Number(b.size - a.size);
    // date: newest first
    return Number(b.uploadedAt - a.uploadedAt);
  });

  // Folder actions
  const navigateIntoFolder = (folder: Folder) => {
    setBreadcrumb((prev) => [...prev, { id: folder.id, name: folder.name }]);
    setActiveCategory("all");
  };

  const navigateToBreadcrumb = (index: number) => {
    setBreadcrumb((prev) => prev.slice(0, index + 1));
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    createFolder.mutate(
      {
        name: newFolderName.trim(),
        parentFolderId: currentFolderId ?? undefined,
      },
      {
        onSuccess: () => {
          setShowCreateFolder(false);
          setNewFolderName("");
        },
      },
    );
  };

  // File tap
  const handleFileTap = (file: FileMeta) => {
    if (isImageFile(file.mimeType)) {
      setPreviewFile(file);
    } else {
      const url = ExternalBlob.fromURL(file.objectStorageKey).getDirectURL();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Context menu
  const handleContextMenu = useCallback(
    (e: React.MouseEvent, file: FileMeta) => {
      e.preventDefault();
      const vw = window.innerWidth;
      const menuWidth = 170;
      const x = e.clientX + menuWidth > vw ? vw - menuWidth - 8 : e.clientX;
      setContextMenu({ file, x, y: e.clientY });
    },
    [],
  );

  const handleDownload = (file: FileMeta) => {
    const a = document.createElement("a");
    a.href = ExternalBlob.fromURL(file.objectStorageKey).getDirectURL();
    a.download = file.name;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDeleteFile = (file: FileMeta) => {
    deleteFile.mutate(file.id);
    setDeleteTarget(null);
  };

  // ─── Header ────────────────────────────────────────────────────────────────

  const headerContent = (
    <div className="px-4 pt-3 pb-2">
      {/* Top row: title + view toggle */}
      <div className="flex items-center justify-between mb-2.5">
        <h1 className="font-semibold font-display text-foreground">Browse</h1>
        <div className="flex items-center gap-1">
          {/* Sort */}
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger
              className="h-8 w-[90px] text-xs rounded-lg border-border/60 bg-muted"
              data-ocid="browse.sort_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="size">Size</SelectItem>
            </SelectContent>
          </Select>

          {/* View toggle */}
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0 rounded-lg"
            onClick={() => setView("grid")}
            aria-label="Grid view"
            data-ocid="browse.grid_view_toggle"
          >
            <Grid2x2 className="w-4 h-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0 rounded-lg"
            onClick={() => setView("list")}
            aria-label="List view"
            data-ocid="browse.list_view_toggle"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative mb-2.5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search files…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9 rounded-xl bg-muted border-input text-sm"
          data-ocid="browse.search_input"
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category filter chips */}
      {!isSearchActive && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(({ label, value, color }) => (
            <button
              type="button"
              key={value}
              onClick={() => {
                setActiveCategory(value);
                if (value !== "all")
                  setBreadcrumb([{ id: null, name: "Home" }]);
              }}
              className={`flex-shrink-0 text-xs font-medium px-3 py-1 rounded-full border transition-smooth ${
                activeCategory === value
                  ? color
                  : "bg-muted text-muted-foreground border-transparent hover:border-border/60"
              }`}
              data-ocid={`browse.category_filter.${value}_tab`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <Layout header={headerContent}>
      <div className="px-4 pt-3 pb-6" data-ocid="browse.page">
        {/* Breadcrumb */}
        {!isSearchActive &&
          activeCategory === "all" &&
          breadcrumb.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 mb-4 overflow-x-auto scrollbar-none"
              data-ocid="browse.breadcrumb"
            >
              {breadcrumb.map((crumb, i) => (
                <div
                  key={crumb.id?.toString() ?? "root"}
                  className="flex items-center gap-1 flex-shrink-0"
                >
                  {i > 0 && (
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 flex-shrink-0" />
                  )}
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-sm transition-colors rounded-md px-1 py-0.5 ${
                      i === breadcrumb.length - 1
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => navigateToBreadcrumb(i)}
                    disabled={i === breadcrumb.length - 1}
                    data-ocid={`browse.breadcrumb.item.${i + 1}`}
                  >
                    {i === 0 && <Home className="w-3.5 h-3.5" />}
                    {crumb.name}
                  </button>
                </div>
              ))}
            </motion.div>
          )}

        {/* Folders section */}
        {!isSearchActive && activeCategory === "all" && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Folders
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1.5 text-xs rounded-lg text-accent hover:text-accent px-2"
                onClick={() => setShowCreateFolder(true)}
                data-ocid="browse.create_folder_button"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                New Folder
              </Button>
            </div>

            {foldersLoading ? (
              <div className="grid grid-cols-2 gap-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-xl" />
                ))}
              </div>
            ) : folders && folders.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {folders.map((folder, i) => (
                  <motion.div
                    key={folder.id.toString()}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between gap-2 bg-card border border-border/60 rounded-xl px-3 py-2.5 hover:border-accent/40 transition-smooth cursor-pointer shadow-card group"
                    onClick={() => navigateIntoFolder(folder)}
                    data-ocid={`browse.folder.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FolderIcon className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground truncate">
                        {folder.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        className="p-1 rounded text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFolder.mutate(folder.id);
                        }}
                        aria-label={`Delete folder ${folder.name}`}
                        data-ocid={`browse.folder_delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-1">
                No folders yet
              </p>
            )}
          </div>
        )}

        {/* Files section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {isSearchActive ? `Results for "${searchQuery.trim()}"` : "Files"}
              {sortedFiles.length > 0 && (
                <span className="ml-1.5 font-normal normal-case">
                  ({sortedFiles.length})
                </span>
              )}
            </h3>
          </div>

          {isLoading ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-3 sm:grid-cols-4 gap-2"
                  : "space-y-2"
              }
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton
                  key={i}
                  className={
                    view === "grid"
                      ? "aspect-square rounded-xl"
                      : "h-14 rounded-xl"
                  }
                  data-ocid="browse.loading_state"
                />
              ))}
            </div>
          ) : sortedFiles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-dashed border-border/60 rounded-2xl p-10 text-center"
              data-ocid="browse.files.empty_state"
            >
              <File className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium text-foreground">
                {isSearchActive ? "No files found" : "No files here"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isSearchActive
                  ? "Try a different search term"
                  : "Tap the + button to upload your first file"}
              </p>
            </motion.div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {sortedFiles.map((file, i) => (
                <FileGridCard
                  key={file.id.toString()}
                  file={file}
                  index={i}
                  onTap={() => handleFileTap(file)}
                  onLongPress={() => {
                    const el = document.querySelector(
                      `[data-ocid="browse.file.item.${i + 1}"]`,
                    );
                    if (el) {
                      const rect = el.getBoundingClientRect();
                      setContextMenu({
                        file,
                        x: rect.left,
                        y: rect.bottom + 4,
                      });
                    }
                  }}
                  onContextMenu={(e) => handleContextMenu(e, file)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {sortedFiles.map((file, i) => (
                <FileListRow
                  key={file.id.toString()}
                  file={file}
                  index={i}
                  onTap={() => handleFileTap(file)}
                  onDelete={() => handleDeleteFile(file)}
                  onContextMenu={(e) => handleContextMenu(e, file)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Context menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onDownload={() => handleDownload(contextMenu.file)}
            onDelete={() => {
              setDeleteTarget(contextMenu.file);
            }}
            onClose={() => setContextMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Delete confirmation dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogContent
          className="rounded-2xl border-border/60 max-w-sm"
          data-ocid="browse.delete_dialog"
        >
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <DialogTitle className="text-base">Delete File</DialogTitle>
            </div>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              {deleteTarget?.name}
            </span>
            ? This cannot be undone.
          </p>
          <DialogFooter className="gap-2 mt-2">
            <Button
              variant="ghost"
              className="rounded-xl flex-1"
              onClick={() => setDeleteTarget(null)}
              data-ocid="browse.delete_cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-xl flex-1"
              onClick={() => deleteTarget && handleDeleteFile(deleteTarget)}
              disabled={deleteFile.isPending}
              data-ocid="browse.delete_confirm_button"
            >
              {deleteFile.isPending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create folder dialog */}
      <Dialog open={showCreateFolder} onOpenChange={setShowCreateFolder}>
        <DialogContent
          className="rounded-2xl border-border/60 max-w-sm"
          data-ocid="browse.create_folder_dialog"
        >
          <DialogHeader>
            <DialogTitle>New Folder</DialogTitle>
          </DialogHeader>
          <div className="py-1">
            <Label
              htmlFor="folder-name"
              className="text-sm text-muted-foreground mb-1.5 block"
            >
              Folder name
            </Label>
            <Input
              id="folder-name"
              placeholder="My Folder"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="rounded-xl"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateFolder();
              }}
              autoFocus
              data-ocid="browse.folder_name_input"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              className="rounded-xl flex-1"
              onClick={() => {
                setShowCreateFolder(false);
                setNewFolderName("");
              }}
              data-ocid="browse.create_folder_cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="rounded-xl flex-1"
              onClick={handleCreateFolder}
              disabled={!newFolderName.trim() || createFolder.isPending}
              data-ocid="browse.create_folder_submit_button"
            >
              {createFolder.isPending ? "Creating…" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image preview modal */}
      <ImagePreviewModal
        file={previewFile}
        onClose={() => setPreviewFile(null)}
      />
    </Layout>
  );
}
