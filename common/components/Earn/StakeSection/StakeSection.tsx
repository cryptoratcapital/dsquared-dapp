import { GenericBox } from "@/common/components/Generic/GenericBox/GenericBox"
import GenericTitle from "@/common/components/Generic/GenericTitle/GenericTitle"
import { HorizontalLines } from "@/common/components/Generic/HorizontalLines/HorizontalLines"
import Link from "next/link"

const dsquaredText = [
  {
    title: "Step 1",
    text: "Connect your Wallet to the Earn Page and click Stake",
  },
  { title: "Step 2", text: "Approve the transaction" },
  { title: "Step 3", text: "Rewards accure over time and can be claimed" },
  { title: "Step 4", text: "Unstake your DSQ anytime" },
]

export const StakeSection = () => {
  return (
    <div className="relative">
      <div className="mt-[160px] md:mt-[191px] flex flex-col items-center gap-y-5 max-w-[700px] mx-auto font-roboto-mono">
        <GenericTitle title="How to stake your dsq" />

        <div className="text-lg text-center font-roboto md:text-xl text-dsqgray-200 md:text-white">
          <p className="inline md:block">
            If you have additional questions please come by in our
            <Link
              className="inline px-2 underline cursor-pointer text-dsqgreen-100"
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/mK4rzHg4ch"
            >
              Discord
            </Link>
            and ask
          </p>
        </div>

        <div className="flex flex-col lg:flex-row mt-[80px] text-dsqgray-100 gap-y-6 md:gap-y-10">
          {dsquaredText.map((textItem, index) => {
            return (
              <div key={index} className="flex">
                <GenericBox
                  title={textItem.title}
                  text={textItem.text}
                  className="justify-start w-full max-w-[500px] text-center md:p-5 gap-y-5 md:hover:text-white"
                />
                <div className="hidden my-auto lg:block">
                  {index != dsquaredText.length - 1 && <HorizontalLines />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
