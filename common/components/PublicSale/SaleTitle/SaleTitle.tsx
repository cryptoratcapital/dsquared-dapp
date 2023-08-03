import { GenericButton } from "@/common/components/Generic/GenericButton/GenericButton"
import { useTotalRaised } from "@/common/utils/queries"
import clsx from "clsx"
import Link from "next/link"

export const SaleTite = () => {
  const { data: totalRaised, isLoading, isError } = useTotalRaised()
  const ethRaised = totalRaised?.eth
  const usdRaised = totalRaised?.usd
  const isLoadingData = isLoading || isError
  return (
    <div className="flex flex-col gap-y-20 mt-[55px]">
      <div className="text-5xl md:text-6xl lg:text-[80px] font-roboto">
        <p>Become a Part of D-Squared</p>
      </div>

      <div className="w-fit">
        <Link
          href="https://docs.d2.finance/docs/tokenomics/"
          target="_blank"
          rel="noopener"
        >
          <GenericButton
            variant="solid"
            text="Explore Tokenomics"
            className="self-center py-3 px-9 md:px-12"
            touchable
          />
        </Link>
      </div>

      <div
        className={clsx(
          "text-lg sm:text-3xl",
          isLoadingData && "animate-pulse blur-md",
        )}
      >
        Total Raised: {ethRaised} Eth (${usdRaised} USD)
      </div>
    </div>
  )
}
