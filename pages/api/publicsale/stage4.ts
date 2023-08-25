import { Stage4Sale } from "@/common/constants/Publicsale"
import { getProvider } from "@/common/utils/api/providers"
import { getStage4Sale } from "@/common/utils/api/stage4"
import { isValidAddress } from "@/common/utils/helpers/checkers"
import { sentry } from "@/common/utils/sentry"
import type { NextApiRequest, NextApiResponse } from "next"

const stage4 = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address } = req.query

    if (!isValidAddress(address)) {
      return res.status(400).json({ error: "Error: Invalid address" })
    }
    const provider = getProvider(Stage4Sale.chainId)
    const stage4Data = await getStage4Sale(provider, address)
    res.json({ ...stage4Data })
  } catch (err: unknown) {
    console.log("Error: Fetching stage4 data failed")
    return sentry.captureException(err)
  }
}

export default stage4
