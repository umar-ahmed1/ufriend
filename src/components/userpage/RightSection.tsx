import { Flex, Button, Text } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { UserData } from "./UserHome";

type RightSectionProps = {
  userData?: UserData;
};

const RightSection: React.FC<RightSectionProps> = ({ userData }) => {
  return (
    <Flex direction="column">
      <Flex
        width="100%"
        height="6vh"
        align="center"
        justify="center"
        border="1px solid red"
      >
        <Button mr={{ base: 1, md: 3 }}>Events</Button>
        <Button mr={{ base: 1, md: 3 }}>Tutors</Button>
        <Button onClick={() => router.push("/about")}>Classes</Button>
      </Flex>
      <Flex
        width="100%"
        height="94vh"
        border="1px solid grey"
        direction="column"
      >
        <Text>Heres ur friend xd</Text>
      </Flex>
    </Flex>
  );
};
export default RightSection;
