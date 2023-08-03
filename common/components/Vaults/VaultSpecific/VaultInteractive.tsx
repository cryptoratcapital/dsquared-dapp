import VaultDeposit from "./VaultDeposit"
import VaultInfo from "./VaultInfo"

const VaultInteractive = () => {
  return (
    <div className="grid mt-20 lg:grid-cols-10 gap-11">
      <VaultInfo />
      <VaultDeposit />
    </div>
  )
}

export default VaultInteractive
