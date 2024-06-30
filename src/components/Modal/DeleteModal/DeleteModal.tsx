import { FC } from "react";
import { Button } from "@mui/material";
import Modal from "../Modal";
import { ButtonWrapper, Title } from "../EditModal/EditModal.styled";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Title>Are you sure you want to delete?</Title>
      <ButtonWrapper>
        <Button size="small" variant="contained" onClick={onDelete}>
          Delete
        </Button>
        <Button size="small" variant="contained" onClick={onCancel}>
          Cansel
        </Button>
      </ButtonWrapper>
    </Modal>
  );
};

export default DeleteModal;
