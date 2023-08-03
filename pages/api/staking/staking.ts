import { getProvider } from "@/common/utils/api/providers"
import { getDSQStakingInfo } from "@/common/utils/api/staking/staking"
import { isValidAddress, isValidChain } from "@/common/utils/helpers/checkers"
import { sentry } from "@/common/utils/sentry"
import type { NextApiRequest, NextApiResponse } from "next"

const stakingData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address, chainId } = req.query

    if (!isValidAddress(address)) {
      return res.status(400).json({ error: "Error: Invalid address" })
    } else if (!isValidChain(chainId)) {
      return res.status(400).json({ error: "Error: Invalid chainId" })
    }
    const provider = getProvider(chainId)
    const userDsqStakedData = await getDSQStakingInfo(provider, address)
    res.status(200).json({ ...userDsqStakedData })
  } catch (err: unknown) {
    console.log("Error: Fetching staking data failed")
    return sentry.captureException(err)
  }
}

export default stakingData
