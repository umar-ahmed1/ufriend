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
      height="94vh"
      direction="column"
      borderRight="1px solid grey"
    >
      <Flex pl={{base:2,md:4}} justify={{base:'center',sm:"flex-start"}} align="center" mt={{base:2,md:4}} width={{base:'100%',md:"40%"}} direction={{base:'column',sm:'row'}}>
        <Text
          fontWeight={700}
          fontSize={{base:15,md:20}}
          color="brand.100"
          mr={{base:2,md:4}}
          _hover={{ cursor: "pointer", textDecoration: "underline" }}
          textDecoration={selectedCategory == "Messages" ? "underline" : "none"}
        >
          Messages
        </Text>
        <Text
          fontWeight={700}
          fontSize={{base:15,md:20}}
          color="brand.100"
          _hover={{ cursor: "pointer", textDecoration: "underline" }}
          textDecoration={selectedCategory == "FOTD" ? "underline" : "none"}
          onClick={() => setSelectedCategory("FOTD")}
        >
          FOTD
        </Text>
      </Flex>

      <Stack mt={{base:2,md:4}} pl={{base:2,md:4}} pr={{base:2,md:4}} spacing={5} width="100%">
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
