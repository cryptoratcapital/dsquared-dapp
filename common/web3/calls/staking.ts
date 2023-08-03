import { Router__factory } from "@/common/abi/typechain"
import {
  StakingRouter,
  StakingType,
} from "@/common/components/constants/Staking"
import { web3ModalState } from "@/common/store"
import { sentry } from "@/common/utils/sentry"
import { parseEther } from "ethers/lib/utils"
export type StakeFn = "stakeDSQStaking" | "stakeESDSQStaking"

export async function stake(
  stakeAmount: string,
  stakeType: StakingType,
): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  try {
    const routerContract = Router__factory.connect(
      StakingRouter.address,
      signer,
    )
    const stakePromise =
      stakeType === StakingType.DSQStake
        ? routerContract.stakeDSQStaking(parseEther(stakeAmount))
        : routerContract.stakeESDSQStaking(parseEther(stakeAmount))
    const tx = await stakePromise
    await tx.wait()
    return true
  } catch (err) {
    sentry.captureException(err)
    return false
  }
}

export async function unstakeDsq(stakeAmount: string): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  try {
    const routerContract = Router__factory.connect(
      StakingRouter.address,
      signer,
    )
    const unstakePromise = routerContract.withdrawDSQStaking(
      parseEther(stakeAmount),
    )
    const tx = await unstakePromise
    await tx.wait()
    return true
  } catch (err) {
    sentry.captureException(err)
    return false
  }
}

export async function claimDsqReward(): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  try {
    const routerContract = Router__factory.connect(
      StakingRouter.address,
      signer,
    )
    const harvestPromise = routerContract.harvestDSQStaking()
    const tx = await harvestPromise
    await tx.wait()
    return true
  } catch (err) {
    sentry.captureException(err)
    return false
  }
}

export async function compoundDsqReward(): Promise<boolean> {
  const signer = web3ModalState.getState().signer
  if (!signer) {
    console.error("No signer found")
    return false
  }

  try {
    const routerContract = Router__factory.connect(
      StakingRouter.address,
      signer,
    )
    const harvestPromise =
      routerContract.harvestDSQStakingAndStakeESDSQStaking()
    const tx = await harvestPromise
    await tx.wait()
    return true
  } catch (err) {
    sentry.captureException(err)
    return false
  }
}
