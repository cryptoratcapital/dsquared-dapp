import Link from "next/link"
import GenericTitle from "../../Generic/GenericTitle/GenericTitle"

export const EarnTitle = () => {
  return (
    <>
      <GenericTitle title="Earn DSQ" />
      <div className="text-center font-roboto md:text-xl text-dsqgray-200 md:text-white">
        <p className="inline md:block">
          Stake your DSQ tokens to earn rewards.{" "}
        </p>
        <p className="inline md:block">
          A detailed explanation is available in the
          <Link
            className="inline ml-2 underline cursor-pointer text-dsqgreen-100"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.d2.finance/docs/"
          >
            documentation
          </Link>
        </p>
      </div>
    </>
  )
}
