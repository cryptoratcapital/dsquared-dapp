import { TokenLookUp, TokenSymbol } from "@/common/constants/TokenLookup"
import { VaultSymbol } from "@/common/constants/Vaults"
import { chainIdEnum } from "@/common/interfaces/Chain"
import { isAddress } from "ethers/lib/utils"

export function isValidString(
  str: string | string[] | undefined,
): str is string {
  if (str === null || typeof str !== "string") {
    return false
  }
  return true
}

export function isValidAddress(
  address: string | string[] | undefined,
): address is string {
  if (address === null || typeof address !== "string" || !isAddress(address)) {
    return false
  }
  return true
}

export function isValidTokenName(
  tokenName: string | string[] | undefined,
): tokenName is TokenSymbol {
  if (
    typeof tokenName !== "string" ||
    !Object.values(TokenSymbol).includes(tokenName as TokenSymbol)
  ) {
    return false
  }
  return true
}

export function isValidVaultName(
  vaultName: string | string[] | undefined,
): vaultName is VaultSymbol {
  if (
    typeof vaultName !== "string" ||
    !Object.values(VaultSymbol).includes(vaultName as VaultSymbol)
  ) {
    return false
  }
  return true
}

export function isValidChain(
  chainId: string | string[] | undefined,
  tokenName?: string | string[] | undefined,
): chainId is chainIdEnum {
  if (
    chainId === undefined ||
    (chainId != null && typeof chainId !== "string") ||
    !Object.values(chainIdEnum).includes(chainId as chainIdEnum)
  ) {
    return false
  }

  if (
    tokenName &&
    (!isValidTokenName(tokenName) || !(chainId in TokenLookUp[tokenName]))
  ) {
    return false
  }

  return true
}
