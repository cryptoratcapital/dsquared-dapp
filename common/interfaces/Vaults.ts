import {
  VaultCurrentState,
  VaultFutureState,
  VaultSymbol,
} from "../components//constants/Vaults"
import { ChainNameType } from "../components/constants/ChainID"
import { TokenSymbol } from "../components/constants/TokenLookup"

export interface VaultInitialInterface {
  vaultName: VaultSymbol
  vaultAddress: string
  vaultDepositToken: TokenSymbol
  vaultDepositTokenAddress: string
  risk: string
  chainName: ChainNameType
}

export interface VaultOverviewInterface extends VaultInitialInterface {
  totalSupply: number
  maxSupply: number
  percentFilled: string
  currentEpochArray: number[]
  redemptionsOnly: boolean
  redemptionsAndFunding: boolean
  vaultCurrentState: VaultCurrentState
  vaultFutureState: VaultFutureState
  lockupSeconds: number
  deltaSeconds: number
  annualisedAPY: number
  lastApy: number
  epochNumber: number
  userShareBalance: string
  depositsAvailable: string
  maxUserDeposit: string
  shareToAssets: string
}

export interface VaultGeneralSingleInterface extends VaultOverviewInterface {
  className?: string
}
