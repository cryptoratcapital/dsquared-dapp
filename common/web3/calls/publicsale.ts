import { TokenSale__factory } from "@/common/abi/typechain"
import { PublicSale } from "@/common/components/constants/Publicsale"
import { web3ModalState } from "@/common/store"
import { sentry } from "@/common/utils/sentry"
import { parseEther } from "ethers/lib/utils"

export async function depositPublicSale(
  depositAmount: string,
): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  const publicSaleContract = TokenSale__factory.connect(
    PublicSale.address,
    signer,
  )

  try {
    const tx = await publicSaleContract.purchase({
      value: parseEther(depositAmount),
    })
    await tx.wait()

    return true
  } catch (err) {
    sentry.captureException(err)
    return false
  }
}

export async function claimPublicSale(): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  const publicSaleContract = TokenSale__factory.connect(
    PublicSale.address,
    signer,
  )

  try {
    const tx = await publicSaleContract.claim()
    await tx.wait()

    return true
  } catch (err) {
    sentry.captureException(err)
    return false
  }
}
