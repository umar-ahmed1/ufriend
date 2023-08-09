import { Flex, Input, Text } from "@chakra-ui/react";
import React from "react";

type EventsLeftSectionProps = {};

const EventsLeftSection: React.FC<EventsLeftSectionProps> = () => {
  return (
    <Flex>
      <Flex
        width="100%"
        direction="column"
        borderRight="1px solid"
        borderColor="gray.200"
        justify="center"
        align="flex-start"
      >
        <Text
          pl={{ base: 2, md: 4 }}
          mt={{ base: 2, md: 4 }}
          color="brand.400"
          fontWeight={700}
          fontSize={{ base: "20px", sm: "25px", md: "30px" }}
        >
          Your Events
        </Text>
        <Input
          ml={{ base: 2, md: 4 }}
          mt={{ base: 2, md: 4 }}
          placeholder="Search Your Events"
          width="90%"
        ></Input>
      </Flex>
    </Flex>
  );
};
export default EventsLeftSection;
