import { getEthBalance } from "@/common/utils/api/erc20"
import { getProvider } from "@/common/utils/api/providers"
import { isValidAddress, isValidChain } from "@/common/utils/helpers/checkers"
import { sentry } from "@/common/utils/sentry"
import type { NextApiRequest, NextApiResponse } from "next"

const ethBalance = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address, chainId } = req.query

    if (!isValidAddress(address)) {
      return res.status(400).json({ error: "Error: Invalid address" })
    } else if (!isValidChain(chainId)) {
      return res.status(400).json({ error: "Error: Invalid chainId" })
    }
    const provider = getProvider(chainId)
    const balance = await getEthBalance(address, provider)
    res.status(200).json({ balance: balance })
  } catch (err: unknown) {
    console.log("Error: fetching native balance")
    return sentry.captureException(err)
  }
}

export default ethBalance
