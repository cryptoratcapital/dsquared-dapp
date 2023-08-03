import Image from "next/image"
import Link from "next/link"

export const MobileNavModal = () => {
  return (
    <div className="flex flex-col justify-between w-full min-h-screen bg-dsqblack-200 bg-footerMobileNavBg">
      <nav className="h-full mt-[223px] text-xl font-bold gap-y-9 font-roboto-mono flex flex-col w-full items-center text-white">
        <Link href="/earn">
          <div className="cursor-pointer hover:text-dsqgreen-100">HOME</div>
        </Link>

        <Link href="/publicsale/">
          <div className="cursor-pointer hover:text-dsqgreen-100">SALE</div>
        </Link>

        <Link href="/vaults">
          <div className="hidden cursor-pointer hover:text-dsqgreen-100">
            VAULTS
          </div>
        </Link>

        <Link href="/earn">
          <div className="cursor-pointer hover:text-dsqgreen-100">EARN</div>
        </Link>
      </nav>

      <Image
        src="/logos/footerLogo.svg"
        alt="Dsquared logo"
        width={134}
        height={15}
        loading="lazy"
        className="mx-auto pb-11"
      />
    </div>
  )
}
