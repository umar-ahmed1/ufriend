import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../navbar/Navbar";
import MiddleSection from "./FotdMiddleSection";
import { UserData } from "../userpage/UserHome";
import FotdRightSection from "./FotdRightSection";

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
      <Flex direction="column" width={{ base: "75%", md: "75%" }}>
        <MiddleSection
          userData={userData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Flex>
      <Flex direction="column" width={{ base: "25%" }}>
        <FotdRightSection
          userData={userData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Flex>
    </Flex>
  );
};
export default FotdSection;
