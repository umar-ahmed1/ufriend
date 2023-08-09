import { Button, Divider, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import EventItem from "./EventItem";

type EventsRightSectionProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const EventsRightSection: React.FC<EventsRightSectionProps> = ({selectedCategory,setSelectedCategory}) => {
  return (
    <Flex width="100%" border="1px solid red" height="100%" direction="column" pl={{ base: 2, md: 4 }} pr={{ base: 2, md: 4 }}>
      <Flex
        width="100%"
        justify="space-between"
        align="center"
      >
        <Text

          mt={{ base: 2, md: 4 }}
          color="brand.400"
          fontWeight={700}
          fontSize={{ base: "20px", sm: "25px", md: "30px" }}
        >
          Events
        </Text>
        <Flex
          align="center"
          ml={{ base: 2, md: 4 }}
          mt={{ base: 2, md: 4 }}
          mr={{ base: 2, md: 4 }}
        >
          <Input placeholder="Search Events" maxWidth="75%"></Input>
          <Input maxWidth='25%' placeholder="Date"></Input>
        </Flex>
        <Button>Create Event</Button>
      </Flex>
      <Stack mt={{base:2,md:4}}>
        <Text fontSize={30}>Today</Text>
        <Divider borderColor='brand.400' mt={1} mb={1}/>
        <EventItem selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} contents="this session is to study for the final exam"/>
        <EventItem selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} contents="this session is to study for the final exam"/>
        <EventItem selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} contents="this session is to study for the final exam"/>
      </Stack>
      <Stack mt={{base:2,md:4}}>
        <Text fontSize={30}>Tomorrow</Text>
        <Divider borderColor='brand.400' mt={1} mb={1}/>
        <EventItem selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} contents="this session is to study for the final exam"/>
        <EventItem selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} contents="this session is to study for the final exam"/>
      </Stack>

    </Flex>
  );
};
export default EventsRightSection;
