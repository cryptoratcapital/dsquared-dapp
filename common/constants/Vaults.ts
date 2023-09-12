import { ChainID, ChainNameType } from "./ChainID"
import { TokenLookUp, TokenSymbol } from "./TokenLookup"

export enum VaultSymbol {
  GLP = "GLPPlus",
  ETH = "ETHPlus",
  ARB = "ARBPlus",
  USDC = "USDCPlus",
}

export enum VaultCurrentState {
  COMINGSOON = "Coming Soon",
  WITHDRAWALSONLY = "Withdrawals Open",
  DEPOSITSOPEN = "Deposits Open",
  CUSTODIED = "Funds Custodied",
}

export enum VaultFutureState {
  COMINGSOON = "Coming Soon",
  WITHDRAWALSONLY = "Deposits Open in:",
  DEPOSITSOPEN = "Withdrawals/Deposits Close in",
  CUSTODIED = "Withdrawals/Deposits Open in:",

  RESTRICTEDWITHDRAWAL = "Withdrawals Open",
}

export const VaultConstantData = {
  [VaultSymbol.GLP]: {
    [ChainID.arbitrum]: {
      vaultName: VaultSymbol.GLP,
      vaultAddress: "0xbe68c8b9fce054fedcf605b5c0f2c373505f407a",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: TokenLookUp.USDC[ChainID.arbitrum],
      risk: "Medium",
      chainName: ChainNameType.ARBITRUM,
    },

    [ChainID.avalanche]: {
      vaultName: VaultSymbol.GLP,
      vaultAddress: "0xA0820f0934e47d6C191450F47EC6430483D1394E",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: TokenLookUp.USDC[ChainID.avalanche],
      risk: "Medium",
      chainName: ChainNameType.AVALANCHE,
    },

    [ChainID.goerli]: {
      vaultName: VaultSymbol.GLP,
      vaultAddress: "0x285b07d4fca3a864131f156106f92d01b68c9f79",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: TokenLookUp.USDC[ChainID.goerli],
      risk: "Medium",
      chainName: ChainNameType.GOERLI,
    },
  },

  [VaultSymbol.ETH]: {
    [ChainID.arbitrum]: {
      vaultName: VaultSymbol.ETH,
      vaultAddress: "0xf04AeCAacc79EF8fe27216A988398AC1eD87a864",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: TokenLookUp.USDC[ChainID.arbitrum],
      risk: "High",
      chainName: ChainNameType.ARBITRUM,
    },

    [ChainID.avalanche]: {
      vaultName: VaultSymbol.ETH,
      vaultAddress: "",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: TokenLookUp.USDC[ChainID.avalanche],
      risk: "High",
      chainName: ChainNameType.AVALANCHE,
    },

    [ChainID.goerli]: {
      vaultName: VaultSymbol.ETH,
      vaultAddress: "",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: "0x9b52e8a8919ebfb92fb30a23440d7283e3a61c07",
      risk: "High",
      chainName: ChainNameType.GOERLI,
    },
  },

  [VaultSymbol.ARB]: {
    [ChainID.arbitrum]: {
      vaultName: VaultSymbol.ARB,
      vaultAddress: "0xC5BAffD6D9B3755ea680E6c630c44A120154DC58",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: TokenLookUp.USDC[ChainID.arbitrum],

      risk: "High",
      chainName: ChainNameType.ARBITRUM,
    },

    [ChainID.avalanche]: {
      vaultName: VaultSymbol.ARB,
      vaultAddress: "",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: TokenLookUp.USDC[ChainID.avalanche],
      risk: "High",
      chainName: ChainNameType.AVALANCHE,
    },

    [ChainID.goerli]: {
      vaultName: VaultSymbol.ARB,
      vaultAddress: "",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: "0x95eb96e1e248f0d874f8578f78bbd7cc3afdc854",
      risk: "High",
      chainName: ChainNameType.GOERLI,
    },
  },

  [VaultSymbol.USDC]: {
    [ChainID.arbitrum]: {
      vaultName: VaultSymbol.USDC,
      vaultAddress: "0x4d823951a8b3a614667e9cabf6948d7d0e73911d",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: TokenLookUp.USDC[ChainID.arbitrum],
      risk: "High",
      chainName: ChainNameType.ARBITRUM,
    },

    [ChainID.avalanche]: {
      vaultName: VaultSymbol.USDC,
      vaultAddress: "",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: TokenLookUp.USDC[ChainID.avalanche],
      risk: "High",
      chainName: ChainNameType.AVALANCHE,
    },

    [ChainID.goerli]: {
      vaultName: VaultSymbol.USDC,
      vaultAddress: "0x645b2837949ab9E38D9F0Df107C3B964b473C207",
      vaultDepositToken: TokenSymbol.USDC,
      vaultDepositTokenAddress: TokenLookUp.USDC[ChainID.goerli],
      risk: "High",
      chainName: ChainNameType.GOERLI,
    },
  },
} as const

export const arbitrumVaults = [
  VaultConstantData[VaultSymbol.GLP][ChainID.arbitrum],
  VaultConstantData[VaultSymbol.ETH][ChainID.arbitrum],
  VaultConstantData[VaultSymbol.ARB][ChainID.arbitrum],
  // VaultConstantData[VaultSymbol.USDC][ChainID.arbitrum],
]
export const avalancheVaults = [
  VaultConstantData[VaultSymbol.GLP][ChainID.avalanche],
]
export const goerliVaults = [
  VaultConstantData[VaultSymbol.GLP][ChainID.goerli],
  VaultConstantData[VaultSymbol.ETH][ChainID.goerli],
  VaultConstantData[VaultSymbol.ARB][ChainID.goerli],
  // VaultConstantData[VaultSymbol.USDC][ChainID.goerli],
]
