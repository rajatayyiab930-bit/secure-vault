import Time "mo:core/Time";

module {
  public type FileId = Nat;
  public type FolderId = Nat;

  public type FileMeta = {
    id : FileId;
    owner : Principal;
    name : Text;
    size : Nat;
    mimeType : Text;
    uploadedAt : Time.Time;
    folderId : ?FolderId;
    objectStorageKey : Text;
    isDeleted : Bool;
  };

  public type Folder = {
    id : FolderId;
    owner : Principal;
    name : Text;
    parentFolderId : ?FolderId;
    createdAt : Time.Time;
  };

  public type StorageStats = {
    totalFiles : Nat;
    totalBytes : Nat;
  };

  public type UserProfile = {
    owner : Principal;
    displayName : Text;
  };

  public type CreateFileRequest = {
    name : Text;
    size : Nat;
    mimeType : Text;
    folderId : ?FolderId;
    objectStorageKey : Text;
  };

  public type CreateFolderRequest = {
    name : Text;
    parentFolderId : ?FolderId;
  };

  public type UpdateFileRequest = {
    id : FileId;
    name : Text;
    folderId : ?FolderId;
  };

  public type UpdateFolderRequest = {
    id : FolderId;
    name : Text;
    parentFolderId : ?FolderId;
  };
};
