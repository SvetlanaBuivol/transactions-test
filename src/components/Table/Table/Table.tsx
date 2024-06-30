import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { Database as SQLiteDatabase} from "sql.js/dist/sql-wasm";
import {
  useDeleteTransaction,
  useUpdateTransactionType,
} from "../../../api/hooks";
import TransactionRow from "../TransactionRow/TransactionRow";
import EditModal from "../../Modal/EditModal/EditModal";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import { CustomTablePagination, Root } from "./Table.styled";
import { ITransaction } from "../../../types/transaction";

interface TableProps {
  transactions: ITransaction[];
  db: SQLiteDatabase;
}

const Table: FC<TableProps> = ({ transactions, db }) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITransaction | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updateTransactionType = useUpdateTransactionType(db);
  const deleteTransaction = useDeleteTransaction(db);

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleEditClick = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    handleOpenEditModal();
  };

  const handleDeleteClick = (transaction: ITransaction) => {
    setSelectedTransaction(transaction);
    handleOpenDeleteModal();
  };

  const handleUpdateType = (newType: string) => {
    if (selectedTransaction && newType) {
      updateTransactionType.mutate({
        TransactionId: selectedTransaction.TransactionId,
        newType,
      });
      handleCloseEditModal();
    }
  };

  const handleDeleteTransaction = () => {
    if (selectedTransaction) {
      deleteTransaction.mutate(selectedTransaction.TransactionId);
    }
    handleCloseDeleteModal();
  };

  return (
    <Root>
      <table aria-label="custom pagination table">
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
          {(rowsPerPage > 0
            ? transactions.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : transactions
          ).map((transaction) => (
            <TransactionRow
              key={transaction.TransactionId}
              transaction={transaction}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={transactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
      {selectedTransaction && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          transaction={selectedTransaction}
          onUpdateType={handleUpdateType}
          onCancel={handleCloseEditModal}
        />
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteTransaction}
        onCancel={handleCloseDeleteModal}
      />
    </Root>
  );
};

export default Table;
