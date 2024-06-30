import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTransaction } from "../db"
import { Database as SQLiteDatabase} from "sql.js/dist/sql-wasm";
import { TypeTransactionId } from "../../types/transaction";

export const useDeleteTransaction = (db: SQLiteDatabase): UseMutationResult<void, unknown, TypeTransactionId, unknown> => {
    const queryClient = useQueryClient()

    return useMutation<void, unknown, TypeTransactionId, unknown>({
        mutationFn: (TransactionId: TypeTransactionId) => deleteTransaction(db, TransactionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] })
        }
    })
}