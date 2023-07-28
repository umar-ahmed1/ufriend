import { Flex, Button, Text, Image, Icon, Box } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { UserData } from "./UserHome";
import { AiOutlineUser } from "react-icons/ai";
import UserShowcase from "./UserShowcase";
import { messagingState } from "../atoms/messagingAtom";
import { useRecoilState } from "recoil";
import RightButtonMenu from "./RightButtonMenu";

type RightSectionProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const RightSection: React.FC<RightSectionProps> = ({
  userData,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);

  return (
    <Flex direction="column" width="100%">
      <Flex
        width="100%"
        height="10vh"
        align="center"
        justify="center"
        display={{ base: "flex", md: "none" }}
      >
        <RightButtonMenu/>
      </Flex>
      {selectedCategory == "Messages" && (
        <UserShowcase
          userData={messagingStateValue.currentFriend}
          type={"right"}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </Flex>
  );
};
export default RightSection;
