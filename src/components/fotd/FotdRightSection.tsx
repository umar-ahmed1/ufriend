import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { messagingState } from "../atoms/messagingAtom";
import { UserData } from "../userpage/UserHome";
import UserShowcase from "../userpage/UserShowcase";

type FotdRightSectionProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const FotdRightSection: React.FC<FotdRightSectionProps> = ({
  userData,
  selectedCategory,
  setSelectedCategory,
}) => {

  return (
    <Flex width='100%' direction='column'>
      Hi
    </Flex>
  );
};
export default FotdRightSection;
