import Modal from "../Modal";

const DeleteModal = ({ isOpen, onClose, onDelete, onCancel }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Are you sure you want to delete?</h2>
      <div>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onCancel}>Cansel</button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
