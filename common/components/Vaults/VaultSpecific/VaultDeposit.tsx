import {
  ConnectButton,
  GenericButton,
} from "@/common/components/Generic/GenericButton/GenericButton"
import { TransactionSpinner } from "@/common/components/Icons/customIcons"
import { ChainID } from "@/common/constants/ChainID"
import { chainIDs } from "@/common/constants/ChainInformation"
import { VaultCurrentState } from "@/common/constants/Vaults"
import { web3ModalState } from "@/common/store"
import { isValidAddress } from "@/common/utils/helpers/checkers"
import { numberFormat } from "@/common/utils/helpers/numbers"
import { isCorrectChainId } from "@/common/utils/helpers/utils"
import {
  useTokenApproval,
  useTokenBalance,
  useVaultSpecific,
} from "@/common/utils/queries"
import { approve } from "@/common/web3/calls/erc20token"
import { depositVault, withdrawVault } from "@/common/web3/calls/vaults"
import { useWeb3Modal } from "@/common/web3/modal"
import { VaultSpecificContext } from "@/pages/vaults/[vaultname]"
import { Input } from "@chakra-ui/react"
import clsx from "clsx"
import Image from "next/image"
import { ChangeEvent, useContext, useState } from "react"

const VaultDeposit = () => {
  const {
    vaultCurrentState,
    vaultDepositToken,
    vaultName,
    userShareBalance,
    maxUserDeposit,
    vaultAddress,
    shareToAssets,
    chainName,
  } = useContext(VaultSpecificContext)

  const account = web3ModalState((state) => state.account)
  const chainId = web3ModalState((state) => state.chainId)
  const web3Provider = web3ModalState((state) => state.web3Provider)
  const { SwitchNet } = useWeb3Modal()

  const vaultChainId = ChainID[chainName]
  const vaultChainInfo = chainIDs.find(
    (chainID) => chainID.chainId === vaultChainId,
  )
  const correctChain = isCorrectChainId(chainId, vaultChainInfo)

  const [approvalPending, setApprovalPending] = useState(false)
  const [depositPending, setDepositPending] = useState(false)
  const [withdrawalPending, setWithdrawalPending] = useState(false)

  const [inputVal, setInputVal] = useState("0")

  const depositsOpen = vaultCurrentState === VaultCurrentState.DEPOSITSOPEN
  const withdrawalsOpen =
    vaultCurrentState === VaultCurrentState.WITHDRAWALSONLY || depositsOpen
  const [tabDeposit, setTabDeposit] = useState(depositsOpen)

  const runSetters = () => {
    setApprovalPending(false)
    setDepositPending(false)
    setWithdrawalPending(false)
    setInputVal("0")
    setTabDeposit(depositsOpen)
  }

  const maxAmount = tabDeposit
    ? depositsOpen
      ? maxUserDeposit
      : "0"
    : withdrawalsOpen
    ? userShareBalance
    : "0"

  const {
    data: balanceData,
    isLoading: balanceLoading,
    isError: balanceError,
    refetch: retechBalance,
  } = useTokenBalance(
    vaultDepositToken,
    account,
    chainId?.toString(),
    correctChain,
  )
  const balanceLoadedFail = balanceLoading || balanceError
  const balance = balanceData?.balance ?? "0"

  const { refetch: vaultOverviewRefetch } = useVaultSpecific(
    true,
    vaultChainId,
    vaultName,
    account,
  )

  const {
    data: depositTokenApproval,
    refetch: tokenApprovalRefetch,
    isLoading: depositTokenApprovalLoading,
  } = useTokenApproval(
    vaultDepositToken,
    inputVal,
    account,
    vaultAddress,
    chainId,
  )
  const vaultContractApproved = depositTokenApproval?.customAllowanceApproved

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputVal(event.target.value)

  const disabledCondition =
    Number(inputVal) === 0 || Number(inputVal) > Number(maxAmount)
  const btnVariant = !disabledCondition ? "outline" : "disabled"
  const btnCss = clsx(
    "px-10 py-3 w-fit",
    disabledCondition && "cursor-not-allowed hover:bg-none",
  )

  const handleDeposit = async () => {
    if (!isValidAddress(account) || disabledCondition || !depositsOpen)
      return null
    try {
      setDepositPending(true)
      await depositVault(vaultAddress, account, inputVal)
      await vaultOverviewRefetch()
      await retechBalance()
    } finally {
      setInputVal("0.00")
      setDepositPending(false)
    }
  }

  const handleWithdraw = async () => {
    if (!isValidAddress(account) || disabledCondition || !withdrawalsOpen)
      return null
    try {
      setWithdrawalPending(true)
      await withdrawVault(vaultAddress, account, inputVal)
      await vaultOverviewRefetch()
      await retechBalance()
    } finally {
      setInputVal("0.00")
      setWithdrawalPending(false)
    }
  }

  const handleApprove = async () => {
    if (!isValidAddress(account) || disabledCondition) return null
    try {
      setApprovalPending(true)
      await approve(vaultDepositToken, vaultAddress, chainId)
      await tokenApprovalRefetch()
    } finally {
      setApprovalPending(false)
    }
  }

  const handleSwitch = () => {
    runSetters()
    if (web3Provider) {
      return SwitchNet(vaultChainId, web3Provider)
    } else {
      return false
    }
  }

  const ChangeNetwork = () => {
    return (
      <GenericButton
        className="w-full max-w-[300px] mx-auto px-2 text-sm md:text-lg disabled cursor-not-allowed"
        variant="outline"
        text="Change Network"
        touchable
        onClick={handleSwitch}
      />
    )
  }

  console.log(`in VaultDeposit func at time ${Date.now()}`)

  return (
    <div className="lg:col-span-4 border-[0.5px] border-dsqgreen-100 p-8 flex flex-col">
      <div className="flex justify-start text-lg font-light gap-x-6">
        <p
          className={clsx(
            correctChain ? "cursor-pointer" : "cursor-not-allowed",
            tabDeposit
              ? "text-dsqgreen-100 underline underline-offset-8"
              : "text-dsqgray-100",
            !depositsOpen && "disabled cursor-not-allowed",
          )}
          onClick={() => {
            correctChain && depositsOpen && setTabDeposit(true)
          }}
        >
          Deposit
        </p>
        <p
          className={clsx(
            correctChain ? "cursor-pointer" : "cursor-not-allowed",
            !tabDeposit && withdrawalsOpen
              ? "text-dsqgreen-100 underline underline-offset-8"
              : "text-dsqgray-100",
            !withdrawalsOpen && "disabled cursor-not-allowed",
          )}
          onClick={() => correctChain && setTabDeposit(false)}
        >
          Withdraw
        </p>
      </div>

      <div className="flex items-center justify-between px-8 py-5 mt-10 mb-2 text-center border border-dsqgray-100">
        <div className="flex gap-x-7">
          <div
            className={clsx(
              "px-2 py-1 text-sm border rounded-sm w-fit border-dsqgray-100 text-dsqgray-100 font-roboto-mono",
              withdrawalsOpen &&
                correctChain &&
                "hover:text-dsqgreen-100 hover:border-dsqgreen-100",
            )}
          >
            <p
              className={clsx(
                withdrawalsOpen && correctChain
                  ? "cursor-pointer"
                  : "cursor-not-allowed",
              )}
              onClick={() => {
                correctChain && setInputVal(maxAmount)
              }}
            >
              MAX
            </p>
          </div>
          <Input
            variant="unstyled"
            placeholder="0"
            size="lg"
            fontFamily={"mono"}
            value={inputVal}
            onChange={handleChange}
          />
        </div>

        <Image
          src={tabDeposit ? "/logos/usdc.svg" : "/logos/usdc.svg"}
          alt="usdc"
          width={26}
          height={26}
        />
      </div>

      <div className="flex flex-col mt-4 gap-y-2">
        <div className="flex justify-between text-sm text-dsqgray-100">
          <p>Wallet Balance</p>
          {balanceLoadedFail && correctChain ? (
            <p className="animate-pulse">0.00 USDC</p>
          ) : (
            <p className={clsx(!correctChain && "hidden")}>
              {numberFormat(+balance, 2)} USDC
            </p>
          )}
        </div>

        <div className="flex justify-between text-sm text-dsqgray-100">
          <p>Vault Balance</p>
          {balanceLoadedFail && correctChain ? (
            <p className="animate-pulse blur-md">0.00 USDC</p>
          ) : (
            <p className={clsx(!correctChain && "hidden")}>
              {userShareBalance} {vaultName.replace("Plus", "++")}
            </p>
          )}
        </div>

        <div className="flex justify-between text-sm text-dsqgray-100">
          <p>Vault Ratio</p>
          {balanceLoadedFail && correctChain ? (
            <p className="animate-pulse blur-md">0.00 USDC</p>
          ) : (
            <p className={clsx(!correctChain && "hidden")}>
              1 {vaultName.replace("Plus", "++ : ")}
              {numberFormat(shareToAssets)} USDC
            </p>
          )}
        </div>
      </div>

      <hr className="mt-5 h-[1px] bg-dsqgray-100 border-0" />

      <div
        className={clsx(
          "mt-10",
          depositTokenApprovalLoading &&
            correctChain &&
            "animate-pulse blur-md",
        )}
      >
        {!account ? (
          <ConnectButton />
        ) : !correctChain ? (
          <ChangeNetwork />
        ) : tabDeposit ? (
          !vaultContractApproved ? (
            <GenericButton
              loading={approvalPending}
              leftIcon={<TransactionSpinner />}
              text={"Approve"}
              variant={btnVariant}
              className={btnCss}
              touchable
              onClick={handleApprove}
            />
          ) : (
            <GenericButton
              loading={depositPending}
              leftIcon={<TransactionSpinner />}
              variant={btnVariant}
              className={btnCss}
              text={"Deposit"}
              touchable
              onClick={handleDeposit}
            />
          )
        ) : (
          <GenericButton
            loading={withdrawalPending}
            leftIcon={<TransactionSpinner />}
            variant={btnVariant}
            className={btnCss}
            text={"Withdraw"}
            touchable
            onClick={handleWithdraw}
          />
        )}
      </div>
    </div>
  )
}

export default VaultDeposit
