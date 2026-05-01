import { u as useAuth, a as useRouter, r as reactExports, j as jsxRuntimeExports, m as motion, S as Shield, L as Lock } from "./index-D_QI1REW.js";
import { B as Button } from "./button-DABsfT9_.js";
import { C as CloudUpload } from "./cloud-upload-BmR5bcjh.js";
function LoginPage() {
  const { isAuthenticated, isInitializing, isLoggingIn, login } = useAuth();
  const router = useRouter();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, router]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden",
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { y: 20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: { duration: 0.5 },
            className: "relative z-10 w-full max-w-sm flex flex-col items-center gap-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-10 h-10 text-primary-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center accent-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-accent-foreground" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold font-display text-foreground", children: "Secure Vault" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1.5 text-sm", children: "Your private cloud storage, secured." })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: [
                "End-to-end encrypted",
                "Multi-device sync",
                "Private by design"
              ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border/60",
                  children: f
                },
                f
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-card border border-border/60 rounded-2xl p-6 shadow-elevated flex flex-col gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-5 h-5 text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "Sign in to access your vault" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Uses Internet Identity — no password needed" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: login,
                    disabled: isInitializing || isLoggingIn,
                    className: "w-full h-12 rounded-xl font-semibold text-base bg-accent hover:bg-accent/90 text-accent-foreground transition-smooth",
                    "data-ocid": "login.submit_button",
                    children: isInitializing ? "Loading..." : isLoggingIn ? "Opening login..." : "Sign in with Internet Identity"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "New users are automatically registered on first login." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
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
                    className: "text-accent hover:underline",
                    children: "caffeine.ai"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  LoginPage as default
};
