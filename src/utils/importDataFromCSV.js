import Papa from "papaparse";

export const importDataFromCSV = (db, csvData) => {
  const parsedData = Papa.parse(csvData, { header: true }).data;
  console.log("Parsed CSV data:", parsedData);
  return parsedData.map((row) => ({
    TransactionId: row.TransactionId,
    Status: row.Status,
    Type: row.Type,
    ClientName: row.ClientName,
    Amount: parseFloat(row.Amount.replace(/\$/g, "")),
  }));
};
