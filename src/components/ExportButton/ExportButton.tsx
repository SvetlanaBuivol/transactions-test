import { FC } from "react";
import { Button } from "@mui/material";
import { ITransaction } from "../../types/transaction";

interface ExportButtonProps {
  transactions: ITransaction[];
  selectedColumns: string[];
}

const ExportButton: FC<ExportButtonProps> = ({
  transactions,
  selectedColumns,
}) => {

  const handleExportClick = () => {
    let headers = selectedColumns.join(",");
    headers += "\n";

    let content = headers;
    transactions.forEach((transaction) => {
      console.log("transactions.forEach  transaction", transaction);
      const rowData = selectedColumns.map((col) => {
        const value = transaction[col];
        console.log(`Column: ${col}, Value: ${value}`);
        return value !== undefined ? value : "";
      });

      content += rowData.join(",") + "\n";
    });
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });

    const csvUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = csvUrl;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Button size="small" variant="contained" onClick={handleExportClick}>
        Export
      </Button>
    </div>
  );
};

export default ExportButton;
