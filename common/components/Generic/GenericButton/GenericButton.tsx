import { web3ModalState } from "@/common/store/web3ModalState"
import { useWeb3Modal } from "@/common/web3/modal"
import { useBreakpointValue, useDisclosure } from "@chakra-ui/react"
import clsx from "clsx"
import React, { FC } from "react"
import { MetamaskFirefoxWarning } from "../../MetamaskFirefoxWarning/MetamaskFirefoxWarning"

interface GenericButtonProps {
  text?: string
  variant:
    | "solid"
    | "outline"
    | "outline-white"
    | "disabled"
    | "solid-disabled"
    | "staking"
  className?: string
  touchable: boolean
  autoFocus?: boolean
  onClick?: () => void
  leftIcon?: React.ReactNode
  loading?: boolean
  id?: string
}

export const GenericButton = ({
  text,
  variant,
  className,
  touchable,
  autoFocus,
  onClick,
  leftIcon,
  loading,
  ...props
}: GenericButtonProps) => {
  return (
    <button
      {...props}
      autoFocus={autoFocus}
      onClick={onClick}
      className={clsx(
        className,
        "py-3 text-lg text-center border-2 px-auto border-dsqgreen-100 font-roboto-mono",
        variant === "disabled"
          ? "text-dsqgray-100 hover:bg-dsqgray-200"
          : variant === "solid-disabled"
          ? "text-dsqgray-200"
          : variant === "outline"
          ? "text-dsqgreen-100"
          : variant === "outline-white"
          ? "text-white"
          : variant === "staking"
          ? "text-white"
          : "text-dsqblack-100",
        variant === "solid" ? "bg-dsqgreen-100" : "bg-dsqblack-100",
        variant === "outline"
          ? "border-dsqgreen-100"
          : (variant === "disabled" || variant === "solid-disabled") &&
              "border-dsqgray-100",
        variant === "staking" &&
          "bg-dsqgray-100 border-none hover:bg-dsqgray-200 hover:text-white",
        touchable ? variant === "outline" && "hover:text-dsqblack-100" : "",
        touchable
          ? variant === "outline"
            ? "hover:bg-dsqgreen-100"
            : variant === "staking"
            ? "text-white"
            : "hover:text-dsqblack-100"
          : variant === "solid-disabled"
          ? "bg-dsqgray-100"
          : "",
        touchable
          ? variant === "solid"
            ? "hover:bg-dsqgreen-50"
            : variant === "disabled"
            ? "hover:bg-dsqgray-200"
            : "hover:bg-dsqgreen-100"
          : "",
        touchable ? "cursor-pointer" : "pointer-events-none",
        loading && "hover:bg-[#0B0C0B]",
      )}
    >
      <div className="flex justify-center gap-x-2 ">
        {loading ? leftIcon : text}
      </div>
    </button>
  )
}

export const ConnectButton: FC<{ className?: string }> = ({
  className = "",
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { isOpen, onClose } = useDisclosure()
  const { connectWallet, disconnectWallet } = useWeb3Modal()
  const account = web3ModalState((state) => state.account)

  const onConfirm = async () => {
    onClose()
    await connect()
  }

  const handleConnect = async () => {
    await connect()
  }

  const connect = async () => {
    if (account) {
      await disconnectWallet()
    } else {
      await connectWallet()
    }
  }

  return (
    <>
      <MetamaskFirefoxWarning
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
      />
      <GenericButton
        data-testid="connect-wallet"
        variant="outline"
        text={
          account
            ? account.slice(0, 8)
            : isMobile
            ? "Connect"
            : "Connect Wallet"
        }
        className={clsx(className, "flex justify-center px-6 text-base")}
        touchable
        onClick={handleConnect}
      />
    </>
  )
}
