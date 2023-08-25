import {
  ConnectButton,
  GenericButton,
} from "@/common/components/Generic/GenericButton/GenericButton"
import Grid from "@/common/components/Generic/Grid/Grid"
import { PublicSale } from "@/common/constants/Publicsale"
import { web3ModalState } from "@/common/store"
import { getMaxBalance, isCorrectChainId } from "@/common/utils/helpers/utils"
import { useNativeBalance, usePublicSaleData } from "@/common/utils/queries"
import {
  claimPublicSale,
  depositPublicSale,
} from "@/common/web3/calls/publicsale"
import { useWeb3Modal } from "@/common/web3/modal"
import { Input } from "@chakra-ui/react"
import clsx from "clsx"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { chainIDs } from "../../../constants/ChainInformation"

export const DepositForm = () => {
  const account = web3ModalState((state) => state.account)
  const chainId = web3ModalState((state) => state.chainId)
  const web3Provider = web3ModalState((state) => state.web3Provider)
  const { SwitchNet } = useWeb3Modal()

  const publicSaleChainInfo = chainIDs.find(
    (chainID) => chainID.chainId === PublicSale.chainId,
  )
  const correctChain = isCorrectChainId(chainId, publicSaleChainInfo)

  const {
    data: balanceData,
    isLoading: balanceLoading,
    isError: balanceError,
    refetch: balanceRefetch,
  } = useNativeBalance(account, chainId)
  const balanceLoadedFail = balanceLoading || balanceError

  const {
    data: publicsaleData,
    isLoading: publicSaleLoading,
    isError: publicSaleError,
    refetch: publicSaleRefetch,
  } = usePublicSaleData(account)
  const publicSaleLoadedFail = publicSaleLoading || publicSaleError

  const {
    startTime,
    endTime,
    stage1Max,
    stage1Filled,
    stage2Max,
    stage2Filled,
    stage3Started,
    stage3Max,
    stage3Filled,
    userClaimable,
    userClaimableAmt,
    userDepositAmt,
    contributionRemaining,
    userLockedTokens,
  } = publicsaleData ?? {}

  const currentTime = Math.floor(new Date().getTime() / 1000)
  const saleStarted =
    startTime && endTime && currentTime >= startTime && currentTime < endTime
  const saleEnded = endTime && currentTime >= endTime
  const saleNotStarted = !saleStarted && !saleEnded
  const balance = balanceData?.balance

  const handleSwitch = () => {
    if (web3Provider) {
      return SwitchNet(PublicSale.chainId, web3Provider)
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
    await depositPublicSale(inputVal)
    balanceRefetch()
    publicSaleRefetch()
    setInputVal("0")
  }

  const handleClaim = async () => {
    const correctNetwork = await handleSwitch()
    if (!correctNetwork) return
    await claimPublicSale()
    publicSaleRefetch()
  }

  const [inputVal, setInputVal] = useState("0")
  const [maxDeposit, setMaxDeposit] = useState("0")

  useEffect(() => {
    if (contributionRemaining && balance) {
      balance < contributionRemaining
        ? setMaxDeposit(getMaxBalance(balance))
        : setMaxDeposit(contributionRemaining)
    }
  }, [balance, contributionRemaining])

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
        publicSaleLoading ? "animate-pulse blur-md" : "",
      )}
    >
      <div>
        <p className="text-2xl font-bold">{saleEnded ? "Claim" : "Deposit"}</p>
        <p className="mt-5">
          1 ETH = 30 DSQ <sup>*, **</sup>
        </p>

        {publicSaleLoadedFail ? (
          <Grid totalCells={69} stage={1} activeCells={0} />
        ) : (
          <Grid
            totalCells={parseInt(stage1Max ?? "0")}
            stage={1}
            activeCells={parseInt(stage1Filled ?? "0")}
          />
        )}

        {publicSaleLoadedFail ? (
          <Grid totalCells={138} stage={2} activeCells={0} />
        ) : (
          <Grid
            totalCells={parseInt(stage2Max ?? "0")}
            stage={2}
            activeCells={parseInt(stage2Filled ?? "0")}
          />
        )}

        {!publicSaleLoadedFail && (
          <div className={stage3Started ? "block" : "hidden"}>
            <Grid
              totalCells={parseInt(stage3Max ?? "0")}
              stage={3}
              activeCells={parseInt(stage3Filled ?? "0")}
            />
          </div>
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
              Number(contributionRemaining) > 0 && (
                <GenericButton
                  className="w-full"
                  variant="outline"
                  text="Deposit"
                  touchable
                  onClick={handleDeposit}
                />
              )
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
            <p>** D-Squared reserves the right to increase the public sale.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
