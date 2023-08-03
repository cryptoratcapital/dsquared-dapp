import { GenericButton } from "@/common/components/Generic/GenericButton/GenericButton"
import { VaultOverviewInterface } from "@/common/interfaces/Vaults"
import { Tooltip, useBreakpointValue } from "@chakra-ui/react"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export const vaultIconText = [
  "The exposure of your capital to loss based on our assessment relative to other D-Squared vaults.",
  "Performance gain or loss of most recent completed epoch in this vault",
  "Length of time funds are locked in the vault between beginning and ending of the next epoch.",
]

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
  apy,
  vaultOpen,
  vaultTime,
  risk,
  lastEpoch,
  vaultLenght,
  vaultCapacity,
  vaultFilled,
  vaultPercentageFilled,
  chainName,
}: VaultOverviewInterface) => {
  const isMobile = useBreakpointValue({ base: true, sm: false })

  return (
    <div className="max-w-[400px] w-full flex flex-col gap-y-7 ">
      <div className="flex flex-col border border-dsqgray-100 bg-dsqblack-200 hover:bg-dsqblack-100 hover:border-dsqgreen-100 hover:bg-none">
        <div className="px-5 pt-5 md:px-7 md:pt-7">
          <div className="flex justify-between font-light">
            <p>USDC</p>
            <p>Annualized APY</p>
          </div>

          <div className="flex justify-between mt-1 text-4xl font-semibold">
            <div className="flex items-center gap-x-7">
              <p>{vaultName}</p>
              <Image
                src={`logos/${chainName}.svg`}
                alt="chain"
                width={26}
                height={30}
              />
            </div>
            <p>{`${apy}%`}</p>
          </div>
        </div>

        <div
          className={clsx(
            "px-8 py-4 mt-5 text-center",
            vaultOpen
              ? "bg-dsqgreen-200 text-dsqgreen-100"
              : "bg-dsqgray-300 text-dsqgray-100",
          )}
        >
          {vaultOpen ? "Deposits & Withdrawal closing" : "Vault closing:"} in{" "}
          {vaultTime}
        </div>

        <div className="flex flex-col px-5 mt-3 md:px-7 mb-7">
          <div className="flex justify-center text-center gap-x-2">
            <p
              className={clsx(
                "text-lg underline cursor-pointer  underline-offset-2",
                vaultOpen ? "text-dsqgreen-100" : "text-dsqgray-100",
              )}
            >
              {vaultOpen ? "Deposit" : "Check vault"}
            </p>
            <Image
              className="cursor-pointer"
              src={
                vaultOpen
                  ? "generic/informationGreen.svg"
                  : "generic/informationGray.svg"
              }
              alt="info"
              width={14}
              height={14}
            />
          </div>

          <div className="mt-10">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm text-dsqgray-100">Risk</p>
                  <CustomTooltip text={vaultIconText[0]} />
                </div>
                <div className="text-lg">{risk}</div>
              </div>

              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm text-dsqgray-100">Last Epoch</p>
                  <CustomTooltip text={vaultIconText[1]} />
                </div>
                <div className="text-lg">{`${lastEpoch}%`}</div>
              </div>

              <div className="flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm text-dsqgray-100">Lock Up</p>
                  <CustomTooltip text={vaultIconText[2]} />
                </div>
                <div className="text-lg">{vaultLenght} Days</div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-12">
              <div className="flex justify-between">
                <p>Vault Filled</p>
                <p>{vaultPercentageFilled}%</p>
              </div>

              <div className="w-full h-2 bg-dsqgreen-200">
                <div
                  className="h-2 bg-dsqgreen-100"
                  style={{ width: `${vaultPercentageFilled}%` }}
                ></div>
              </div>

              <div className="flex justify-end text-sm gap-x-2">
                <p className="text-dsqgray-100">TVL / Capacity</p>
                <p>{`${vaultFilled}/${vaultCapacity}`} USDC</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link href={`/vaults/${vaultName}/?chain=${chainName}`}>
        <GenericButton
          text="Enter Vault"
          variant={isMobile ? "solid" : "outline-white"}
          touchable
          className="w-[300px] md:w-full mx-auto"
        />
      </Link>
    </div>
  )
}

export default VaultGeneralSingle
