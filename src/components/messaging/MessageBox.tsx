import { auth, firestore } from "@/firebase/clientApp";
import { Box, Button, Flex, Input, Text, Icon } from "@chakra-ui/react";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { MessageChannel } from "worker_threads";
import { messagingState } from "../atoms/messagingAtom";
import { UserDetails } from "../loginsignup/CreateAccount/CreateAccount";
import Message from "./Message";
import {
  AiOutlineFileImage,
  AiOutlineFileGif,
  AiOutlineSend,
} from "react-icons/ai";
type MessageBoxProps = {
  userData?: UserDetails;
};

export type Message = {
  id: string;
  sentBy: string;
  sentTo: string;
  contents: string;
  createdAt: Timestamp;
};

const MessageBox: React.FC<MessageBoxProps> = ({ userData }) => {
  const [loading, setLoading] = React.useState(false);
  const [messageContents, setMessageContents] = React.useState("");
  const [user] = useAuthState(auth);
  const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);

  const sendMessage = async () => {
    if (messageContents == "") {
      return;
    }
    setLoading(true);
    //store the message
    const messageDocRef = doc(collection(firestore, "messages"));
    const message: Message = {
      id: messageDocRef.id,
      sentBy: user!.uid,
      sentTo: messagingStateValue.currentFriend!.uid,
      contents: messageContents,
      createdAt: serverTimestamp() as Timestamp,
    };
    await setDoc(messageDocRef, message);
    //update the message state
    setMessagingStateValue((prev) => ({
      ...prev,
      currentMessages: [...prev.currentMessages, message],
    }));
    //now update the latest sent message
    //in the person u sent to friends get ur uid snippet
    const sentToRef = doc(
      firestore,
      `users/${messagingStateValue.currentFriend!.uid}/friends`,
      user!.uid
    );
    await updateDoc(sentToRef, {
      latestMessage: messageContents,
    });
    setMessageContents("");
    setLoading(false);
  };

  const getMessages = async () => {
    // Set up real-time listener for new messages that match the query
    const listenForMessages = onSnapshot(
      query(
        collection(firestore, "messages"),
        where("sentBy", "in", [
          user!.uid,
          messagingStateValue.currentFriend!.uid,
        ]),
        where("sentTo", "in", [
          user!.uid,
          messagingStateValue.currentFriend!.uid,
        ]),
        orderBy("createdAt")
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => doc.data());
        setMessagingStateValue((prev) => ({
          ...prev,
          currentMessages: messages as Message[],
        }));
      }
    );
  };

  React.useEffect(() => {
    if (messagingStateValue.currentFriend) {
      getMessages();
    } else {
      setMessagingStateValue((prev) => ({
        ...prev,
        currentFriend: messagingStateValue.myFriends[0],
      }));
    }
  }, [messagingStateValue.currentFriend]);

  // Create a ref for the inner container (Box)
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Scroll to the bottom of the container when the messages update
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messagingStateValue.currentMessages]);

  return (
    <Flex
      width="100%"
      height="90vh"
      direction="column"
      position="relative"
      overflow="hidden"
    >
      <Box
        height="100%"
        maxHeight="calc(90vh - 100px)"
        overflow="auto"
        px={4}
        ref={messagesContainerRef}
        flex={1}
      >
        <Flex direction="column" mt={4}>
          {messagingStateValue.currentMessages?.map((message, index) => (
            <Message
              key={index}
              contents={message.contents}
              sender={message.sentBy == user!.uid ? "me" : "you"}
              senderName={messagingStateValue.currentFriend!.displayName}
              timeSent={message.createdAt}
            />
          ))}
        </Flex>
      </Box>
      <Flex
        position="absolute"
        bottom="0"
        borderTop="1px solid"
        borderColor="gray.200"
        width="100%"
        height="100px"
        align="center"
        justify="space-between"
        pl={2}
        pr={2}
      >
        <Icon
          as={AiOutlineFileGif}
          color="brand.400"
          _hover={{ opacity: 0.9, cursor: "pointer" }}
          mr={1}
          fontSize={{ base: 15, sm: 25, md: 35 }}
        ></Icon>
        <Icon
          as={AiOutlineFileImage}
          color="brand.400"
          _hover={{ opacity: 0.9, cursor: "pointer" }}
          mr={1}
          fontSize={{ base: 15, sm: 25, md: 35 }}
        ></Icon>
        <Input
          type="text"
          height="60%"
          maxWidth="80%"
          border="none"
          backgroundColor="gray.200"
          placeholder="Write something...."
          ml={1}
          mr={1}
          value={messageContents}
          onChange={(event) => {
            setMessageContents(event.target.value);
          }}
        ></Input>
        <Button onClick={sendMessage} isLoading={loading} backgroundColor='white'>
          <Icon
            as={AiOutlineSend}
            color="brand.400"
            _hover={{ opacity: 0.9, cursor: "pointer" }}
            mr={1}
            fontSize={{ base: 15, sm: 25, md: 35 }}
          ></Icon>
        </Button>
      </Flex>
    </Flex>
  );
};
export default MessageBox;
