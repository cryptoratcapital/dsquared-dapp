import { chainIdEnum } from "@/common/interfaces/Chain"
import { TokenSymbol } from "./TokenLookup"

export enum StakingType {
  DSQStake = "DSQStake",
  DSQUnstake = "DSQUnstake",
  esDSQStake = "esDSQStake",
}

export const StakingList = {
  [StakingType.DSQStake]: {
    stakingText: "Stake DSQ",
    token: TokenSymbol.DSQ,
  },
  [StakingType.DSQUnstake]: {
    stakingText: "Unstake DSQ",
    token: TokenSymbol.DSQ,
  },
  [StakingType.esDSQStake]: {
    stakingText: "Stake esDSQ",
    token: TokenSymbol.ESDSQ,
  },
}

interface contractInterface {
  chainId: string
  address: string
}

export const StakingRouter: contractInterface = {
  chainId: chainIdEnum.ARBITRUM,
  address: "0x0FEcAcd06304CDe4b3b94073f71A52fAFF8D5410",
}

export const DSQStakingContract: contractInterface = {
  chainId: chainIdEnum.ARBITRUM,
  address: "0x866d31bf2e3b6bf152B2f8a51807219581324A7C",
}

export const esDSQStakingContract: contractInterface = {
  chainId: chainIdEnum.ARBITRUM,
  address: "0x646974510e5443491bEE2E577d33e979C8A7E983",
}
