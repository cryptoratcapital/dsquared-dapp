import { useVaultOverview } from "@/common/utils/queries"
import { loadingVaultsData } from "../loadingData"
import VaultGeneralSingle from "./VaultGeneralSingle"

const VaultGeneral = () => {
  const {
    data: vaultOverviewData,
    isLoading: vaultOverviewLoading,
    isError: vaultOverviewError,
  } = useVaultOverview(true)

  const vaultDataLoading = vaultOverviewLoading || vaultOverviewError

  return (
    <div className="flex flex-col gap-y-3">
      <div className="text-2xl font-bold text-center md:text-4xl">VAULTS</div>

      <div className="text-lg text-center text-dsqgray-200 md:text-xl md:text-white ">
        Choose your vault and invest with us
      </div>

      <div className="grid items-center grid-cols-1 mt-8 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-20 place-items-center">
        {vaultDataLoading
          ? loadingVaultsData.map((vaultData, index) => (
              <div
                key={index}
                className="pointer-events-none animate-pulse blur-md"
              >
                <VaultGeneralSingle {...vaultData} />
              </div>
            ))
          : vaultOverviewData?.allVaultsOverviewData.map((vaultData, index) => (
              <VaultGeneralSingle key={index} {...vaultData} />
            ))}
      </div>
    </div>
  )
}

export default VaultGeneral
