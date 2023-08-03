export type PlaywrightExpectError = Error & {
  matcherResult: {
    actual: string
    expected: string
    message: string
    name: string
    pass: boolean
  }
}

export function isPlaywrightExpectError(
  maybeError: unknown,
): maybeError is PlaywrightExpectError {
  if (maybeError instanceof Error && "matcherResult" in maybeError) {
    return true
  }

  return false
}

export class AddressMismatchError extends Error {
  constructor(expected: string, received: string) {
    super(`expected: ${expected}, received: ${received}`)
    this.name = "AddressMismatchError"
  }
}
