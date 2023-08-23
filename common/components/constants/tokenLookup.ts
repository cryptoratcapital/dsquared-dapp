import { ChainID } from "./ChainID"

export enum TokenSymbol {
  GM = "GM",
  GLP = "GLP++",
  ETH = "ETH++",
  DSQ = "DSQ",
  ESDSQ = "esDSQ",
  USDC = "USDC",
}

export const TokenLookUp = {
  [TokenSymbol.GM]: {
    [ChainID.arbitrum]: "0x32Eb7902D4134bf98A28b963D26de779AF92A212",
    [ChainID.avalanche]: "0x01234181085565ed162a948b6a5e88758CD7c7b8",
    [ChainID.goerli]: "",
  },

  [TokenSymbol.GLP]: {
    [ChainID.arbitrum]: "0x32Eb7902D4134bf98A28b963D26de779AF92A212",
    [ChainID.avalanche]: "0x01234181085565ed162a948b6a5e88758CD7c7b8",
    [ChainID.goerli]: "",
  },

  [TokenSymbol.ETH]: {
    [ChainID.arbitrum]: "0x32Eb7902D4134bf98A28b963D26de779AF92A212",
    [ChainID.avalanche]: "0x01234181085565ed162a948b6a5e88758CD7c7b8",
    [ChainID.goerli]: "",
  },

  [TokenSymbol.DSQ]: {
    [ChainID.arbitrum]: "0xdb0C6fC9E01cD95eb1d3bbAe6689962De489cD7B",
    [ChainID.avalanche]: "",
    [ChainID.goerli]: "0x86D3984D6B1d05e4Aa547401b3d04cfe3C9dC02B",
  },

  [TokenSymbol.ESDSQ]: {
    [ChainID.arbitrum]: "0xF76d53dE08C53B891E291D870e543BF8A0F6D314",
    [ChainID.avalanche]: "",
    [ChainID.goerli]: "0x5a47b789b46D83b8Cfd105bd98482fE9Be34989B",
  },

  [TokenSymbol.USDC]: {
    [ChainID.arbitrum]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    [ChainID.avalanche]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    [ChainID.goerli]: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
  },
} as const

export type TokenNameType = keyof typeof TokenLookUp
export type ChainIDType = keyof typeof TokenLookUp.GM
