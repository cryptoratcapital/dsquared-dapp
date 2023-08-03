import Image from "next/image"

const vaultsExplainedText = [
  {
    title: "Strategy",
    text: "Trade $ETH inside the GMX ETH/GLP Liquidity Pool on Arbitrum.",
  },

  {
    title: "Goal",
    text: "The algorithm is designed to return up to 2.5x of vault capital per epoch while risking up to 1x. These returns are fast and tailored to a crypto-native crowd.",
  },

  {
    title: "Risk",
    text: "There is no downside protection in the GM vault. Due to the riskier nature of these trades, not every epoch can be a winner.",
  },

  {
    title: "Duration",
    text: "The strategy can be terminated early when trading signals contradict each other and thus no clear position can be recommended by the model.",
  },
]

const VaultsExplained = () => {
  return (
    <div className="mt-[150px] flex flex-col text-center">
      <div className="flex flex-col gap-y-4">
        <p className="text-4xl font-semibold">GM VAULT EXPLAINED</p>
        <p className="text-lg">
          Simulate an options payoff during extreme volatility in either market
          direction — bullish or bearish
        </p>
      </div>

      <div className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {vaultsExplainedText.map(({ title, text }, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="flex flex-col items-center justify-start p-5 text-xl md:border font-roboto-mono md:p-8  md:border-dsqgray-100 text-dsqgreen-100 shadow-[0_0px_40px_rgba(0,_235,_171,_0.05)]">
                  {title}
                </div>

                <div className="justify-center hidden gap-10 mt-2 lg:flex">
                  <div>
                    <Image
                      src="/vaults/verticalLines.svg"
                      alt="lines"
                      width={1.5}
                      height={10}
                    />
                  </div>

                  <Image
                    src="/vaults/verticalLines.svg"
                    alt="lines"
                    width={1.5}
                    height={10}
                  />
                </div>

                <div className="flex flex-col bg-dsqblack-100 md:bg-inherit items-center justify-start mt-6 border font-roboto-mono p-5 md:p-8 border-dsqgreen-100 md:border-dsqgray-100 text-dsqgray-100 md:h-[180px] lg:h-[370px] xl:h-[270px] lg:mt-2">
                  {text}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VaultsExplained
