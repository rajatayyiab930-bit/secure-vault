import { ExternalBlob } from "@/backend";
import { Button } from "@/components/ui/button";
import type { FileMeta } from "@/types";
import { formatDate, formatFileSize } from "@/utils/fileUtils";
import { Download, X, ZoomIn, ZoomOut } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ImagePreviewModalProps {
  file: FileMeta | null;
  onClose: () => void;
}

export function ImagePreviewModal({ file, onClose }: ImagePreviewModalProps) {
  const [zoom, setZoom] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const imageUrl = file
    ? ExternalBlob.fromURL(file.objectStorageKey).getDirectURL()
    : "";

  const handleClose = useCallback(() => {
    setZoom(1);
    setImageLoaded(false);
    onClose();
  }, [onClose]);

  const handleDownload = useCallback(() => {
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.25, 4));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.25, 0.5));
    };
    if (file) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [file, handleClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (file) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [file]);

  return (
    <AnimatePresence>
      {file && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          onClick={(e) => {
            if (e.target === overlayRef.current) handleClose();
          }}
          data-ocid="image_preview.dialog"
        >
          {/* Header toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/20 flex-shrink-0">
            <div className="min-w-0 flex-1 pr-4">
              <p
                className="text-sm font-medium text-foreground truncate"
                title={file.name}
              >
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatFileSize(file.size)} · {formatDate(file.uploadedAt)}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Zoom controls */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground"
                onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
                disabled={zoom <= 0.5}
                aria-label="Zoom out"
                data-ocid="image_preview.zoom_out_button"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>

              <span className="text-xs text-muted-foreground w-10 text-center font-mono">
                {Math.round(zoom * 100)}%
              </span>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground"
                onClick={() => setZoom((z) => Math.min(z + 0.25, 4))}
                disabled={zoom >= 4}
                aria-label="Zoom in"
                data-ocid="image_preview.zoom_in_button"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>

              <div className="w-px h-5 bg-border/40 mx-1" />

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-lg text-accent hover:text-accent"
                onClick={handleDownload}
                aria-label="Download file"
                data-ocid="image_preview.download_button"
              >
                <Download className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground"
                onClick={handleClose}
                aria-label="Close preview"
                data-ocid="image_preview.close_button"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Image area */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
              }}
              className="transition-transform duration-200"
            >
              {!imageLoaded && (
                <div className="w-64 h-64 rounded-xl bg-muted animate-pulse flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    Loading…
                  </span>
                </div>
              )}
              <img
                src={imageUrl}
                alt={file.name}
                className={`max-w-full max-h-[75vh] object-contain rounded-lg shadow-elevated transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0 w-0 h-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                draggable={false}
                data-ocid="image_preview.canvas_target"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
