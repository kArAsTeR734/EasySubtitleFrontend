import Modal from "../../../shared/components/Modal";
import type {FC} from "react";

interface AuthorizationProps{
  isOpen: boolean;
}

export const Authorization:FC<AuthorizationProps> = ({
    isOpen
    }) => {
  return (
      <Modal isOpen={isOpen}>
        <h1>Hello World</h1>
      </Modal>
  );
};

