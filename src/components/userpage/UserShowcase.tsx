import { auth, firestore } from "@/firebase/clientApp";
import { Flex, Icon, Image, Box, Text, Button } from "@chakra-ui/react";
import { doc, runTransaction, serverTimestamp, updateDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { messagingState } from "../atoms/messagingAtom";
import { UserData } from "./UserHome";

type UserShowcaseProps = {
  userData?: UserData;
  type: string;
  setSelectedCategory:React.Dispatch<React.SetStateAction<string>>
};

const UserShowcase: React.FC<UserShowcaseProps> = ({ userData, type,setSelectedCategory}) => {
  const [user] = useAuthState(auth)
  const [loading,setLoading] = React.useState(false)
  const [messagingStateValue,setMessagingStateValue] = useRecoilState(messagingState)

  const handleMessageFOTD = async () => {
    try{
      setLoading(true)
      await runTransaction(firestore,async(transaction) => {
        const userDocRef = doc(firestore,`users/${user?.uid}/friends`,userData!.uid)
        const friendDocRef = doc(firestore,`users/${userData?.uid}/friends`,user!.uid)
        transaction.set(userDocRef,{
          id:userData!.uid,
          added: serverTimestamp(),
          latestMessage: ""
        })
        transaction.set(friendDocRef,{
          id:user!.uid,
          added: serverTimestamp(),
          latestMessage: ""
        })
      })

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
      
      setSelectedCategory('Messages')
      setLoading(false)
    } catch(error: any){
      console.log(error.message)
    }
  }



  return (
    <Flex width="100%" height="94vh" position="relative">
      {userData?.photoURL ? (
        <Image width="100%" height="100%" src={`${userData.photoURL}`} />
      ) : (
        <Icon fontSize={40} mr={1} color="brand.100" as={AiOutlineUser} />
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
            <Text fontSize={35} fontWeight={700} color="brand.100">
              {userData && userData.displayName}
            </Text>
            <Text fontSize={25}>{`${userData && userData.major}, ${
              userData && userData.yearOfProgram
            }rd year`}</Text>
            <Text fontSize={18}>{userData && userData.bio}</Text>
          </Flex>
          <Flex height="100%">
            {type == 'middle' && <Button
              backgroundColor="brand.100"
              _hover={{ cursor: "pointer", opacity: "0.9" }}
              height="50px"
              isLoading={loading}
              onClick = {handleMessageFOTD}
            >
              Message
            </Button>}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
export default UserShowcase;
