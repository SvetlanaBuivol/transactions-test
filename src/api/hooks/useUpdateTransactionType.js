import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTransactionType } from "../db"

export const useUpdateTransactionType = db => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ TransactionId, newType }) => updateTransactionType(db, TransactionId, newType),
        onSuccess: () => {
            queryClient.invalidateQueries('transactions')
        }
    })
}