"use client";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Text,Image, Input } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { IoSparkles } from "react-icons/io5";
import MessageBox from "../messaging/MessagePreviewArea";
import UserMenu from "./UserMenu";
import { UserData } from "./UserHome";
import MessagePreviewArea from "../messaging/MessagePreviewArea";

type LeftSectionProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory:React.Dispatch<React.SetStateAction<string>>
};

const LeftSection: React.FC<LeftSectionProps> = ({userData,selectedCategory,setSelectedCategory}) => {
  const [user] = useAuthState(auth);
  return (
    <Flex width="100%" direction="column" borderRight='1px solid' borderColor='gray.200' justify='center' align='flex-start'>
      <Text pl={{base:2,md:4}} mt={{base:2,md:4}} color='brand.400' fontWeight={700} fontSize={{base:'20px',sm:'25px',md:'30px'}}>Chats</Text>
      <Input ml={{base:2,md:4}} mt={{base:2,md:4}} placeholder="Search Messages" width='90%'></Input>
      <MessagePreviewArea userData={userData} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
    </Flex>
  );
};
export default LeftSection;
