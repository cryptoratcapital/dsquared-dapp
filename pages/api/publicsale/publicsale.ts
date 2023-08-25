import { PublicSale } from "@/common/constants/Publicsale"
import { getProvider } from "@/common/utils/api/providers"
import { getPublicSale } from "@/common/utils/api/publicSale"
import { isValidAddress } from "@/common/utils/helpers/checkers"
import { sentry } from "@/common/utils/sentry"
import type { NextApiRequest, NextApiResponse } from "next"

const publicSale = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address } = req.query

    if (!isValidAddress(address)) {
      return res.status(400).json({ error: "Error: Invalid address" })
    }
    const provider = getProvider(PublicSale.chainId)
    const publicSaleData = await getPublicSale(provider, address)
    res.json({ ...publicSaleData })
  } catch (err: unknown) {
    console.log("Error: Fetching public sale data failed")
    return sentry.captureException(err)
  }
}

export default publicSale
