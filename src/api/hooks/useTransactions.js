import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "../db"

export const useTransactions = (db) => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: () => getTransactions(db),
        enabled: !!db,
        initialData: [],
    })
}