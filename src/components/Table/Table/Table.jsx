import { useState } from "react";
import {
  useDeleteTransaction,
  useUpdateTransactionType,
} from "../../../api/hooks";
import TransactionRow from "./TransactionRow/TransactionRow";
import EditModal from "../../Modal/EditModal/EditModal";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";

const Table = ({ transactions, db }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const updateTransactionType = useUpdateTransactionType(db);
  const deleteTransaction = useDeleteTransaction(db);

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    handleOpenEditModal();
  };

  const handleDeleteClick = (transaction) => {
    setSelectedTransaction(transaction);
    handleOpenDeleteModal();
  };

  const handleUpdateType = (newType) => {
    if (selectedTransaction && newType) {
      updateTransactionType.mutate({
        TransactionId: selectedTransaction.TransactionId,
        newType,
      });
      handleCloseEditModal();
    }
  };

  const handleDeleteTransaction = () => {
    deleteTransaction.mutate(selectedTransaction.TransactionId);
    handleCloseDeleteModal();
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Type</th>
            <th>Client Name</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <TransactionRow
              key={transaction.TransactionId}
              transaction={transaction}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </tbody>
      </table>
      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        transaction={selectedTransaction}
        onUpdateType={handleUpdateType}
        onCancel={handleCloseEditModal}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteTransaction}
        onCancel={handleCloseDeleteModal}
      />
    </>
  );
};

export default Table;
