import { FC, useEffect, useState } from "react";
import { Database } from "sql.js";
import { initializeDatabase } from "./api/db";
import TablePage from "./pages/TablePage/TablePage";

const App: FC = () => {
  const [db, setDb] = useState<Database | null>(null);

  useEffect(() => {
    const loadDb = async () => {
      const database = await initializeDatabase();
      setDb(database);
    };
    loadDb();
  }, []);

  if (!db) {
    return <div>Loading database...</div>;
  }

  return <TablePage db={db} />;
};

export default App;
