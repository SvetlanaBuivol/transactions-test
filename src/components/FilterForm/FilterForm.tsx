import { FC, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { StyledForm } from "./FilterForm.styled";
import { IFilterValue } from "../../types/filter";
import { Controller, useForm, useWatch } from "react-hook-form";

interface FilterFormProps {
  onFilterChange: (filterValues: Partial<IFilterValue>) => void;
}

const FilterForm: FC<FilterFormProps> = ({ onFilterChange }) => {
  const { control } = useForm<IFilterValue>({
    defaultValues: {
      filterStatus: "",
      filterType: "",
    },
  });

  const filterStatus = useWatch({
    control,
    name: "filterStatus",
  });

  const filterType = useWatch({
    control,
    name: "filterType",
  });

  useEffect(() => {
    onFilterChange({ filterStatus, filterType });
  }, [filterStatus, filterType, onFilterChange]);

  return (
    <StyledForm>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="status-select-label">Status</InputLabel>
        <Controller
          name="filterStatus"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              labelId="status-select-label"
              id="status-select"
              label="Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="type-select-label">Type</InputLabel>
        <Controller
          name="filterType"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              labelId="type-select-label"
              id="type-select"
              label="Type"
            >
              <MenuItem value="Refill">Refill</MenuItem>
              <MenuItem value="Withdrawal">Withdrawal</MenuItem>
            </Select>
          )}
        />
      </FormControl>
    </StyledForm>
  );
};

export default FilterForm;
