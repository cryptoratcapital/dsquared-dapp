import { ChainType } from "@/common/interfaces/Chain"
import { ChainID, ChainNameType } from "./ChainID"

export const chainIDs: ChainType[] = [
  {
    chainName: "goerli",
    chainIDHex: "0x5",
    chainId: ChainID.goerli,
    logo: "/icons/ethereumBlue.svg",
    rpcUrls: ["https://goerli.infura.io/v3/"],
    blockExplorer: "https://goerli.etherscan.io",
    nativeCurrency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      contractAddress: "",
    },
  },

  {
    chainName: "arbitrum",
    chainIDHex: "0xa4b1",
    chainId: ChainID.arbitrum,
    logo: "/icons/arbitrumLogo.svg",
    rpcUrls: ["https://endpoints.omniatech.io/v1/arbitrum/one/public"],
    blockExplorer: "https://arbiscan.io/",
    nativeCurrency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: 18,
      contractAddress: "",
    },
  },
  {
    chainName: "avalanche",
    chainIDHex: "0xa86a",
    chainId: ChainID.avalanche,
    logo: "/icons/avalancheLogo.svg",
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorer: "https://snowtrace.io/",
    nativeCurrency: {
      symbol: "AVAX",
      name: "Avalanche",
      decimals: 18,
      contractAddress: "",
    },
  },
  //   {
  //     chainName: "Choose Network",
  //     chainIDHex: "",
  //     chainId: "",
  //     logo: "/",
  //     rpcUrls: [""],
  //     blockExplorer: "",
  //     nativeCurrency: {
  //       symbol: "",
  //       name: "",
  //       decimals: 0,
  //       contractAddress: "",
  //     },
  //   },
]

export const defaultChainName = ChainNameType.ARBITRUM
