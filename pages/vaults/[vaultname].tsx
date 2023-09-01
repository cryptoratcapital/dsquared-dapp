import { Disclaimer } from "@/common/components/Generic/Disclaimer/Disclaimer"
import { Layout } from "@/common/components/Layout/Layout"
import { defaultVaultContextValues } from "@/common/components/Vaults/loadingData"
import VaultDepositShimmer from "@/common/components/Vaults/VaultSpecific/VaultDepositShimmer"
import VaultInfoShimmer from "@/common/components/Vaults/VaultSpecific/VaultInfoShimmer"
import VaultInteractive from "@/common/components/Vaults/VaultSpecific/VaultInteractive"
import VaultOverview from "@/common/components/Vaults/VaultSpecific/VaultOverview"
import VaultsExplained from "@/common/components/Vaults/VaultSpecific/VaultsExplained"
import VaultTitle from "@/common/components/Vaults/VaultSpecific/VaultTitle"
import { VaultCurrentState } from "@/common/constants/Vaults"
import { VaultOverviewInterface } from "@/common/interfaces/Vaults"
import { web3ModalState } from "@/common/store"
import { useVaultSpecific } from "@/common/utils/queries"

import { useRouter } from "next/router"
import { createContext } from "react"

export const VaultSpecificContext = createContext(defaultVaultContextValues)

const Vault = () => {
  const {
    isReady,
    query: { vaultname, chainId },
  } = useRouter()

  const account = web3ModalState((state) => state.account)

  const {
    data: allVaultData,
    isLoading: vaultOverviewLoading,
    isError: vaultOverviewError,
  } = useVaultSpecific(isReady, chainId as string, vaultname as string, account)

  if (!isReady) return <div></div>

  console.log(allVaultData)

  const vaultDataLoading = vaultOverviewLoading || vaultOverviewError
  const vaultCurrentState = allVaultData?.vaultCurrentState
  const vaultOpen =
    vaultCurrentState === VaultCurrentState.DEPOSITSOPEN ||
    vaultCurrentState === VaultCurrentState.WITHDRAWALSONLY

  return (
    <div>
      <Layout>
        <div className="relative">
          <VaultSpecificContext.Provider
            value={allVaultData as VaultOverviewInterface}
          >
            <VaultTitle
              vaultName={vaultname as string}
              vaultOpen={vaultOpen}
              vaultDataLoading={vaultDataLoading}
            />
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
