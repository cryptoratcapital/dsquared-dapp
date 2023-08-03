import { useBreakpointValue } from "@chakra-ui/react"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

const VaultTitle = ({
  vaultName,
  vaultOpen,
}: {
  vaultName: string
  vaultOpen?: boolean
}) => {
  const VaultStatus = () => {
    return (
      <div
        className={clsx(
          "px-4 py-3 text-xl border border-dsqgreen-100 rounded-xl text-dsqgreen-100 my-auto shadow-[0_0px_40px_rgba(0,_235,_171,_0.1)]",
          !vaultOpen && "animate-pulse blur-md",
        )}
      >
        {vaultOpen ? "Vault is open" : "Vault is closed"}
      </div>
    )
  }

  const isMobile = useBreakpointValue({ base: true, sm: false })

  return (
    <div className="flex justify-start sm:justify-between gap-x-12">
      <div className="flex items-start gap-x-4">
        <Link href={"/vaults/"}>
          <Image
            className="cursor-pointer"
            src="/logos/backPolygon.svg"
            alt="backpolygon"
            width={isMobile ? 13 : 20}
            height={isMobile ? 10 : 20}
          />
        </Link>
        <p className="sm:text-xl text-dsqgreen-100">Back</p>
      </div>

      <div className="flex flex-col text-center gap-y-5">
        <p className="text-2xl font-bold sm:text-4xl">{`${vaultName} Vault`}</p>
        <p className="text-lg text-dsqgray-200 sm:text-xl sm:text-white">
          For all the risk lovers
        </p>

        <div className="sm:hidden">
          <VaultStatus />
        </div>
      </div>

      <div className="hidden sm:block">
        <VaultStatus />
      </div>
    </div>
  )
}

export default VaultTitle
