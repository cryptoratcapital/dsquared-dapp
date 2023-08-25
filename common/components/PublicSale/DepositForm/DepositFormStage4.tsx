import {
  ConnectButton,
  GenericButton,
} from "@/common/components/Generic/GenericButton/GenericButton"
import Grid from "@/common/components/Generic/Grid/Grid"
import { Stage4Sale } from "@/common/constants/Publicsale"
import { stage4WLAddresses } from "@/common/constants/Stage4Wl/whitelistedAddress"
import { web3ModalState } from "@/common/store"
import { getMaxBalance, isCorrectChainId } from "@/common/utils/helpers/utils"
import { useNativeBalance, useStage4Data } from "@/common/utils/queries"
import {
  claimStage4,
  depositStage4Public,
  depositStage4WL,
} from "@/common/web3/calls/stage4"
import { useWeb3Modal } from "@/common/web3/modal"
import { Input } from "@chakra-ui/react"
import clsx from "clsx"
import { getAddress } from "ethers/lib/utils"
import keccak256 from "keccak256"
import { MerkleTree } from "merkletreejs"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { chainIDs } from "../../../constants/ChainInformation"

const leaves = stage4WLAddresses.map((addr) => keccak256(addr))
const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
// const rootHash = merkleTree.getRoot().toString("hex")
// console.log("0x" + rootHash)

