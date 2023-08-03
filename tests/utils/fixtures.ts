import { chromium, test as base, type BrowserContext } from "@playwright/test"
import { initialSetup } from "@synthetixio/synpress/commands/metamask"
import { prepareMetamask } from "@synthetixio/synpress/helpers"

export const test = base.extend<{
  context: BrowserContext
}>({
  // eslint-disable-next-line
  context: async ({}, use) => {
    // required for synpress
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).expect = expect
    // download metamask
    const metamaskPath = await prepareMetamask(
      process.env.METAMASK_VERSION || "10.26.2",
    )
    // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      "--remote-debugging-port=9222",
    ]

    if (process.env.CI) {
      browserArgs.push("--disable-gpu")
    }
    if (process.env.HEADLESS_MODE) {
      browserArgs.push("--headless=new")
    }
    // launch browser
    const context = await chromium.launchPersistentContext("", {
      headless: false,
      args: browserArgs,
      // this overrides geoblocking on app.d2.finance if the matching user agent
      // from the cloudflare geoblocking policy is provided
      // https://dash.cloudflare.com/f4654b2c0d95f24439ad04611364303e/d2.finance/security/waf/custom-rules
      ...(process.env.OVERRIDE_GEOBLOCKING_POLICY_USER_AGENT && {
        userAgent: process.env.OVERRIDE_GEOBLOCKING_POLICY_USER_AGENT as string,
      }),
    })
    // wait for metamask
    await context.pages()[0].waitForTimeout(3000)
    // setup metamask

    await initialSetup(chromium, {
      password: "Tester@1234",
      network: process.env.NETWORK_NAME,
      secretWordsOrPrivateKey: process.env.TEST_WALLET_PRIVATE_KEY,
      enableExperimentalSettings: false,
      enableAdvancedSettings: false,
    })

    await use(context)
    if (!process.env.SERIAL_MODE) {
      await context.close()
    }
  },
})
export const expect = test.expect
