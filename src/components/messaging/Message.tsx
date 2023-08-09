import { Flex, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import React from "react";
import moment from "moment";

type MessageProps = {
  sender: string;
  contents: string;
  senderName: string;
  timeSent: Timestamp;
};



const Message: React.FC<MessageProps> = ({
  sender,
  contents,
  senderName,
  timeSent,
}) => {

  const [messageTime,setMessageTime] = React.useState<string>("a few seconds ago")


  const getDisplayTime = () => {
    if (!timeSent || typeof timeSent.toDate !== "function") {
      return;
    }
    const messageDate = timeSent.toDate()
    const currentDate = new Date()
    const timeDiff = currentDate.getTime() - messageDate.getTime()
    if (timeDiff > 86400000){
      setMessageTime(moment(new Date(timeSent.seconds * 1000)).fromNow())
    } else {
      setMessageTime(new Date(timeSent.seconds * 1000).toLocaleString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }))
    }

  }
    
  React.useEffect(() => {
    getDisplayTime()
  },[])

  return (
    <Flex
      width="100%"
      justify={sender === "me" ? "flex-end" : "flex-start"}
      pl={{ base: 2, md: 4 }}
      pr={{ base: 2, md: 4 }}
      align={sender === "me" ? "flex-end" : "flex-start"}
      mb={5}
    >
      <Flex direction="column" maxWidth={{ base: "90%", sm: "80%", md: "60%" }}>
        <Flex
          backgroundColor={sender === "me" ? "brand.400" : "brand.300"}
          pl={{ base: 2, md: 4 }}
          pr={{ base: 2, md: 4 }}
          borderRadius="xl"
          width="100%"
          align="center"
          justify="flex-start"
          pt={{base:1,sm:2}}
          pb={{base:1,sm:2}}
        >
          <Text color={sender === "me" ? "white" : "black"} fontSize={15}>{contents}</Text>
        </Flex>
        <Flex justify="flex-start" align="center" width="100%" mt={1} ml={2}>
          {sender == "you" && (
            <Text fontSize={12} fontWeight={700} color={"gray.500"}>
              {senderName}
            </Text>
          )}
          <Text
            fontSize={12}
            ml={sender == "you" ? 1 : 0}
            color={sender === "me" ? "blue.500" : "gray.500"}
          >
            {messageTime}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Message;
