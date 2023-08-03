import {
  CountDownText,
  saleClaim1text,
  saleClaim2Text,
  saleClaim3Text,
  saleEndedText,
  saleEndingText,
  saleStartingText,
} from "@/common/interfaces/PublicSaleInterface"
import { web3ModalState } from "@/common/store"
import { timeExtraction } from "@/common/utils/helpers/utils"
import { usePublicSaleData } from "@/common/utils/queries"
import clsx from "clsx"

import { useEffect, useState } from "react"

export const HeroSection = () => {
  const account = web3ModalState((state) => state.account)

  const {
    data: publicsaleData,
    isLoading: publicSaleLoading,
    isError: publicSaleError,
    refetch: publicSaleRefetch,
  } = usePublicSaleData(account)

  const loaded = !publicSaleLoading && !publicSaleError

  const startTime = Number(publicsaleData?.startTime)
  const endTime = Number(publicsaleData?.endTime)
  const tier2ClaimTime = Number(publicsaleData?.tier2ClaimTime)
  const tier3ClaimTime = Number(publicsaleData?.tier3ClaimTime)
  const totalContribution = Number(publicsaleData?.totalContributed)
  const maxContribution =
    Number(publicsaleData?.stage1Max) +
    Number(publicsaleData?.stage2Max) +
    Number(publicsaleData?.stage3Max)

  const [saleText, setSaleText] = useState<CountDownText>(saleStartingText)
  const [saleTime, setSaleTime] = useState(0)

  useEffect(() => {
    if (loaded) {
      const getSaleStatus = () => {
        const currentTime = Math.floor(new Date().getTime() / 1000)

        // refresh at these key points so changes to deposit component are reflected
        if (
          currentTime === tier3ClaimTime ||
          currentTime === tier2ClaimTime ||
          currentTime === endTime ||
          currentTime === startTime
        ) {
          publicSaleRefetch()
        }

        if (currentTime >= tier3ClaimTime) {
          setSaleText(saleEndedText)
          setSaleTime(currentTime - tier3ClaimTime)
        } else if (currentTime >= tier2ClaimTime) {
          setSaleText(saleClaim3Text)
          setSaleTime(tier3ClaimTime - currentTime)
        } else if (currentTime >= endTime) {
          setSaleText(saleClaim2Text)
          setSaleTime(tier2ClaimTime - currentTime)
        } else if (currentTime >= startTime) {
          if (totalContribution === maxContribution) {
            setSaleText(saleClaim1text)
          } else {
            setSaleText(saleEndingText)
          }
          setSaleTime(endTime - currentTime)
        } else {
          setSaleText(saleStartingText)
          setSaleTime(startTime - currentTime)
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
          (publicSaleLoading || saleTime === 0) && "animate-pulse blur-md",
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
        {saleText != saleEndedText &&
          `${daysLeft} : ${hoursLeft} : ${minLeft} : ${secondsLeft}`}
      </p>
    </div>
  )
}
