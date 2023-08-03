import { Edge } from "@/common/components/Generic/Edge/Edge"
import { Layout } from "@/common/components/Layout/Layout"
import { DepositForm } from "@/common/components/PublicSale/DepositForm/DepositForm"
import { DepositFormStage4 } from "@/common/components/PublicSale/DepositForm/DepositFormStage4"
import { HeroSection } from "@/common/components/PublicSale/HeroSection/HeroSection"
import { HeroSectionStage4 } from "@/common/components/PublicSale/HeroSection/HeroSectionStage4"
import { SaleTite } from "@/common/components/PublicSale/SaleTitle/SaleTitle"
import { Tokenomics } from "@/common/components/PublicSale/Tokenomics/Tokenomics"
import { Values } from "@/common/components/PublicSale/Values/Values"

const PublicSale = () => {
  return (
    <div>
      <Layout>
        <SaleTite />
        <div className="grid grid-cols-1 py-10 pt-16 lg:grid-cols-2 md:gap-x-12 gap-y-20 lg:pt-28">
          <div className="flex flex-col gap-y-4 lg:gap-y-10">
            <HeroSectionStage4 />
            <DepositFormStage4 />
          </div>
          <div className="flex flex-col gap-y-4 lg:gap-y-10">
            <HeroSection />
            <DepositForm />
          </div>
        </div>

        <Edge />
        <Tokenomics />
        <Values />
      </Layout>
    </div>
  )
}

export default PublicSale
