import { Flex, Button, Text, Image, Icon, Box } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { UserData } from "./UserHome";
import { AiOutlineUser } from "react-icons/ai";
import UserShowcase from "./UserShowcase";
import { messagingState } from "../atoms/messagingAtom";
import { useRecoilState } from "recoil";

type RightSectionProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const RightSection: React.FC<RightSectionProps> = ({
  userData,
  selectedCategory,
  setSelectedCategory
}) => {
  const [messagingStateValue,setMessagingStateValue] = useRecoilState(messagingState)

  return (
    <Flex direction="column" width='100%'>
      <Flex
        width="100%"
        height="6vh"
        align="center"
        justify="center"
      >
        <Button mr={{ base: 0, md: 3 }} fontSize={{base:14,md:18}}>Events</Button>
        <Button mr={{ base: 0, md: 3 }} fontSize={{base:14,md:18}}>Tutors</Button>
        <Button onClick={() => router.push("/about")} fontSize={{base:14,md:18}}>Classes</Button>
      </Flex>
      {selectedCategory == "Messages" && <UserShowcase userData={messagingStateValue.currentFriend} type={'right'} setSelectedCategory={setSelectedCategory}/>}
    </Flex>
  );
};
export default RightSection;
