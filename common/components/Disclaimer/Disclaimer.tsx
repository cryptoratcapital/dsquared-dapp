import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import clsx from "clsx"
import { useState } from "react"
import { GenericButton } from "../Generic/GenericButton/GenericButton"
import { setAlertDate } from "./helper"

interface DisclaimerProps {
  isOpen: boolean
  onClose: () => void
}

const DisclaimerText = () => {
  return (
    <div className="text-white ">
      <div className="text-dsqgray-100">
        <p>
          Residents or citizens of Antigua and Barbuda, Algeria, Australia,
          Bangladesh, Bolivia, Belarus, Burundi, Myanmar (Burma), Cote D’Ivoire
          (Ivory Coast), Crimea and Sevastopol, Cuba, Democratic Republic of
          Congo, Ecuador, Iran, Iraq, Liberia, Libya, Mali, Morocco, Nepal,
          North Korea, Somalia, Sudan, Syria, Switzerland, United States,
          Venezuela, Yemen, Zimbabwe or any other country to which the United
          States, the United Kingdom or the European Union embargoes goods or
          imposes similar sanctions (collectively, &quot;Restricted
          Territories&quot;) are not permitted to interact with D-Squared. By
          interacting with D-Squared, you certify you are neither a citizen nor
          a resident of those countries.
        </p>
      </div>

      <div className="mt-8 text-lg font-bold md:text-xl">
        <p>US/OFAC Compliance agreement</p>
      </div>
      <hr className="w-full my-6 border border-dsqgray-50" />

      <div className=" text-dsqgray-100">
        <p>
          By using this D-Squared interface, I agree to the following terms and
          conditions:
        </p>
        <p>
          - I am not a person or entity who resides in, are a citizen of, is
          incorporated in, or has a registered office in the United States of
          America and OFAC restricted localities.
        </p>
        <p>
          - I will not in the future access this site or use D-Squared dApp
          while located within the United States and OFAC restricted localities.
        </p>
        <p>
          - I am not using, and will not in the future use, a VPN to mask my
          physical location from a restricted territory.
        </p>
        <p>
          - I am lawfully permitted to access this site and use D-Squared
          interfaces and dApp under the laws of the jurisdiction in which I
          reside and am located.
        </p>
        <p>
          - I understand the risks associated with using products by D-Squared
          and in sending funds to D-Squared smart contracts.
        </p>
      </div>
    </div>
  )
}

const Discalimer = ({ isOpen, onClose }: DisclaimerProps) => {
  const [userAgreed, setUserAgreed] = useState(false)
  const closeHandler = () => {
    setAlertDate()
    onClose()
  }

  return (
    <Modal
      // isCentered
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      closeOnEsc={false}
      preserveScrollBarGap
      blockScrollOnMount={true}
    >
      <ModalOverlay
        bg="blackAlpha.50"
        backdropFilter="blur(10px)"
        marginTop={100}
      />
      <ModalContent
        bg="dsqblack.200"
        maxW="800px"
        mx={{ base: 8, md: 12 }}
        pr={{ base: 2, md: 4 }}
        textColor="white"
        marginTop={110}
        height={"calc(80% - 2rem)"}
        // height={"80vh"}
      >
        <ModalHeader fontSize="3xl" fontWeight="600">
          Disclaimer
          <hr className="w-full mt-4 border border-dsqgray-50" />
        </ModalHeader>

        <ModalBody
          sx={{
            "&::-webkit-scrollbar": {
              width: "3px",
              backgroundColor: "dsqgray.50",
            },

            "&::-webkit-scrollbar-thumb": {
              width: "3px",
              backgroundColor: "#888B92",
            },
          }}
          py={2}
        >
          <DisclaimerText />

          <div className="flex items-center mt-6 mb-4">
            <div
              data-testid="accept-terms"
              onClick={() => setUserAgreed(!userAgreed)}
              className={clsx(
                "w-5 h-5 border border-4px cursor-pointer flex justify-center",
                userAgreed
                  ? " border-dsqgreen-100 bg-dsqgreen-100"
                  : "bg-dsqblack-100 border-dsqgray-100",
              )}
            ></div>
            <label className="ml-2 font-medium text-gray-900 md:text-lg dark:text-gray-300">
              I agree to the terms and conditions
            </label>
          </div>
        </ModalBody>

        <ModalFooter flex={"row"} justifyContent="start">
          <GenericButton
            data-testid="confirm-terms"
            text="Confirm"
            variant={userAgreed ? "solid" : "solid-disabled"}
            className="w-[200px] mx-auto md:mx-0"
            touchable={userAgreed ? true : false}
            onClick={closeHandler}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Discalimer
