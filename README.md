# Transactions Management App (Transactions)

Transactions is a web application designed for managing transaction records. It allows users to import transaction data from CSV files, export filtered transaction data back into CSV format, edit transaction statuses, delete transactions, and view transaction data in a paginated table with sorting and searching capabilities.

Application is designed with responsive principles in mind to ensure a consistent and optimal user experience across various devices and screen sizes.

## Functional Requirements

### Import Transactions

- Users can import transactions by clicking the **Import** button, which opens a file dialog for uploading CSV files.
- The application parses the CSV file and stores transaction data in its state.

### Export Transactions

- Users can export transactions by clicking the **Export** button, which generates and downloads a CSV file containing transaction information based on selected filters (transaction type, status).
- Users can choose which columns to include in the exported file.

### Transaction List

- Displays transaction data in a paginated table format.
- Provides sorting and searching functionalities for the transaction list.

### Edit Transactions

- Clicking the **Edit** button opens a modal window allowing users to change the status of a transaction.

### Delete Transactions

- Clicking the **Delete** button prompts a confirmation dialog to ensure user intent before deleting a transaction.
- Upon confirmation, the transaction is removed from the application's state and updates the interface accordingly.

## Technology Stack

- **Frontend Framework:** React with Vite
- **Database:** SQL.js for managing transaction data
- **State Management:** React Query
- **Styling:** Styled Components, MUI
- **Type Safety:** TypeScript

This application leverages modern web technologies to provide a robust interface for transaction management, ensuring efficient data handling and user interaction.
