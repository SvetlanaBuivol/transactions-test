import styled from "styled-components";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
};

export const Root = styled.div`
  grid-column: 1;

  @media screen and (min-width: 1440px) {
    grid-column: 2;
    grid-row: 2;
  }
  table {
    font-size: 1.2rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${grey[200]};
    text-align: center;
    padding: 8px;
  }

  th {
    background-color: ${grey[100]};
  }
`;

export const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin-left: auto;
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.select} {
    border: 1px solid ${grey[200]};
    border-radius: 3px;
    background-color: ${grey[100]};
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
    button {
      background-color: ${grey[100]};
      border-radius: 3px;

      &:hover {
        background-color: ${grey[200]};
      }

      &:disabled {
        background-color: ${grey[50]};
        span {
          color: ${grey[300]};
        }
      }
    }
  }
`;
