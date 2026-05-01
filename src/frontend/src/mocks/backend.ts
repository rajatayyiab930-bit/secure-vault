import type { backendInterface, FileMeta, Folder, StorageStats, UserProfile } from "../backend";

const mockPrincipal = { toText: () => "aaaaa-aa", isAnonymous: () => false } as any;

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleFiles: FileMeta[] = [
  {
    id: BigInt(1),
    isDeleted: false,
    owner: mockPrincipal,
    name: "vacation-photo.jpg",
    size: BigInt(2_450_000),
    mimeType: "image/jpeg",
    folderId: undefined,
    objectStorageKey: "user/1/vacation-photo.jpg",
    uploadedAt: now - BigInt(86400 * 1_000_000_000),
  },
  {
    id: BigInt(2),
    isDeleted: false,
    owner: mockPrincipal,
    name: "project-report.pdf",
    size: BigInt(540_000),
    mimeType: "application/pdf",
    folderId: undefined,
    objectStorageKey: "user/1/project-report.pdf",
    uploadedAt: now - BigInt(3600 * 1_000_000_000),
  },
  {
    id: BigInt(3),
    isDeleted: false,
    owner: mockPrincipal,
    name: "intro-video.mp4",
    size: BigInt(52_000_000),
    mimeType: "video/mp4",
    folderId: undefined,
    objectStorageKey: "user/1/intro-video.mp4",
    uploadedAt: now,
  },
  {
    id: BigInt(4),
    isDeleted: false,
    owner: mockPrincipal,
    name: "notes.txt",
    size: BigInt(12_000),
    mimeType: "text/plain",
    folderId: undefined,
    objectStorageKey: "user/1/notes.txt",
    uploadedAt: now - BigInt(7200 * 1_000_000_000),
  },
  {
    id: BigInt(5),
    isDeleted: false,
    owner: mockPrincipal,
    name: "screenshot.png",
    size: BigInt(880_000),
    mimeType: "image/png",
    folderId: undefined,
    objectStorageKey: "user/1/screenshot.png",
    uploadedAt: now - BigInt(1800 * 1_000_000_000),
  },
];

const sampleFolders: Folder[] = [
  {
    id: BigInt(1),
    owner: mockPrincipal,
    name: "Work",
    createdAt: now - BigInt(7 * 86400 * 1_000_000_000),
    parentFolderId: undefined,
  },
  {
    id: BigInt(2),
    owner: mockPrincipal,
    name: "Personal",
    createdAt: now - BigInt(3 * 86400 * 1_000_000_000),
    parentFolderId: undefined,
  },
];

const sampleStats: StorageStats = {
  totalFiles: BigInt(5),
  totalBytes: BigInt(55_882_000),
};

const sampleProfile: UserProfile = {
  displayName: "Alex Johnson",
  owner: mockPrincipal,
};

export const mockBackend: backendInterface = {
  createFile: async (req) => ({
    id: BigInt(99),
    isDeleted: false,
    owner: mockPrincipal,
    name: req.name,
    size: req.size,
    mimeType: req.mimeType,
    folderId: req.folderId,
    objectStorageKey: req.objectStorageKey,
    uploadedAt: BigInt(Date.now()) * BigInt(1_000_000),
  }),
  createFolder: async (req) => ({
    id: BigInt(99),
    owner: mockPrincipal,
    name: req.name,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    parentFolderId: req.parentFolderId,
  }),
  deleteFile: async (_id) => true,
  deleteFolder: async (_id) => true,
  getFile: async (id) => sampleFiles.find((f) => f.id === id) ?? null,
  getFolder: async (id) => sampleFolders.find((f) => f.id === id) ?? null,
  getStorageStats: async () => sampleStats,
  getUserProfile: async () => sampleProfile,
  listFilesByCategory: async (prefix) =>
    sampleFiles.filter((f) => f.mimeType.startsWith(prefix)),
  listFilesByFolder: async (_folderId) => sampleFiles,
  listFolders: async (_parentFolderId) => sampleFolders,
  searchFiles: async (nameSubstring) =>
    sampleFiles.filter((f) =>
      f.name.toLowerCase().includes(nameSubstring.toLowerCase())
    ),
  setUserProfile: async (_displayName) => undefined,
  updateFile: async (_req) => true,
  updateFolder: async (_req) => true,
};
