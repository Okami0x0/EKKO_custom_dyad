import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router";
import { RouterProvider } from "@tanstack/react-router";
import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";
import { getTelemetryUserId, isTelemetryOptedIn } from "./hooks/useSettings";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  MutationCache,
} from "@tanstack/react-query";
import { showError } from "./lib/toast";

// @ts-ignore
console.log("Running in mode:", import.meta.env.MODE);

interface MyMeta extends Record<string, unknown> {
  showErrorToast: boolean;
}

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: MyMeta;
    mutationMeta: MyMeta;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.showErrorToast) {
        showError(error);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.showErrorToast) {
        showError(error);
      }
    },
  }),
});

// DISABLED: PostHog telemetry completely disabled for privacy
const posthogClient = posthog.init(
  "disabled", // Disabled API key
  {
    api_host: "https://localhost", // Redirect to localhost (no data sent)
    debug: false,
    autocapture: false,
    capture_exceptions: false,
    capture_pageview: false,
    disabled: true, // Completely disable PostHog
    before_send: () => {
      // Always block all telemetry data
      console.debug("[PRIVACY] Telemetry disabled - no data sent");
      return null;
    },
    persistence: "memory", // Don't persist anything
    opt_out_capturing_by_default: true,
  },
);

function App() {
  useEffect(() => {
    // DISABLED: Navigation tracking removed for privacy
    console.debug("[PRIVACY] Navigation tracking disabled");
    // No telemetry data collected or sent
  }, []);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PostHogProvider client={posthogClient}>
        <App />
      </PostHogProvider>
    </QueryClientProvider>
  </StrictMode>,
);
