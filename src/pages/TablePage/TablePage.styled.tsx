import styled from "styled-components";

export const FilterBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-row: 1;

  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  @media screen and (min-width: 1440px) {
    grid-column: 2;
  }
`;
