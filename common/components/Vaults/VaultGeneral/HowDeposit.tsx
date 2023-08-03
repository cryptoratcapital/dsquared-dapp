import { GenericBox } from "@/common/components/Generic/GenericBox/GenericBox"
import { GenericButton } from "@/common/components/Generic/GenericButton/GenericButton"
import { HorizontalLines } from "@/common/components/Generic/HorizontalLines/HorizontalLines"

const depositText = [
  {
    title: "Step 1",
    text: "Open the vault and click in amount field and type deposit amount",
  },
  {
    title: "Step 2",
    text: "Approve the transaction",
  },
  { title: "Step 3", text: "Click Deposit button" },
]

export const HowToDeposit = () => {
  return (
    <div className="relative">
      <div className="mt-[170px] md:mt-[260px] flex flex-col items-center gap-y-5 max-w-[700px] mx-auto relative font-roboto-mono">
        <div className="text-2xl font-bold uppercase sm:text-4xl font-roboto">
          HOW TO DEPOSIT
        </div>

        <div className="text-center font-roboto md:text-xl text-dsqgray-200 md:text-white">
          If you have additional Questions please come by in our{" "}
          <a
            className="underline text-dsqgreen-100 underline-offset-2"
            href="https://discord.com/invite/mK4rzHg4ch"
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>{" "}
          and ask
        </div>

        <GenericButton
          text="Risk Management Framework"
          touchable={false}
          variant="outline-white"
          className="w-full text-base font-bold text-white cursor-default bg-dsqblack-200 hover:bg-dsqblack-200 hover:text-white mt-11"
        />

        <div className="flex flex-col mt-10 md:flex-row text-dsqgray-100 gap-y-6 md:gap-y-10">
          {depositText.map((textItem, index) => {
            return (
              <div key={index} className="flex">
                <GenericBox
                  title={textItem.title}
                  text={textItem.text}
                  className="justify-start w-full text-center md:p-5 gap-y-5 md:hover:text-white md:w-fit"
                />
                {index != depositText.length - 1 && <HorizontalLines />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
