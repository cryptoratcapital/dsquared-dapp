import { isAddress } from "ethers/lib/utils"
import { dopexNFTGensis } from "./dopexNFTGenesis"
import { dopexNFTMint } from "./dopexNFTmint"
import { dsquaredWL } from "./dsquared_wl"

const testAddresses = [
  "0xAF68e7121974B7276777DfFCbC14ee676155693E",
  "0x343085eC4F15aAAFb437ca573b87C37C15eD4dE8",
]

let stage4WLAddresses = testAddresses
  .concat(dsquaredWL)
  .concat(dopexNFTGensis)
  .concat(dopexNFTMint)
stage4WLAddresses = Array.from(new Set(stage4WLAddresses))
stage4WLAddresses = stage4WLAddresses.filter((address) => isAddress(address))

export { stage4WLAddresses }
