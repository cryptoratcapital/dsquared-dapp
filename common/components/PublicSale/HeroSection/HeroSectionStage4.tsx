import {
  stage4ClaimText,
  Stage4CountDownText,
  stage4Ended,
  stage4EndingText,
  stage4StartingText,
  stage4WLStartingText,
} from "@/common/interfaces/PublicSaleInterface"
import { web3ModalState } from "@/common/store"
import { timeExtraction } from "@/common/utils/helpers/utils"
import { useStage4Data } from "@/common/utils/queries"
import clsx from "clsx"

import { useEffect, useState } from "react"

export const HeroSectionStage4 = () => {
  const account = web3ModalState((state) => state.account)

  const {
    data: stage4Data,
    isLoading: stage4Loading,
    isError: stage4Error,
    refetch: stage4Refetch,
  } = useStage4Data(account)

  const loaded = !stage4Loading && !stage4Error

  const whitelistStartTime = Number(stage4Data?.whitelistStartTime)
  const startTime = Number(stage4Data?.startTime)
  const endTime = Number(stage4Data?.endTime)
  const claimTime = Number(stage4Data?.claimTime)
  const totalContribution = Number(stage4Data?.totalContribution)
  const maxContribution = Number(stage4Data?.maxContribution)

  const [saleText, setSaleText] =
    useState<Stage4CountDownText>(stage4WLStartingText)
  const [saleTime, setSaleTime] = useState(0)

  useEffect(() => {
    if (loaded) {
      const getSaleStatus = () => {
        const currentTime = Math.floor(new Date().getTime() / 1000)

        // refresh at these key points so changes to deposit component are reflected
        if (
          currentTime === whitelistStartTime ||
          currentTime === startTime ||
          currentTime === endTime ||
          currentTime === claimTime
        ) {
          stage4Refetch()
        }

        if (currentTime >= claimTime) {
          setSaleText(stage4Ended)
          setSaleTime(currentTime - claimTime)
        } else if (currentTime >= endTime) {
          setSaleText(stage4ClaimText)
          setSaleTime(claimTime - currentTime)
        } else if (currentTime >= startTime) {
          if (totalContribution === maxContribution) {
            setSaleText(stage4ClaimText)
          } else {
            setSaleText(stage4EndingText)
          }
          setSaleTime(endTime - currentTime)
        } else if (currentTime >= whitelistStartTime) {
          setSaleText(stage4StartingText)
          setSaleTime(startTime - currentTime)
        } else {
          setSaleText(stage4WLStartingText)
          setSaleTime(whitelistStartTime - currentTime)
        }
      }
      const timer = setTimeout(() => {
        getSaleStatus()
      }, 1000)

      return () => clearTimeout(timer)
    }
  })

  const { daysLeft, hoursLeft, minLeft, secondsLeft } = timeExtraction(saleTime)

  return (
    <div className="flex flex-col text-2xl sm:text-3xl md:flex-row gap-x-3 text-dsqgray-200 md:text-white font-roboto">
      <p
        className={clsx(
          (stage4Loading || saleTime === 0) && "animate-pulse blur-md",
        )}
      >
        {saleText}
      </p>
      <p
        className={clsx(
          "text-dsqgreen-100",
          (!loaded || saleTime === 0) && "animate-pulse blur-md",
        )}
      >
        {saleText != stage4Ended &&
          `${daysLeft} : ${hoursLeft} : ${minLeft} : ${secondsLeft}`}
      </p>
    </div>
  )
}
