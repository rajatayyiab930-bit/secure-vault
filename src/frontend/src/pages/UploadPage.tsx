import { ExternalBlob, createActor } from "@/backend";
import type { FolderId } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useFolders } from "@/hooks/useFolders";
import {
  formatFileSize,
  getFileCategory,
  getFileIcon,
} from "@/utils/fileUtils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  CloudUpload,
  FolderOpen,
  RefreshCw,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
  oversized?: boolean;
}

const ACCEPT =
  "image/*,video/*,.pdf,.doc,.docx,.txt,.xlsx,.xls,.ppt,.pptx,.csv,.zip,.tar,.gz";
const MAX_WARN_BYTES = 50 * 1024 * 1024; // 50 MB

function makeid(file: File): string {
  return `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function UploadPage() {
  const { isAuthenticated, isInitializing } = useAuth();
  const router = useRouter();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<UploadItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string>("root");

  const { data: folders = [] } = useFolders(null);

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing, router]);

  const addFiles = useCallback((files: FileList | File[]) => {
    const newItems: UploadItem[] = Array.from(files).map((f) => ({
      id: makeid(f),
      file: f,
      progress: 0,
      status: "pending",
      oversized: f.size > MAX_WARN_BYTES,
    }));
    setItems((prev) => [...prev, ...newItems]);
  }, []);

  const uploadItem = async (item: UploadItem) => {
    if (!actor) return;

    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "uploading" } : i)),
    );

    try {
      const bytes = new Uint8Array(await item.file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, progress: pct } : i)),
        );
      });

      const objectStorageKey = blob.getDirectURL();
      const folderId: FolderId | undefined =
        selectedFolder !== "root" ? BigInt(selectedFolder) : undefined;

      await actor.createFile({
        name: item.file.name,
        size: BigInt(item.file.size),
        mimeType: item.file.type || "application/octet-stream",
        objectStorageKey,
        folderId,
      });

      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, status: "done", progress: 100 } : i,
        ),
      );
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["storage-stats"] });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Upload failed";
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, status: "error", error: errorMsg, progress: 0 }
            : i,
        ),
      );
      toast.error(`Failed to upload ${item.file.name}`);
    }
  };

  const retryItem = (item: UploadItem) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? { ...i, status: "pending", progress: 0, error: undefined }
          : i,
      ),
    );
    uploadItem({ ...item, status: "pending", progress: 0, error: undefined });
  };

  const uploadAll = () => {
    const pending = items.filter((i) => i.status === "pending");
    pending.forEach(uploadItem);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearAll = () => setItems([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const doneCount = items.filter((i) => i.status === "done").length;
  const errorCount = items.filter((i) => i.status === "error").length;
  const hasPending = items.some((i) => i.status === "pending");
  const isUploading = items.some((i) => i.status === "uploading");
  const allSettled =
    items.length > 0 &&
    items.every((i) => i.status === "done" || i.status === "error");

  const headerContent = (
    <div className="px-4 py-3 flex items-center justify-between">
      <h1 className="font-semibold font-display text-foreground text-lg">
        Upload Files
      </h1>
      {items.length > 0 && !isUploading && (
        <button
          type="button"
          onClick={clearAll}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
          data-ocid="upload.clear_all_button"
        >
          Clear all
        </button>
      )}
    </div>
  );

  return (
    <Layout header={headerContent} showFab={false}>
      <div
        className="px-4 pt-4 pb-28 space-y-5 max-w-xl mx-auto"
        data-ocid="upload.page"
      >
        {/* Drop zone */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          tabIndex={0}
          aria-label="Drop files here or click to browse"
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          className={[
            "relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer",
            "transition-smooth select-none outline-none focus-visible:ring-2 focus-visible:ring-accent",
            isDragging
              ? "border-accent bg-accent/10 scale-[1.01]"
              : "border-border/60 bg-card hover:border-accent/50 hover:bg-accent/5",
          ].join(" ")}
          data-ocid="upload.dropzone"
        >
          <motion.div
            animate={isDragging ? { scale: 1.15 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center"
          >
            <CloudUpload className="w-8 h-8 text-accent" />
          </motion.div>
          <div className="text-center">
            <p className="font-semibold text-foreground">Drop files here</p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse from your device
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Images", "Videos", "PDF", "Docs", "Spreadsheets"].map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ACCEPT}
            className="hidden"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
            data-ocid="upload.file_input"
          />
        </motion.div>

        {/* Folder selector */}
        <AnimatePresence>
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 bg-card border border-border/60 rounded-xl px-4 py-3"
            >
              <FolderOpen className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-sm text-muted-foreground flex-shrink-0">
                Upload to:
              </span>
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger
                  className="h-8 rounded-lg border-border/60 bg-muted text-sm flex-1 min-w-0"
                  data-ocid="upload.folder_select"
                >
                  <SelectValue placeholder="Root" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">Root</SelectItem>
                  {folders.map((f) => (
                    <SelectItem key={String(f.id)} value={String(f.id)}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Queue header */}
        <AnimatePresence>
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground text-sm">
                    {items.length} file{items.length !== 1 ? "s" : ""} queued
                  </h3>
                  {allSettled && (
                    <Badge
                      variant={errorCount > 0 ? "destructive" : "secondary"}
                      className="text-xs"
                      data-ocid="upload.summary_badge"
                    >
                      {doneCount}/{items.length} uploaded
                    </Badge>
                  )}
                </div>
                {hasPending && !isUploading && (
                  <Button
                    size="sm"
                    className="rounded-xl accent-pulse"
                    onClick={uploadAll}
                    data-ocid="upload.upload_all_button"
                  >
                    <CloudUpload className="w-3.5 h-3.5 mr-1.5" />
                    Upload All
                  </Button>
                )}
                {isUploading && (
                  <span
                    className="text-xs text-accent animate-pulse"
                    data-ocid="upload.uploading_state"
                  >
                    Uploading…
                  </span>
                )}
              </div>

              {/* Overall progress summary */}
              {(isUploading || allSettled) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-muted-foreground"
                  data-ocid="upload.progress_summary"
                >
                  {doneCount} of {items.length} files uploaded
                  {errorCount > 0 && (
                    <span className="text-destructive ml-1">
                      · {errorCount} failed
                    </span>
                  )}
                </motion.p>
              )}

              {/* File list */}
              <div className="space-y-2">
                <AnimatePresence initial={false}>
                  {items.map((item, i) => {
                    const IconComp = getFileIcon(item.file.type || "");
                    const category = getFileCategory(item.file.type || "");
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          x: 20,
                          transition: { duration: 0.2 },
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [0.4, 0, 0.2, 1],
                          delay: Math.min(i * 0.04, 0.3),
                        }}
                        className="bg-card border border-border/60 rounded-xl p-3 shadow-card"
                        data-ocid={`upload.file.item.${i + 1}`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Icon */}
                          <div
                            className={[
                              "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                              category === "photos"
                                ? "bg-violet-500/15"
                                : category === "videos"
                                  ? "bg-rose-500/15"
                                  : category === "documents"
                                    ? "bg-amber-500/15"
                                    : "bg-accent/12",
                            ].join(" ")}
                          >
                            <IconComp
                              className={[
                                "w-5 h-5",
                                category === "photos"
                                  ? "text-violet-400"
                                  : category === "videos"
                                    ? "text-rose-400"
                                    : category === "documents"
                                      ? "text-amber-400"
                                      : "text-accent",
                              ].join(" ")}
                            />
                          </div>

                          {/* Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-medium text-foreground truncate">
                                {item.file.name}
                              </p>
                              {item.oversized && item.status === "pending" && (
                                <AlertTriangle
                                  className="w-3.5 h-3.5 text-amber-400 flex-shrink-0"
                                  aria-label="File exceeds 50 MB"
                                />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(item.file.size)}
                              {item.oversized && item.status === "pending" && (
                                <span className="text-amber-400 ml-1">
                                  · Large file
                                </span>
                              )}
                            </p>
                          </div>

                          {/* Status controls */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {item.status === "done" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 20,
                                }}
                              >
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              </motion.div>
                            )}
                            {item.status === "error" && (
                              <AlertCircle className="w-5 h-5 text-destructive" />
                            )}
                            {item.status === "pending" && (
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/15 transition-smooth"
                                aria-label={`Remove ${item.file.name}`}
                                data-ocid={`upload.file.remove_button.${i + 1}`}
                              >
                                <X className="w-3.5 h-3.5 text-muted-foreground" />
                              </button>
                            )}
                            {item.status === "error" && (
                              <button
                                type="button"
                                onClick={() => retryItem(item)}
                                className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center hover:bg-accent/25 transition-smooth"
                                aria-label={`Retry ${item.file.name}`}
                                data-ocid={`upload.file.retry_button.${i + 1}`}
                              >
                                <RefreshCw className="w-3.5 h-3.5 text-accent" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Progress bar */}
                        {(item.status === "uploading" ||
                          item.status === "done") && (
                          <div className="mt-3 space-y-1">
                            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-accent"
                                style={{
                                  width: `${item.progress}%`,
                                  transition:
                                    "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                                data-ocid={`upload.file.progress_bar.${i + 1}`}
                              />
                            </div>
                            {item.status === "uploading" && (
                              <p className="text-xs text-accent">
                                {item.progress}% uploaded
                              </p>
                            )}
                          </div>
                        )}

                        {/* Error message */}
                        {item.status === "error" && (
                          <p
                            className="text-xs text-destructive mt-1.5"
                            data-ocid={`upload.file.error_state.${i + 1}`}
                          >
                            {item.error ??
                              "Upload failed. Tap retry to try again."}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* All done CTA */}
              <AnimatePresence>
                {allSettled && doneCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-2 flex flex-col items-center gap-3"
                  >
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>
                        {doneCount === items.length
                          ? "All files uploaded successfully!"
                          : `${doneCount} of ${items.length} files uploaded`}
                      </span>
                    </div>
                    <Button
                      className="w-full rounded-xl"
                      onClick={() => router.navigate({ to: "/browse" })}
                      data-ocid="upload.go_to_browse_button"
                    >
                      Go to Browse
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-muted-foreground text-sm py-4"
            data-ocid="upload.empty_state"
          >
            Select or drop files above to begin uploading to your vault.
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
