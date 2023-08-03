import { EarnSection } from "@/common/components/Earn/EarnSection/EarnSection"
import { StakeSection } from "@/common/components/Earn/StakeSection/StakeSection"
import { StakingDisclaimer } from "@/common/components/Generic/Disclaimer/StakingDisclaimer"
import { Layout } from "@/common/components/Layout/Layout"

const Earn = () => {
  return (
    <div>
      <Layout>
        <EarnSection />
        <StakeSection />
        <StakingDisclaimer />
      </Layout>
    </div>
  )
}

export default Earn
