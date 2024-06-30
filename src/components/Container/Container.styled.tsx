import styled from "styled-components";

export const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  gap: 1rem;
  padding: 20px 20px 10px;
  margin: 0 auto;

  @media screen and (min-width: 1440px) {
    width: 100%;
    grid-template-columns: 160px 1fr;
    grid-template-rows: auto 1fr;
  }
`;
