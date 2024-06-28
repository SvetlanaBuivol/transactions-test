const ExportForm = ({ transactions, selectedColumns }) => {

  const handleExportClick = () => {
    let headers = selectedColumns.join(",");
    headers += "\n";

    let content = headers;
    transactions.forEach((transaction) => {
      console.log("transactions.forEach  transaction", transaction)
        const rowData = selectedColumns.map((col) => {
            const value = transaction[col]
            console.log(`Column: ${col}, Value: ${value}`)
            return value !== undefined ? value : ''
        });
      console.log("transactions.forEach  rowData", rowData)
      content += rowData.join(",") + "\n";
      console.log("transactions.forEach  content", content)
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
      <button onClick={handleExportClick}>Export</button>
    </div>
  );
};

export default ExportForm;
