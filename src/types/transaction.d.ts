export interface ITransaction {
  [key: string]: any;
  TransactionId: string;
  Status: "Pending" | "Cmpleted" | "Cancelled";
  Type: "Refill" | "Withdrawal";
  ClientName: string;
  // Amount: string | number;
  Amount: number;
}

export type TypeTransactionId = string | number;
