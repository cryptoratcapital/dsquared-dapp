import { getTokenBalance } from "@/common/utils/api/erc20"
import { getProvider } from "@/common/utils/api/providers"
import {
  isValidAddress,
  isValidChain,
  isValidTokenName,
} from "@/common/utils/helpers/checkers"
import { getTokenAddress } from "@/common/utils/helpers/utils"
import { sentry } from "@/common/utils/sentry"
import type { NextApiRequest, NextApiResponse } from "next"

const tokenBalance = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address, tokenName, chainId } = req.query

    if (!isValidAddress(address)) {
      return res.status(400).json({ error: "Error: Invalid address" })
    } else if (!isValidTokenName(tokenName)) {
      return res.status(400).json({ error: "Error: Invalid tokenName" })
    } else if (!isValidChain(chainId, tokenName)) {
      return res.status(400).json({ error: "Error: Invalid chainId" })
    }
    const tokenAddress = getTokenAddress(tokenName, chainId)
    const provider = getProvider(chainId)
    const balance = await getTokenBalance(tokenAddress, address, provider)

    res.status(200).json({ balance: balance })
  } catch (err: unknown) {
    return sentry.captureException(err)
  }
}

export default tokenBalance
