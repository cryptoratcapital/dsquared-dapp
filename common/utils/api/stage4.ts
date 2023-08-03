import { Stage4__factory } from "@/common/abi/typechain"
import { Stage4Sale } from "@/common/components/constants/Publicsale"

import { Stage4SaleInterface } from "@/common/interfaces/PublicSaleInterface"
import { BaseProvider } from "@ethersproject/providers"
import { formatEther, isAddress } from "ethers/lib/utils"

export const getStage4Sale = async (
  provider: BaseProvider,
  address?: string | undefined,
): Promise<Stage4SaleInterface> => {
  const stage4Contract = Stage4__factory.connect(Stage4Sale.address, provider)

  const currentTime = Math.floor(new Date().getTime() / 1000)
  const whitelistStartCall = stage4Contract.whitelistStartTime()
  const startTimeCall = stage4Contract.publicStartTime()
  const endTimeCall = stage4Contract.endTime()
  const lockLengthCall = stage4Contract.LOCK_PERIOD()
  const maxContributionCall = stage4Contract.MAX_RAISE()
  const totalContributionCall = stage4Contract.totalContribution()
  const wlMaxContributionCall = stage4Contract.MAX_CONTRIBUTION_PER_USER()

  const [
    whitelistStartTimeBn,
    startTimeBn,
    endTimeBn,
    lockLengthBn,
    maxContributionBn,
    totalContributionBn,
    wlMaxContributionBn,
  ] = await Promise.all([
    whitelistStartCall,
    startTimeCall,
    endTimeCall,
    lockLengthCall,
    maxContributionCall,
    totalContributionCall,
    wlMaxContributionCall,
  ])

  const whitelistStartTime = Number(whitelistStartTimeBn)
  const startTime = Number(startTimeBn)
  const endTime = Number(endTimeBn)
  const lockLength = Number(lockLengthBn)
  const claimTime = endTime + lockLength

  const wlMaxContribution = formatEther(wlMaxContributionBn)
  const maxContribution = formatEther(maxContributionBn)
  const totalContribution = formatEther(totalContributionBn)
  const contributionRemaining = formatEther(
    maxContributionBn.sub(totalContributionBn),
  )

  let [userDepositAmt, userWLRemaining, userClaimableAmt, userLockedTokens] = [
    "0",
    "0",
    "0",
    "0",
  ]

  if (address && isAddress(address)) {
    const userDepositedCall = stage4Contract.contributionPerUser(address)
    const userPendingCall = stage4Contract.pending(address)

    const [userDeposited, userPending] = await Promise.all([
      userDepositedCall,
      userPendingCall,
    ])

    userDepositAmt = formatEther(userDeposited)
    userWLRemaining = formatEther(wlMaxContributionBn.sub(userDeposited))

    if (currentTime > claimTime) {
      userClaimableAmt = formatEther(userPending)
    } else {
      userLockedTokens = formatEther(userPending)
    }
  }
  const userClaimable = Number(userClaimableAmt) > 0

  return {
    whitelistStartTime,
    startTime,
    endTime,
    claimTime,
    currentTime,
    wlMaxContribution,
    maxContribution,
    totalContribution,
    contributionRemaining,

    userDepositAmt,
    userWLRemaining,
    userClaimable,
    userClaimableAmt,
    userLockedTokens,
  }
}
