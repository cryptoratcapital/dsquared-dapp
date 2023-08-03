import { GenericBox } from "@/common/components/Generic/GenericBox/GenericBox"
import GenericTitle from "@/common/components/Generic/GenericTitle/GenericTitle"
import { HorizontalLines } from "@/common/components/Generic/HorizontalLines/HorizontalLines"
import { useBreakpointValue } from "@chakra-ui/react"
import clsx from "clsx"

const valuesText = [
  {
    title: "Security",
    icon: "/logos/values1.svg",
    text: "We have structured our processes and organization to enhance security. We have two in-house security experts, segregation of duties, internal permissions audit, and limits to trader actions and whitelisted protocols hard-coded into the smart contracts.",
  },
  {
    title: "Transparency",
    icon: "/logos/values2.svg",
    text: "Every D-Squared trade is visible on the blockchain. We provide regular analytics to allow non-experts to understand how strategies are positioned, and post-epoch debriefs on performance.",
  },
  {
    title: "Customized",
    icon: "/logos/values3.svg",
    text: "Our Solidity code is custom-built from the ground up as a modular system. It is NOT a fork. A protocol should fully understand its own code. Our coding infrastructure seamlessly and efficiently fits our business model and our plans to expand the vault strategy.",
  },
  {
    title: "Composability",
    icon: "/logos/values4.svg",
    text: "We have built D-Squared on top of other innovative DeFi protocols. Users are empowered to build a portfolio that suits their performance goals by allocating between our different strategies.",
  },
  {
    title: "Risk Management",
    icon: "/logos/values5.svg",
    text: "D-Squared applies sophisticated risk management procedures that consider the price, size, volatility, liquidity, and inter-relationships of ETH with other cryptos.",
  },
]

export const Values = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <div className="relative">
      <div className="flex items-center flex-col mt-[110px] md:mt-[230px] max-w-[880px] mx-auto">
        <GenericTitle title="D-Squared's Values" />

        <div className="text-center mt-5 font-roboto md:text-xl text-dsqgray-200 md:text-white [&>p]:inline md:[&>p]:block">
          <p>
            {
              "We believe an effective protocol must unify itself around a set of core values that inform all of its decisions and procedures."
            }
          </p>
        </div>

        {valuesText.map((textItem, index) => {
          return (
            <div key={index} className="flex flex-col mt-8 md:flex-row">
              <GenericBox
                title={textItem.title}
                icon={textItem.icon}
                className="md:hover:text-dsqgreen-100 h-[150px] w-[150px] md:h-auto md:w-auto mx-auto mt-6 md:mt-0"
              />
              <HorizontalLines />
              <GenericBox
                text={textItem.text}
                className={clsx(
                  "text-left",
                  "gap-y-5",
                  "text-dsqgray-100",
                  "mt-14",
                  "md:mt-0",
                  isMobile ? "border-dsqgray-100" : "border-dsqgreen-100",
                )}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
