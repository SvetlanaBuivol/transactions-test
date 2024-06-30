import Papa from "papaparse";
import { ITransaction } from "../types/transaction";

export const importDataFromCSV = ( csvData: string): ITransaction[] => {
  const parsedData = Papa.parse<ITransaction>(csvData, { header: true }).data;

  return parsedData.map((row) => ({
    TransactionId: row.TransactionId,
    Status: row.Status,
    Type: row.Type,
    ClientName: row.ClientName,
    Amount:row.Amount,
  }));
};
