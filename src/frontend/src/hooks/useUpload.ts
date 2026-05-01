import { ExternalBlob, createActor } from "@/backend";
import type { FileMeta, FolderId } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface UploadFileParams {
  file: File;
  folderId?: FolderId;
  onProgress?: (pct: number) => void;
}

export function useUploadFile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const mutation = useMutation<FileMeta, Error, UploadFileParams>({
    mutationFn: async ({ file, folderId, onProgress }) => {
      if (!actor) throw new Error("Actor not available");

      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
        onProgress?.(pct);
      });

      // ExternalBlob.fromBytes creates a local blob URL used by the actor's
      // internal _uploadFile when createFile is called.
      const objectStorageKey = blob.getDirectURL();

      return actor.createFile({
        name: file.name,
        size: BigInt(file.size),
        mimeType: file.type || "application/octet-stream",
        folderId: folderId ?? undefined,
        objectStorageKey,
      });
    },
    onSuccess: () => {
      setUploadProgress(0);
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["storage-stats"] });
    },
    onError: () => {
      setUploadProgress(0);
    },
  });

  return { ...mutation, uploadProgress };
}
