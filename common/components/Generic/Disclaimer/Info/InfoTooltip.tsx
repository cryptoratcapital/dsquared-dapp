import { Tooltip, useBreakpointValue } from "@chakra-ui/react"
import Image from "next/image"
import { useState } from "react"

export const CustomToolTip = ({
  text,
  toolTipText,
}: {
  text: string
  toolTipText: string
}) => {
  const isMobile = useBreakpointValue({ base: true, sm: false })

  const [iconHovering, setIconHovered] = useState(false)
  const onMouseEnter = () => setIconHovered(true)
  const onMouseLeave = () => setIconHovered(false)

  return (
    <div className="flex items-start text-xl font-bold gap-x-2">
      <p>{text}</p>
      <Tooltip
        label={toolTipText}
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
          <Image
            src={iconHovering ? "/logos/infohover.svg" : "/logos/info.svg"}
            alt="icon-hover"
            height={19}
            width={19}
            className="mt-1"
          />
        </div>
      </Tooltip>
    </div>
  )
}
