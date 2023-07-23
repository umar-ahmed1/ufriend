import { auth, firestore } from "@/firebase/clientApp";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { collection, doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserDetails } from "../loginsignup/CreateAccount/CreateAccount";
import Message from "./Message";

type MessageBoxProps = {
  userData?: UserDetails;
};

export type Message = {
    id:string
    sentBy:string,
    sentTo:string,
    contents:string,
    createdAt:Timestamp,
}

const MessageBox: React.FC<MessageBoxProps> = ({ userData }) => {
  const [loading,setLoading] = React.useState(false)
  const [messageContents, setMessageContents] = React.useState("");
  const [user] = useAuthState(auth)

  const sendMessage = async () => {
    if (messageContents == ''){
        return
    }
    setLoading(true)
    const messageDocRef = doc(collection(firestore,'messages'))
    const message: Message = {
        id: messageDocRef.id,
        sentBy: user!.uid,
        sentTo: 'test',
        contents:messageContents,
        createdAt: serverTimestamp() as Timestamp
    }

    await setDoc(messageDocRef,message)
    setLoading(false)

    console.log(message)

  };

  return (
    <Flex
      width="100%"
      height="94vh"
      direction="column"
      position="relative"
      mt={4}
    >
      <Message sender="me" />
      <Message sender="me" />
      <Message sender="you" />
      <Message sender="me" />
      <Message sender="you" />
      <Flex
        position="absolute"
        bottom="0"
        borderTop="1px solid grey"
        width="100%"
        height="100px"
        align="center"
        justify="space-between"
        backgroundColor="gray.100"
        pl={2}
        pr={2}
      >
        <Button
          backgroundColor="brand.100"
          borderRadius="full"
          _hover={{ opacity: 0.9 }}
          mr={1}
        >
          Gif
        </Button>
        <Button
          backgroundColor="brand.100"
          borderRadius="full"
          _hover={{ opacity: 0.9 }}
        >
          Image
        </Button>
        <Input
          type="text"
          height="60%"
          width="100%"
          border="none"
          placeholder="Send A Message"
          ml={1}
          mr={1}
          value={messageContents}
          onChange={(event) => {
            setMessageContents(event.target.value);
          }}
        ></Input>
        <Button
          backgroundColor="brand.100"
          borderRadius="full"
          _hover={{ opacity: 0.9 }}
          onClick={sendMessage}
          isLoading={loading}
        >
          Send
        </Button>
      </Flex>
    </Flex>
  );
};
export default MessageBox;
