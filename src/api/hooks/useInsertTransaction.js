import { useMutation, useQueryClient } from "@tanstack/react-query"
import { insertTransactions } from "../db"

export const useInsertTransaction = db => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (transaction) => insertTransactions(db, transaction),
        onSuccess: () => {
            queryClient.invalidateQueries('transactions')
        }
    })
}