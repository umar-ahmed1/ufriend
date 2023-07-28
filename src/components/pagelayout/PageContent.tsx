import { Flex } from "@chakra-ui/react";
import React from "react";

import Navbar from "../navbar/Navbar";

type PageContentProps = {
  children: any;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <>
      <Flex width="100%" justify="center">
        <Navbar />
        {/*LHS*/}
        <Flex direction="column" width={{ base: "25%" }}>
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/*MHS*/}
        <Flex direction="column" width={{ base: "50%", md: "50%" }}>
          {children && children[1 as keyof typeof children]}
        </Flex>
        {/*RHS*/}
        <Flex direction="column" width={{ base: "25%" }}>
          {children && children[2 as keyof typeof children]}
        </Flex>
      </Flex>
    </>
  );
};
export default PageContent;
