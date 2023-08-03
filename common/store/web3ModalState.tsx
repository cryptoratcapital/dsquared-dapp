import { ethers } from "ethers"
import { EventEmitter } from "events"
import { create } from "zustand"

interface State {
  instance: EventEmitter | null
  network: ethers.providers.Network | null
  signer: ethers.providers.JsonRpcSigner | undefined
  web3Provider: ethers.providers.Web3Provider | undefined
  account: string | undefined
  chainId: string | undefined
}

interface Web3ModalState extends State {
  setInstance: (_instance: State["instance"]) => void
  setWeb3Provider: (_web3Provider: State["web3Provider"]) => void
  setSigner: (_signer: State["signer"]) => void
  setAccount: (_account: State["account"]) => void
  setNetwork: (_network: State["network"]) => void
  setChainId: (_chainId: State["chainId"]) => void
}

export const web3ModalState = create<Web3ModalState>()((set) => ({
  instance: null,
  web3Provider: undefined,
  signer: undefined,
  account: undefined,
  network: null,
  chainId: undefined,
  setInstance: (instance) => set(() => ({ instance })),
  setWeb3Provider: (web3Provider) => set(() => ({ web3Provider })),
  setSigner: (signer) => set(() => ({ signer })),
  setAccount: (account) => set(() => ({ account })),
  setNetwork: (network) => set(() => ({ network })),
  setChainId: (chainId) => set(() => ({ chainId })),
}))
