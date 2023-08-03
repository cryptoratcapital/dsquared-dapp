export const Disclaimer = () => {
  return (
    <div className="relative max-w-[1180px] pt-[180px] px-4 mx:px-0 md:mt-[200px]">
      <p className="text-xl font-bold">Disclaimer</p>

      <hr className="w-full border border-dsqgray-50 my-7" />

      <p className="text-lg text-dsqgray-100">
        {
          "Vaults are subject to risks, including (but not limited to) market risk, counterparty risk, and smart contract risk. The indicative APY is not guaranteed and some epochs may produce a negative return on capital deposited. Epoch history returns are based on amounts returned to depositors upon the epoch's end. Information on this page is periodically updated but there is no guarantee it is correct, complete and current."
        }
      </p>
    </div>
  )
}
