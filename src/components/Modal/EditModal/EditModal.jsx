import { useEffect, useState } from "react";
import Modal from "../Modal";

const EditModal = ({
  isOpen,
  onClose,
  transaction,
  onUpdateType,
  onCancel,
}) => {
  const [newType, setNewType] = useState("");

  useEffect(() => {
    if (transaction && transaction.Type) {
      setNewType(transaction.Type);
    } else {
      setNewType("");
    }
  }, [transaction]);

  const handleUpdateType = () => {
    onUpdateType(newType);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Edit Transaction Type</h2>
      <label>
        <input
          type="radio"
          value="refill"
          checked={newType === "Refill"}
          onChange={() => setNewType("Refill")}
        />
        Refill
      </label>
      <label>
        <input
          type="radio"
          value="withdrawal"
          checked={newType === "Withdrawal"}
          onChange={() => setNewType("Withdrawal")}
        />
        Withdrawal
      </label>
      <div>
        <button onClick={handleUpdateType}>Update</button>
        <button onClick={onCancel}>Cansel</button>
      </div>
    </Modal>
  );
};

export default EditModal;
