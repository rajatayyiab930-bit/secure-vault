import { c as createLucideIcon, u as useAuth, b as useQueryClient, a as useRouter, r as reactExports, j as jsxRuntimeExports, m as motion, d as ue } from "./index-D_QI1REW.js";
import { u as useActor, L as Layout, f as formatFileSize, h as createActor } from "./fileUtils-Bj81fNaY.js";
import { H as HardDrive, A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BkTNuMtD.js";
import { B as Button } from "./button-DABsfT9_.js";
import { L as Label, I as Input } from "./label-CvkC2AAw.js";
import { S as Skeleton } from "./skeleton-BpYUKzWV.js";
import { a as useUserProfile, u as useStorageStats, L as LogOut } from "./useStorageStats-D3VqqtQ8.js";
import { X } from "./x-B5r-FJei.js";
import "./index-DEJqk3cJ.js";
import "./index-DthWCLgE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M20 7h-3a2 2 0 0 1-2-2V2", key: "x099mo" }],
  ["path", { d: "M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z", key: "18t6ie" }],
  ["path", { d: "M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8", key: "1nja0z" }]
];
const Files = createLucideIcon("files", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function getInitials(name) {
  return name.split(" ").map((w) => {
    var _a;
    return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
  }).slice(0, 2).join("");
}
function ProfilePage() {
  var _a;
  const { isAuthenticated, isInitializing, logout, principal } = useAuth();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: stats } = useStorageStats();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [editing, setEditing] = reactExports.useState(false);
  const [displayName, setDisplayName] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing, router]);
  reactExports.useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
    }
  }, [profile]);
  const saveProfile = async () => {
    if (!actor || !displayName.trim()) return;
    setSaving(true);
    try {
      await actor.setUserProfile(displayName.trim());
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      ue.success("Profile updated");
      setEditing(false);
    } catch {
      ue.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };
  const handleLogout = () => {
    logout();
    router.navigate({ to: "/login" });
  };
  const principalStr = (principal == null ? void 0 : principal.toString()) ?? "";
  const shortPrincipal = principalStr.length > 20 ? `${principalStr.slice(0, 10)}…${principalStr.slice(-8)}` : principalStr;
  const resolvedName = (profile == null ? void 0 : profile.displayName) ?? "Vault User";
  const initials = getInitials(resolvedName);
  const headerContent = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-semibold font-display text-foreground", children: "Profile" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { header: headerContent, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 pb-8 space-y-5", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        className: "flex flex-col items-center gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-elevated select-none",
                "aria-label": "Avatar",
                children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-24 h-24 rounded-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-bold font-display text-primary-foreground", children: initials || "?" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-accent-foreground" }) })
          ] }),
          profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-36" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold font-display text-foreground", children: resolvedName }),
            principalStr && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-muted-foreground mt-1 font-mono",
                title: principalStr,
                children: shortPrincipal
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.1 },
        className: "bg-card border border-border/60 rounded-2xl p-5 shadow-card",
        "data-ocid": "profile.name_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: "Display Name" }),
            !editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-8 rounded-lg gap-1",
                onClick: () => setEditing(true),
                "data-ocid": "profile.edit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }),
                  "Edit"
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-8 w-8 p-0 rounded-lg",
                  onClick: () => {
                    setEditing(false);
                    setDisplayName((profile == null ? void 0 : profile.displayName) ?? "");
                  },
                  "data-ocid": "profile.cancel_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "h-8 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground gap-1",
                  onClick: saveProfile,
                  disabled: saving || !displayName.trim(),
                  "data-ocid": "profile.save_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3.5 h-3.5" }),
                    saving ? "Saving…" : "Save"
                  ]
                }
              )
            ] })
          ] }),
          editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Display Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: displayName,
                onChange: (e) => setDisplayName(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter") saveProfile();
                  if (e.key === "Escape") {
                    setEditing(false);
                    setDisplayName((profile == null ? void 0 : profile.displayName) ?? "");
                  }
                },
                placeholder: "Enter your display name",
                className: "rounded-xl",
                autoFocus: true,
                "data-ocid": "profile.name_input"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm", children: (profile == null ? void 0 : profile.displayName) ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Not set" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.15 },
        className: "bg-card border border-border/60 rounded-2xl p-5 shadow-card",
        "data-ocid": "profile.account_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm mb-4", children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Auth Provider" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-foreground flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3 text-accent" }),
                "Internet Identity"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground flex-shrink-0", children: "Principal ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-mono text-foreground text-right break-all",
                  title: principalStr,
                  children: shortPrincipal || "—"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.2 },
        className: "grid grid-cols-2 gap-3",
        "data-ocid": "profile.stats_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/60 rounded-2xl p-4 shadow-card text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Files, { className: "w-4 h-4 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-foreground tabular-nums", children: ((_a = stats == null ? void 0 : stats.totalFiles) == null ? void 0 : _a.toString()) ?? "0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total Files" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/60 rounded-2xl p-4 shadow-card text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-foreground tabular-nums", children: formatFileSize((stats == null ? void 0 : stats.totalBytes) ?? 0n) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Used Storage" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.25 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full h-12 rounded-xl font-semibold border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/60 transition-smooth",
              "data-ocid": "profile.logout_open_modal_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-2" }),
                "Sign Out"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AlertDialogContent,
            {
              className: "rounded-2xl border-border/60",
              "data-ocid": "profile.logout_dialog",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display", children: "Sign out of Secure Vault?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "You will be returned to the login screen. Your files remain safely stored." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogCancel,
                    {
                      className: "rounded-xl",
                      "data-ocid": "profile.logout_cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    AlertDialogAction,
                    {
                      className: "rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                      onClick: handleLogout,
                      "data-ocid": "profile.logout_confirm_button",
                      children: "Sign Out"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.p,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.35 },
        className: "text-center text-xs text-muted-foreground",
        children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          ". Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-accent hover:underline transition-colors duration-200",
              children: "caffeine.ai"
            }
          )
        ]
      }
    )
  ] }) });
}
export {
  ProfilePage as default
};
