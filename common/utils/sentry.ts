import { captureEvent, captureException, captureMessage } from "@sentry/react"

export const sentry = {
  captureEvent,
  captureMessage,
  captureException,
}
