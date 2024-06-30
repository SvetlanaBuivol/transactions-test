import { ChangeEvent, FC } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { columns } from "../../constants/columns";
import { Box } from "./FilterColumn.styled";

const css = {
  "@media screen and (max-width: 1439px)": {
    flexDirection: "row",
  },
};

interface FilterColumnProps {
  filter: {
    columns: string[];
  };
  onFilterChange: (newFilter: { columns: string[] }) => void;
}

const FilterColumn: FC<FilterColumnProps> = ({ filter, onFilterChange }) => {
  const handleColumnChange = (
    event: ChangeEvent<HTMLInputElement>,
    column: string
  ) => {
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
    <Box>
      <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Columns to Export</FormLabel>
        <FormGroup sx={css}>
          {columns.map((col) => (
            <FormControlLabel
              sx={{ marginRight: "10px", span: { padding: "4px" } }}
              key={col}
              control={
                <Checkbox
                  sx={{ m: 0 }}
                  size="small"
                  checked={filter.columns.includes(col)}
                  onChange={(e) => handleColumnChange(e, col)}
                  name={col}
                />
              }
              label={col}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default FilterColumn;
