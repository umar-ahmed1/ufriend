"use client";
import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { messagingState } from "../atoms/messagingAtom";
import { UserData } from "../userpage/UserHome";
import MessagePreviewItem from "./MessagePreviewItem";

type MessagePreviewAreaProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const MessagePreviewArea: React.FC<MessagePreviewAreaProps> = ({
  userData,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);
  return (
    <Flex
      width="100%"
      height={{base:'88vh',md:'86vh'}}
      direction="column"
    >
      <Stack pt={{base:2,md:4}} pl={{base:1,md:3}} pr={{base:1,md:3}} spacing={5} width="100%">
        {messagingStateValue.myFriends.map((friendData, index) => (
          <MessagePreviewItem
            key={index}
            userData={friendData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            contents={friendData.latestMessage || ""}
          />
        ))}
      </Stack>
    </Flex>
  );
};
export default MessagePreviewArea;
