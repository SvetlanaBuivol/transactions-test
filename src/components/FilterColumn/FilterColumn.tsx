import { FC, useEffect } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { columns } from "../../constants/columns";
import { Box } from "./FilterColumn.styled";
import { Controller, useForm } from "react-hook-form";

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
  const { control, watch } = useForm({
    defaultValues: {
      columns: filter.columns.reduce((acc, col) => {
        acc[col] = true;
        return acc;
      }, {} as { [key: string]: boolean }),
    },
  });

  const watchedColumns = watch("columns");

  useEffect(() => {
    const selectedColumns = Object.keys(watchedColumns).filter(
      (col) => watchedColumns[col]
    );
    onFilterChange({ columns: selectedColumns });
  }, [watchedColumns, onFilterChange]);

  return (
    <Box>
      <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Columns to Export</FormLabel>
        <FormGroup sx={css}>
          {columns.map((col) => (
            <FormControlLabel
              key={col}
              control={
                <Controller
                  name={`columns.${col}`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      sx={{ m: 0 }}
                      size="small"
                      checked={!!field.value}
                    />
                  )}
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
