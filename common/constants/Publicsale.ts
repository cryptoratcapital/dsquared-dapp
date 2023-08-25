import { chainIdEnum } from "@/common/interfaces/Chain"

interface contractInterface {
  chainId: string
  address: string
}

export const PublicSale: contractInterface = {
  chainId: chainIdEnum.ARBITRUM,
  address: "0x2c8900D6c800F2f5Bc8cB0206625152522358D2a",
}

export const Stage4Sale: contractInterface = {
  chainId: chainIdEnum.ARBITRUM,
  address: "0x015974733e5B667AB40Cc54c40A835A5BebF6b8F",
}
