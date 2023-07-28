import { auth, firestore } from "@/firebase/clientApp";
import { Flex, Icon, Image, Box, Text, Button, AspectRatio } from "@chakra-ui/react";
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
import { UserData } from "./UserHome";

type UserShowcaseProps = {
  userData?: UserData;
  type: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const UserShowcase: React.FC<UserShowcaseProps> = ({
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
    <Flex width="100%" height={type=='mid' ? '90vh' : '100vh'} position="relative">
      {userData?.photoURL ? (
        <AspectRatio width='100%' height='100%' ratio={16/9}>
          <Image src={`${userData.photoURL}`} alt="User Profile" />
        </AspectRatio>
      ) : (
        <Icon fontSize={40} mr={{base:0,md:1}} color="brand.100" as={AiOutlineUser} />
      )}
      {/* The box with black shadow background */}
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        height="30%"
        background="linear-gradient(rgba(0, 0, 0, 0.0),rgba(0, 0, 0, 0.6),rgba(0,0,0,0.8), rgba(0, 0, 0, 0.9))"
        pointerEvents="none"
      />
      {/* The content of the box */}
      <Box
        position="absolute"
        bottom="0"
        left="0%"
        right="0%"
        width="100%"
        height="20%"
        padding="20px"
        color="white"
      >
        <Flex width="100%" align="center">
          <Flex width="100%" direction="column">
            <Text
              fontSize={{ base: 20, sm: 25, md: 35 }}
              fontWeight={700}
              color="brand.100"
            >
              {userData && userData.displayName}
            </Text>
            <Text fontSize={{ base: 15, sm: 20, md: 25 }}>{`${
              userData && userData.major
            }, ${userData && userData.yearOfProgram}rd year`}</Text>
            <Text fontSize={{ base: 12, sm: 15, md: 18 }}>
              {userData && userData.bio}
            </Text>
          </Flex>
          <Flex height="100%">
            {type == "middle" && (
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
            )}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
export default UserShowcase;
