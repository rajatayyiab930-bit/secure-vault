import { createActor } from "@/backend";
import type { CreateFolderRequest, Folder, FolderId } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFolders(parentFolderId: FolderId | null = null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<Folder[]>({
    queryKey: ["folders", parentFolderId?.toString() ?? "root"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFolders(parentFolderId ?? null);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateFolder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Folder, Error, CreateFolderRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createFolder(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
}

export function useDeleteFolder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteFolder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
  });
}
