import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../navbar/Navbar";
import { UserData } from "../userpage/UserHome";
import YourEvents from "./YourEvents";
import EventsPreviewArea from "./EventsPreviewArea";
import EventsCreateArea from "./EventsCreateArea";

type EventSectionProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const EventSection: React.FC<EventSectionProps> = ({
  userData,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <Flex width="100%" justify="center">
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Flex direction="column" width={{ base: "20%", md: "25%" }}>
        <YourEvents />
      </Flex>
      <Flex direction="column" width={{ base: "80%", md: "75%" }}>
        {true && <EventsPreviewArea
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />}
      </Flex>
    </Flex>
  );
};
export default EventSection;
