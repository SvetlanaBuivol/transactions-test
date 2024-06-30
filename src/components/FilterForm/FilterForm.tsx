import { FC, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { StyledForm } from "./FilterForm.styled";
import { IFilterValue } from "../../types/filter";

interface FilterFormProps {
  onFilterChange: (filterValues: Partial<IFilterValue>) => void;
}

const FilterForm: FC<FilterFormProps> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<string>("");
  const [type, setType] = useState<string>("");

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const statusValue = event.target.value as string;
    onFilterChange({ filterStatus: statusValue });
    setStatus(statusValue);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const typeValue = event.target.value as string;
    onFilterChange({ filterType: typeValue });
    setType(typeValue);
  };

  return (
    <StyledForm>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleStatusChange}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={handleTypeChange}
        >
          <MenuItem value="Refill">Refill</MenuItem>
          <MenuItem value="Withdrawal">Withdrawal</MenuItem>
        </Select>
      </FormControl>
    </StyledForm>
  );
};

export default FilterForm;
