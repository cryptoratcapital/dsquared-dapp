import { TokenSale__factory } from "@/common/abi/typechain"
import { PublicSale } from "@/common/constants/Publicsale"
import { PublicsaleInterface } from "@/common/interfaces/PublicSaleInterface"
import { BaseProvider } from "@ethersproject/providers"
import { formatEther, isAddress } from "ethers/lib/utils"

export const getPublicSale = async (
  provider: BaseProvider,
  address?: string | undefined,
): Promise<PublicsaleInterface> => {
  const publicSaleContract = TokenSale__factory.connect(
    PublicSale.address,
    provider,
  )

  const startTimeCall = publicSaleContract.startTime()
  const endTimeCall = publicSaleContract.endTime()
  const tier2ClaimTimeCall = publicSaleContract.tier2ClaimTime()
  const tier3ClaimTimeCall = publicSaleContract.tier3ClaimTime()
  const totalContributedCall = publicSaleContract.totalContribution()
  const maxContribution1Call = publicSaleContract.MAX_TIER1_CONTRIBUTIONS()
  const maxContribution2CumulativeCall =
    publicSaleContract.MAX_TIER2_CUMULATIVE_CONTRIBUTIONS()
  const maxContribution3CumulativeCall = publicSaleContract.MAX_RAISE()

  const [
    startTimeBn,
    endTimeBn,
    tier2ClaimTimeBn,
    tier3ClaimTimeBn,
    maxContribution1,
    maxContribution2Cumulative,
    maxContribution3Cumulative,
    totalContributedBn,
  ] = await Promise.all([
    startTimeCall,
    endTimeCall,
    tier2ClaimTimeCall,
    tier3ClaimTimeCall,
    maxContribution1Call,
    maxContribution2CumulativeCall,
    maxContribution3CumulativeCall,
    totalContributedCall,
  ])

  const currentTime = Math.floor(new Date().getTime() / 1000)
  const startTime = Number(startTimeBn)
  const endTime = Number(endTimeBn)
  const tier2ClaimTime = Number(tier2ClaimTimeBn)
  const tier3ClaimTime = Number(tier3ClaimTimeBn)
  const totalContributed = formatEther(totalContributedBn)

  const stage1Max = formatEther(maxContribution1)
  const stage2Max = formatEther(
    maxContribution2Cumulative.sub(maxContribution1),
  )
  const stage3Max = formatEther(
    maxContribution3Cumulative.sub(maxContribution2Cumulative),
  )
  const stage2Started = totalContributedBn.gte(maxContribution1)
  const stage3Started = totalContributedBn.gte(maxContribution2Cumulative)

  let stage1Filled = formatEther(totalContributedBn)
  if (totalContributedBn.gte(maxContribution1)) {
    stage1Filled = stage1Max
  }

  let stage2Filled = "0"
  if (stage2Started) {
    if (totalContributedBn.gte(maxContribution2Cumulative)) {
      stage2Filled = stage2Max
    } else {
      stage2Filled = formatEther(totalContributedBn.sub(maxContribution1))
    }
  }

  let stage3Filled = "0"
  if (stage3Started) {
    stage3Filled = formatEther(
      totalContributedBn.sub(maxContribution2Cumulative),
    )
  }

  const contributionRemaining = formatEther(
    stage3Started
      ? maxContribution3Cumulative.sub(totalContributedBn)
      : maxContribution2Cumulative.sub(totalContributedBn),
  )

  let [userDepositAmt, userClaimableAmt, userLockedTokens] = ["0", "0", "0"]

  if (address && isAddress(address)) {
    const userDepositedCall = publicSaleContract.contributed(address)
    const userTier1PendingCall = publicSaleContract.tier1Pending(address)
    const userTier2PendingCall = publicSaleContract.tier2Pending(address)
    const userTier3PendingCall = publicSaleContract.tier3Pending(address)

    const [
      userDeposited,
      userTier1Pending,
      userTier2Pending,
      userTier3Pending,
    ] = await Promise.all([
      userDepositedCall,
      userTier1PendingCall,
      userTier2PendingCall,
      userTier3PendingCall,
    ])

    userDepositAmt = formatEther(userDeposited)

    if (currentTime > tier3ClaimTime) {
      userClaimableAmt = formatEther(
        userTier1Pending.add(userTier2Pending).add(userTier3Pending),
      )
    } else if (currentTime > tier2ClaimTime) {
      userClaimableAmt = formatEther(userTier1Pending.add(userTier2Pending))
      userLockedTokens = formatEther(userTier3Pending)
    } else {
      userClaimableAmt = formatEther(userTier1Pending)
      userLockedTokens = formatEther(userTier2Pending.add(userTier3Pending))
    }
  }
  const userClaimable = Number(userClaimableAmt) > 0

  return {
    startTime,
    endTime,
    tier2ClaimTime,
    tier3ClaimTime,
    totalContributed,
    contributionRemaining,
    stage1Max,
    stage1Filled,
    stage2Max,
    stage2Filled,
    stage3Started,
    stage3Max,
    stage3Filled,
    userDepositAmt,
    userClaimable,
    userClaimableAmt,
    userLockedTokens,
    currentTime,
  }
}
