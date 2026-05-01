import { createActor } from "@/backend";
import type { FileMeta, FolderId } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFilesByFolder(folderId: FolderId | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<FileMeta[]>({
    queryKey: ["files", "folder", folderId?.toString() ?? "root"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFilesByFolder(folderId ?? null);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useFilesByCategory(mimeTypePrefix: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<FileMeta[]>({
    queryKey: ["files", "category", mimeTypePrefix],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFilesByCategory(mimeTypePrefix);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSearchFiles(query: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<FileMeta[]>({
    queryKey: ["files", "search", query],
    queryFn: async () => {
      if (!actor || !query.trim()) return [];
      return actor.searchFiles(query);
    },
    enabled: !!actor && !actorFetching && query.trim().length > 0,
  });
}

export function useDeleteFile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, bigint>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteFile(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["storage-stats"] });
    },
  });
}
