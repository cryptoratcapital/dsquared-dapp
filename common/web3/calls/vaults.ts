import { VaultV0__factory } from "@/common/abi/typechain/factories/VaultV0__factory"
import { web3ModalState } from "@/common/store"
import { sentry } from "@/common/utils/sentry"
import { parseUnits } from "ethers/lib/utils"

export async function depositVault(
  vaultAddress: string,
  userAddress: string,
  depositAmount: string,
): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  const vaultV0Contact = VaultV0__factory.connect(vaultAddress, signer)
  try {
    const tx = await vaultV0Contact.deposit(
      parseUnits(depositAmount, 6),
      userAddress,
    )
    await tx.wait()

    return true
  } catch (err) {
    sentry.captureException(err)
    console.log(err)
    return false
  }
}

export async function withdrawVault(
  vaultAddress: string,
  userAddress: string,
  withdrawAmount: string,
): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  const vaultV0Contact = VaultV0__factory.connect(vaultAddress, signer)
  try {
    const tx = await vaultV0Contact.redeem(
      parseUnits(withdrawAmount, 6),
      userAddress,
      userAddress,
    )
    await tx.wait()

    return true
  } catch (err) {
    sentry.captureException(err)
    console.log(err)
    return false
  }
}
