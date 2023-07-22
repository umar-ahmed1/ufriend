"use client";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type MessageBoxProps = {};

const MessageBox: React.FC<MessageBoxProps> = () => {
  return (
    <Flex width="100%" height="94vh" justify="center" border="1px solid grey">
      <Text mt={2}>Messages</Text>
    </Flex>
  );
};
export default MessageBox;
