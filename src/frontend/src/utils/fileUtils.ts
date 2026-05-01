import type { FileCategory } from "@/types";
import {
  Archive,
  File,
  FileAudio,
  FileCode,
  FileImage,
  FileText,
  FileVideo,
  type LucideIcon,
} from "lucide-react";

export function getFileCategory(mimeType: string): FileCategory {
  if (mimeType.startsWith("image/")) return "photos";
  if (mimeType.startsWith("video/")) return "videos";
  if (
    mimeType.startsWith("application/pdf") ||
    mimeType.startsWith("text/") ||
    mimeType.includes("document") ||
    mimeType.includes("spreadsheet") ||
    mimeType.includes("presentation") ||
    mimeType.includes("msword") ||
    mimeType.includes("officedocument")
  )
    return "documents";
  return "other";
}

export function getFileIcon(mimeType: string): LucideIcon {
  if (mimeType.startsWith("image/")) return FileImage;
  if (mimeType.startsWith("video/")) return FileVideo;
  if (mimeType.startsWith("audio/")) return FileAudio;
  if (mimeType.startsWith("text/")) return FileText;
  if (
    mimeType.includes("zip") ||
    mimeType.includes("archive") ||
    mimeType.includes("tar")
  )
    return Archive;
  if (
    mimeType.includes("javascript") ||
    mimeType.includes("json") ||
    mimeType.includes("html") ||
    mimeType.includes("xml")
  )
    return FileCode;
  if (
    mimeType.includes("pdf") ||
    mimeType.includes("document") ||
    mimeType.includes("officedocument")
  )
    return FileText;
  return File;
}

export function formatFileSize(bytes: bigint | number): string {
  const n = typeof bytes === "bigint" ? Number(bytes) : bytes;
  if (n === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(n) / Math.log(1024));
  const value = n / 1024 ** i;
  return `${value.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function formatDate(timestamp: bigint): string {
  // IC timestamps are in nanoseconds
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function isImageFile(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}

export function isVideoFile(mimeType: string): boolean {
  return mimeType.startsWith("video/");
}

export const STORAGE_QUOTA_BYTES = 1 * 1024 * 1024 * 1024; // 1 GB

export function getCategoryMimePrefix(category: FileCategory): string {
  switch (category) {
    case "photos":
      return "image/";
    case "videos":
      return "video/";
    case "documents":
      return "application/pdf";
    default:
      return "";
  }
}
