// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"
import { BrowserTracing } from "@sentry/tracing"
import { globalWindow } from "./common/utils/globalWindow"

// only run sentry in deployed environments
if (
  ["app.", "dev."].some(
    (str) => globalWindow && globalWindow.location.hostname.startsWith(str),
  )
) {
  const SENTRY_DSN =
    process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

  Sentry.init({
    dsn:
      SENTRY_DSN ||
      "https://fdc60d9308f04042a6d7514569d091e2@o4504515816062976.ingest.sentry.io/4504515819470848",
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1.0,
    integrations: [new BrowserTracing()],
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  })
}
