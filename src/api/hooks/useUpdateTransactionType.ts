import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateTransactionType } from "../db";
import { Database } from "sql.js";
import { TypeTransactionId } from "../../types/transaction";

export const useUpdateTransactionType = (
  db: Database
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
