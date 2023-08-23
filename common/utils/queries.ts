import { BalanceResponse, TotalRaised } from "@/common/interfaces/Balance"
import {
  PublicsaleInterface,
  Stage4SaleInterface,
} from "@/common/interfaces/PublicSaleInterface"
import { TokenApproval } from "@/common/interfaces/Tokens"
import { VaultOverviewInterface } from "@/common/interfaces/Vaults"
import { useQuery } from "@tanstack/react-query"
import { StakingDataUser } from "../interfaces/Staking"
import { isValidAddress, isValidChain } from "./helpers/checkers"

const staleTime = 5 * 1000

export const fetcher = async <T>(url: string): Promise<T> => {
  const fetchedData = await fetch(url)
  if (!fetchedData.ok) {
    throw new Error(fetchedData.statusText)
  }
  const respose = await fetchedData.json()
  return respose
}

export const useNativeBalance = (address?: string, chainId?: string) => {
  return useQuery<BalanceResponse>({
    queryKey: ["nativebalance", address],
    queryFn: async () => {
      const data = await fetcher<BalanceResponse>(
        `/api/user/nativeBalance?address=${address}&chainId=${chainId}`,
      )
      return data
    },
    staleTime: staleTime,
    enabled: isValidAddress(address) && isValidChain(chainId),
  })
}

export const usePublicSaleData = (address?: string) => {
  return useQuery<PublicsaleInterface>({
    queryKey: ["publicsale", address],
    queryFn: async () => {
      const data = await fetcher<PublicsaleInterface>(
        `/api/publicsale/publicsale?address=${address}`,
      )
      return data
    },
    staleTime: staleTime,
  })
}

export const useStakingData = (
  address?: string,
  chainId?: string,
  enableBool = true,
) => {
  return useQuery<StakingDataUser>({
    queryKey: ["staking", address],
    queryFn: async () => {
      const data = await fetcher<StakingDataUser>(
        `/api/staking/staking?address=${address}&chainId=${chainId}`,
      )
      return data
    },
    staleTime: staleTime,
    enabled: isValidAddress(address) && isValidChain(chainId) && enableBool,
  })
}

export const useStage4Data = (address?: string) => {
  return useQuery<Stage4SaleInterface>({
    queryKey: ["stage4", address],
    queryFn: async () => {
      const data = await fetcher<Stage4SaleInterface>(
        `/api/publicsale/stage4?address=${address}`,
      )
      return data
    },
    staleTime: staleTime,
  })
}

export const useTokenApproval = (
  tokenName: string,
  tokenAmount: string,
  address?: string,
  spenderAddress?: string,
  chainId?: string,
) => {
  return useQuery<TokenApproval>({
    queryKey: [
      "tokenapproval",
      tokenName,
      tokenAmount,
      address,
      spenderAddress,
      chainId,
    ],
    queryFn: async () => {
      const data = await fetcher<TokenApproval>(
        `/api/user/tokenApproval?address=${address}&tokenName=${tokenName}&tokenAmount=${tokenAmount}&chainId=${chainId}&spenderAddress=${spenderAddress}`,
      )
      return data
    },
    staleTime: staleTime,
    enabled: isValidAddress(address) && isValidChain(chainId),
  })
}

export const useTokenBalance = (
  tokenName: string,
  address?: string,
  chainId?: string,
  enableBool = true,
) => {
  return useQuery<BalanceResponse>({
    queryKey: ["tokenbalance", tokenName, address, chainId],
    queryFn: async () => {
      const data = await fetcher<BalanceResponse>(
        `/api/user/tokenBalance?address=${address}&tokenName=${tokenName}&chainId=${chainId}`,
      )
      return data
    },
    staleTime: staleTime,
    enabled: isValidAddress(address) && isValidChain(chainId) && enableBool,
  })
}

export const useTotalRaised = () => {
  return useQuery<TotalRaised>({
    queryKey: ["totalraised"],
    queryFn: async () => {
      const data = await fetcher<TotalRaised>(`/api/publicsale/totalraised`)
      return data
    },
    staleTime: staleTime,
  })
}

export const useVaultOverview = (enabled: boolean, address?: string) => {
  return useQuery<{ allVaultsOverviewData: VaultOverviewInterface[] }>({
    queryKey: ["vaultsOverview", address],
    queryFn: async () => {
      const data = await fetcher<{
        allVaultsOverviewData: VaultOverviewInterface[]
      }>(`/api/vaults/vaultsoverview?address=${address}`)
      return data
    },
    staleTime: staleTime,
    enabled: enabled,
  })
}

export const useVaultSpecific = (
  enabled: boolean,
  chainId: string,
  vaultName: string,
  address?: string,
) => {
  return useQuery<VaultOverviewInterface>({
    queryKey: ["vaultsOverview", address, chainId, vaultName],
    queryFn: async () => {
      const data = await fetcher<VaultOverviewInterface>(
        `/api/vaults/vaultspecific?address=${address}&chainId=${chainId}&vaultName=${vaultName}`,
      )
      return data
    },
    staleTime: staleTime,
    enabled: enabled,
  })
}
