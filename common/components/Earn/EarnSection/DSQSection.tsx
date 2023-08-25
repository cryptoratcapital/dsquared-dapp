import { CustomToolTip } from "@/common/components/Generic/Disclaimer/Info/InfoTooltip"
import {
  ConnectButton,
  GenericButton,
} from "@/common/components/Generic/GenericButton/GenericButton"
import { TransactionSpinner } from "@/common/components/Icons/customIcons"
import { chainIDs } from "@/common/constants/ChainInformation"
import { StakingRouter, StakingType } from "@/common/constants/Staking"
import { TokenSymbol } from "@/common/constants/TokenLookup"
import { web3ModalState } from "@/common/store"
import { numberFormat } from "@/common/utils/helpers/numbers"
import { isCorrectChainId } from "@/common/utils/helpers/utils"
import { useStakingData, useTokenBalance } from "@/common/utils/queries"
import { claimDsqReward, compoundDsqReward } from "@/common/web3/calls/staking"
import { useWeb3Modal } from "@/common/web3/modal"
import { useDisclosure } from "@chakra-ui/react"
import clsx from "clsx"
import Image from "next/image"
import { useState } from "react"
import { StakingModal } from "./StakingModal"
import { tooltipText } from "./ToolTipText"

export const DSQSection = () => {
  const account = web3ModalState((state) => state.account)
  const chainId = web3ModalState((state) => state.chainId)
  const web3Provider = web3ModalState((state) => state.web3Provider)
  const { SwitchNet } = useWeb3Modal()

  const [claimPending, setClaimPending] = useState(false)
  const [compoundPending, setCompoundPending] = useState(false)

  const stakingChainInfo = chainIDs.find(
    (chainID) => chainID.chainId === StakingRouter.chainId,
  )
  const correctChain = isCorrectChainId(chainId, stakingChainInfo)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [stakingVariant, setStakingVariant] = useState<StakingType>(
    StakingType.DSQStake,
  )

  const { data: dsqTokenBalance, isLoading: tokenBalanceLoading } =
    useTokenBalance(TokenSymbol.DSQ, account, chainId, correctChain)
  const userDsqBalance = dsqTokenBalance?.balance ?? "0"

  const { refetch: esdsqRefetch } = useTokenBalance(
    TokenSymbol.ESDSQ,
    account,
    chainId,
    correctChain,
  )

  const {
    data: stakingData,
    isLoading: stakingDataLoading,
    refetch: refetchStakingData,
  } = useStakingData(account, chainId, correctChain)
  const userDsqStaked = stakingData?.userDsqStaked ?? "0"
  const userRewards = Number(stakingData?.reward)
  const apy = numberFormat(stakingData?.apy ?? "0")

  const loading = tokenBalanceLoading || stakingDataLoading

  const maxAmount =
    (stakingVariant === StakingType.DSQStake
      ? userDsqBalance
      : userDsqStaked) ?? "0"
  const showCompound = stakingData?.showUserCompound

  const handleClaim = async () => {
    if (claimPending) return null
    try {
      setClaimPending(true)
      await claimDsqReward()
      await refetchStakingData()
      esdsqRefetch()
    } finally {
      setClaimPending(false)
    }
  }

  const handleCompound = async () => {
    if (compoundPending) return null
    try {
      setCompoundPending(true)
      await compoundDsqReward()
      await refetchStakingData()
      esdsqRefetch()
    } finally {
      setCompoundPending(false)
    }
  }

  const handleSwitch = () => {
    if (web3Provider) {
      return SwitchNet(StakingRouter.chainId, web3Provider)
    } else {
      return false
    }
  }

  const ChangeNetwork = () => {
    return (
      <GenericButton
        className="w-full max-w-[300px] mx-auto px-2 text-sm md:text-lg"
        variant="outline"
        text="Change Network"
        touchable
        onClick={handleSwitch}
      />
    )
  }

  return (
    <div className="flex flex-col  border-dsqgreen-100 min-w-[300px] sm:min-w-[500px] md:min-w-[700px] bg-dsqblack-100 px-6 md:px-7 py-12 text-lg justify-center border">
      {!account ? (
        <ConnectButton className="w-full max-w-[250px] mx-auto" />
      ) : !correctChain ? (
        <ChangeNetwork />
      ) : (
        <>
          <div
            className={clsx(
              "flex flex-col justify-between md:flex-row",
              !correctChain && "hidden",
            )}
          >
            <CustomToolTip text={"DSQ"} toolTipText={tooltipText.DSQ} />

            <div className="grid md:w-[552px] gap-y-5 mt-5 md:mt-0">
              <div className="grid grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col gap-y-2">
                  <CustomToolTip text={"APY"} toolTipText={tooltipText.APY} />
                  <div
                    className={clsx(
                      "flex text-xl font-bold",
                      loading && "animate-pulse blur-md",
                    )}
                  >
                    {apy}%
                  </div>
                </div>

                <div className="flex flex-col gap-y-2 md:col-span-2">
                  <div className="flex text-dsqgray-100">Your Balance</div>

                  <div
                    className={clsx(
                      "flex text-xl font-bold",
                      loading && "blur-md animate-pulse",
                    )}
                  >
                    {`${numberFormat(userDsqBalance)} DSQ`}
                  </div>
                </div>
              </div>

              <hr className="w-full border border-dsqgray-100" />

              <div className="grid grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col gap-y-2">
                  <div className="flex text-dsqgray-100">Staked</div>
                  <div
                    className={clsx(
                      "px-4 py-2 font-bold border rounded-sm w-fit hover:border-dsqgreen-100 border-dsqgray-100",
                      loading && "animate-pulse blur-md",
                    )}
                  >
                    <p>{`${numberFormat(userDsqStaked)} DSQ`}</p>
                  </div>
                </div>

                <div className="flex flex-col invisible gap-y-2">
                  <div className="flex gap-x-4 text-dsqgray-100">
                    Staking Level
                    <Image
                      src="logos/info.svg"
                      alt="info"
                      width={19}
                      height={19}
                    />
                  </div>

                  <div className="flex py-1 text-xl font-bold">5</div>
                </div>

                <div className="flex flex-col justify-between mt-5 md:mt-0 gap-y-5">
                  <GenericButton
                    text="Stake DSQ"
                    variant="outline"
                    touchable
                    className="w-[160px] md:w-full"
                    onClick={() => {
                      setStakingVariant(StakingType.DSQStake)
                      onOpen()
                    }}
                  />
                  <GenericButton
                    text="Unstake DSQ"
                    variant="outline"
                    className="w-[160px] md:w-full"
                    touchable
                    onClick={() => {
                      setStakingVariant(StakingType.DSQUnstake)
                      onOpen()
                    }}
                  />
                </div>
              </div>

              <hr className="w-full mt-4 border border-dsqgreen-100" />
            </div>
          </div>

          <div
            className={clsx(
              "flex flex-col justify-between md:flex-row mt-7  gap-x-4",
              !correctChain && "hidden",
            )}
          >
            <div className="flex items-start text-xl font-bold gap-x-4">
              <CustomToolTip
                text={"Rewards"}
                toolTipText={tooltipText.Rewards}
              />
            </div>

            <div className="grid md:w-[552px] gap-y-5">
              <div className="grid grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col gap-y-2 mr-[124px]">
                  <div className="flex text-dsqgray-100">ETH</div>

                  <div className="flex font-bold">0</div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <div className="flex text-dsqgray-100">esDSQ</div>

                  <div
                    className={clsx(
                      "flex text-xl font-bold",
                      loading && "animate-pulse blur-md",
                    )}
                  >
                    {`${numberFormat(userRewards)}`}
                  </div>
                </div>

                <div className="flex flex-col justify-between mt-5 gap-y-5 md:mt-0">
                  <GenericButton
                    loading={claimPending}
                    text={"Claim Reward"}
                    leftIcon={<TransactionSpinner />}
                    variant={userRewards > 0 ? "outline" : "disabled"}
                    touchable
                    className={clsx(
                      "w-[160px] md:w-full ",
                      userRewards === 0 && "cursor-not-allowed hover:bg-none",
                    )}
                    onClick={
                      userRewards > 0
                        ? handleClaim
                        : () => {
                            return null
                          }
                    }
                  />

                  <GenericButton
                    loading={compoundPending}
                    text={"Compound"}
                    leftIcon={<TransactionSpinner />}
                    variant={showCompound ? "outline" : "disabled"}
                    className={clsx(
                      "w-[160px] md:w-full ",
                      !showCompound && "cursor-not-allowed hover:bg-none",
                    )}
                    touchable
                    onClick={
                      showCompound
                        ? handleCompound
                        : () => {
                            return null
                          }
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <StakingModal
            isOpen={isOpen}
            onClose={onClose}
            stakingVariant={stakingVariant}
            maxAmount={maxAmount}
          />
        </>
      )}
    </div>
  )
}
