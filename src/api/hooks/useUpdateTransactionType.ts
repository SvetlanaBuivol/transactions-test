import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateTransactionType } from "../db";
import { Database as SQLiteDatabase} from "sql.js/dist/sql-wasm";
import { TypeTransactionId } from "../../types/transaction";

export const useUpdateTransactionType = (
  db: SQLiteDatabase
): UseMutationResult<
  void,
  unknown,
  { TransactionId: TypeTransactionId; newType: string },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ TransactionId, newType }) =>
      updateTransactionType(db, TransactionId, newType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
