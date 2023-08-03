import { GenericBox } from "@/common/components/Generic/GenericBox/GenericBox"
import { GenericButton } from "@/common/components/Generic/GenericButton/GenericButton"
import GenericTitle from "@/common/components/Generic/GenericTitle/GenericTitle"
import { HorizontalLines } from "@/common/components/Generic/HorizontalLines/HorizontalLines"
import { useBreakpointValue } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

const dsquaredText = [
  { title: "Identify", text: "Identify drivers of market change" },
  {
    title: "Build",
    text: "Build signals that capture those drivers",
  },
  { title: "Execute", text: "Turn those signals into positions" },
]

const edgeText: { [name: string]: string } = {
  "/publicsale":
    "Quantitative signals are generated from our machine learning/modeling expertise, then filtered and structured qualitatively by expert traders to extract optionality/exposure at discounts, given the inelastic behaviors of end-users of options.",
  "/vaults":
    "The vaults are custom-coded to a modular structure, tailor-made to fit each of the strategies they house. D-Squared applies sophisticated risk management procedures that consider the price, size, volatility, liquidity and inter-relationships of ETH with other cryptocurrencies",
}

export const Edge = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const router = useRouter()

  return (
    <div className="relative">
      <div className="mt-[160px] md:mt-[155px] flex flex-col items-center gap-y-5 max-w-[700px] mx-auto relative font-roboto-mono">
        <GenericTitle title="D-Squared's Edge" />

        <div className="text-center font-roboto md:text-xl text-dsqgray-200 md:text-white">
          Our trading engine capitalises on market inefficiencies and
          volatility.
        </div>

        <GenericButton
          text="Risk Management Framework"
          touchable={false}
          variant="outline-white"
          className="w-full text-base font-bold text-white cursor-default bg-dsqblack-200 hover:bg-dsqblack-200 hover:text-white mt-11"
        />

        <div className="flex flex-col mt-10 md:flex-row text-dsqgray-100 gap-y-6 md:gap-y-10">
          {dsquaredText.map((textItem, index) => {
            return (
              <div key={index} className="flex">
                <GenericBox
                  title={textItem.title}
                  text={textItem.text}
                  className="justify-center w-full text-center md:p-5 gap-y-5 md:hover:text-white"
                />
                {index != dsquaredText.length - 1 && <HorizontalLines />}
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-base text-center md:flex font-roboto md:text-xl text-dsqgray-100">
          {edgeText?.[router?.pathname]}
        </div>

        <Link
          href="https://docs.d2.finance/docs/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center md:justify-start"
        >
          <GenericButton
            text="Read our Docs"
            variant={isMobile ? "solid" : "outline-white"}
            className="mt-8 md:mt-12 px-9 md:px-12 "
            touchable
          />
        </Link>
      </div>
    </div>
  )
}
