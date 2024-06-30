import { FC, useState } from "react";
import { Stack } from "@mui/material";
import { Database as SQLiteDatabase} from "sql.js/dist/sql-wasm";
import Container from "../../components/Container/Container";
import FilterColumn from "../../components/FilterColumn/FilterColumn";
import { columns } from "../../constants/columns";
import FilterForm from "../../components/FilterForm/FilterForm";
import ImportButton from "../../components/ImportButton/ImportButton";
import ExportButton from "../../components/ExportButton/ExportButton";
import Table from "../../components/Table/Table/Table";
import { FilterBox } from "./TablePage.styled";
import { importDataFromCSV } from "../../utils/importDataFromCSV";
import { useInsertTransaction, useTransactions } from "../../api/hooks";
import { filterData } from "../../utils/filterData";
import { IFilterValue } from "../../types/filter";
import { ITransaction } from "../../types/transaction";

interface TablePageProps {
  db: SQLiteDatabase;
}

const TablePage: FC<TablePageProps> = ({ db }) => {
  const [filter, setFilter] = useState<IFilterValue>({
    filterStatus: "",
    filterType: "",
    columns: columns,
  });

  const { data: transactions, isLoading, refetch } = useTransactions(db);
  const insertTransaction = useInsertTransaction(db);

  const handleFilterChange = (filterValues: Partial<IFilterValue>) => {
    setFilter((prevFilters) => ({ ...prevFilters, ...filterValues }));
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const csvData = e.target?.result as string;
      const parsedData: ITransaction[] = importDataFromCSV(csvData);
      parsedData.forEach((transaction) => {
        insertTransaction.mutate(transaction);
      });
      refetch();
    };
    reader.readAsText(file);
  };

  const filteredData = transactions ? filterData(transactions, filter) : [];

  return (
    <Container>
      <FilterColumn filter={filter} onFilterChange={handleFilterChange} />
      <FilterBox>
        <FilterForm onFilterChange={handleFilterChange} />
        <Stack spacing={2} direction="row" sx={{ m: 1 }}>
          <ImportButton onFileSelect={handleFileSelect} />
          <ExportButton
            transactions={filteredData}
            selectedColumns={filter.columns}
          />
        </Stack>
      </FilterBox>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table transactions={filteredData} db={db} />
      )}
    </Container>
  );
};

export default TablePage;
