"use client";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Text,Image } from "@chakra-ui/react";
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
    <Flex width="100%" direction="column">
      <Flex
        width="100%"
        height="6vh"
        align="center"
        pl={3}
        pr={3}
        justify="space-between"
        borderRight='1px solid grey'
      >
        <Flex align="center">
          {userData?.photoURL ? (
            <Image
              width="40px"
              height="40px"
              borderRadius="full"
              mr={1}
              color="gray.300"
              src={`${userData.photoURL}`}
            />
          ) : (
            <Icon fontSize={40} mr={1} color="brand.100" as={AiOutlineUser} />
          )}
          <Flex
            direction="column"
            display={{ base: "none", lg: "flex" }}
            fontSize="8pt"
            align="flex-start"
            ml={1}
          >
            <Text fontWeight={700} fontSize={12}>
              {(userData && userData.displayName) || user!.email?.split("@")[0]}
            </Text>
            <Flex align="center">
              <Icon as={IoSparkles} color="brand.100" mr={1} />
              <Text fontSize={12} color="gray.400">
                1 karma
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex align="center">
          <Icon mr={2} fontSize={35} as={CiSettings}></Icon>
          <UserMenu user={user} userData={userData}/>
        </Flex>
      </Flex>
      <MessagePreviewArea userData={userData} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
    </Flex>
  );
};
export default LeftSection;
