import List "mo:core/List";
import Map "mo:core/Map";
import Types "../types/storage";
import StorageLib "../lib/storage";

mixin (
  files : List.List<Types.FileMeta>,
  folders : List.List<Types.Folder>,
  profiles : Map.Map<Principal, Types.UserProfile>,
  userStats : Map.Map<Principal, Types.StorageStats>,
) {
  // ── File ID counter ───────────────────────────────────────────────
  var _nextFileId : Nat = 0;
  var _nextFolderId : Nat = 0;

  // ── File API ──────────────────────────────────────────────────────

  public shared ({ caller }) func createFile(req : Types.CreateFileRequest) : async Types.FileMeta {
    let (newNextId, file) = StorageLib.createFile(files, userStats, _nextFileId, caller, req);
    _nextFileId := newNextId;
    file
  };

  public query ({ caller }) func getFile(id : Types.FileId) : async ?Types.FileMeta {
    StorageLib.getFile(files, caller, id)
  };

  public shared ({ caller }) func updateFile(req : Types.UpdateFileRequest) : async Bool {
    StorageLib.updateFile(files, caller, req)
  };

  public shared ({ caller }) func deleteFile(id : Types.FileId) : async Bool {
    StorageLib.softDeleteFile(files, userStats, caller, id)
  };

  public query ({ caller }) func listFilesByFolder(folderId : ?Types.FolderId) : async [Types.FileMeta] {
    StorageLib.listFilesByFolder(files, caller, folderId)
  };

  public query ({ caller }) func listFilesByCategory(mimeTypePrefix : Text) : async [Types.FileMeta] {
    StorageLib.listFilesByCategory(files, caller, mimeTypePrefix)
  };

  public query ({ caller }) func searchFiles(nameSubstring : Text) : async [Types.FileMeta] {
    StorageLib.searchFiles(files, caller, nameSubstring)
  };

  // ── Folder API ────────────────────────────────────────────────────

  public shared ({ caller }) func createFolder(req : Types.CreateFolderRequest) : async Types.Folder {
    let (newNextId, folder) = StorageLib.createFolder(folders, _nextFolderId, caller, req);
    _nextFolderId := newNextId;
    folder
  };

  public query ({ caller }) func getFolder(id : Types.FolderId) : async ?Types.Folder {
    StorageLib.getFolder(folders, caller, id)
  };

  public shared ({ caller }) func updateFolder(req : Types.UpdateFolderRequest) : async Bool {
    StorageLib.updateFolder(folders, caller, req)
  };

  public shared ({ caller }) func deleteFolder(id : Types.FolderId) : async Bool {
    StorageLib.deleteFolder(folders, files, caller, id)
  };

  public query ({ caller }) func listFolders(parentFolderId : ?Types.FolderId) : async [Types.Folder] {
    StorageLib.listFolders(folders, caller, parentFolderId)
  };

  // ── User profile API ──────────────────────────────────────────────

  public shared ({ caller }) func setUserProfile(displayName : Text) : async () {
    StorageLib.setUserProfile(profiles, caller, displayName)
  };

  public query ({ caller }) func getUserProfile() : async ?Types.UserProfile {
    StorageLib.getUserProfile(profiles, caller)
  };

  // ── Storage stats API ─────────────────────────────────────────────

  public query ({ caller }) func getStorageStats() : async Types.StorageStats {
    StorageLib.getStorageStats(userStats, caller)
  };
};
