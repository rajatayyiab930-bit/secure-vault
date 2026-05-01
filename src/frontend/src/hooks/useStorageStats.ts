import { createActor } from "@/backend";
import type { StorageStats } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useStorageStats() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery<StorageStats>({
    queryKey: ["storage-stats"],
    queryFn: async () => {
      if (!actor) return { totalFiles: 0n, totalBytes: 0n };
      return actor.getStorageStats();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUserProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}
