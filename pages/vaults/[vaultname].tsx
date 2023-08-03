import { Disclaimer } from "@/common/components/Generic/Disclaimer/Disclaimer"
import { Layout } from "@/common/components/Layout/Layout"
import { defaultVaultContextValues } from "@/common/components/Vaults/loadingData"
import VaultDepositShimmer from "@/common/components/Vaults/VaultSpecific/VaultDepositShimmer"
import VaultInfoShimmer from "@/common/components/Vaults/VaultSpecific/VaultInfoShimmer"
import VaultInteractive from "@/common/components/Vaults/VaultSpecific/VaultInteractive"
import VaultOverview from "@/common/components/Vaults/VaultSpecific/VaultOverview"
import VaultsExplained from "@/common/components/Vaults/VaultSpecific/VaultsExplained"
import VaultTitle from "@/common/components/Vaults/VaultSpecific/VaultTitle"
import { VaultOverviewInterface } from "@/common/interfaces/Vaults"
import { useVaultOverview } from "@/common/utils/queries"
import { useRouter } from "next/router"
import { createContext } from "react"

export const VaultSpecificContext = createContext(defaultVaultContextValues)

const Vault = () => {
  const {
    isReady,
    query: { vaultname, chain },
  } = useRouter()

  const {
    data: vaultOverviewData,
    isLoading: vaultOverviewLoading,
    isError: vaultOverviewError,
  } = useVaultOverview(isReady)

  if (!isReady) return <div></div>

  const allVaultData = vaultOverviewData?.allVaultsOverviewData.filter(
    ({ vaultName, chainName }) =>
      vaultName === vaultname && chainName === chain,
  )[0] as VaultOverviewInterface

  const vaultDataLoading = vaultOverviewLoading || vaultOverviewError

  const vaultOpen = allVaultData?.vaultOpen

  return (
    <div>
      <Layout>
        <div className="relative">
          <VaultSpecificContext.Provider value={allVaultData}>
            <VaultTitle vaultName={vaultname as string} vaultOpen={vaultOpen} />
            {vaultDataLoading ? (
              <div className="pointer-events-none animate-pulse blur-md">
                <div className="grid grid-cols-2 mt-20 md:grid-cols-10 gap-x-11">
                  <VaultInfoShimmer />
                  <VaultDepositShimmer />
                </div>
              </div>
            ) : (
              <VaultInteractive />
            )}
            <VaultOverview />
            <VaultsExplained />
            <Disclaimer />
          </VaultSpecificContext.Provider>
        </div>
      </Layout>
    </div>
  )
}

export default Vault
