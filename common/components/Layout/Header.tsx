import Image from "next/image"
import Link from "next/link"
import React from "react"
import { ConnectButton } from "../Generic/GenericButton/GenericButton"

interface HeaderInterface {
  mobileExpanded: boolean
  hideNavigation: boolean
  setMobileExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({
  mobileExpanded,
  setMobileExpanded,
  hideNavigation,
}: HeaderInterface) => {
  return (
    <header className="fixed top-0 z-50 w-screen bg-dsqblack-200/60 backdrop-blur-2xl">
      <div className="max-w-[1440px] mx-auto flex h-[100px] justify-between items-center lg:px-16 py-7 gap-x-4 px-8">
        <Link href="/publicsale" className="hidden cursor-pointer md:flex">
          <Image
            src="/logos/ds2Logo.svg"
            alt="ds2"
            width={252}
            height={40}
            loading="lazy"
          />
        </Link>

        <div className="flex items-center md:hidden gap-x-4">
          {mobileExpanded ? (
            <Image
              src="/logos/closeMobileNav.svg"
              alt="close"
              width={30}
              height={30}
              loading="lazy"
              className="cursor-pointer "
              onClick={() => setMobileExpanded(false)}
            />
          ) : (
            <Image
              src="/logos/mobileNav.svg"
              alt="open"
              width={30}
              height={30}
              loading="lazy"
              className="cursor-pointer "
              onClick={() => setMobileExpanded(true)}
            />
          )}

          <Image
            src="/logos/ds2Icon.svg"
            alt="ds2"
            width={40}
            height={40}
            loading="lazy"
            className="cursor-pointer "
          />
        </div>
        {!hideNavigation && (
          <>
            <nav className="hidden text-lg font-semibold md:flex gap-x-14 font-roboto-mono">
              <Link href="/earn/">
                <div className="cursor-pointer hover:text-dsqgreen-100">
                  HOME
                </div>
              </Link>

              <Link
                href="/publicsale/"
                className="cursor-pointer hover:text-dsqgreen-100"
              >
                SALE
              </Link>

              <Link
                href="/"
                className="hidden cursor-pointer hover:text-dsqgreen-100"
              >
                VAULTS
              </Link>

              <Link
                href="/earn"
                className="cursor-pointer hover:text-dsqgreen-100"
              >
                EARN
              </Link>
            </nav>

            <ConnectButton />
          </>
        )}
      </div>
    </header>
  )
}
