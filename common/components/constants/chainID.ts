import { chainIdEnum } from "@/common/interfaces/Chain"

export enum ChainNameType {
  ARBITRUM = "arbitrum",
  AVALANCHE = "avalanche",
  GOERLI = "goerli",
}

export const ChainID = {
  [ChainNameType.ARBITRUM]: chainIdEnum.ARBITRUM,
  [ChainNameType.AVALANCHE]: chainIdEnum.AVALANCHE,
  [ChainNameType.GOERLI]: chainIdEnum.GOERLI,
} as const
