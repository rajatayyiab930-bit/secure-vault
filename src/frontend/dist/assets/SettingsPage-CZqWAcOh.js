import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useAuth, v as useDarkMode, a as useRouter, m as motion, S as Shield, L as Lock } from "./index-D_QI1REW.js";
import { u as useActor, L as Layout, f as formatFileSize, S as STORAGE_QUOTA_BYTES, h as createActor } from "./fileUtils-Bj81fNaY.js";
import { H as HardDrive, A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BkTNuMtD.js";
import { b as Primitive } from "./index-DthWCLgE.js";
import { c as cn, u as useComposedRefs } from "./button-DABsfT9_.js";
import { d as useControllableState, P as Primitive$1, f as composeEventHandlers, c as createContextScope } from "./index-DEJqk3cJ.js";
import { a as usePrevious, u as useSize } from "./index-BDE-iIY1.js";
import { u as useStorageStats, L as LogOut } from "./useStorageStats-D3VqqtQ8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root$1 = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive$1.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function SettingRow({
  icon: Icon,
  label,
  description,
  action,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-3", "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-accent" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-snug", children: description })
    ] }),
    action
  ] });
}
function SectionCard({
  title,
  children,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay },
      className: "bg-card border border-border/60 rounded-2xl px-4 shadow-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-3 border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: title }) }),
        children
      ]
    }
  );
}
const APP_VERSION = "1.0.0";
const APP_NAME = "Secure Vault";
function SettingsPage() {
  var _a;
  const { isAuthenticated, isInitializing, logout } = useAuth();
  const { isDark, toggle } = useDarkMode();
  const { data: stats } = useStorageStats();
  const { isFetching: actorFetching } = useActor(createActor);
  const router = useRouter();
  const totalBytes = (stats == null ? void 0 : stats.totalBytes) ?? 0n;
  const totalBytesNum = Number(totalBytes);
  const quotaBytes = STORAGE_QUOTA_BYTES;
  const usagePercent = Math.min(totalBytesNum / quotaBytes * 100, 100);
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, isInitializing, router]);
  const handleLogout = () => {
    logout();
    router.navigate({ to: "/login" });
  };
  const isLoading = actorFetching;
  const headerContent = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-semibold font-display text-foreground", children: "Settings" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { header: headerContent, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-6 space-y-4", "data-ocid": "settings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Appearance", delay: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SettingRow,
      {
        icon: isDark ? Moon : Sun,
        label: "Dark Mode",
        description: "Switch between light and dark theme",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            checked: isDark,
            onCheckedChange: toggle,
            "data-ocid": "settings.dark_mode_switch"
          }
        ),
        ocid: "settings.dark_mode_row"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Storage", delay: 0.06, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4 space-y-3", "data-ocid": "settings.storage_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "w-4 h-4 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Storage Used" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: isLoading ? "Loading…" : `${formatFileSize(totalBytes)} of ${formatFileSize(quotaBytes)} used` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-accent tabular-nums", children: isLoading ? "—" : `${usagePercent.toFixed(1)}%` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-2 rounded-full bg-muted overflow-hidden",
          "aria-label": `Storage used: ${usagePercent.toFixed(1)}%`,
          "data-ocid": "settings.storage_progress",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full",
              style: {
                background: usagePercent > 80 ? "oklch(var(--destructive))" : "oklch(var(--accent))"
              },
              initial: { width: 0 },
              animate: { width: `${usagePercent}%` },
              transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isLoading ? "Calculating…" : `${formatFileSize(BigInt(Math.max(0, quotaBytes - totalBytesNum)))} available · ${((_a = stats == null ? void 0 : stats.totalFiles) == null ? void 0 : _a.toString()) ?? "0"} files stored` })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Security", delay: 0.12, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingRow,
        {
          icon: Shield,
          label: "Internet Identity",
          description: "Secured via decentralized authentication",
          ocid: "settings.auth_row"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SettingRow,
        {
          icon: Lock,
          label: "End-to-End Encrypted",
          description: "Your files are stored on a secure decentralized network",
          ocid: "settings.encryption_row"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Account", delay: 0.18, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-3", "data-ocid": "settings.account_section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "flex items-center gap-3 w-full text-left group",
          "data-ocid": "settings.logout_open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/20 transition-colors duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-destructive", children: "Sign Out" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "You will need to log in again" })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        AlertDialogContent,
        {
          className: "rounded-2xl border-border/60",
          "data-ocid": "settings.logout_dialog",
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
                  "data-ocid": "settings.logout_cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AlertDialogAction,
                {
                  className: "rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                  onClick: handleLogout,
                  "data-ocid": "settings.logout_confirm_button",
                  children: "Sign Out"
                }
              )
            ] })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: 0.24 },
        className: "bg-card border border-border/60 rounded-2xl px-4 shadow-card",
        "data-ocid": "settings.app_info_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-3 border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "About" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SettingRow,
            {
              icon: Info,
              label: APP_NAME,
              description: `Version ${APP_VERSION} · Built on the Internet Computer`,
              ocid: "settings.app_info_row"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.p,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.35 },
        className: "text-center text-xs text-muted-foreground pt-2",
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
  SettingsPage as default
};
