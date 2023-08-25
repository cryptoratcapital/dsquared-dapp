import { Stage4__factory } from "@/common/abi/typechain"
import { Stage4Sale } from "@/common/constants/Publicsale"
import { web3ModalState } from "@/common/store"
import { sentry } from "@/common/utils/sentry"
import { parseEther } from "ethers/lib/utils"

export async function depositStage4Public(
  depositAmount: string,
): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  const stage4SaleContract = Stage4__factory.connect(Stage4Sale.address, signer)

  try {
    const tx = await stage4SaleContract.purchasePublic({
      value: parseEther(depositAmount),
    })
    await tx.wait()

    return true
  } catch (err) {
    sentry.captureException(err)
    return false
  }
}

export async function depositStage4WL(
  proof: string[],
  depositAmount: string,
): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  const stage4SaleContract = Stage4__factory.connect(Stage4Sale.address, signer)

  try {
    const tx = await stage4SaleContract.purchaseWhitelist(proof, {
      value: parseEther(depositAmount),
    })
    await tx.wait()

    return true
  } catch (err) {
    sentry.captureException(err)
    return false
  }
}

export async function claimStage4(): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  const stage4SaleContract = Stage4__factory.connect(Stage4Sale.address, signer)

  try {
    const tx = await stage4SaleContract.claim()
    await tx.wait()

    return true
  } catch (err) {
    sentry.captureException(err)
    return false
  }
}
