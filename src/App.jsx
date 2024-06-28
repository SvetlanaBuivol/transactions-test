import { useEffect, useState } from "react";
import ImportButton from "./components/ImportButton/ImportButton";
import FilterForm from "./components/FilterForm/FilterForm";
import Table from "./components/Table/Table/Table";
import { initializeDatabase } from "./api/db";
import { importDataFromCSV } from "./utils/importDataFromCSV";
import ExportForm from "./components/ExportForm/ExportForm";
import { columns } from "./constants/columns";
import { useInsertTransaction, useTransactions } from "./api/hooks";

function App() {
  const [filter, setFilter] = useState({
    filterStatus: "",
    filterType: "",
    columns: columns,
  });
  const [db, setDb] = useState(null);

  useEffect(() => {
    const loadDb = async () => {
      const database = await initializeDatabase();
      setDb(database);
    };
    loadDb();
  }, []);

  const { data: transactions, isLoading, refetch } = useTransactions(db);
  const insertTransaction = useInsertTransaction(db);

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target.result;
      const parsedData = importDataFromCSV(db, csvData);
      parsedData.forEach((transaction) => {
        insertTransaction.mutate(transaction);
      });
      refetch();
    };
    reader.readAsText(file);
  };

  const handleFilterChange = (filterValues) => {
    setFilter((prevFilters) => ({ ...prevFilters, ...filterValues }));
  };

  const filteredData = transactions?.filter((transaction) => {
    return (
      (!filter.filterStatus || transaction.Status === filter.filterStatus) &&
      (!filter.filterType || transaction.Type === filter.filterType)
    );
  });

  return (
    <>
      <ImportButton onFileSelect={handleFileSelect} />
      <ExportForm
        transactions={filteredData}
        selectedColumns={filter.columns}
      />
      <FilterForm filter={filter} onFilterChange={handleFilterChange} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
          <Table transactions={filteredData} db={db} />
      )}
    </>
  );
}

export default App;