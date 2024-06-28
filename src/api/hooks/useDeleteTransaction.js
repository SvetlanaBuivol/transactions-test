import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTransaction } from "../db"

export const useDeleteTransaction = db => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: TransactionId => deleteTransaction(db, TransactionId),
        onSuccess: () => {
            queryClient.invalidateQueries('transactions')
        }
    })
}