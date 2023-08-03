import { Erc20__factory } from "@/common/abi/typechain"
import { sentry } from "@/common/utils/sentry"
import { BaseProvider } from "@ethersproject/providers"
import { BigNumber } from "ethers"
import { formatEther, parseUnits } from "ethers/lib/utils"

// (2^256 - 1 )
const maxAmount = BigNumber.from(2).pow(256).sub(BigNumber.from(1))
// maxAmount = BigNumber.from(3)

export const getEthBalance = async (
  address: string,
  provider: BaseProvider,
): Promise<string> => {
  try {
    const balance = await provider.getBalance(address)
    return formatEther(balance)
  } catch (err: unknown) {
    sentry.captureException(err)
    return "0"
  }
}

export const getTokenBalance = async (
  tokenAddress: string,
  accountAddress: string,
  provider: BaseProvider,
) => {
  try {
    const ERC20Contract = Erc20__factory.connect(tokenAddress, provider)
    const balance = await ERC20Contract.balanceOf(accountAddress)
    return formatEther(balance)
  } catch (err: unknown) {
    sentry.captureException(err)
    return "0"
  }
}

export const getTokenBalanceBn = async (
  tokenAddress: string,
  accountAddress: string,
  provider: BaseProvider,
) => {
  try {
    const ERC20Contract = Erc20__factory.connect(tokenAddress, provider)
    const balance = await ERC20Contract.balanceOf(accountAddress)
    return balance
  } catch (err: unknown) {
    sentry.captureException(err)
    return BigNumber.from(0)
  }
}

export const spenderApproved = async (
  tokenAddress: string,
  tokenAmount: string,
  ownerAddress: string,
  spenderAddress: string,
  provider: BaseProvider,
) => {
  try {
    const ERC20Contract = Erc20__factory.connect(tokenAddress, provider)
    const spenderAllowance = await ERC20Contract.allowance(
      ownerAddress,
      spenderAddress,
    )
    const maxAllowanceApproved = spenderAllowance.eq(maxAmount)
    const customAllowanceApproved = spenderAllowance.gte(
      parseUnits(tokenAmount),
    )

    return { maxAllowanceApproved, customAllowanceApproved }
  } catch (err: unknown) {
    sentry.captureException(err)
    console.log("error")
    return { maxAllowanceApproved: false, customAllowanceApproved: false }
  }
}
