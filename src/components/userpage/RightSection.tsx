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
        <Button mr={{ base: 1, md: 3 }}>Events</Button>
        <Button mr={{ base: 1, md: 3 }}>Tutors</Button>
        <Button onClick={() => router.push("/about")}>Classes</Button>
      </Flex>
      {selectedCategory == "Messages" && <UserShowcase userData={messagingStateValue.currentFriend} type={'right'} setSelectedCategory={setSelectedCategory}/>}
    </Flex>
  );
};
export default RightSection;
