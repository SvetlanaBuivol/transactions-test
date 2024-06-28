import styled from "styled-components";

export const Backdrop = styled.div`
    position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.75);
  overflow: hidden;
`

export const ModalContent = styled.div`
  position: relative;
  background-color: #ffff;
  padding: 30px;
  border-radius: 36px;
  width: 100%;
  max-width: 375px;
  /* margin-top: 16px;
  margin-bottom: 16px; */
  `