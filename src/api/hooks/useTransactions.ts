import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../db";
import { Database as SQLiteDatabase} from "sql.js/dist/sql-wasm";
import { ITransaction } from "../../types/transaction";

export const useTransactions = (db: SQLiteDatabase) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(db),
    enabled: !!db,
    initialData: [] as ITransaction[],
  });
};
