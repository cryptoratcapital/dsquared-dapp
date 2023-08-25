import { chainIDs } from "@/common/constants/ChainInformation"
import { web3ModalState } from "@/common/store/web3ModalState"
import { sentry } from "@/common/utils/sentry"
import { Web3Provider } from "@ethersproject/providers"
import WalletConnect from "@walletconnect/web3-provider"
import { ethers } from "ethers"
import { useEffect, useMemo } from "react"
import Web3Modal from "web3modal"
import { chainIdEnum } from "../interfaces/Chain"

const idToHexString = (id: string) => {
  return "0x" + Number(id).toString(16)
}

export const providerOptions = {
  walletconnect: {
    package: WalletConnect,
    options: {
      rpc: {
        [chainIdEnum.ARBITRUM]: "https://arb1.arbitrum.io/rpc",
        [chainIdEnum.AVALANCHE]: "https://rpc.ankr.com/avalanche",
      },
    },
  },
}

const web3Modal =
  typeof window !== "undefined"
    ? new Web3Modal({
        providerOptions,
        cacheProvider: true,
      })
    : ({} as Web3Modal)

export const useWeb3Modal = () => {
  const setInstance = web3ModalState((state) => state.setInstance)
  const setWeb3Provider = web3ModalState((state) => state.setWeb3Provider)
  const setSigner = web3ModalState((state) => state.setSigner)
  const setAccount = web3ModalState((state) => state.setAccount)
  const setNetwork = web3ModalState((state) => state.setNetwork)
  const setChainId = web3ModalState((state) => state.setChainId)
  const instance = web3ModalState((state) => state.instance)
  const web3Provider = web3ModalState((state) => state.web3Provider)

  const connectWallet = useMemo(
    () => async () => {
      try {
        const instance = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(instance, "any")
        const accounts = await provider.listAccounts()
        const network = await provider.getNetwork()
        const signer = provider.getSigner()
        accounts && setAccount(accounts[0])
        setInstance(instance)
        setWeb3Provider(provider)
        setSigner(signer)
        setNetwork(network)
        network && setChainId(network.chainId.toString())
      } catch (err) {
        sentry.captureException(err)
      }
    },
    [
      setAccount,
      setChainId,
      setInstance,
      setNetwork,
      setSigner,
      setWeb3Provider,
    ],
  )

  const disconnectWallet = useMemo(
    () => async () => {
      await web3Modal.clearCachedProvider()
      setAccount(undefined)
      setNetwork(null)
    },
    [setAccount, setNetwork],
  )

  const switchNetwork = async (
    provider: Web3Provider,
    chainHex: string,
    chainName: string,
    rpcUrls: string[],
    blockExplorerUrls: string,
    nativeCurrency: Record<string, unknown>,
  ) => {
    let successfulSwitch = false
    try {
      await provider?.provider?.request?.({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainHex }],
      })
      successfulSwitch = true
    } catch (switchError) {
      if (
        typeof switchError === "object" &&
        switchError !== null &&
        "code" in switchError
      ) {
        // This error code indicates that the chain has not been added to MetaMask.
        if ((switchError as { code: number }).code === 4902) {
          try {
            await web3Provider?.provider?.request?.({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: chainHex,
                  chainName: chainName,
                  rpcUrls: rpcUrls,
                  blockExplorerUrls: [blockExplorerUrls],
                  nativeCurrency: nativeCurrency,
                },
              ],
            })
          } catch (addError) {
            sentry.captureException(switchError)
            throw addError
          }
        }
      }
    }
    return successfulSwitch
  }

  const SwitchNet = async (
    chainId: string,
    web3Provider: Web3Provider,
  ): Promise<boolean> => {
    const chainInfo = chainIDs.find((chainid) => chainid.chainId === chainId)
    const chainIdHex = idToHexString(chainId)

    if (web3Provider && chainInfo) {
      const switched = await switchNetwork(
        web3Provider,
        chainIdHex,
        chainInfo?.chainName,
        chainInfo?.rpcUrls,
        chainInfo?.blockExplorer,
        chainInfo?.nativeCurrency,
      )
      if (switched) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  // hook to automatically connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet()
    }
  }, [connectWallet])

  // handle changes
  useEffect(() => {
    if (instance?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        setAccount(accounts[0])
      }

      const handleChainChanged = () => {
        // https://docs.metamask.io/guide/ethereum-provider.html#events
        // We strongly recommend reloading the page on chain changes, unless you have good reason not to.
        window.location.reload()
      }

      const handleDisconnect = () => {
        disconnectWallet()
      }

      instance.on("accountsChanged", handleAccountsChanged)
      instance.on("chainChanged", handleChainChanged)
      // instance.on("disconnect", handleDisconnect);

      return () => {
        if (instance.removeListener) {
          instance.removeListener("accountsChanged", handleAccountsChanged)
          instance.removeListener("chainChanged", handleChainChanged)
          instance.removeListener("disconnect", handleDisconnect)
        }
      }
    }
  }, [instance, disconnectWallet, setAccount, setChainId])

  return { connectWallet, disconnectWallet, SwitchNet }
}
