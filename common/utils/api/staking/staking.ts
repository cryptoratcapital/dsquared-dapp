import {
  DSQStaking__factory,
  EsDSQStaking__factory,
} from "@/common/abi/typechain"
import {
  DSQStakingContract,
  esDSQStakingContract,
} from "@/common/constants/Staking"
import { YEAR_SECONDS } from "@/common/constants/Time"
import { StakingDataUser } from "@/common/interfaces/Staking"
import { BaseProvider } from "@ethersproject/providers"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils"
import { sentry } from "../../sentry"
import { getTokenBalanceBn } from "../erc20"

const ethBn = BigNumber.from(10).pow(BigNumber.from(18))

export const getDSQStakingInfo = async (
  provider: BaseProvider,
  address: string,
): Promise<StakingDataUser> => {
  try {
    const dsqStakingContract = DSQStaking__factory.connect(
      DSQStakingContract.address,
      provider,
    )
    const esDsqStakingContract = EsDSQStaking__factory.connect(
      esDSQStakingContract.address,
      provider,
    )
    const userDsqStakedPromise = dsqStakingContract.balanceOf(address)
    const rewardPromise = dsqStakingContract.earned(address)
    const userEsdsqStakedPromise = esDsqStakingContract.positions(address)
    const rewardTokenPromise = dsqStakingContract.rewardsToken()
    const rewardRatePromise = dsqStakingContract.rewardRate()
    const totalStakedPromise = dsqStakingContract.totalSupply()

    const [
      userDsqStakedBn,
      rewardBn,
      userEsdsqStakedData,
      rewardToken,
      rewardRateBn,
      totalStakedBn,
    ] = await Promise.all([
      userDsqStakedPromise,
      rewardPromise,
      userEsdsqStakedPromise,
      rewardTokenPromise,
      rewardRatePromise,
      totalStakedPromise,
    ])

    const showUserCompound = rewardBn
      .add(userEsdsqStakedData[1])
      .lt(userDsqStakedBn)

    const userRewardBn = await getTokenBalanceBn(rewardToken, address, provider)

    let maxUserEsDsqStakeBn = BigNumber.from(0)
    if (userDsqStakedBn.gt(userEsdsqStakedData[1])) {
      maxUserEsDsqStakeBn = userDsqStakedBn.sub(userEsdsqStakedData[1])
    }
    if (userRewardBn.lt(maxUserEsDsqStakeBn)) {
      maxUserEsDsqStakeBn = userRewardBn
    }

    const userDsqStaked = formatEther(userDsqStakedBn)
    const reward = formatEther(rewardBn)
    const userEsdqVestingTime = Number(userEsdsqStakedData[0])
    const userEsdsqStaked = formatEther(userEsdsqStakedData[1])
    const userDsqClaimable = formatEther(
      userEsdsqStakedData[1].mul(userEsdsqStakedData[2]).div(ethBn),
    )
    const maxUserEsDsqStake = formatEther(maxUserEsDsqStakeBn)

    const userEsdsqVestingPaused = Number(userEsdsqStakedData[3]) !== 0

    const stakeDiff = userEsdsqStakedData[1].sub(userDsqStakedBn)
    const minDsqDeficiency =
      Number(stakeDiff) > 0 ? formatEther(stakeDiff) : "0"

    let apy = "0"
    if (totalStakedBn.gt(BigNumber.from(0))) {
      apy = formatEther(
        rewardRateBn
          .mul(BigNumber.from(YEAR_SECONDS))
          .mul(ethBn)
          .mul(BigNumber.from(100))
          .div(totalStakedBn),
      )
    }

    return {
      userDsqStaked,
      reward,
      userEsdqVestingTime,
      userEsdsqStaked,
      userDsqClaimable,
      userEsdsqVestingPaused,
      showUserCompound,
      maxUserEsDsqStake,
      apy,
      minDsqDeficiency,
    }
  } catch (err: unknown) {
    // console.log(`error`, err)
    sentry.captureException(err)
    return {
      userDsqStaked: "0",
      reward: "0",
      userEsdqVestingTime: 0,
      userEsdsqStaked: "0",
      userDsqClaimable: "0",
      userEsdsqVestingPaused: true,
      showUserCompound: false,
      maxUserEsDsqStake: "0",
      apy: "0",
      minDsqDeficiency: "0",
    }
  }
}
