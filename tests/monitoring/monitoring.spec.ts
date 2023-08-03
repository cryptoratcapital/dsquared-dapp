import { StakingRouter } from "@/common/components/constants/Staking"
import {
  TokenLookUp,
  TokenSymbol,
} from "@/common/components/constants/tokenLookup"
import { chainIdEnum } from "@/common/interfaces/Chain"
import { isValidAddress } from "@/common/utils/helpers/checkers"
import { type Page } from "@playwright/test"
import metamask from "@synthetixio/synpress/commands/metamask"
import playwright from "@synthetixio/synpress/commands/playwright"
import { AddressMismatchError, isPlaywrightExpectError } from "../utils"
import { expect, test } from "../utils/fixtures"

type Context = { page: Page }

const testEthAddress = "0x441b7a85dcf2b7c211d8f1d3276402eeba860719"

const doDSQTokenConnect = () =>
  metamask
    .addNetwork({
      networkName: "Arbitrum One",
      symbol: TokenSymbol.DSQ,
      chainId: chainIdEnum.ARBITRUM,
      rpcUrl: "https://arb1.arbitrum.io/rpc",
      blockExplorer: "https://explorer.arbitrum.io",
      isTestnet: false,
    })
    .then(() =>
      metamask.importToken({
        symbol: TokenSymbol.DSQ,
        address: TokenLookUp.DSQ[chainIdEnum.ARBITRUM],
      }),
    )

const doConnectWallet = async ({ page }: Context) => {
  await page.getByTestId("connect-wallet").nth(0).click()

  await page
    .locator(".web3modal-provider-container")
    .getByText("MetaMask", { exact: true })
    .click()

  await metamask.acceptAccess()

  await page.getByTestId("accept-terms").click()
  await page.getByTestId("confirm-terms").click()
}

test.describe.configure({ mode: "serial" })

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
test.beforeAll(({ page }) => doDSQTokenConnect())
test.afterAll(({ context }) => context.close())

test("DSQ staking address is correct", async ({ page }) => {
  await page.goto("/earn")

  await doConnectWallet({ page })

  expect(page.getByTestId("connect-wallet").nth(0)).toContainText(
    testEthAddress.slice(2, 8).toUpperCase(),
  )

  expect(
    await playwright
      .metamaskWindow()
      .getByTestId("wallet-balance")
      .getByTestId("token-button"),
  ).toContainText(TokenSymbol.DSQ)

  await page.getByTestId("stake-dsq").click()
  await page.getByTestId("stake-amount").type(".005")

  await page.getByTestId("stake-submit").click()

  const notification = await playwright.switchToMetamaskNotification()

  await notification.click(".token-allowance-container__verify-link")

  await notification
    .locator(".contract-details-modal__content__contract")
    .nth(1)
    .locator('button[aria-label="Copy to clipboard"]')
    .click()

  try {
    const foundAddress = await page.evaluate("navigator.clipboard.readText()")

    expect((foundAddress as string).toLowerCase()).toBe(
      StakingRouter.address.toLowerCase() + 1231,
    )
  } catch (error) {
    if (isPlaywrightExpectError(error)) {
      const { expected, actual } = error.matcherResult
      // only throw AddressMismatchError if a valid address was detected
      // e.g. if the expected address was replaced by another valid address
      if (isValidAddress(actual)) {
        throw new AddressMismatchError(expected, actual)
      }
    }
  }
})
