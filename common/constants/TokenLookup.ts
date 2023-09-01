import { ChainID } from "./ChainID"

export enum TokenSymbol {
  DSQ = "DSQ",
  ESDSQ = "esDSQ",
  USDC = "USDC",
}

export const TokenLookUp = {
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
    [ChainID.arbitrum]: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    [ChainID.avalanche]: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    [ChainID.goerli]: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  },
} as const

export type TokenNameType = keyof typeof TokenLookUp
export type ChainIDType = keyof typeof TokenLookUp.DSQ
