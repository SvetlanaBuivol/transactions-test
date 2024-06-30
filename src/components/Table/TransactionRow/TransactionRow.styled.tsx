import styled from "styled-components";

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const EditButton = styled.button`
  display: block;
  padding: 4px;
  border-bottom: 1px solid #1976d2;
  border-top: 1px solid #1976d2;
  border-left: 1px solid #1976d2;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  transition: background-color 250ms ease-in-out, color 250ms ease-in-out;

  &:hover {
    background-color: #1976d2b2;
    color: #fff;
  }
`;

export const DeleteButton = styled.button`
  display: block;
  padding: 4px;
  border: 1px solid #1976d2;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: background-color 250ms ease-in-out, color 250ms ease-in-out;

  &:hover {
    background-color: #1976d2b2;
    color: #fff;
  }
`;
