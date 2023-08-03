import { spawnSync } from "child_process"

const EXIT_CODES = { STAKING_ADDRESS_MISMATCH: 5 }

/**
 * Run monitoring tests on app.d2.finance.
 *
 * If AddressMismatchError is detected, exit the process with status code = 5.
 * The github action will detect this exit code and run a routine if found.
 */
const run = () => {
  try {
    const spawn = spawnSync(
      "npm",
      ["run", "test:headless", "--", "tests/monitoring"],
      { env: process.env },
    )
    const stderr = spawn.stderr?.toString()
    if (stderr) {
      console.log("error", stderr)
      return
    }

    const stdout = spawn.stdout?.toString()
    console.log(stdout)

    if (stdout.includes("AddressMismatchError")) {
      process.exit(EXIT_CODES.STAKING_ADDRESS_MISMATCH)
    }
  } catch (error) {
    console.log(`thrown error`, error)
  }
}

run()
