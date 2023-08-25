import { Erc20__factory } from "@/common/abi/typechain"
import { VaultV0__factory } from "@/common/abi/typechain/factories/VaultV0__factory"

import { VaultV0 } from "@/common/abi/typechain/VaultV0"
import { VaultCurrentState, VaultFutureState } from "@/common/constants/Vaults"
import {
  VaultInitialInterface,
  VaultOverviewInterface,
} from "@/common/interfaces/Vaults"
import { sentry } from "@/common/utils/sentry"
import { BaseProvider } from "@ethersproject/providers"
import { BigNumber } from "ethers"
import { formatEther, formatUnits, isAddress } from "ethers/lib/utils"
import { numberFormat } from "../../helpers/numbers"

interface VaultDataPromise {
  vaultDecimalsPromise: Promise<number>
  totalSupplyPromise: Promise<BigNumber>
  maxSupplyPromise: Promise<BigNumber>
  currentEpochPromise: Promise<VaultV0.EpochStructOutput>
  custodiedPromise: Promise<boolean>
  epochNumberPromise: Promise<BigNumber>
  totalDepositsPromise: Promise<BigNumber>
  shareToAssetsPromise: Promise<BigNumber>
  userShareBalancePromise: Promise<BigNumber>
  userDepositTokenBalancePromise: Promise<BigNumber>
}

export const getVaultInfoPromise = (
  vaultInitialData: VaultInitialInterface,
  provider: BaseProvider,
  address?: string,
): VaultDataPromise => {
  const PromiseZero = Promise.resolve(0)
  const PromiseZeroBn = Promise.resolve(BigNumber.from(0))
  const PromiseFalse = Promise.resolve(false)
  try {
    const VaultV0Contract = VaultV0__factory.connect(
      vaultInitialData.vaultAddress,
      provider,
    )
    const ERC20Contract = Erc20__factory.connect(
      vaultInitialData.vaultDepositTokenAddress,
      provider,
    )

    const vaultBn = BigNumber.from(10).pow(BigNumber.from(18))

    const vaultDecimalsPromise = VaultV0Contract.decimals()
    const totalSupplyPromise = VaultV0Contract.totalSupply()
    const maxSupplyPromise = VaultV0Contract.maxDeposits()
    const currentEpochPromise = VaultV0Contract.getCurrentEpochInfo()
    const custodiedPromise = VaultV0Contract.custodied()
    const epochNumberPromise = VaultV0Contract.getCurrentEpoch()
    const totalDepositsPromise = VaultV0Contract.totalDeposits()
    const shareToAssetsPromise = VaultV0Contract.convertToAssets(vaultBn)
    let userShareBalancePromise = PromiseZeroBn
    let userDepositTokenBalancePromise = PromiseZeroBn
    if (address && isAddress(address)) {
      userShareBalancePromise = VaultV0Contract.balanceOf(address)
      userDepositTokenBalancePromise = ERC20Contract.balanceOf(address)
    }

    return {
      vaultDecimalsPromise,
      totalSupplyPromise,
      maxSupplyPromise,
      currentEpochPromise,
      custodiedPromise,
      epochNumberPromise,
      totalDepositsPromise,
      shareToAssetsPromise,
      userShareBalancePromise,
      userDepositTokenBalancePromise,
    }
  } catch (err: unknown) {
    sentry.captureException(err)
    return {
      vaultDecimalsPromise: PromiseZero,
      totalSupplyPromise: PromiseZeroBn,
      maxSupplyPromise: PromiseZeroBn,
      currentEpochPromise: Object.assign([
        PromiseZeroBn,
        PromiseZeroBn,
        PromiseZeroBn,
      ]),

      custodiedPromise: PromiseFalse,
      epochNumberPromise: PromiseZeroBn,
      totalDepositsPromise: PromiseZeroBn,
      shareToAssetsPromise: PromiseZeroBn,
      userShareBalancePromise: PromiseZeroBn,
      userDepositTokenBalancePromise: PromiseZeroBn,
    }
  }
}

