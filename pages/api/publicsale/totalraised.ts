import { PublicSale } from "@/common/constants/Publicsale"
import { getProvider } from "@/common/utils/api/providers"
import { getPublicSale } from "@/common/utils/api/publicSale"
import { getStage4Sale } from "@/common/utils/api/stage4"
import { fetcher } from "@/common/utils/queries"
import { sentry } from "@/common/utils/sentry"
import type { NextApiRequest, NextApiResponse } from "next"

const totalRaised = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const provider = getProvider(PublicSale.chainId)
    const publicSaleData = await getPublicSale(provider)
    const stage4Data = await getStage4Sale(provider)

    const publicSaleContribution = publicSaleData?.totalContributed
    const stage4Contribution = stage4Data?.totalContribution
    const totalRaisedEth =
      Number(publicSaleContribution) + Number(stage4Contribution)

    const ethPriceUrl =
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    const ethPriceData = await fetcher<{ ethereum: { usd: string } }>(
      ethPriceUrl,
    )
    const ethPrice = Number(ethPriceData.ethereum.usd)
    const totalRaisedUSD = Math.trunc(
      totalRaisedEth * ethPrice,
    ).toLocaleString()

    res.json({
      eth: Math.trunc(totalRaisedEth).toLocaleString(),
      usd: totalRaisedUSD,
    })
  } catch (err: unknown) {
    console.log("Error: Fetching public sale price data")
    return sentry.captureException(err)
  }
}

export default totalRaised
