import { c as createLucideIcon } from "./index-D_QI1REW.js";
import { u as useActor, e as useQuery, h as createActor } from "./fileUtils-Bj81fNaY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode);
function useStorageStats() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["storage-stats"],
    queryFn: async () => {
      if (!actor) return { totalFiles: 0n, totalBytes: 0n };
      return actor.getStorageStats();
    },
    enabled: !!actor && !actorFetching
  });
}
function useUserProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false
  });
}
export {
  LogOut as L,
  useUserProfile as a,
  useStorageStats as u
};
