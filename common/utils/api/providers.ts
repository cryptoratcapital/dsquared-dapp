import { chainIdEnum } from "@/common/interfaces/Chain"
import { providers } from "@0xsequence/multicall"
import { ethers, providers as ethersProviders } from "ethers"

type ChainRpcInterface = {
  [key in chainIdEnum]: {
    chainName: string
    chainRpcUrl: string
    useDefaultProvider?: boolean
  }
}

const chainRpcLs: ChainRpcInterface = {
  [chainIdEnum.ARBITRUM]: {
    chainName: "Arbitrum",
    chainRpcUrl: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_PUBLIC_KEY}`,
  },
  [chainIdEnum.AVALANCHE]: {
    chainName: "Avalanche",
    chainRpcUrl: `https://api.avax.network/ext/bc/C/rpc`,
  },
  [chainIdEnum.GOERLI]: {
    chainName: "Goerli",
    chainRpcUrl: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_PUBLIC_KEY}`,
  },
}

export const getProvider = (chainId: string) => {
  let provider

  const chainIDArray = Object.values(chainIdEnum) as string[]
  if (chainIDArray.includes(chainId)) {
    const chainInfo = chainRpcLs[chainId as chainIdEnum]
    const rpc = chainInfo.chainRpcUrl
    const useDefault = chainInfo?.useDefaultProvider

    if (useDefault) {
      provider = ethers.getDefaultProvider(rpc)
    } else {
      // provider = new providers.MulticallProvider(
      //   new ethersProviders.WebSocketProvider(rpc),
      // )
      provider = new providers.MulticallProvider(
        new ethersProviders.JsonRpcProvider(rpc),
      )
    }
  } else {
    provider = ethers.getDefaultProvider(chainId)
  }

  return provider
}
