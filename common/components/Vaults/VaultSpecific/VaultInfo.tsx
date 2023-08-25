import { CustomTooltip } from "@/common/components/Vaults/VaultGeneral/VaultGeneralSingle"
// import { timeExtraction } from "@/common/utils/helpers/utils"
import { timeExtraction } from "@/common/utils/helpers/utils"
import { VaultSpecificContext } from "@/pages/vaults/[vaultname]"
import { useBreakpointValue } from "@chakra-ui/react"
import Image from "next/image"
import { useContext } from "react"
import { vaultIconText } from "../VaultGeneral/vaultText"

const InfoBox = ({
  title,
  text,
  risk,
}: {
  title: string
  text: string
  risk: string
}) => {
  return (
    <div className="flex flex-col text-left gap-y-2 md:gap-y-4 ">
      <div className="flex gap-x-2 md:gap-x-4">
        <p className="text-lg font-light text-dsqgray-100 md:text-white">
          {title}
        </p>
        <div className="my-auto">
          <CustomTooltip text={text} />
        </div>
      </div>
      <p className="text-xl font-semibold md:text-2xl">{risk.toUpperCase()}</p>
    </div>
  )
}

const VaultInfo = () => {
  const {
    chainName,
    vaultName,
    risk,
    lastApy,
    lockupSeconds,
    annualisedAPY,
    maxSupply,
    totalSupply,
    percentFilled,
    epochNumber,
  } = useContext(VaultSpecificContext)

  const isMobile = useBreakpointValue({ base: true, md: false })
  const { daysLeft } = timeExtraction(lockupSeconds)

  return (
    <div className="lg:col-span-6 border-[0.5px] border-dsqgreen-100 p-7 hover:bg-none">
      <div className="flex justify-between">
        <div className="flex flex-col text-left gap-y-1">
          <p className="text-lg font-light text-dsqgray-100 md:text-white">
            USDC
          </p>
          <div className="flex gap-x-4">
            <p className="text-5xl font-bold md:text-6xl">
              {vaultName.replace("Plus", "++")}
            </p>
            <Image
              src={`/logos/${chainName}.svg`}
              alt="icon-hover"
              height={isMobile ? 22 : 35}
              width={isMobile ? 25 : 40}
            />
          </div>
        </div>

        <div className="flex justify-between text-lg font-light gap-x-4 md:gap-x-24 text-dsqgray-100 md:text-white">
          <p>Auto Rolling</p>
          <p>Epoch {epochNumber} </p>
        </div>
      </div>

      <div className="grid justify-between grid-cols-2 gap-4 mt-24 sm:flex xl:gap-x-12">
        <InfoBox title={"Risk"} text={vaultIconText[0]} risk={risk} />

        <InfoBox
          title={"Last Epoch"}
          text={vaultIconText[0]}
          risk={`${lastApy} %`}
        />

        <InfoBox
          title={"Lock Up"}
          text={vaultIconText[1]}
          risk={`${daysLeft} Days`}
        />

        <InfoBox
          title={"APY"}
          text={vaultIconText[2]}
          risk={`${annualisedAPY} %`}
        />
      </div>

      <div className="flex flex-col gap-4 mt-20 gap-y-3">
        <div className="w-full h-2 bg-dsqgreen-200">
          <div
            className="h-2 bg-dsqgreen-100"
            style={{ width: `${percentFilled}%` }}
          ></div>
        </div>

        <div className="flex justify-end text-sm gap-x-2">
          <p className="text-dsqgray-100">TVL / Capacity</p>
          <p>{`${totalSupply}/${maxSupply}`} USDC</p>
        </div>
      </div>
    </div>
  )
}

export default VaultInfo
