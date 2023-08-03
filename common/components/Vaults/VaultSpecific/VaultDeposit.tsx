import {
  ConnectButton,
  GenericButton,
} from "@/common/components/Generic/GenericButton/GenericButton"
import { web3ModalState } from "@/common/store"
import { useTokenBalance } from "@/common/utils/queries"
import { VaultSpecificContext } from "@/pages/vaults/[vaultname]"
import { Input } from "@chakra-ui/react"
import clsx from "clsx"
import Image from "next/image"
import { ChangeEvent, useContext, useState } from "react"

const VaultDeposit = () => {
  // const isMobile = useBreakpointValue({ base: true, sm: false })
  const { vaultName } = useContext(VaultSpecificContext)

  const [tabDeposit, setTabDeposit] = useState(true)
  const [inputVal, setInputVal] = useState("0")
  const account = web3ModalState((state) => state.account)
  const chainId = web3ModalState((state) => state.chainId)

  const {
    data: balanceData,
    isLoading: balanceLoading,
    isError: balanceError,
  } = useTokenBalance(vaultName, account, chainId?.toString())
  const balanceLoadedFail = balanceLoading || balanceError

  const balance = balanceData?.balance

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputVal(event.target.value)

  return (
    <div className="lg:col-span-4 border-[0.5px] border-dsqgreen-100 p-8 flex flex-col">
      <div className="flex justify-start text-lg font-light gap-x-6">
        <p
          className={clsx(
            "cursor-pointer",
            tabDeposit
              ? "text-dsqgreen-100 underline underline-offset-8"
              : "text-dsqgray-100",
          )}
          onClick={() => setTabDeposit(true)}
        >
          Deposit
        </p>
        <p
          className={clsx(
            "cursor-pointer",
            !tabDeposit
              ? "text-dsqgreen-100 underline underline-offset-8"
              : "text-dsqgray-100",
          )}
          onClick={() => setTabDeposit(false)}
        >
          Withdraw
        </p>
      </div>

      <div className="flex items-center justify-between px-8 py-5 mt-10 mb-2 text-center border border-dsqgray-100">
        <div className="flex gap-x-7">
          <div className="px-2 py-1 text-sm border rounded-sm w-fit border-dsqgray-100 text-dsqgray-100 hover:text-dsqgreen-100 hover:border-dsqgreen-100 font-roboto-mono">
            <p className="cursor-pointer">MAX</p>
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

      <div className="flex justify-between mt-4 text-sm text-dsqgray-100">
        <p>Wallet Balance</p>
        {balanceLoadedFail ? (
          <p className="animate-pulse blur-md">0.00 USDC</p>
        ) : (
          <p>{balance} USDC</p>
        )}
      </div>

      <hr className="mt-5 h-[1px] bg-dsqgray-100 border-0" />

      <div className="mt-10">
        {!account ? (
          <ConnectButton />
        ) : tabDeposit ? (
          <GenericButton
            variant="outline"
            text={"Deposit"}
            className="flex justify-center px-4 text-base "
            touchable
          />
        ) : (
          <GenericButton
            variant="outline"
            text={"Withdraw"}
            className="flex justify-center px-4 text-base "
            touchable
          />
        )}
      </div>
    </div>
  )
}

export default VaultDeposit
