import { FC, ReactNode } from "react";
import { Box } from "./Container.styled";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default Container;
