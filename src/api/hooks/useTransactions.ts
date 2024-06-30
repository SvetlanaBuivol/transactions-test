import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../db";
import { Database } from "sql.js";
import { ITransaction } from "../../types/transaction";

export const useTransactions = (db: Database) => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(db),
    enabled: !!db,
    initialData: [] as ITransaction[],
  });
};
