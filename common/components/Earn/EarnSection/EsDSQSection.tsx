import { chainIDs } from "@/common/components/constants/ChainInformation"
import {
  StakingRouter,
  StakingType,
} from "@/common/components/constants/Staking"
import { GenericButton } from "@/common/components/Generic/GenericButton/GenericButton"
import { web3ModalState } from "@/common/store"
import { numberFormat } from "@/common/utils/helpers/numbers"
import { isCorrectChainId, timeExtraction } from "@/common/utils/helpers/utils"
import { useStakingData, useTokenBalance } from "@/common/utils/queries"
import { useDisclosure } from "@chakra-ui/react"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { TokenSymbol } from "../../constants/tokenLookup"
import { CustomToolTip } from "../../Generic/Disclaimer/Info/InfoTooltip"
import { StakingModal } from "./StakingModal"
import { tooltipText } from "./ToolTipText"

export const EsDSQSection = () => {
  const account = web3ModalState((state) => state.account)
  const chainId = web3ModalState((state) => state.chainId)

  const stakingChainInfo = chainIDs.find(
    (chainID) => chainID.chainId === StakingRouter.chainId,
  )
  const correctChain = isCorrectChainId(chainId, stakingChainInfo)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [stakingVariant, setStakingVariat] = useState<StakingType>(
    StakingType.esDSQStake,
  )

  const { data: dsqTokenBalance, isLoading: tokenBalanceLoading } =
    useTokenBalance(TokenSymbol.ESDSQ, account, chainId, correctChain)
  const userDsqBalance = Number(dsqTokenBalance?.balance ?? 0)

  const { data: stakingData, isLoading: stakingDataLoading } = useStakingData(
    account,
    chainId,
  )

  const dataLoading = tokenBalanceLoading || stakingDataLoading

  const userEsdsqStaked = Number(stakingData?.userEsdsqStaked)
  const userVestingPaused = stakingData?.userEsdsqVestingPaused
  const userVestingFinishes = stakingData?.userEsdqVestingTime ?? 0
  const userDsqClaimable = Number(stakingData?.userDsqClaimable)
  const maxUserStake = stakingData?.maxUserEsDsqStake ?? "0"
  const minDsqDeficiency = stakingData?.minDsqDeficiency

  const currentTime = Math.floor(new Date().getTime() / 1000)
  const { daysLeft } = timeExtraction(userVestingFinishes - currentTime)

  return (
    <div
      className={clsx(
        "border border-dsqgreen-100 md:min-w-[381px] bg-dsqblack-100 px-6 md:px-7 py-12 text-lg",
        (account === undefined || !correctChain) && "hidden",
      )}
    >
      <CustomToolTip text={"esDSQ"} toolTipText={tooltipText.esDsq} />

      <div className="mt-1 text-dsqgray-100">
        <p>Convert your esDSQ into DSQ.</p>
        <p>
          Read about the vesting process{" "}
          <Link
            className="inline underline cursor-pointer text-dsqgreen-100"
            target="_blank"
            rel="noopener noreferrer"
            href="https://medium.com/@Dsquaredfinance/introducing-dsq-staking-3f8b7cb87679"
          >
            here
          </Link>
          .
        </p>
      </div>

      <div className="flex flex-col mt-8 gap-y-2 md:col-span-2">
        <div className="flex flex-col gap-y-2 md:col-span-2">
          <div className="flex text-dsqgray-100">Your Balance</div>
          <div
            className={clsx(
              "flex text-xl font-bold",
              dataLoading && "blur-md animate-pulse",
            )}
          >
            {`${numberFormat(userDsqBalance)} esDSQ`}
          </div>
        </div>

        <div className="flex items-start text-dsqgray-100">
          <p>Staked</p>
        </div>

        <div
          className={clsx(
            "mt-1 text-xl font-bold",
            dataLoading && "animate-pulse blur-md",
          )}
        >
          <p>{`${numberFormat(userEsdsqStaked)} esDSQ`}</p>
        </div>
      </div>

      <div className="flex justify-between mt-9">
        <div className="flex flex-col gap-y-2">
          <CustomToolTip
            text={"Vesting Status"}
            toolTipText={tooltipText.VestingStatus}
          />

          <div
            className={clsx(
              "flex text-xl font-bold",
              dataLoading && "animate-pulse blur-md",
            )}
          >
            {userVestingPaused
              ? "Vesting Paused"
              : Number(userEsdsqStaked) === 0
              ? "No esDSQ Staked"
              : `${daysLeft} days left`}
          </div>
        </div>

        <div className="flex flex-col items-end col-span-2 gap-y-2">
          <div className="flex text-dsqgray-100">Claimable</div>

          <div
            className={clsx(
              "flex text-xl font-bold",
              dataLoading && "animate-pulse blur-md",
            )}
          >
            {`${numberFormat(userDsqClaimable)} DSQ`}
          </div>
        </div>
      </div>

      <div className="mt-2 text-sm">
        {userVestingPaused &&
          `Stake ${minDsqDeficiency} DSQ to continue vesting`}
      </div>

      <div className="flex w-full justify-between mt-[26px]">
        <GenericButton
          text="Stake esDSQ"
          variant="outline"
          touchable
          className="p-4"
          onClick={() => {
            setStakingVariat(StakingType.esDSQStake)
            onOpen()
          }}
        />
        {/* <GenericButton
          text="Claim DSQ"
          variant="disabled"
          className="p-4"
          touchable={false}
        /> */}
      </div>
      <StakingModal
        isOpen={isOpen}
        onClose={onClose}
        stakingVariant={stakingVariant}
        maxAmount={maxUserStake}

      />
    </div>
  )
}
