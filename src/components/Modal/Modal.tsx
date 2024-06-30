import { FC, MouseEvent, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Backdrop, ModalContent } from "./Modal.styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  const modalRoot = document.getElementById("modal");

  return isOpen && modalRoot
    ? createPortal(
        <Backdrop onClick={handleBackdropClick}>
          <ModalContent>{children}</ModalContent>
        </Backdrop>,
        modalRoot
      )
    : null;
};

export default Modal;
