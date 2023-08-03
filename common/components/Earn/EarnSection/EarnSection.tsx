import { EarnTitle } from "../EarnTitle/EarnTitle"
import { DSQSection } from "./DSQSection"
import { EsDSQSection } from "./EsDSQSection"

export const EarnSection = () => {
  return (
    <div className="flex flex-col items-center gap-y-5 w-full xl:min-w-[1180px] xl:mt-0">
      <EarnTitle />
      <div className="flex flex-col xl:flex-row xl:gap-x-9 xl:min-h-[200px] mt-11 xl:mt-14 gap-y-12 xl:gap-y-0">
        <DSQSection />
        <EsDSQSection />
      </div>
    </div>
  )
}
