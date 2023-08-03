import { ConnectButton } from "@/common/components/Generic/GenericButton/GenericButton"
import { Input } from "@chakra-ui/react"
import Image from "next/image"

const VaultDepositShimmer = () => {
  return (
    <div className="col-span-1 md:col-span-4 border-[0.5px] border-dsqgreen-100 p-8 flex flex-col">
      <div className="flex justify-start text-lg font-light gap-x-6">
        <p className="underline cursor-pointer text-dsqgreen-100 underline-offset-8">
          Deposit
        </p>
        <p className="cursor-pointertext-dsqgray-100">Withdraw</p>
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
          />
        </div>

        <Image src="/logos/usdc.svg" alt="usdc" width={26} height={26} />
      </div>

      <div className="flex justify-between mt-4 text-sm text-dsqgray-100">
        <p>Wallet Balance</p>

        <p>0 USDC</p>
      </div>

      <hr className="mt-5 h-[1px] bg-dsqgray-100 border-0" />

      <div className="mt-10">
        <ConnectButton />
      </div>
    </div>
  )
}

export default VaultDepositShimmer
