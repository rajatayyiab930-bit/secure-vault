import List "mo:core/List";
import Map "mo:core/Map";
import Types "types/storage";
import StorageApiMixin "mixins/storage-api";

actor {
  let files = List.empty<Types.FileMeta>();
  let folders = List.empty<Types.Folder>();
  let profiles = Map.empty<Principal, Types.UserProfile>();
  let userStats = Map.empty<Principal, Types.StorageStats>();

  include StorageApiMixin(files, folders, profiles, userStats);
};