export const getVaultInfo = async (
  vaultInitialData: VaultInitialInterface,
  provider: BaseProvider,
  address?: string,
): Promise<VaultOverviewInterface> => {
  try {
    const VaultV0Contract = VaultV0__factory.connect(
      vaultInitialData.vaultAddress,
      provider,
    )
    const ERC20Contract = Erc20__factory.connect(
      vaultInitialData.vaultDepositTokenAddress,
      provider,
    )

    const vaultBn = BigNumber.from(10).pow(BigNumber.from(18))

    const vaultDecimalsPromise = VaultV0Contract.decimals()
    const totalSupplyPromise = VaultV0Contract.totalSupply()
    const maxSupplyPromise = VaultV0Contract.maxDeposits()
    const currentEpochPromise = VaultV0Contract.getCurrentEpochInfo()
    const custodiedPromise = VaultV0Contract.custodied()
    const epochNumberPromise = VaultV0Contract.getCurrentEpoch()
    const totalDepositsPromise = VaultV0Contract.totalDeposits()
    const shareToAssetsPromise = VaultV0Contract.convertToAssets(vaultBn)
    let userShareBalancePromise = Promise.resolve(BigNumber.from(0))
    let userDepositTokenBalancePromise = Promise.resolve(BigNumber.from(0))
    if (address && isAddress(address)) {
      userShareBalancePromise = VaultV0Contract.balanceOf(address)
      userDepositTokenBalancePromise = ERC20Contract.balanceOf(address)
    }

    const [
      vaultDecimalsBn,
      totalSupplyBn,
      maxSupplyBn,
      currentEpochBn,
      custodied,
      epochNumberBn,
      totalDepositsBn,
      shareToAssetsBn,
      userShareBalanceBn,
      userDepositTokenBalanceBn,
    ] = await Promise.all([
      vaultDecimalsPromise,
      totalSupplyPromise,
      maxSupplyPromise,
      currentEpochPromise,
      custodiedPromise,
      epochNumberPromise,
      totalDepositsPromise,
      shareToAssetsPromise,
      userShareBalancePromise,
      userDepositTokenBalancePromise,
    ])

    const vaultDecimals = Number(vaultDecimalsBn)
    const totalSupply = parseInt(formatUnits(totalSupplyBn, vaultDecimals))
    const maxSupply = parseInt(formatUnits(maxSupplyBn, vaultDecimals))
    const percentFilled = numberFormat(
      100 * Number(maxSupply > 0 ? totalSupply / maxSupply : 0),
      3,
    )
    const currentEpochArray = currentEpochBn.map((epoch) => Number(epoch))
    const epochNumber = Number(epochNumberBn)
    const depositAvailableBn = maxSupplyBn.gt(0)
      ? maxSupplyBn.sub(totalDepositsBn)
      : BigNumber.from(0)
    const depositsAvailable = formatUnits(depositAvailableBn, vaultDecimals)
    const shareToAssets = formatEther(shareToAssetsBn)
    const userShareBalance = formatUnits(userShareBalanceBn, vaultDecimals)

    const maxUserDepositBn = depositAvailableBn.gt(userDepositTokenBalanceBn)
      ? userDepositTokenBalanceBn
      : depositAvailableBn
    const maxUserDeposit = formatUnits(maxUserDepositBn, vaultDecimals)

    const currentTime = new Date().getTime() / 1000
    const redemptionsOnly =
      !custodied &&
      (currentTime < currentEpochArray[0] ||
        currentTime >= currentEpochArray[2])

    const redemptionsAndFunding =
      !custodied &&
      currentTime >= currentEpochArray[0] &&
      currentTime < currentEpochArray[1]

    let [vaultCurrentState, vaultFutureState, lockupSeconds, deltaSeconds] = [
      VaultCurrentState.COMINGSOON,
      VaultFutureState.COMINGSOON,
      0,
      0,
    ]
    if (currentEpochArray.length > 0) {
      vaultCurrentState = VaultCurrentState.CUSTODIED
      vaultFutureState = VaultFutureState.CUSTODIED
      lockupSeconds = currentEpochArray[2] - currentEpochArray[1]
      deltaSeconds = currentEpochArray[2] - currentTime
      if (redemptionsOnly) {
        vaultCurrentState = VaultCurrentState.WITHDRAWALSONLY
        vaultFutureState = VaultFutureState.RESTRICTEDWITHDRAWAL

        if (currentTime < currentEpochArray[0]) {
          deltaSeconds = currentEpochArray[0] - currentTime
          vaultFutureState = VaultFutureState.WITHDRAWALSONLY
        }
      }
      if (redemptionsAndFunding) {
        vaultCurrentState = VaultCurrentState.DEPOSITSOPEN
        vaultFutureState = VaultFutureState.DEPOSITSOPEN
        deltaSeconds = currentEpochArray[1] - currentTime
      }
    }

    const annualisedAPY = 0
    const lastApy = 0
    return {
      ...vaultInitialData,
      totalSupply,
      maxSupply,
      percentFilled,
      currentEpochArray,
      redemptionsOnly,
      redemptionsAndFunding,
      vaultCurrentState,
      vaultFutureState,
      lockupSeconds,
      deltaSeconds,
      annualisedAPY,
      lastApy,
      epochNumber,
      userShareBalance,
      depositsAvailable,
      maxUserDeposit,
      shareToAssets,
    }
  } catch (err: unknown) {
    console.log(err)
    sentry.captureException(err)
    return {
      ...vaultInitialData,
      totalSupply: 0,
      maxSupply: 0,
      percentFilled: "0",
      currentEpochArray: [0, 0, 0],
      redemptionsOnly: false,
      redemptionsAndFunding: false,
      vaultCurrentState: VaultCurrentState.COMINGSOON,
      vaultFutureState: VaultFutureState.COMINGSOON,
      lockupSeconds: 0,
      deltaSeconds: 0,
      annualisedAPY: 0,
      lastApy: 0,
      epochNumber: 0,
      userShareBalance: "0",
      depositsAvailable: "0",
      maxUserDeposit: "0",
      shareToAssets: "0",
    }
  }
}

// import { providers } from "@0xsequence/multicall"
// import { providers as ethersProviders } from "ethers"

// export const testAvaxMultiCall = async (provider: BaseProvider) => {
//   const abi = [
//     "function balanceOf(address owner) view returns (uint256)",
//     "function totalSupply() view returns (uint256)",
//     "function symbol() view returns (string)",
//   ]

//   const providerNew = new providers.MulticallProvider(
//     new ethersProviders.JsonRpcProvider(
//       "https://api.avax.network/ext/bc/C/rpc",
//     ),
//   )

//   const usdc = new ethers.Contract(
//     "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
//     abi,
//     providerNew,
//   )

//   const [totalSupply, balance, usdcSymbol] = await Promise.all([
//     usdc.totalSupply(),
//     usdc.balanceOf("0x3b3E4b4741e91aF52d0e9ad8660573E951c88524"),
//     usdc.symbol(),
//   ])

//   console.log(`done successfully`)

//   const totalSupplyStr = formatUnits(totalSupply, 6)
//   const balanceyStr = formatUnits(balance, 6)

//   return { totalSupplyStr, balanceyStr, usdcSymbol }
// }
