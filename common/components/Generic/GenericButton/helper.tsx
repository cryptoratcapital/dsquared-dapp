import { web3ModalState } from "@/common/store/web3ModalState"
import { useWeb3Modal } from "@/common/web3/modal"

export const HandleConnect = () => {
  const { connectWallet, disconnectWallet } = useWeb3Modal()
  const account = web3ModalState((state) => state.account)
  const handleConnect = async () => {
    if (account) {
      await disconnectWallet()
    } else {
      await connectWallet()
    }
  }

  handleConnect()
}
