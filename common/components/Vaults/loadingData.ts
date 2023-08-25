import { TokenSymbol } from "@/common/constants/TokenLookup"
import { VaultOverviewInterface } from "@/common/interfaces/Vaults"
import { ChainNameType } from "../../constants/ChainID"
import {
  VaultCurrentState,
  VaultFutureState,
  VaultSymbol,
} from "../../constants/Vaults"

export const defaultVaultContextValues: VaultOverviewInterface = {
  vaultName: VaultSymbol.ETH,
  vaultAddress: "",
  vaultDepositToken: TokenSymbol.USDC,
  vaultDepositTokenAddress: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  risk: "High",
  chainName: ChainNameType.ARBITRUM,
  totalSupply: 15000,
  maxSupply: 200000,
  percentFilled: "75",
  currentEpochArray: [1678161600, 1678262400, 1680768000],
  redemptionsOnly: false,
  redemptionsAndFunding: false,
  vaultCurrentState: VaultCurrentState.COMINGSOON,
  vaultFutureState: VaultFutureState.COMINGSOON,
  lockupSeconds: 2505600,
  deltaSeconds: 2505600,
  annualisedAPY: 20,
  lastApy: 15,
  epochNumber: 1,
  userShareBalance: "0",
  depositsAvailable: "0",
  maxUserDeposit: "0",
  shareToAssets: "0",
}

export const loadingVaultsData = Array(4).fill(defaultVaultContextValues)
