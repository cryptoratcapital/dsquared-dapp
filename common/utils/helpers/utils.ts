import { TokenLookUp, TokenSymbol } from "@/common/constants/TokenLookup"
import { chainIdEnum, ChainType } from "@/common/interfaces/Chain"
import { BigNumber } from "ethers"
import { formatEther, parseEther } from "ethers/lib/utils"

export const timeExtraction = (seconds: number) => {
  const daysLeft = Math.floor(seconds / 86400)
  seconds -= daysLeft * 86400
  const hoursLeft = Math.floor(seconds / 3600) % 24
  seconds -= hoursLeft * 3600
  const minLeft = Math.floor(seconds / 60) % 60
  seconds -= minLeft * 60
  const secondsLeft = seconds % 60
  return { daysLeft, hoursLeft, minLeft, secondsLeft }
}

export const getMaxBalance = (balance: string): string => {
  return formatEther(
    parseEther(balance).mul(BigNumber.from(99)).div(BigNumber.from(100)),
  )
}

export const isCorrectChainId = (
  chainId?: string,
  chainID?: ChainType,
): boolean => {
  return (
    (chainId && chainID && chainId === chainID?.chainId) ||
    chainId === chainID?.chainIDHex
  )
}

export const getTokenAddress = (
  tokenName: TokenSymbol,
  chainId: chainIdEnum,
) => {
  const tokenObj = TokenLookUp[tokenName]
  const tokenAddress = tokenObj[chainId]
  return tokenAddress
}
