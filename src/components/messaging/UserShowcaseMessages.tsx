import { auth, firestore } from "@/firebase/clientApp";
import {
  Flex,
  Icon,
  Image,
  Box,
  Text,
  Button,
  AspectRatio,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { FaUniversity, FaUserGraduate } from "react-icons/fa";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { messagingState } from "../atoms/messagingAtom";
import { UserData } from "../userpage/UserHome";

type UserShowcaseMessagesProps = {
  userData?: UserData;
  type: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const UserShowcaseMessages: React.FC<UserShowcaseMessagesProps> = ({
  userData,
  type,
  setSelectedCategory,
}) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = React.useState(false);
  const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);

  return (
    <Flex width="100%" height={"100vh"} position="relative">
      {userData?.photoURL ? (
        <AspectRatio width="100%" height="65%" ratio={16 / 9}>
          <Image src={`${userData.photoURL}`} alt="User Profile" />
        </AspectRatio>
      ) : (
        <Icon
          fontSize={40}
          mr={{ base: 0, md: 1 }}
          color="brand.100"
          as={AiOutlineUser}
        />
      )}
      {/* The content of the box */}
      <Box
        position="absolute"
        bottom="0%"
        left="0%"
        right="0%"
        width="100%"
        height="50%"
        borderTopRadius="2xl"
        padding={5}
        color="white"
        backgroundColor="brand.300"
      >
        <Flex width="100%" align="center">
          <Stack width="100%" direction="column">
            <Text
              fontSize={{ base: 15, sm: 20, md: 40 }}
              fontWeight={700}
              color="brand.400"
            >
              {userData && userData.displayName}
            </Text>
            <Flex align='center'>
              <Icon
                as={FaUserGraduate}
                fontSize={{ base: 10, sm: 15, md: 25 }}
                color="brand.400"
                mr={{base:1,sm:2}}
              />
              <Text color="black" fontSize={{ base: 10, sm: 15, md: 25 }}>{`${
                userData && userData.major
              }, ${userData && userData.yearOfProgram}rd year`}</Text>
            </Flex>
            <Flex align="center" mt={{base:1,md:2}}>
              <Icon
                as={FaUniversity}
                fontSize={{ base: 10, sm: 15, md: 20 }}
                color="brand.400"
                mr={{base:1,sm:2}}
              />
              <Text color="black" fontSize={{ base: 10, sm: 15, md: 20 }}>
                {userData && userData.university}
              </Text>
            </Flex>
            <Divider borderColor="brand.400" mt={2} mb={{base:1,md:2}} />
            <Text color="gray.500" fontSize={{ base: 12, sm: 15, md: 20 }}>
              {userData && userData.bio}
            </Text>
            <Divider borderColor="brand.400" mt={{base:1,md:2}}/>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};
export default UserShowcaseMessages;
