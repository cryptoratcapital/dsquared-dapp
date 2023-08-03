import type { NextApiRequest, NextApiResponse } from "next"

const vaultsOverview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const arbitrumVaults = [
      {
        vaultName: "GM",
        apy: 22,
        vaultOpen: true,
        vaultTime: 1675814400,
        risk: "High",
        lastEpoch: 15,
        vaultLenght: 28,
        vaultCapacity: 50000,
        vaultFilled: 20000,
        vaultPercentageFilled: 40,
        valutActive: true,
        chainName: "arbitrum",
      },

      {
        vaultName: "GLP++",
        apy: 30,
        vaultOpen: true,
        vaultTime: 1675814400,
        risk: "Moderate",
        lastEpoch: 20,
        vaultLenght: 28,
        vaultCapacity: 100000,
        vaultFilled: 50000,
        vaultPercentageFilled: 50,
        valutActive: true,
        chainName: "arbitrum",
      },

      {
        vaultName: "ETH++",
        apy: 50,
        vaultOpen: false,
        vaultTime: 1675814400,
        risk: "High",
        lastEpoch: 30,
        vaultLenght: 28,
        vaultCapacity: 200000,
        vaultFilled: 15000,
        vaultPercentageFilled: 75,
        valutActive: true,
        chainName: "arbitrum",
      },
    ]

    const avalancheVaults = [
      {
        vaultName: "GM",
        apy: 22,
        vaultOpen: true,
        vaultTime: 1675814400,
        risk: "High",
        lastEpoch: 15,
        vaultLenght: 28,
        vaultCapacity: 50000,
        vaultFilled: 20000,
        vaultPercentageFilled: 40,
        valutActive: true,
        chainName: "avalanche",
      },
    ]

    const allVaultsOverviewData = arbitrumVaults.concat(avalancheVaults)

    // const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
    // await delay(1000)

    res.json({ allVaultsOverviewData })
  } catch (err: unknown) {
    res.status(500).json("Error: fetching public sale data")
  }
}

export default vaultsOverview
