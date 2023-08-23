import {
  arbitrumVaults,
  goerliVaults,
} from "@/common/components/constants/Vaults"
import { chainIdEnum } from "@/common/interfaces/Chain"
import { getProvider } from "@/common/utils/api/providers"
import { getVaultInfo } from "@/common/utils/api/vaults/generalVaults"
import { isValidAddress } from "@/common/utils/helpers/checkers"

import type { NextApiRequest, NextApiResponse } from "next"

const vaultsOverview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query

  if (address !== "undefined" && !isValidAddress(address)) {
    return res.status(400).json({ error: "Error: Invalid address" })
  }

  try {
    const arbitrumProvider = getProvider(chainIdEnum.ARBITRUM)
    // const avalancheProvider = getProvider(chainIdEnum.AVALANCHE)
    const goerliProvider = getProvider(chainIdEnum.GOERLI)

    // const data = await testAvaxMultiCall(avalancheProvider)
    // console.log(data)

    const arbitrumVaultsData = await Promise.all(
      arbitrumVaults.map((item) => {
        return getVaultInfo(item, arbitrumProvider, address)
      }),
    )

    // const avalancheVaultsData = await Promise.all(
    //   avalancheVaults.map((item) => {
    //     return getVaultInfo(item, avalancheProvider, address)
    //   }),
    // )
    const goerliVaultsData = await Promise.all(
      goerliVaults.map((item) => {
        return getVaultInfo(item, goerliProvider, address)
      }),
    )
    const allVaultsOverviewData = arbitrumVaultsData
      // .concat(avalancheVaultsData)
      .concat(goerliVaultsData)

    // const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
    // await delay(1000)
    console.log(`finished`)

    res.json({ allVaultsOverviewData })
  } catch (err: unknown) {
    res.status(500).json("Error: fetching vaults data")
  }
}

export default vaultsOverview
