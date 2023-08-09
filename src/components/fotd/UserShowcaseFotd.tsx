import { auth, firestore } from "@/firebase/clientApp";
import {
  Flex,
  Icon,
  Image,
  Box,
  Text,
  Button,
  AspectRatio,
  Stack,
  Divider,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { messagingState } from "../atoms/messagingAtom";
import { UserData } from "../userpage/UserHome";
import { FaUniversity, FaUserGraduate } from "react-icons/fa";

type UserShowcaseFotdProps = {
  userData?: UserData;
  type: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const UserShowcaseFotd: React.FC<UserShowcaseFotdProps> = ({
  userData,
  type,
  setSelectedCategory,
}) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = React.useState(false);
  const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);

  const handleMessageFOTD = async () => {
    try {
      setLoading(true);
      await runTransaction(firestore, async (transaction) => {
        //create refs to the docs
        const userDocRef = doc(
          firestore,
          `users/${user?.uid}/friends`,
          userData!.uid
        );
        const friendDocRef = doc(
          firestore,
          `users/${userData?.uid}/friends`,
          user!.uid
        );
        //get the docs
        const [userDoc, friendDoc] = await Promise.all([
          getDoc(userDocRef),
          getDoc(friendDocRef),
        ]);
        //if either exists then return
        if (userDoc.exists() || friendDoc.exists()) {
          return;
        }
        transaction.set(userDocRef, {
          id: userData!.uid,
          added: serverTimestamp(),
          latestMessage: "",
        });
        transaction.set(friendDocRef, {
          id: user!.uid,
          added: serverTimestamp(),
          latestMessage: "",
        });
      });

      setMessagingStateValue((prev) => {
        // Check if userData is already in myFriends
        const isFriendAlreadyAdded = prev.myFriends.some(
          (friend) => friend.id === userData!.id
        );

        // If userData is not already in myFriends, add it
        if (!isFriendAlreadyAdded) {
          return {
            ...prev,
            myFriends: [...prev.myFriends, userData as UserData],
            currentFriend: userData,
          };
        }

        // If userData is already in myFriends, just set it as the currentFriend
        return {
          ...prev,
          currentFriend: userData,
        };
      });

      setSelectedCategory("Messages");
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Flex
      width="100%"
      height={"100vh"}
      position="relative"
      align="center"
      direction="column"
      backgroundColor='gray.50'
    >
      {userData?.photoURL ? (
        <AspectRatio width="75%" height="45%" ratio={16 / 9} mt="5%">
          <Image src={`${userData.photoURL}`} alt="User Profile" borderRadius='2xl'/>
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
        bottom="5%"
        width="75%"
        height="40%"
        padding="20px"
        color="white"
        backgroundColor="brand.300"
        borderRadius='2xl'
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
            <Flex align="center">
              <Icon
                as={FaUserGraduate}
                fontSize={{ base: 10, sm: 15, md: 25 }}
                color="brand.400"
                mr={{ base: 1, sm: 2 }}
              />
              <Text color="black" fontSize={{ base: 10, sm: 15, md: 25 }}>{`${
                userData && userData.major
              }, ${userData && userData.yearOfProgram}rd year`}</Text>
            </Flex>
            <Flex align="center" mt={{ base: 1, md: 2 }}>
              <Icon
                as={FaUniversity}
                fontSize={{ base: 10, sm: 15, md: 20 }}
                color="brand.400"
                mr={{ base: 1, sm: 2 }}
              />
              <Text color="black" fontSize={{ base: 10, sm: 15, md: 20 }}>
                {userData && userData.university}
              </Text>
            </Flex>
            <Flex direction='column' maxWidth='75%'>
              <Divider borderColor="brand.400" mt={2} mb={{ base: 1, md: 2 }} />
              <Text color="gray.500" fontSize={{ base: 12, sm: 15, md: 20 }}>
                {userData && userData.bio}
              </Text>
              <Divider borderColor="brand.400" mt={{ base: 1, md: 2 }} />
            </Flex>
          </Stack>
          <Flex height="100%">
            <Button
              backgroundColor="brand.100"
              _hover={{ cursor: "pointer", opacity: "0.9" }}
              height={{ base: "30px", md: "50px" }}
              width={{ base: "75%", md: "100%" }}
              fontSize={{ base: 12, md: 18 }}
              isLoading={loading}
              onClick={handleMessageFOTD}
            >
              Message
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
export default UserShowcaseFotd;
