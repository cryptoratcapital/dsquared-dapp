import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { FC } from "react"
import { GenericButton } from "../Generic/GenericButton/GenericButton"

export const MetamaskFirefoxWarning: FC<{
  isOpen: boolean
  onConfirm: () => void
  onClose: () => void
}> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      blockScrollOnMount={true}
    >
      <ModalOverlay
        bg="blackAlpha.50"
        backdropFilter="blur(10px)"
        marginTop={100}
      />
      <ModalContent
        bg="dsqblack.200"
        maxW="700px"
        mx={{ base: 8, md: 12 }}
        pr={{ base: 2, md: 4 }}
        textColor="white"
        marginTop="30vh"
      >
        <ModalHeader fontSize="2xl" fontWeight="600">
          Notice to Metamask users
          <hr className="w-full mt-4 border border-dsqgray-50" />
        </ModalHeader>

        <ModalBody py={4}>
          <p className="mb-2">
            For Metamask users, we sincerely apologize for the inconvenience,
            but Metamask is unsupported in Firefox at this time due to a{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/WalletConnect/web3modal/pull/614"
              className="border-none text-dsqgreen-100"
            >
              technical issue
            </a>{" "}
            with a third party integration.
          </p>
          <p className="mb-2">
            To connect to your Metamask wallet, please use another modern
            browser such as Google Chrome, Brave Browser, or Microsoft Edge.
          </p>
        </ModalBody>

        <ModalFooter flex="row" justifyContent="start">
          <GenericButton
            autoFocus={true}
            text="Continue"
            variant="solid"
            className="w-[200px] mx-auto md:mx-0"
            touchable={true}
            onClick={() => {
              onConfirm()
            }}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
