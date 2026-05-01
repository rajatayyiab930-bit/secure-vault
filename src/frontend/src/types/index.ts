import type { FileMeta, Folder, StorageStats, UserProfile } from "@/backend";

export type { FileMeta, Folder, StorageStats, UserProfile };
export type {
  FileId,
  FolderId,
  CreateFileRequest,
  CreateFolderRequest,
  UpdateFileRequest,
  UpdateFolderRequest,
} from "@/backend";

export type FileCategory = "photos" | "videos" | "documents" | "other";

export interface UploadTask {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}
