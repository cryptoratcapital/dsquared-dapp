import { ChainNameType } from "@/common/components/constants/chainID"

export interface VaultOverviewInterface {
  vaultName: string
  apy: number
  vaultOpen: boolean
  vaultTime: number
  risk: string
  lastEpoch: number
  vaultLenght: number
  vaultCapacity: number
  vaultFilled: number
  vaultPercentageFilled: number
  valutActive: boolean
  chainName: ChainNameType
}
