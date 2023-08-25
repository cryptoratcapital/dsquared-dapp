import { GenericButton } from "@/common/components/Generic/GenericButton/GenericButton"
import { chainIDs } from "@/common/constants/ChainInformation"
import {
  StakingList,
  StakingRouter,
  StakingType,
} from "@/common/constants/Staking"
import { web3ModalState } from "@/common/store"
import { isCorrectChainId } from "@/common/utils/helpers/utils"
import {
  useStakingData,
  useTokenApproval,
  useTokenBalance,
} from "@/common/utils/queries"
import { approve } from "@/common/web3/calls/erc20token"
import { stake, unstakeDsq } from "@/common/web3/calls/staking"
import { Input, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react"
import clsx from "clsx"
import Image from "next/image"
import React, { useState } from "react"
import { TransactionSpinner } from "../../Icons/customIcons"

export const StakingModal = ({
  isOpen,
  onClose,
  stakingVariant,
  maxAmount,
}: {
  isOpen: boolean
  onClose: () => void
  stakingVariant: StakingType
  maxAmount: string
}) => {
  const [inputVal, setInputVal] = useState("0")
  const [approvalPending, setApprovalPending] = useState(false)
  const [stakingPending, setStakingPending] = useState(false)
  const [unstakePending, setUnstakePending] = useState(false)

  const account = web3ModalState((state) => state.account)
  const chainId = web3ModalState((state) => state.chainId)

  const stakingChainInfo = chainIDs.find(
    (chainID) => chainID.chainId === StakingRouter.chainId,
  )
  const correctChain = isCorrectChainId(chainId, stakingChainInfo)

  const stakingList = StakingList[stakingVariant]
  const stakingText = stakingList.stakingText
  const stakingToken = stakingList.token

  const {
    data: tokenApproval,
    refetch: tokenApprovalRefetch,
    isLoading: tokenApprovalLoading,
  } = useTokenApproval(
    stakingToken,
    inputVal,
    account,
    StakingRouter.address,
    chainId,
  )
  const dsqRouterApproved = tokenApproval?.customAllowanceApproved

  const { refetch: refetechStakingData } = useStakingData(
    account,
    chainId,
    correctChain,
  )
  const { refetch: refetchTokenBalance } = useTokenBalance(
    stakingToken,
    account,
    chainId,
    correctChain,
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value)
    tokenApprovalRefetch()
  }

  const handleApprove = async () => {
    if (
      approvalPending ||
      Number(inputVal) === 0 ||
      Number(inputVal) > Number(maxAmount)
    )
      return null
    try {
      setApprovalPending(true)
      await approve(stakingToken, StakingRouter.address, chainId)
      await tokenApprovalRefetch()
    } finally {
      setApprovalPending(false)
    }
  }

  const handleStake = async () => {
    if (
      stakingPending ||
      Number(inputVal) === 0 ||
      Number(inputVal) > Number(maxAmount)
    ) {
      return null
    }

    try {
      setStakingPending(true)
      await stake(inputVal, stakingVariant)
      await refetechStakingData()
      await refetchTokenBalance()
    } finally {
      setStakingPending(false)
      handleClose()
    }
  }

  const handleUnstake = async () => {
    if (
      unstakePending ||
      Number(inputVal) === 0 ||
      Number(inputVal) > Number(maxAmount)
    )
      return null
    try {
      setUnstakePending(true)
      await unstakeDsq(inputVal)
      await refetechStakingData()
      await refetchTokenBalance()
    } finally {
      setUnstakePending(false)
      handleClose()
    }
  }

  const handleClose = () => {
    setInputVal("0")
    onClose()
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered={true}>
        <ModalOverlay bg="blackAlpha.50" backdropFilter="blur(10px)" />
        <ModalContent
          bg="dsqblack.200"
          textColor={"white"}
          border={"1px"}
          borderColor={"dsqgreen.100"}
          borderRadius={"sm"}
          // maxW={"200px"}
          margin={8}
        >
          <div className="p-6">
            <div className="flex justify-between">
              <div className="text-2xl font-semibold">{stakingText}</div>
              <div className="cursor-pointer" onClick={handleClose}>
                <Image
                  src="logos/closeModal.svg"
                  alt="close-modal"
                  width={30}
                  height={30}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-y-8">
              <div>
                <div className="flex justify-between w-full p-4 mt-8 border border-dsqgray-100">
                  <div className="flex w-full gap-x-7">
                    <div className="px-2 py-1 text-sm border rounded-sm cursor-pointer w-fit border-dsqgray-100 text-dsqgray-100 hover:text-dsqgreen-100 hover:border-dsqgreen-100 font-roboto-mono">
                      <p onClick={() => setInputVal(maxAmount)}>MAX</p>
                    </div>

                    <div className="md:min-w-[250px]">
                      <Input
                        variant="unstyled"
                        value={inputVal}
                        size="lg"
                        fontFamily={"mono"}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <p className="text-lg text-dsqgreen-100">{stakingToken}</p>
                </div>

                <div className="flex flex-col w-full mt-2 ">
                  <p className="w-full text-xs text-left text-dsqgreen-100">
                    {+inputVal > +maxAmount && `Max amount is ${maxAmount}`}
                  </p>
                  <p className="w-full text-xs text-left text-dsqgreen-100">
                    {+inputVal <= 0 && `Amount must be positive`}
                  </p>
                </div>
              </div>

              {tokenApprovalLoading ? (
                <GenericButton
                  text={"loading"}
                  variant="staking"
                  className="px-10 py-3 w-fit blur-md animate-pulse"
                  touchable
                />
              ) : (
                (stakingVariant === StakingType.DSQStake ||
                  stakingVariant === StakingType.esDSQStake) &&
                (dsqRouterApproved ? (
                  <GenericButton
                    loading={stakingPending}
                    text={stakingList.stakingText}
                    leftIcon={<TransactionSpinner />}
                    variant={
                      Number(inputVal) > 0 &&
                      Number(inputVal) <= Number(maxAmount)
                        ? "outline"
                        : "disabled"
                    }
                    className={clsx(
                      "px-10 py-3 w-fit",
                      (Number(inputVal) === 0 ||
                        Number(inputVal) > Number(maxAmount)) &&
                        "cursor-not-allowed hover:bg-none",
                    )}
                    touchable
                    onClick={handleStake}
                  />
                ) : (
                  <GenericButton
                    loading={approvalPending}
                    text={"Approve"}
                    leftIcon={<TransactionSpinner />}
                    variant={
                      Number(inputVal) > 0 &&
                      Number(inputVal) <= Number(maxAmount)
                        ? "outline"
                        : "disabled"
                    }
                    className={clsx(
                      "px-10 py-3 w-fit",
                      (Number(inputVal) === 0 ||
                        Number(inputVal) > Number(maxAmount)) &&
                        "cursor-not-allowed hover:bg-none",
                    )}
                    touchable
                    onClick={handleApprove}
                  />
                ))
              )}

              {stakingVariant === StakingType.DSQUnstake && (
                <GenericButton
                  loading={unstakePending}
                  text={stakingList.stakingText}
                  leftIcon={<TransactionSpinner />}
                  variant={
                    Number(inputVal) > 0 &&
                    Number(inputVal) <= Number(maxAmount)
                      ? "outline"
                      : "disabled"
                  }
                  className={clsx(
                    "px-10 py-3 w-fit",
                    (Number(inputVal) === 0 ||
                      Number(inputVal) > Number(maxAmount)) &&
                      "cursor-not-allowed hover:bg-none",
                  )}
                  touchable
                  onClick={handleUnstake}
                />
              )}
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  )
}
