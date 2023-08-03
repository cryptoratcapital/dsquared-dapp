import { chainIdEnum } from "@/common/interfaces/Chain"
import { providers } from "@0xsequence/multicall"
import { ethers, providers as ethersProviders } from "ethers"

type ChainRpcInterface = {
  [key in chainIdEnum]: { chainName: string; chainRpcUrl: string }
}

const chainRpcLs: ChainRpcInterface = {
  [chainIdEnum.ARBITRUM]: {
    chainName: "Arbitrum",
    chainRpcUrl: `wss://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_PUBLIC_KEY}`,
  },
  [chainIdEnum.AVALANCHE]: {
    chainName: "Avalanche",
    chainRpcUrl: "wss://rpc.ankr.com/avalanche",
  },
  [chainIdEnum.GOERLI]: {
    chainName: "Goerli",
    chainRpcUrl: `wss://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_PUBLIC_KEY}`,
  },
}

export const getProvider = (chainId: string) => {
  let provider

  const chainIDArray = Object.values(chainIdEnum) as string[]
  if (chainIDArray.includes(chainId)) {
    const rpc = chainRpcLs[chainId as chainIdEnum].chainRpcUrl

    provider = new providers.MulticallProvider(
      new ethersProviders.WebSocketProvider(rpc),
    )
  } else {
    provider = ethers.getDefaultProvider(chainId)
  }

  return provider
}
