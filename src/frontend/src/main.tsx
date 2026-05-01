import { Toaster } from "@/components/ui/sonner";
import { InternetIdentityProvider } from "@caffeineai/core-infrastructure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

// Apply dark mode before render to prevent flash
const storedDark = localStorage.getItem("secure-vault-dark-mode");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (storedDark === "true" || (storedDark === null && prefersDark)) {
  document.documentElement.classList.add("dark");
}
document.documentElement.setAttribute("color-scheme", "dark");

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <InternetIdentityProvider>
      <App />
      <Toaster />
    </InternetIdentityProvider>
  </QueryClientProvider>,
);
