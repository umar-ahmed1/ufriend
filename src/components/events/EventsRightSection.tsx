import { Button, Divider, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import EventItem from "./EventItem";

type EventsRightSectionProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const EventsRightSection: React.FC<EventsRightSectionProps> = ({selectedCategory,setSelectedCategory}) => {
  return (
    <Flex width="100%" borderLeft='1px solid' borderColor='gray.200' height="100%" direction="column" pl={{ base: 2, md: 4 }} pr={{ base: 2, md: 4 }}>
      <Flex
        width="100%"
        justify="space-between"
        align="center"
        mt={{ base: 2, md: 4 }}
      >
        <Text
          
          color="brand.400"
          fontWeight={700}
          fontSize={{ base: "20px", sm: "25px", md: "30px" }}
        >
          Events
        </Text>
        <Flex
          align="center"
          width='60%'
        >
          <Input placeholder="Search Events" maxWidth="75%"></Input>
          <Input maxWidth='25%' placeholder="Date"></Input>
        </Flex>
        <Button color='white' backgroundColor='brand.400' _hover={{opacity:0.9}}>Create Event</Button>
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
