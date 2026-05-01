import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Types "../types/storage";

module {
  // ── File operations ──────────────────────────────────────────────

  public func createFile(
    files : List.List<Types.FileMeta>,
    userStats : Map.Map<Principal, Types.StorageStats>,
    nextId : Nat,
    caller : Principal,
    req : Types.CreateFileRequest,
  ) : (Nat, Types.FileMeta) {
    let file : Types.FileMeta = {
      id = nextId;
      owner = caller;
      name = req.name;
      size = req.size;
      mimeType = req.mimeType;
      uploadedAt = Time.now();
      folderId = req.folderId;
      objectStorageKey = req.objectStorageKey;
      isDeleted = false;
    };
    files.add(file);
    // Update stats
    let emptyStats : Types.StorageStats = { totalFiles = 0; totalBytes = 0 };
    let current = switch (userStats.get(caller)) {
      case (?s) s;
      case (null) emptyStats;
    };
    userStats.add(caller, { totalFiles = current.totalFiles + 1; totalBytes = current.totalBytes + req.size });
    (nextId + 1, file)
  };

  public func getFile(
    files : List.List<Types.FileMeta>,
    caller : Principal,
    id : Types.FileId,
  ) : ?Types.FileMeta {
    files.find(func(f) { f.id == id and f.owner == caller and not f.isDeleted })
  };

  public func updateFile(
    files : List.List<Types.FileMeta>,
    caller : Principal,
    req : Types.UpdateFileRequest,
  ) : Bool {
    var found = false;
    files.mapInPlace(func(f) {
      if (f.id == req.id) {
        if (f.owner != caller) {
          Runtime.trap("Unauthorized");
        };
        found := true;
        { f with name = req.name; folderId = req.folderId }
      } else {
        f
      }
    });
    found
  };

  public func softDeleteFile(
    files : List.List<Types.FileMeta>,
    userStats : Map.Map<Principal, Types.StorageStats>,
    caller : Principal,
    id : Types.FileId,
  ) : Bool {
    var found = false;
    var deletedSize : Nat = 0;
    files.mapInPlace(func(f) {
      if (f.id == id and not f.isDeleted) {
        if (f.owner != caller) {
          Runtime.trap("Unauthorized");
        };
        found := true;
        deletedSize := f.size;
        { f with isDeleted = true }
      } else {
        f
      }
    });
    if (found) {
      let emptyStats : Types.StorageStats = { totalFiles = 0; totalBytes = 0 };
      let current = switch (userStats.get(caller)) {
        case (?s) s;
        case (null) emptyStats;
      };
      let newFiles = if (current.totalFiles > 0) { current.totalFiles - 1 } else { 0 };
      let newBytes = if (current.totalBytes >= deletedSize) { current.totalBytes - deletedSize } else { 0 };
      userStats.add(caller, { totalFiles = newFiles; totalBytes = newBytes });
    };
    found
  };

  public func listFilesByFolder(
    files : List.List<Types.FileMeta>,
    caller : Principal,
    folderId : ?Types.FolderId,
  ) : [Types.FileMeta] {
    files.filter(func(f) {
      f.owner == caller and not f.isDeleted and f.folderId == folderId
    }).toArray()
  };

  public func listFilesByCategory(
    files : List.List<Types.FileMeta>,
    caller : Principal,
    mimeTypePrefix : Text,
  ) : [Types.FileMeta] {
    files.filter(func(f) {
      f.owner == caller and not f.isDeleted and f.mimeType.startsWith(#text mimeTypePrefix)
    }).toArray()
  };

  public func searchFiles(
    files : List.List<Types.FileMeta>,
    caller : Principal,
    nameSubstring : Text,
  ) : [Types.FileMeta] {
    let lower = nameSubstring.toLower();
    files.filter(func(f) {
      f.owner == caller and not f.isDeleted and f.name.toLower().contains(#text lower)
    }).toArray()
  };

  // ── Folder operations ─────────────────────────────────────────────

  public func createFolder(
    folders : List.List<Types.Folder>,
    nextId : Nat,
    caller : Principal,
    req : Types.CreateFolderRequest,
  ) : (Nat, Types.Folder) {
    let folder : Types.Folder = {
      id = nextId;
      owner = caller;
      name = req.name;
      parentFolderId = req.parentFolderId;
      createdAt = Time.now();
    };
    folders.add(folder);
    (nextId + 1, folder)
  };

  public func getFolder(
    folders : List.List<Types.Folder>,
    caller : Principal,
    id : Types.FolderId,
  ) : ?Types.Folder {
    folders.find(func(f) { f.id == id and f.owner == caller })
  };

  public func updateFolder(
    folders : List.List<Types.Folder>,
    caller : Principal,
    req : Types.UpdateFolderRequest,
  ) : Bool {
    var found = false;
    folders.mapInPlace(func(f) {
      if (f.id == req.id) {
        if (f.owner != caller) {
          Runtime.trap("Unauthorized");
        };
        found := true;
        { f with name = req.name; parentFolderId = req.parentFolderId }
      } else {
        f
      }
    });
    found
  };

  public func deleteFolder(
    folders : List.List<Types.Folder>,
    files : List.List<Types.FileMeta>,
    caller : Principal,
    id : Types.FolderId,
  ) : Bool {
    // Only delete if folder belongs to caller and is empty (no non-deleted files)
    switch (folders.findIndex(func(f) { f.id == id and f.owner == caller })) {
      case (null) { false };
      case (?idx) {
        let hasChildren = files.any(func(f : Types.FileMeta) : Bool {
          not f.isDeleted and f.folderId == ?id and f.owner == caller
        });
        let hasSubFolders = folders.any(func(f : Types.Folder) : Bool {
          f.parentFolderId == ?id and f.owner == caller
        });
        if (hasChildren or hasSubFolders) {
          false
        } else {
          // Remove by rebuilding — filter out the folder
          let toRemove = folders.at(idx);
          // Use retain pattern: keep everything except this folder
          let kept = folders.filter(func(f) { f.id != toRemove.id });
          folders.clear();
          folders.append(kept);
          true
        }
      };
    }
  };

  public func listFolders(
    folders : List.List<Types.Folder>,
    caller : Principal,
    parentFolderId : ?Types.FolderId,
  ) : [Types.Folder] {
    folders.filter(func(f) {
      f.owner == caller and f.parentFolderId == parentFolderId
    }).toArray()
  };

  // ── User profile operations ───────────────────────────────────────

  public func setUserProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
    displayName : Text,
  ) : () {
    profiles.add(caller, { owner = caller; displayName })
  };

  public func getUserProfile(
    profiles : Map.Map<Principal, Types.UserProfile>,
    caller : Principal,
  ) : ?Types.UserProfile {
    profiles.get(caller)
  };

  // ── Storage stats ─────────────────────────────────────────────────

  public func getStorageStats(
    userStats : Map.Map<Principal, Types.StorageStats>,
    caller : Principal,
  ) : Types.StorageStats {
    let emptyStats : Types.StorageStats = { totalFiles = 0; totalBytes = 0 };
    switch (userStats.get(caller)) {
      case (?s) s;
      case (null) emptyStats;
    }
  };
};
