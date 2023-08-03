import { Disclaimer } from "@/common/components/Generic/Disclaimer/Disclaimer"
import { Edge } from "@/common/components/Generic/Edge/Edge"
import { Layout } from "@/common/components/Layout/Layout"
import { HowToDeposit } from "@/common/components/Vaults/VaultGeneral/HowDeposit"
import VaultGeneral from "@/common/components/Vaults/VaultGeneral/VaultGeneral"

const Vaults = () => {
  return (
    <div>
      <Layout>
        <div className="relative">
          <VaultGeneral />
          <Edge />
          <HowToDeposit />
          <Disclaimer />
        </div>
      </Layout>
    </div>
  )
}

export default Vaults
