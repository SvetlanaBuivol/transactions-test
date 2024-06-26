import initSqlJs, { Database as SQLiteDatabase} from "sql.js/dist/sql-wasm";
import { ITransaction, TypeTransactionId } from "../types/transaction";

export const initializeDatabase = async (): Promise<SQLiteDatabase> => {
  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
  });
  const database = new SQL.Database();
  database.exec(
    "CREATE TABLE IF NOT EXISTS transactions (TransactionId INTEGER PRIMARY KEY, Status TEXT, Type TEXT, ClientName TEXT, Amount REAL)"
  );
  return database;
};

export const insertTransactions = async (
  db: SQLiteDatabase,
  transaction: ITransaction
): Promise<void> => {
  const { TransactionId, Status, Type, ClientName, Amount } = transaction;

  return new Promise<void>((resolve, reject) => {
    try {
      db.run(
        `INSERT INTO transactions(TransactionId, Status, Type, ClientName, Amount) VALUES(?, ?, ?, ?, ?)`,
        [TransactionId, Status, Type, ClientName, Amount]
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const getTransactions = (db: SQLiteDatabase): ITransaction[] => {
  const result = db.exec("SELECT * FROM transactions");
  return result[0].values.map((row: any[]) => ({
    TransactionId: row[0],
    Status: row[1],
    Type: row[2],
    ClientName: row[3],
    Amount:  parseFloat(row[4].replace('$', '')),
  }));
};

export const updateTransactionType = async (
  db: SQLiteDatabase,
  TransactionId: TypeTransactionId,
  newType: string
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    try {
      db.run("UPDATE transactions SET Type = ? WHERE TransactionId = ?", [
        newType,
        TransactionId,
      ]);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteTransaction = async (
  db: SQLiteDatabase,
  TransactionId: TypeTransactionId
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    try {
      db.run("DELETE FROM transactions WHERE TransactionId = ?", [
        TransactionId,
      ]);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
