import { Erc20__factory } from "@/common/abi/typechain"
import { web3ModalState } from "@/common/store"
import {
  isValidAddress,
  isValidChain,
  isValidTokenName,
} from "@/common/utils/helpers/checkers"
import { getTokenAddress } from "@/common/utils/helpers/utils"
import { sentry } from "@/common/utils/sentry"
import { BigNumber } from "ethers"

// (2^256 - 1 )
const maxAmount = BigNumber.from(2).pow(256).sub(BigNumber.from(1))
// maxAmount = BigNumber.from(3)

export async function approve(
  tokenName: string,
  tokenSpender: string,
  chainId?: string,
): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  if (
    !isValidAddress(tokenSpender) ||
    !isValidTokenName(tokenName) ||
    !isValidChain(chainId, tokenName)
  ) {
    return false
  }

  const tokenAddress = getTokenAddress(tokenName, chainId)
  const tokenContract = Erc20__factory.connect(tokenAddress, signer)

  try {
    const tx = await tokenContract.approve(tokenSpender, maxAmount)
    await tx.wait()
    return true
  } catch (err) {
    sentry.captureException(err)
    return false
  }
}
