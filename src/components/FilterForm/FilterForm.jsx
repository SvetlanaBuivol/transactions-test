import { columns } from "../../constants/columns";

const FilterForm = ({ filter, onFilterChange }) => {
  const handleStatusChange = (event) => {
    onFilterChange({ filterStatus: event.target.value });
  };

  const handleTypeChange = (event) => {
    onFilterChange({ filterType: event.target.value });
  };

  const handleColumnChange = (event, column) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      onFilterChange({
        columns: [...filter.columns, column],
      });
    } else {
      onFilterChange({
        columns: filter.columns.filter((col) => col !== column),
      });
    }
  };

  return (
    <form>
      <div>
        <label>Status</label>
        <select onChange={handleStatusChange}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label>Type</label>
        <select onChange={handleTypeChange}>
          <option value="">All</option>
          <option value="Refill">Refill</option>
          <option value="Withdrawal">Withdrawal</option>
        </select>
      </div>
      <div>
        <label>Columns to Export</label>
        <div>
          {columns.map((col) => (
            <label key={col}>
              <input
                type="checkbox"
                checked={filter.columns.includes(col)}
                onChange={(e) => handleColumnChange(e, col)}
              />
              {col}
            </label>
          ))}
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
