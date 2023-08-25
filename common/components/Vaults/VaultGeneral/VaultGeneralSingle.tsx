import { GenericButton } from "@/common/components/Generic/GenericButton/GenericButton"
import { VaultGeneralSingleInterface } from "@/common/interfaces/Vaults"
import { timeExtraction } from "@/common/utils/helpers/utils"
import { Tooltip, useBreakpointValue } from "@chakra-ui/react"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChainExplorerBaseURL, ChainID } from "../../../constants/ChainID"
import { VaultCurrentState, VaultFutureState } from "../../../constants/Vaults"
import { vaultIconText } from "./vaultText"

export const CustomTooltip = ({ text }: { text: string }) => {
  const [iconHovering, setIconHovered] = useState(false)
  const onMouseEnter = () => setIconHovered(true)
  const onMouseLeave = () => setIconHovered(false)
  const isMobile = useBreakpointValue({ base: true, sm: false })

  return (
    <Tooltip
      label={text}
      fontWeight="semibold"
      bg={isMobile ? "dsqgreen.100" : "dsqblack.200"}
      textColor={isMobile ? "dsqblack.100" : "white"}
      border="1px"
      borderColor={isMobile ? "dsqblack.100" : "dsqgreen.100"}
      rounded="md"
      p={5}
    >
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="cursor-pointer"
      >
        {iconHovering ? (
          <Image
            src="/logos/infohover.svg"
            alt="icon-hover"
            height={19}
            width={19}
          />
        ) : (
          <Image
            src="/logos/info.svg"
            alt="icon-hover"
            height={19}
            width={19}
          />
        )}
      </div>
    </Tooltip>
  )
}

const VaultGeneralSingle = ({
  vaultName,
  vaultCurrentState,
  vaultFutureState,
  deltaSeconds,
  risk,
  annualisedAPY,
  lastApy,
  lockupSeconds,
  maxSupply,
  totalSupply,
  percentFilled,
  chainName,
  epochNumber,
  className,
  vaultAddress,
}: VaultGeneralSingleInterface) => {
  const isMobile = useBreakpointValue({ base: true, sm: false })
  const { daysLeft: daysVaultDuration } = timeExtraction(lockupSeconds)

  const { daysLeft: daysLeftStatus, hoursLeft: hoursLeftStatus } =
    timeExtraction(deltaSeconds)

  const vaultExplorerUrl = ChainExplorerBaseURL[chainName] + vaultAddress
  const chainId = ChainID[chainName]

  return (
    <div
      className={clsx(className, "max-w-[400px] w-full flex flex-col gap-y-7")}
    >
      <div className="flex flex-col border border-dsqgray-100 bg-dsqblack-200 hover:bg-dsqblack-100 hover:border-dsqgreen-100 hover:bg-none">
        <div className="px-5 pt-5 md:px-7 md:pt-7">
          <div className="flex justify-between font-light">
            <p>USDC</p>
            <p>Annualized APY</p>
          </div>

          <div className="flex justify-between mt-1 text-4xl font-semibold">
            <div className="flex items-center gap-x-7">
              <p>{vaultName.replace("Plus", "++")}</p>
              <Image
                src={`logos/${chainName}.svg`}
                alt="chain"
                width={26}
                height={30}
              />
            </div>
            <p>{`${annualisedAPY}%`}</p>
          </div>
        </div>

        <div
          className={clsx(
            "px-3 py-4 mt-5 mx-4 text-center justify-center flex gap-x-1 text-sm",
            vaultCurrentState === VaultCurrentState.DEPOSITSOPEN ||
              vaultCurrentState === VaultCurrentState.WITHDRAWALSONLY
              ? "bg-dsqgreen-200 text-dsqgreen-100"
              : "bg-dsqgray-300 text-dsqgray-100",
          )}
        >
          <p>{vaultFutureState}</p>
          <p
            className={clsx(
              vaultFutureState === VaultFutureState.COMINGSOON ||
                (vaultFutureState === VaultFutureState.RESTRICTEDWITHDRAWAL &&
                  "hidden"),
            )}
          >
            {daysLeftStatus} Days {hoursLeftStatus} Hours
          </p>
        </div>

        <div className="flex flex-col px-5 mt-3 md:px-7 mb-7">
          <Link
            className="inline px-2 cursor-pointer text-dsqgreen-100"
            target="_blank"
            rel="noopener noreferrer"
            href={vaultExplorerUrl}
          >
            <div className="flex justify-center text-center gap-x-2">
              <p
                className={clsx(
                  "text-lg underline underline-offset-2",
                  vaultCurrentState === VaultCurrentState.DEPOSITSOPEN
                    ? "text-dsqgreen-100"
                    : "text-dsqgray-100",
                )}
              >
                {vaultCurrentState === VaultCurrentState.DEPOSITSOPEN
                  ? "Deposit"
                  : "Check vault"}
              </p>
              <Image
                src={
                  vaultCurrentState === VaultCurrentState.DEPOSITSOPEN
                    ? "generic/informationGreen.svg"
                    : "generic/informationGray.svg"
                }
                alt="info"
                width={14}
                height={14}
              />
            </div>
          </Link>

          <div className="mt-10">
            <div className="grid grid-cols-3 gap-y-4">
              <div className="flex flex-col items-start gap-y-4">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm text-dsqgray-100">Risk</p>
                  <CustomTooltip text={vaultIconText[0]} />
                </div>
                <div className="text-lg">{risk}</div>
              </div>

              <div className="flex flex-col items-center gap-y-4">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm text-dsqgray-100">Last Epoch</p>
                  <CustomTooltip text={vaultIconText[1]} />
                </div>
                <div className="text-lg">{`${lastApy}%`}</div>
              </div>

              <div className="flex flex-col items-end gap-y-4">
                <div className="flex gap-x-2">
                  <p className="text-sm text-dsqgray-100">Lock Up</p>
                  <CustomTooltip text={vaultIconText[2]} />
                </div>
                <div className="text-lg">{`${daysVaultDuration} Days`}</div>
              </div>

              <div className="flex flex-col items-start col-span-2 gap-y-4">
                <div className="flex gap-x-2">
                  <p className="text-sm text-dsqgray-100">Epoch Number</p>
                  <CustomTooltip text={vaultIconText[0]} />
                </div>
                <div className="text-lg">{epochNumber}</div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-12">
              <div className="flex justify-between">
                <p>Vault Filled</p>
                <p>{percentFilled}%</p>
              </div>

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
        </div>
      </div>

      <div className="">
        <Link href={`/vaults/${vaultName}/?chainId=${chainId}`}>
          <GenericButton
            text="Enter Vault"
            variant={isMobile ? "solid" : "outline-white"}
            touchable
            className="w-full mx-auto "
          />
        </Link>
      </div>
    </div>
  )
}

export default VaultGeneralSingle