export const DepositFormStage4 = () => {
  const account = web3ModalState((state) => state.account)

  // check if address is whitelisted
  const addressWL = account
    ? stage4WLAddresses
        .map((address) => getAddress(address))
        .includes(getAddress(account))
    : false

  const chainId = web3ModalState((state) => state.chainId)
  const web3Provider = web3ModalState((state) => state.web3Provider)
  const { SwitchNet } = useWeb3Modal()

  const stage4SaleChainInfo = chainIDs.find(
    (chainID) => chainID.chainId === Stage4Sale.chainId,
  )
  const correctChain = isCorrectChainId(chainId, stage4SaleChainInfo)

  const {
    data: balanceData,
    isLoading: balanceLoading,
    isError: balanceError,
    refetch: balanceRefetch,
  } = useNativeBalance(account, chainId)
  const balanceLoadedFail = balanceLoading || balanceError

  const {
    data: stage4Data,
    isLoading: stage4Loading,
    isError: stage4Error,
    refetch: stage4Refetch,
  } = useStage4Data(account)
  const stage4SaleLoadedFail = stage4Loading || stage4Error

  const {
    whitelistStartTime,
    startTime,
    endTime,
    maxContribution,
    totalContribution,
    contributionRemaining,
    userDepositAmt,
    userWLRemaining,
    userClaimable,
    userClaimableAmt,
    userLockedTokens,
  } = stage4Data ?? {}

  const currentTime = Math.floor(new Date().getTime() / 1000)
  const saleStarted =
    whitelistStartTime &&
    endTime &&
    currentTime >= whitelistStartTime &&
    currentTime < endTime

  const saleEnded = endTime && currentTime >= endTime
  const saleNotStarted = !saleStarted && !saleEnded
  const balance = balanceData?.balance

  const handleSwitch = () => {
    if (web3Provider) {
      return SwitchNet(Stage4Sale.chainId, web3Provider)
    } else {
      return false
    }
  }

  const ChangeNetwork = () => {
    return (
      <GenericButton
        className="w-full"
        variant="outline"
        text="Change Network"
        touchable
        onClick={handleSwitch}
      />
    )
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value)
  }

  const handleDeposit = async () => {
    const correctNetwork = await handleSwitch()
    if (!correctNetwork) return
    if (+inputVal < 0 || inputVal > maxDeposit) {
      setInputVal("0")
      return
    }
    if (!startTime || !account) return null
    const hashedAddress = keccak256(account)
    const proof = merkleTree.getHexProof(hashedAddress)
    if (currentTime >= startTime) {
      await depositStage4Public(inputVal)
    } else {
      await depositStage4WL(proof, inputVal)
    }
    balanceRefetch()
    stage4Refetch()
    setInputVal("0")
  }

  const handleClaim = async () => {
    const correctNetwork = await handleSwitch()
    if (!correctNetwork) return
    await claimStage4()
    stage4Refetch()
  }

  const [inputVal, setInputVal] = useState("0")
  const [maxDeposit, setMaxDeposit] = useState("0")

  useEffect(() => {
    if (contributionRemaining && balance && startTime && userWLRemaining) {
      Number(balance) < Number(contributionRemaining)
        ? setMaxDeposit(getMaxBalance(balance))
        : setMaxDeposit(contributionRemaining)
      if (
        currentTime < startTime &&
        Number(balance) > Number(userWLRemaining)
      ) {
        setMaxDeposit(userWLRemaining)
      }
    }
  }, [balance, contributionRemaining, userWLRemaining, startTime, currentTime])

  const showForm = saleNotStarted
    ? false
    : account
    ? saleEnded
      ? userClaimable
        ? true
        : false
      : Number(contributionRemaining) > 0
    : false

  useEffect(() => {
    setInputVal("0")
  }, [account])

  return (
    <div
      className={clsx(
        "flex flex-col justify-between py-5 md:py-7 px-5 relative border-2 border-dsqgreen-100 bg-dsqblack-100 font-roboto",
        stage4Loading ? "animate-pulse blur-md" : "",
      )}
    >
      <div>
        <p className="text-2xl font-bold">{saleEnded ? "Claim" : "Deposit"}</p>
        <div className="mt-5">
          1 ETH = 34 DSQ <sup>*, **</sup>
          <p className="mt-2 text-xs">
            Stage 4 deposits are fully claimable after a 90 Days lock, on May
            16th 2023. A snapshot will be taken 16 Weeks from end of sale. If
            the DSQ tokens have been held in the same wallet continuously
            throughout the 16 weeks - without sale or transfer - a 20% esDSQ
            airdrop will be distributed to that wallet.
          </p>
        </div>

        {stage4SaleLoadedFail ? (
          <Grid totalCells={483} stage={4} activeCells={0} />
        ) : (
          <Grid
            totalCells={parseInt(maxContribution ?? "0")}
            stage={4}
            activeCells={parseInt(totalContribution ?? "0")}
          />
        )}
      </div>

      <div className="flex flex-col mt-4">
        <div className={clsx(showForm ? "block" : "hidden")}>
          <div className={clsx(saleStarted ? "flex flex-col" : "hidden")}>
            <div className="flex flex-col items-center px-5 py-3 text-center border border-dsqgray-100">
              <div className="flex justify-between w-full ">
                <div className="flex gap-x-7">
                  <div
                    onClick={() => {
                      setInputVal(maxDeposit)
                    }}
                    className="px-2 py-1 text-sm border rounded-sm cursor-pointer w-fit border-dsqgray-100 text-dsqgray-100 hover:text-dsqgreen-100 hover:border-dsqgreen-100 font-roboto-mono"
                  >
                    <p>MAX</p>
                  </div>

                  <div>
                    <Input
                      variant="unstyled"
                      value={inputVal}
                      size="lg"
                      fontFamily={"mono"}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Image src="logos/eth.svg" alt="eth" width={16} height={26} />
              </div>

              <div className="flex flex-col w-full mt-2 ">
                <p className="w-full text-xs text-left text-dsqgreen-100">
                  {Number(inputVal) > Number(maxDeposit) &&
                    `Max deposit is ${maxDeposit}`}
                </p>
                <p className="w-full text-xs text-left text-dsqgreen-100">
                  {Number(inputVal) < 0 && `Deposit amount must be positive`}
                </p>
              </div>
            </div>

            {account && (
              <div className="flex justify-between mt-2 mb-6 mr-2 text-sm text-dsqgray-100">
                <p className={clsx(balanceLoading && "animate-pulse blur-md")}>
                  Your Deposit:{" "}
                  {!balanceLoadedFail && Number(userDepositAmt).toFixed(2)}
                  ETH
                </p>

                <p className={clsx(balanceLoading && "animate-pulse blur-md")}>
                  Wallet Balance:{" "}
                  {!balanceLoadedFail && Number(balance).toFixed(2)}
                  ETH
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          {saleNotStarted ? (
            <GenericButton
              className="w-full"
              variant="outline"
              text="Sale Starting Soon"
              touchable={false}
            />
          ) : account ? (
            saleEnded ? (
              !correctChain ? (
                <ChangeNetwork />
              ) : (
                <div className="flex flex-col gap-y-2">
                  {userClaimable && (
                    <GenericButton
                      className="w-full"
                      variant="outline"
                      text={`Claim ${Number(userClaimableAmt).toFixed(2)} DSQ`}
                      touchable
                      onClick={handleClaim}
                    />
                  )}

                  {Number(userLockedTokens) > 0 && (
                    <GenericButton
                      variant="solid"
                      text={`Locked DSQ ${Number(userLockedTokens).toFixed(
                        2,
                      )} `}
                      touchable={false}
                      className={"bg-dsqgray-200 border-dsqgray-200 w-full"}
                    />
                  )}
                </div>
              )
            ) : !correctChain ? (
              <ChangeNetwork />
            ) : (
              Number(contributionRemaining) > 0 &&
              (currentTime > Number(startTime) ||
              (addressWL && Number(userWLRemaining) > 0) ? (
                <div className="flex flex-col gap-y-4">
                  <GenericButton
                    className="w-full"
                    variant="outline"
                    text="Deposit"
                    touchable
                    onClick={handleDeposit}
                  />
                  {Number(userLockedTokens) > 0 && (
                    <GenericButton
                      variant="solid"
                      text={`Locked DSQ ${Number(userLockedTokens).toFixed(
                        2,
                      )} `}
                      touchable={false}
                      className={"bg-dsqgray-200 border-dsqgray-200 w-full"}
                    />
                  )}
                </div>
              ) : (
                <GenericButton
                  className="w-full"
                  variant="outline"
                  text="Sale Starting Soon"
                  touchable={false}
                />
              ))
            )
          ) : (
            <ConnectButton className="w-full" />
          )}

          <div className="flex flex-col justify-start mt-4 ml-1 text-sm md:flex text-dsqgray-100">
            <p>
              * D-Squared&apos;s public sale valuation is approximately $25
              Million USD, subject to fluctuations in ETH price over the sale
              window.
            </p>
            <p>
              ** Stage 4 deposits are fully claimable after a 90 Days lock on
              May 16th 2023.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
