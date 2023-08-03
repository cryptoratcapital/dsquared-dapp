import { useBreakpointValue } from "@chakra-ui/react"
import clsx from "clsx"
import Image from "next/image"

interface GenericBoxInterface {
  title?: string
  text?: string
  icon?: string
  className?: string
  heightPreset?: boolean
}

export const GenericBox = ({
  title,
  text,
  icon,
  className,
  heightPreset = true,
}: GenericBoxInterface) => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <>
      <div
        className={clsx(
          "p-6 flex flex-col justify-start items-center font-roboto-mono border md:p-6 border-dsqgreen-100 md:border-dsqgray-100 md:hover:bg-dsqblack-200 md:hover:border-dsqgreen-100 group min-h-[100px] min-w-full md:min-w-[190px] md:min-h-[200px]",
          className,
          heightPreset ? "min-h-[100px] md:min-w-[190px] md:min-h-[200px]" : "",
        )}
      >
        {title && (
          <p
            className={clsx(
              isMobile ? "text-lg" : "text-xl",
              "font-bold text-center md:text-dsqgray-100",
              icon
                ? "text-dsqgreen-100 md:group-hover:text-dsqgreen-100"
                : "text-white md:group-hover:text-white",
            )}
          >
            {title}
          </p>
        )}

        {text && (
          <p className={clsx("font-roboto-mono md:group-hover:text-white")}>
            {text}
          </p>
        )}

        {icon && (
          <Image
            src={icon}
            alt="icon"
            width={isMobile ? 35 : 47}
            height={isMobile ? 35 : 47}
            className="mt-6 md:mt-8"
          />
        )}
      </div>
    </>
  )
}
