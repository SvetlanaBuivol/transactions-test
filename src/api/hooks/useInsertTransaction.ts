import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import { insertTransactions } from "../db"
import { Database as SQLiteDatabase} from "sql.js/dist/sql-wasm";
import { ITransaction } from "../../types/transaction"

export const useInsertTransaction = (db: SQLiteDatabase): UseMutationResult<void, unknown, ITransaction, unknown> => {
    const queryClient = useQueryClient()

    return useMutation<void, unknown, ITransaction, unknown>({
        mutationFn: (transaction: ITransaction) => insertTransactions(db, transaction),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
        }
    })
}