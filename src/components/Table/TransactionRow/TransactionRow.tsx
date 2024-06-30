import { FC } from "react";
import { ITransaction } from "../../../types/transaction";
import { ButtonBox, DeleteButton, EditButton } from "./TransactionRow.styled";

interface TransactionRowProps {
  transaction: ITransaction;
  onEditClick: (transaction: ITransaction) => void;
  onDeleteClick: (transaction: ITransaction) => void;
}

const TransactionRow: FC<TransactionRowProps> = ({
  transaction,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <tr>
      <td>{transaction.TransactionId}</td>
      <td>{transaction.Status}</td>
      <td>{transaction.Type}</td>
      <td>{transaction.ClientName}</td>
      <td>{transaction.Amount}</td>
      <td>
        <ButtonBox>
          <EditButton onClick={() => onEditClick(transaction)}>Edit</EditButton>
          <DeleteButton onClick={() => onDeleteClick(transaction)}>
            Delete
          </DeleteButton>
        </ButtonBox>
      </td>
    </tr>
  );
};

export default TransactionRow;
