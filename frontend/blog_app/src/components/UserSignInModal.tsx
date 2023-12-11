import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { LoremIpsum as Lorem } from "react-lorem-ipsum";

interface modalState {
  type: "signin" | "register";
}

function UserSignInModal() {
  const [modalView, setModalView] = useState<modalState>({ type: "signin" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpen}
        className="hover:bg-secondary rounded p-4 active:bg-accent"
      >
        Sign In
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              {modalView.type == "signin" && "Sign In"}
              {modalView.type == "register" && "Register"}
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody>
              {/*Sign In Body*/}
              {modalView.type == "signin" && (
                <div className="space-y-2">
                  <Input placeholder="email" type="email"></Input>
                  <Input placeholder="password" type="password"></Input>
                </div>
              )}
              {/*Register In Footer*/}
              {modalView.type == "register" && (
                <div className="space-y-2">
                  <Input placeholder="name" type="text"></Input>
                  <Input placeholder="email" type="email"></Input>
                  <Input placeholder="password" type="password"></Input>
                  <Input placeholder="verify password" type="password"></Input>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              {/*Sign In Footer*/}
              {modalView.type == "signin" && (
                <div className="w-full space-y-2 items-center text-center">
                  <p>
                    Don't have an account?{" "}
                    <a
                      className="cursor-pointer text-accent"
                      onClick={() => {
                        setModalView((prev) => ({ ...prev, type: "register" }));
                      }}
                    >
                      Register here
                    </a>
                  </p>
                  <div className="flex justify-center w-full">
                    <button
                      className="hover:bg-secondary rounded py-2 px-4 bg-accent active:bg-accent"
                      onClick={() => {}}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}
              {/*Register Footer*/}
              {modalView.type == "register" && (
                <div className="w-full space-y-2 items-center text-center">
                  <p>
                    Already have an account?{" "}
                    <a
                      className="cursor-pointer text-accent"
                      onClick={() => {
                        setModalView((prev) => ({ ...prev, type: "signin" }));
                      }}
                    >
                      Sign In
                    </a>
                  </p>
                  <div className="flex justify-center w-full">
                    <button
                      className="hover:bg-secondary rounded py-2 px-4 bg-accent active:bg-accent"
                      onClick={() => {}}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}

export default UserSignInModal;
