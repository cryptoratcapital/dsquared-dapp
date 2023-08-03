import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className=" bg-footerMobileBg md:bg-footerBg">
      <div className="mt-[160px] flex flex-col text-lg">
        <div className="flex flex-col items-center justify-center text-center md:flex-row md:items-start gap-x-16 text-dsqgray-100">
          <div className="flex flex-col text-center md:text-left gap-y-6">
            <div className="font-semibold text-white">COMMUNITY</div>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://discord.gg/N78wpKt73A"
            >
              <div className="cursor-pointer hover:text-white">Discord</div>
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/Dsquaredfinance"
            >
              <div className="cursor-pointer hover:text-white">Twitter</div>
            </Link>

            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://medium.com/@Dsquaredfinance"
            >
              <div className="cursor-pointer hover:text-white">Medium</div>
            </Link>
          </div>
          <div className="flex flex-col mt-10 text-center md:text-left gap-y-6 md:mt-0">
            <div className="font-semibold text-white">DOCUMENTATION</div>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://docs.d2.finance/docs/"
            >
              <div className="cursor-pointer hover:text-white">Gitbook</div>
            </Link>
          </div>
        </div>

        <div className="mx-auto mb-16 mt-14 md:mt-20">
          <Image
            src="/logos/footerLogo.svg"
            alt="Dsquared logo"
            width={190}
            height={22}
            loading="lazy"
          />
        </div>
      </div>
    </footer>
  )
}
