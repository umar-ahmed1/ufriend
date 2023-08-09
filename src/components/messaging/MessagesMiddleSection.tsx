import {
  Flex,
  Text,
  Image,
  Icon,
  Box,
  AspectRatio,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { UserData } from "../userpage/UserHome";
import { AiOutlineUser, AiFillPhone } from "react-icons/ai";
import UserShowcase from "./UserShowcaseMessages";
import MessageBox from "../messaging/MessageBox";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { messagingState } from "../atoms/messagingAtom";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

type MessagesMiddleSectionProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const MessagesMiddleSection: React.FC<MessagesMiddleSectionProps> = ({
  userData,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [user] = useAuthState(auth);
  const [fotd, setFotd] = React.useState<UserData>();
  const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);

  return (
    <Flex direction="column" width="100%">
      <Flex
        width="100%"
        height="10vh"
        align="center"
        justify="center"
        borderBottom="1px solid"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Flex
          width="100%"
          height="100%"
          justify="space-between"
          align="center"
          ml={{ base: 1, sm: 5, md: 8 }}
          mr={{ base: 1, sm: 5, md: 8 }}
        >
          <Flex align="center">
            {messagingStateValue.currentFriend?.photoURL ? (
              <AspectRatio
                ratio={1}
                width={{ base: "40px", md: "60px" }}
                height={{ base: "40px", md: "60px" }}
                mr={{ base: 0, md: 1 }}
              >
                <Image
                  borderRadius="full"
                  src={`${messagingStateValue.currentFriend.photoURL}`}
                />
              </AspectRatio>
            ) : (
              <Icon
                fontSize={{ base: 35, md: 60 }}
                mr={1}
                color="brand.100"
                as={AiOutlineUser}
              />
            )}
            <Flex
              direction="column"
              display={{ base: "none", lg: "flex" }}
              align="flex-start"
              ml={{ base: 0, sm: 1, md: 3 }}
            >
              <Text
                fontWeight={700}
                color="brand.400"
                fontSize={{ base: 15, md: 25 }}
              >
                {(messagingStateValue.currentFriend &&
                  messagingStateValue.currentFriend.displayName) ||
                  messagingStateValue.currentFriend?.email?.split("@")[0]}
              </Text>
              <Flex align="center">
                <Text fontSize={{ base: 12, md: 15 }} color="gray.400">
                  Online
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Stack direction="row">
            <Icon
              as={HiOutlineDotsCircleHorizontal}
              fontSize={{ base: 25, md: 40 }}
              color="brand.400"
            />
            <Icon
              as={AiFillPhone}
              fontSize={{ base: 25, md: 40 }}
              color="brand.400"
            />
          </Stack>
        </Flex>
      </Flex>
      <MessageBox userData={userData} />
    </Flex>
  );
};
export default MessagesMiddleSection;
