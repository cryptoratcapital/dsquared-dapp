export enum chainIdEnum {
  ARBITRUM = "42161",
  AVALANCHE = "43114",
  GOERLI = "5",
}

export type ChainType = {
  chainName: string
  chainIDHex: string
  chainId: string
  logo: string
  rpcUrls: string[]
  blockExplorer: string
  nativeCurrency: {
    symbol: string
    name: string
    contractAddress: string
    decimals: number
  }
}
