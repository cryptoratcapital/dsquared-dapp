import Image from "next/image"

const VaultInfoShimmer = () => {
  return (
    <div className="col-span-1 md:col-span-6 border-[0.5px] border-dsqgreen-100 p-7">
      <div className="flex justify-between">
        <div className="flex flex-col text-left gap-y-1">
          <p className="font-light">USDC</p>
          <div className="flex gap-x-4">
            <p className="text-6xl font-bold">GM</p>
            <Image
              src={`/logos/arbitrum.svg`}
              alt="chainName"
              width={35}
              height={40}
            />
          </div>
        </div>

        <div className="flex justify-between text-lg font-light gap-x-24">
          <p>Auto Rolling</p>
          <p>Epoch </p>
        </div>
      </div>

      <div className="grid grid-cols-4 mt-24 gap-x-20">
        <div className="flex flex-col text-left gap-y-4">
          <div className="flex gap-x-4">
            <p className="font-light">Risk</p>
            <Image
              className="cursor-pointer"
              src="/logos/info.svg"
              alt="info"
              width={16}
              height={16}
            />
          </div>
          <p className="text-2xl font-semibold">HIGH</p>
        </div>

        <div className="flex flex-col text-left gap-y-4">
          <div className="flex gap-x-4">
            <p className="font-light">Last Epoch</p>
            <Image
              className="cursor-pointer"
              src="/logos/info.svg"
              alt="info"
              width={16}
              height={16}
            />
          </div>
          <p className="text-2xl font-semibold">40%</p>
        </div>

        <div className="flex flex-col text-left gap-y-4">
          <div className="flex gap-x-4">
            <p className="font-light">Lock Up</p>
            <Image
              className="cursor-pointer"
              src="/logos/info.svg"
              alt="info"
              width={16}
              height={16}
            />
          </div>
          <p className="text-2xl font-semibold">100000</p>
        </div>

        <div className="flex flex-col text-left gap-y-4">
          <div className="flex gap-x-4">
            <p className="font-light">APY</p>
            <Image
              className="cursor-pointer"
              src="/logos/info.svg"
              alt="info"
              width={16}
              height={16}
            />
          </div>
          <p className="text-2xl font-semibold">30</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-20 gap-y-3">
        <div className="w-full h-2 bg-dsqgreen-200">
          <div className="h-2 bg-dsqgreen-100" style={{ width: `50%` }}></div>
        </div>

        <div className="flex justify-end text-sm gap-x-2">
          <p className="text-dsqgray-100">TVL / Capacity</p>
          <p>50000/100000 USDC</p>
        </div>
      </div>
    </div>
  )
}

export default VaultInfoShimmer
