import initSqlJs from "sql.js";

export const initializeDatabase = async () => {
  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });
  const database = new SQL.Database();
  database.exec(
    "CREATE TABLE IF NOT EXISTS transactions (TransactionId INTEGER PRIMARY KEY, Status TEXT, Type TEXT, ClientName TEXT, Amount REAL)"
  );
  return database;
};

export const insertTransactions = (db, transaction) => {
  const { TransactionId, Status, Type, ClientName, Amount } = transaction;

  db.run(
    `INSERT INTO transactions(TransactionId, Status, Type, ClientName, Amount) VALUES(?, ?, ?, ?, ?)`,
    [TransactionId, Status, Type, ClientName, Amount]
  );
};

export const getTransactions = db => {
  const result = db.exec('SELECT * FROM transactions')
    return result[0].values.map(row => ({
        TransactionId: row[0],
        Status: row[1],
        Type: row[2],
        ClientName: row[3],
        Amount: row[4],
 }))
}

export const updateTransactionType = (db, TransactionId, newType) => {
    db.run(
        'UPDATE transactions SET Type = ? WHERE TransactionId = ?',
        [newType, TransactionId]
)
}

export const deleteTransaction = (db, TransactionId) => {
    db.run(
        'DELETE FROM transactions WHERE TransactionId = ?',
        [TransactionId]
  )
}
