import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UpdateFileRequest {
    id: FileId;
    name: string;
    folderId?: FolderId;
}
export interface StorageStats {
    totalFiles: bigint;
    totalBytes: bigint;
}
export type Time = bigint;
export interface UpdateFolderRequest {
    id: FolderId;
    name: string;
    parentFolderId?: FolderId;
}
export interface Folder {
    id: FolderId;
    owner: Principal;
    name: string;
    createdAt: Time;
    parentFolderId?: FolderId;
}
export interface FileMeta {
    id: FileId;
    isDeleted: boolean;
    owner: Principal;
    name: string;
    size: bigint;
    mimeType: string;
    folderId?: FolderId;
    objectStorageKey: string;
    uploadedAt: Time;
}
export type FileId = bigint;
export interface CreateFolderRequest {
    name: string;
    parentFolderId?: FolderId;
}
export interface CreateFileRequest {
    name: string;
    size: bigint;
    mimeType: string;
    folderId?: FolderId;
    objectStorageKey: string;
}
export type FolderId = bigint;
export interface UserProfile {
    displayName: string;
    owner: Principal;
}
export interface backendInterface {
    createFile(req: CreateFileRequest): Promise<FileMeta>;
    createFolder(req: CreateFolderRequest): Promise<Folder>;
    deleteFile(id: FileId): Promise<boolean>;
    deleteFolder(id: FolderId): Promise<boolean>;
    getFile(id: FileId): Promise<FileMeta | null>;
    getFolder(id: FolderId): Promise<Folder | null>;
    getStorageStats(): Promise<StorageStats>;
    getUserProfile(): Promise<UserProfile | null>;
    listFilesByCategory(mimeTypePrefix: string): Promise<Array<FileMeta>>;
    listFilesByFolder(folderId: FolderId | null): Promise<Array<FileMeta>>;
    listFolders(parentFolderId: FolderId | null): Promise<Array<Folder>>;
    searchFiles(nameSubstring: string): Promise<Array<FileMeta>>;
    setUserProfile(displayName: string): Promise<void>;
    updateFile(req: UpdateFileRequest): Promise<boolean>;
    updateFolder(req: UpdateFolderRequest): Promise<boolean>;
}
