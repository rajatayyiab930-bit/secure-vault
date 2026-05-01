import { u as useActor, e as useQuery, h as createActor } from "./fileUtils-Bj81fNaY.js";
import { b as useQueryClient } from "./index-D_QI1REW.js";
import { u as useMutation } from "./useMutation-DW6d4ORH.js";
function useFilesByFolder(folderId) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["files", "folder", (folderId == null ? void 0 : folderId.toString()) ?? "root"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFilesByFolder(folderId ?? null);
    },
    enabled: !!actor && !actorFetching
  });
}
function useFilesByCategory(mimeTypePrefix) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["files", "category", mimeTypePrefix],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFilesByCategory(mimeTypePrefix);
    },
    enabled: !!actor && !actorFetching
  });
}
function useSearchFiles(query) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["files", "search", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      return actor.searchFiles(query);
    },
    enabled: !!actor && !actorFetching && query.trim().length > 0
  });
}
function useDeleteFile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteFile(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["storage-stats"] });
    }
  });
}
export {
  useFilesByCategory as a,
  useSearchFiles as b,
  useDeleteFile as c,
  useFilesByFolder as u
};
