import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../navbar/Navbar";
import { UserData } from "../userpage/UserHome";
import FotdMiddleSection from "./FotdMiddleSection";

type FotdSectionProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const FotdSection: React.FC<FotdSectionProps> = ({
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
      <Flex direction="column" width={{ base: "69%", md: "69%" }}>
        <FotdMiddleSection
          userData={userData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Flex>
    </Flex>
  );
};
export default FotdSection;
