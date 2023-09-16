"use client";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { UserData } from "../userpage/UserHome";
import { RiPagesFill } from "react-icons/ri";
import { BsFillCalendarDateFill } from "react-icons/bs";

type EventsCreateAreaProps = {};

type Event = {
  title: string;
  date: string;
  time: string;
  description: string;
  creatorId: string;
  attendees: UserData[];
};

const EventsCreateArea: React.FC<EventsCreateAreaProps> = () => {
  const [eventDetails, setEventDetails] = React.useState<Event>({
    title: "",
    date: "",
    time: "",
    description: "",
    creatorId: "",
    attendees: [],
  });

  const [selected, setSelected] = React.useState("Details");

  React.useEffect(() => {
    console.log(eventDetails)
  },[eventDetails])

  return (
    <>
      <Flex width="100%" direction="column" bgColor="gray.100" height="100vh">
        <Flex height="400px" width="33%" direction="column" ml="5%" p={5}>
          <Text fontSize={30} color="brand.400">
            Create an Event
          </Text>
          <Divider borderColor="brand.100" />
          <Stack
            mt={5}
            spacing={5}
            height="300px"
            bgColor="white"
            border="1px solid"
            borderColor="brand.300"
          >
            <Flex width="100%">
              <Button
                width="50%"
                bgColor="white"
                border="1px solid"
                borderColor="gray.100"
                height="50px"
                borderRadius="0"
                fontWeight={selected == "Details" ? "700" : "400"}
                color="brand.400"
                borderBottomColor={
                  selected == "Details" ? "brand.400" : "gray.100"
                }
                onClick={() => setSelected("Details")}
              >
                <Icon as={RiPagesFill} mr={2}></Icon>
                <Text>Details</Text>
              </Button>
              <Button
                width="50%"
                bgColor="white"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="0"
                textAlign="center"
                height="50px"
                fontWeight={selected == "Date & Time" ? "700" : "400"}
                color="brand.400"
                borderBottomColor={
                  selected == "Date & Time" ? "brand.400" : "gray.100"
                }
                onClick={() => setSelected("Date & Time")}
              >
                <Icon as={BsFillCalendarDateFill} mr={2}></Icon>
                <Text>Date & Time</Text>
              </Button>
            </Flex>
            {selected == "Details" ? (
              <>
                <Input
                  ml={5}
                  type="text"
                  width="90%"
                  placeholder="Title"
                  value={eventDetails.title}
                  onChange={(event) => setEventDetails((prev) => ({
                    ...prev,
                    title: event.target.value
                  }))}
                ></Input>
                <Textarea
                  ml={5}
                  width="90%"
                  placeholder="Description"
                  resize={"none"}
                  value={eventDetails.description}
                  onChange={(event) => setEventDetails((prev) => ({
                    ...prev,
                    description:event.target.value
                  }))}
                />
              </>
            ) : (
              <>
                <Input
                  ml={5}
                  type="text"
                  width="90%"
                  placeholder="Date"
                ></Input>
                <Textarea
                  ml={5}
                  width="90%"
                  placeholder="Time"
                  resize={"none"}
                />
              </>
            )}
            <Flex width="100%" align="center" justify="flex-end" pr={10}>
              <Button
                bgColor="brand.400"
                color="white"
                _hover={{ bgColor: "brand.100", color: "brand.400" }}
              >
                Create Event
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
export default EventsCreateArea;
