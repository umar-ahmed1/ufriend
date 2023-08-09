import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../navbar/Navbar";
import { UserData } from "../userpage/UserHome";
import EventsLeftSection from "./EventsLeftSection";
import EventsRightSection from "./EventsRightSection";

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
      <Flex direction="column" width={{ base: "25%", md: "25%" }}>
        <EventsLeftSection />
      </Flex>
      <Flex direction="column" width={{ base: "65%", md: "65%" }}>
        <EventsRightSection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Flex>
    </Flex>
  );
};
export default EventSection;
