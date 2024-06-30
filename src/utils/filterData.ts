import { IFilterValue } from "../types/filter";
import { ITransaction } from "../types/transaction";

export const filterData = (
  transactions: ITransaction[],
  filter: IFilterValue
) => {
  const filteredData = transactions?.filter((transaction) => {
    return (
      (!filter.filterStatus || transaction.Status === filter.filterStatus) &&
      (!filter.filterType || transaction.Type === filter.filterType)
    );
  });
  return filteredData;
};
