import { Tooltip, useBreakpointValue } from "@chakra-ui/react"
import clsx from "clsx"
import Image from "next/image"
import { useState } from "react"

interface GridInterface {
  stage: number
  totalCells: number
  activeCells: number
}

const stageText: { [n: number]: string } = {
  1: "In Stage 1, users can deposit a maximum of 69 ETH with no lock-up period. Once Stage 1 is filled, it will activate Stage 2, which has a lock-up period of 1 month.",
  2: "Stage 2 is activated once Stage 1 is completed. Stage 2 has a lock-up period of 1 month.",
  3: "Stage 3 is activated once Stage 2 is completed. Stage 3 has a lock-up period of 2 months. ",
  4: "In Stage 4, during the first 48 hours only whitelisted addresses can deposit. Each address has a cap of 1eth. After the whitelist period ends, anyone can deposit with no cap. Stage 4 has a lockup period of 3 months.",
}

const CustomToolTip = ({ stage }: { stage: number }) => {
  const isMobile = useBreakpointValue({ base: true, sm: false })

  const [iconHovering, setIconHovered] = useState(false)
  const onMouseEnter = () => setIconHovered(true)
  const onMouseLeave = () => setIconHovered(false)

  return (
    <Tooltip
      label={stageText[stage]}
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

const Grid = ({ stage, totalCells, activeCells }: GridInterface) => {
  return (
    <article className="mt-7">
      <div
        className={clsx(
          "flex justify-between font-roboto-mono text-lg pb-3 md:pr-[65px] ",
          activeCells > 0 ? "text-dsqgreen-100" : "text-dsqgray-100",
        )}
      >
        <div className="flex items-center gap-x-4">
          <p>STAGE {` ${stage}`}</p>
          <CustomToolTip stage={stage}></CustomToolTip>
        </div>

        <p>{`${activeCells}/${totalCells} `} ETH</p>
      </div>

      <div className="grid gap-1 grid-cols-16 md:grid-cols-23 gap-y-2">
        {[...Array(totalCells)].map((x, i) => (
          <div
            key={i}
            className={clsx(
              "w-4",
              "h-4",
              "border",
              activeCells > 0 ? "border-dsqgreen-100" : "border-dsqgray-100",
              activeCells > i ? "bg-dsqgreen-100" : "bg-transpatent",
            )}
          />
        ))}
      </div>
    </article>
  )
}

export default Grid
