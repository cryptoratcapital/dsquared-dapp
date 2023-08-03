import { GenericButton } from "@/common/components/Generic/GenericButton/GenericButton"
import GenericTitle from "@/common/components/Generic/GenericTitle/GenericTitle"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

interface TokenomicsItemInterface {
  title: string
  amount: string
  style: string
  supValue?: string
}

const TokenomicsItem = ({
  title,
  amount,
  style,
  supValue,
}: TokenomicsItemInterface) => {
  return (
    <div className={clsx("flex", "items-center", "gap-x-4", style)}>
      <div className="w-8 h-8 border border-inherit"></div>
      <div className="text-2xl">
        <p className="text-lg text-white">
          {title} <sup>{supValue}</sup>
        </p>
        <p className="text-base">{amount}</p>
      </div>
    </div>
  )
}

export const Tokenomics = () => {
  const tokenomicsParts: TokenomicsItemInterface[] = [
    {
      title: "Rewards",
      amount: "250 000",
      style: "border-[#00EBAB] text-[#00EBAB]",
    },
    {
      title: "Development",
      amount: "85 000",
      style: "border-[#006549] text-[#006549]",
    },
    {
      title: "Team",
      amount: "65 000",
      style: "border-[#05549D] text-[#05549D]",
    },
    {
      title: "Farm",
      amount: "50 000",
      style: "border-[#00ACFF] text-[#00ACFF]",
    },
    {
      title: "Public sale",
      amount: "32 475",
      style: "border-[#920C95] text-[#920C95]",
      supValue: "*",
    },
    {
      title: "Private sale",
      amount: "6837",
      style: "border-[#6C8606] text-[#6C8606]",
    },
    {
      title: "Pre-Seed",
      amount: "10 688",
      style: "border-[#CAAB0B] text-[#CAAB0B]",
    },
  ]

  return (
    <div className="relative">
      <div className="flex items-center flex-col mt-[110px] lg:mt-[230px]">
        <GenericTitle title="Tokenomics" />

        <div className="flex flex-col gap-1 mt-5 text-center font-roboto md:text-xl text-dsqgray-200 md:text-white">
          <p>
            $DSQ is the native token of the D-Squared platform, limited to
            500,000 total supply. Future token burns will only ever reduce this
            amount.
          </p>
          <p>$DSQ is the revenue and rewards earning token when staked. </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between lg:gap-x-[90px] md:mt-11 items-start lg:items-center gap-y-2">
          <Image
            src="/grid.svg"
            alt="tokenomics"
            width={529}
            height={460}
            className="hidden md:flex"
          />
          <Image
            src="/gridMobile.svg"
            alt="tokenomics"
            width={348}
            height={302}
            className="flex md:hidden mt-[77px]"
          />

          <hr className="block lg:hidden w-full h-[2px] border-0 bg-[#2F3544] mt-7 mb-9" />

          <div className="flex flex-col gap-y-1">
            <div className="lg:h-[528px] grid grid-rows-4 grid-cols-2 lg:grid-cols-1 lg:grid-rows-7 grid-flow-col gap-y-4 gap-x-7 w-full">
              {tokenomicsParts.map((item, index) => (
                <TokenomicsItem
                  key={index}
                  title={item.title}
                  amount={item.amount}
                  style={item.style}
                  supValue={item.supValue}
                />
              ))}
            </div>

            <div className="text-sm text-dsqgray-100 lg:max-w-[200px]">
              <p>
                *Public sale is the sum of Public sale, Camelot pool and DSQ
                bonds.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="https://docs.d2.finance/docs/tokenomics"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center md:justify-start"
        >
          <GenericButton
            text="Tokenomics"
            variant="outline-white"
            className="mt-8 md:mt-[60px] hidden md:flex px-12"
            touchable
          />

          <GenericButton
            text="Tokenomics"
            variant="solid"
            className="flex mt-16 md:hidden px-9"
            touchable
          />
        </Link>
      </div>
    </div>
  )
}
