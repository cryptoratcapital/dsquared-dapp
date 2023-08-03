import { spenderApproved } from "@/common/utils/api/erc20"
import { getProvider } from "@/common/utils/api/providers"
import {
  isValidAddress,
  isValidChain,
  isValidString,
  isValidTokenName,
} from "@/common/utils/helpers/checkers"
import { getTokenAddress } from "@/common/utils/helpers/utils"
import { sentry } from "@/common/utils/sentry"
import type { NextApiRequest, NextApiResponse } from "next"

const tokenApproval = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address, tokenName, tokenAmount, chainId, spenderAddress } =
      req.query

    if (!isValidAddress(address)) {
      return res.status(400).json({ error: "Error: Invalid address" })
    } else if (!isValidAddress(spenderAddress)) {
      return res.status(400).json({ error: "Error: InvalidspenderAddress" })
    } else if (!isValidTokenName(tokenName)) {
      return res.status(400).json({ error: "Error: Invalid tokenName" })
    } else if (!isValidString(tokenAmount)) {
      return res.status(400).json({ error: "Error: Invalid tokenAmount" })
    } else if (!isValidChain(chainId, tokenName)) {
      return res.status(400).json({ error: "Error: Invalid chainid" })
    }
    const tokenAddress = getTokenAddress(tokenName, chainId)
    const provider = getProvider(chainId)
    const approved = await spenderApproved(
      tokenAddress,
      tokenAmount,
      address,
      spenderAddress,
      provider,
    )
    res.status(200).json(approved)
  } catch (err: unknown) {
    console.log("Error: fetching token approval permissions")
    return sentry.captureException(err)
  }
}

export default tokenApproval
