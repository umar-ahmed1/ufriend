"use client";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Text,Image, Input } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserData } from "../userpage/UserHome";
import MessagePreviewArea from "../messaging/MessagePreviewArea";
import Navbar from "../navbar/Navbar";
import MessagesMiddleSection from "./MessagesMiddleSection";
import { useRecoilState } from "recoil";
import { messagingState } from "../atoms/messagingAtom";
import UserShowcaseMessages from "./UserShowcaseMessages";

type MessagesSectionProps = {
    userData?: UserData;
    selectedCategory: string;
    setSelectedCategory:React.Dispatch<React.SetStateAction<string>>    
};

const MessagesSection:React.FC<MessagesSectionProps> = ({userData,selectedCategory,setSelectedCategory}) => {
    const [user] = useAuthState(auth);
    const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);
    return (
      <>
      <Flex width="100%" justify="center">
        <Navbar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Flex direction="column" width={{ base: "25%" }}>
          <Flex width="100%" direction="column" borderRight='1px solid' borderColor='gray.200' justify='center' align='flex-start'>
            <Text pl={{base:2,md:4}} mt={{base:2,md:4}} color='brand.400' fontWeight={700} fontSize={{base:'20px',sm:'25px',md:'30px'}}>Chats</Text>
            <Input ml={{base:2,md:4}} mt={{base:2,md:4}} placeholder="Search Messages" width='90%'></Input>
            <MessagePreviewArea userData={userData} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
          </Flex>
        </Flex>
        <Flex direction="column" width={{ base: "50%", md: "50%" }}>
          <MessagesMiddleSection
            userData={userData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Flex>
        <Flex direction="column" width={{ base: "25%" }}>
          <UserShowcaseMessages
          userData={messagingStateValue.currentFriend}
          type={"right"}
          setSelectedCategory={setSelectedCategory}
          />
        </Flex>
      </Flex>
    </>
    );
}
export default MessagesSection;