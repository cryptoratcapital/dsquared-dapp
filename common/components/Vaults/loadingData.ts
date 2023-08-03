import { VaultOverviewInterface } from "@/common/interfaces/Vaults"
import { ChainNameType } from "../constants/chainID"

export const loadingVaultsData = [
  {
    vaultName: "GM",
    apy: 22,
    vaultOpen: true,
    vaultTime: 1675814400,
    risk: "High",
    lastEpoch: 15,
    vaultLenght: 28,
    vaultCapacity: 50000,
    vaultFilled: 20000,
    vaultPercentageFilled: 40,
    valutActive: true,
    chainName: ChainNameType.ARBITRUM,
  },

  {
    vaultName: "GLP++",
    apy: 30,
    vaultOpen: true,
    vaultTime: 1675814400,
    risk: "Moderate",
    lastEpoch: 20,
    vaultLenght: 28,
    vaultCapacity: 100000,
    vaultFilled: 50000,
    vaultPercentageFilled: 50,
    valutActive: true,
    chainName: ChainNameType.ARBITRUM,
  },

  {
    vaultName: "ETH++",
    apy: 50,
    vaultOpen: true,
    vaultTime: 1675814400,
    risk: "High",
    lastEpoch: 30,
    vaultLenght: 28,
    vaultCapacity: 200000,
    vaultFilled: 15000,
    vaultPercentageFilled: 75,
    valutActive: true,
    chainName: ChainNameType.ARBITRUM,
  },
]

export const defaultVaultContextValues: VaultOverviewInterface = {
  vaultName: "ETH++",
  apy: 50,
  vaultOpen: true,
  vaultTime: 1675814400,
  risk: "High",
  lastEpoch: 30,
  vaultLenght: 28,
  vaultCapacity: 200000,
  vaultFilled: 15000,
  vaultPercentageFilled: 75,
  valutActive: true,
  chainName: ChainNameType.ARBITRUM,
}
