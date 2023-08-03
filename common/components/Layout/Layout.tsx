import { web3ModalState } from "@/common/store"
import { useBreakpointValue, useDisclosure } from "@chakra-ui/react"
import Head from "next/head"
import { FC, ReactNode, useEffect, useState } from "react"
import Discalimer from "../Disclaimer/Disclaimer"
import { getAlertDate } from "../Disclaimer/helper"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { MobileNavModal } from "./MobileNavModal/MobileNavModal"

interface Props {
  headless?: boolean
  hideNavigation?: boolean
  children?: ReactNode
}

export const Layout: FC<Props> = ({
  headless,
  children,
  hideNavigation = false,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const account = web3ModalState((state) => state.account)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (
      (new Date(Date.now()) > new Date(getAlertDate()) || !getAlertDate()) &&
      account
    ) {
      onOpen()
    }
  }, [onOpen, account])

  return (
    <div className="flex flex-col min-h-screen text-white bg-dsqblack-200 font-roboto">
      {!headless && (
        <Head>
          <title>Dsquared | Options Based DeFi Vaults</title>
          <link rel="icon" href="./logos/ds2BoxLogo.svg" />
          <meta
            name="description"
            content="Actively traded Quant vaults on Arbitrum and Avalanche"
          />
        </Head>
      )}

      <Header
        mobileExpanded={mobileExpanded}
        setMobileExpanded={setMobileExpanded}
        hideNavigation={hideNavigation}
      />

      {isMobile && mobileExpanded ? (
        <MobileNavModal />
      ) : (
        <>
          <div className="max-w-[1440px] space-y-8 md:space-y-12 min-h-screen px-7 lg:px-16 mt-[150px] mx-auto">
            {children}
          </div>

          <Footer />
        </>
      )}
      <Discalimer isOpen={isOpen} onClose={onClose} />
    </div>
  )
}
