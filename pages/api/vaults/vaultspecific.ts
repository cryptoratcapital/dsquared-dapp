import { VaultConstantData } from "@/common/constants/Vaults"
import { getProvider } from "@/common/utils/api/providers"
import { getVaultInfo } from "@/common/utils/api/vaults/generalVaults"
import {
  isValidAddress,
  isValidChain,
  isValidVaultName,
} from "@/common/utils/helpers/checkers"

import type { NextApiRequest, NextApiResponse } from "next"

const vaultsOverview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, chainId, vaultName } = req.query

  if (address !== "undefined" && !isValidAddress(address)) {
    return res.status(400).json({ error: "Error: Invalid address" })
  } else if (!isValidVaultName(vaultName)) {
    return res.status(400).json({ error: "Error: Invalid vault name" })
  } else if (!isValidChain(chainId)) {
    return res.status(400).json({ error: "Error: Invalid chainid" })
  }

  try {
    const provider = getProvider(chainId)
    const vaultConstantData = VaultConstantData[vaultName][chainId]
    const vaultData = await getVaultInfo(vaultConstantData, provider, address)
    res.json(vaultData)
  } catch (err: unknown) {
    res.status(500).json("Error: fetching specific vault data")
  }
}

export default vaultsOverview
