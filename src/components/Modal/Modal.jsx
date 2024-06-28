import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Backdrop, ModalContent } from "./Modal.styled";

export const Modal = ({ isOpen, onClose, children }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (event) => {
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

  return isOpen
    ? createPortal(
        <Backdrop onClick={handleBackdropClick}>
          <ModalContent>{children}</ModalContent>
        </Backdrop>,
        document.getElementById("modal")
      )
    : null;
};

export default Modal;
