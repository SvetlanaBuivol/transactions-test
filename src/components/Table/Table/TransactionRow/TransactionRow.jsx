const TransactionRow = ({ transaction, onEditClick, onDeleteClick }) => {
  return (
    <tr>
      <td>{transaction.TransactionId}</td>
      <td>{transaction.Status}</td>
      <td>{transaction.Type}</td>
      <td>{transaction.ClientName}</td>
      <td>{transaction.Amount}</td>
      <td>
        <button onClick={() => onEditClick(transaction)}>Edit</button>
        <button onClick={() => onDeleteClick(transaction)}>Delete</button>
      </td>
    </tr>
  );
};

export default TransactionRow;
