"use client";
import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { UserData } from "../userpage/UserHome";
import MessagePreview from "./MessagePreview";

type MessageBoxProps = {
    userData?: UserData
};

const MessageBox: React.FC<MessageBoxProps> = ({userData}) => {
  return (
    <Flex width="100%" height="94vh" border="1px solid grey" direction='column'>
        <Flex justify='center' align='center'>
        <Text mt={2}>Messages</Text>
        </Flex>

        <Stack mt={4} pl={4} pr={4} spacing={5} width='100%'>
            <MessagePreview userData={userData}/>
            <MessagePreview userData={userData}/>
            <MessagePreview userData={userData}/>
            <MessagePreview userData={userData}/>
            <MessagePreview userData={userData}/>
        </Stack>

      
    </Flex>
  );
};
export default MessageBox;
