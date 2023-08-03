import Image from "next/image"
import Link from "next/link"

export const StakingDisclaimer = () => {
  return (
    <div className="relative max-w-[1180px] pt-[180px] px-4 mx:px-0 md:mt-[200px]">
      <p className="text-xl font-bold">Disclaimer</p>
      <hr className="w-full border border-dsqgray-50 my-7" />
      <div className="flex flex-col text-dsqgray-100 gap-y-2">
        <p>
          The custom D-Squared staking contract has been audited by Paladin
          Blockchain Security. Their audit report can be found{" "}
          <Link
            className="inline underline cursor-pointer text-dsqgreen-100"
            target="_blank"
            rel="noopener noreferrer"
            href="https://paladinsec.co/projects/dsquared/"
          >
            here.
          </Link>
        </p>
        <p>
          However, staking is subject to risks, including (but not limited to)
          market risk, D-Squared counterparty risk and smart contract risk. The
          indicative APY is not guaranteed. Please ensure that you fully
          understand the risks prior to staking. By engaging with this smart
          contract, you confirm that you have undertaken independent analysis
          and due diligence. The parties involved in this contract assume no
          responsibility for any loss, damage, or liability arising from using
          this contract. Information on this page is periodically updated but
          there is no guarantee it is correct, complete, and current.
        </p>
      </div>

      <div className="mt-10">
        <Link
          className="mt-10"
          target="_blank"
          rel="noopener noreferrer"
          href="https://paladinsec.co/"
        >
          <Image
            src="logos/paladinAudit.svg"
            alt="paladinAudit"
            width={250}
            height={250}
          />
        </Link>
      </div>
    </div>
  )
}
