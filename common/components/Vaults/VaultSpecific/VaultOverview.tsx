import Image from "next/image"

const OverviewBox = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="flex flex-col px-10 py-5 text-xl border md:py-8 border-dsqgreen-100 gap-y-5 md:gap-y-10 font-roboto-mono">
      <p className="text-dsqgray-100">{title}</p>
      <p className="text-dsqgreen-100">{text}</p>
    </div>
  )
}

const overviewText = [
  { title: "Upside Potential", text: "Huge" },
  { title: "Downside", text: "Not Protected" },
  { title: "Performs Best", text: "Volatile Market" },
  { title: "Risk Profile", text: "High" },
]

const vaultOverviewText = {
  GM: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
}

const VaultOverview = () => {
  return (
    <div className="mt-[160px] md:mt-[200px] flex flex-col text-center">
      <div className="flex flex-col gap-y-4">
        <p className="text-2xl font-semibold md:text-4xl ">GM VAULT OVERVIEW</p>
        <p className="text-lg text-dsqgray-200 md:text-white">
          Our trading engine capitalises on market inefficiencies and volatility
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-20 md:grid-cols-2 lg:grid-cols-4">
        {overviewText.map(({ title, text }, index) => (
          <OverviewBox title={title} text={text} key={index} />
        ))}
      </div>

      <div className="flex flex-col px-10 py-8 mt-12 md:mt-16 border-[0.25px] border-dsqgreen-100 gap-y-8 max-w-[650px] w-full mx-auto bg-dsqblack-300 shadow-[0_0px_40px_rgba(0,_235,_171,_0.05)]">
        <p className="text-xl text-dsqgreen-100">Performance Graph</p>

        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto md:divide-x-[0.1px] text-dsqgray-100 gap-y-8 items-center">
          <div className="flex justify-center md:pr-20 md:justify-end">
            <Image
              src={`/vaults/gmperformance.svg`}
              alt="performance"
              width={200}
              height={150}
            />
          </div>
          <hr className="w-full my-6 border md:hidden border-dsqgray-50" />
          <div className="text-left md:pl-20 ">{vaultOverviewText["GM"]}</div>
        </div>
      </div>
    </div>
  )
}

export default VaultOverview
