import { auth } from "@/firebase/clientApp";
import { AspectRatio, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { messagingState } from "../atoms/messagingAtom";
import { UserData } from "../userpage/UserHome";

type MessagePreviewItemProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  contents: string;
};

const MessagePreviewItem: React.FC<MessagePreviewItemProps> = ({
  userData,
  selectedCategory,
  setSelectedCategory,
  contents,
}) => {
  const [user] = useAuthState(auth);
  const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);

  const handleClick = () => {
    setSelectedCategory("Messages");
    setMessagingStateValue((prev) => ({
      ...prev,
      currentFriend: userData,
    }));
  };

  return (
    <Flex
      align="center"
      maxHeight="60px"
      width="100%"
      _hover={{
        cursor: "pointer",
        outline: "1px solid",
        outlineColor: "grey.200",
      }}
      borderRadius="xl"
      pt={2}
      pb={2}
      onClick={handleClick}
      bgColor={
        messagingStateValue.currentFriend?.uid == userData?.uid
          ? "gray.100"
          : "white"
      }
    >
      {userData?.photoURL ? (
        <AspectRatio ratio={1} width="50px" height="50px" pr={1} ml={2}>
          <Image borderRadius="full" src={`${userData.photoURL}`} />
        </AspectRatio>
      ) : (
        <Icon fontSize={50} mr={1} color="brand.300" as={AiOutlineUser} />
      )}
      <Flex
        direction="column"
        maxWidth='70%'
        display={{ base: "none", lg: "flex" }}
        align="flex-start"
        pl={3}
      >
        <Text fontWeight={700} fontSize={17} color="brand.400">
          {(userData && userData.displayName) || user!.email?.split("@")[0]}
        </Text>
        <Flex align="center" width="100%">
          <Text fontSize={14} color="gray.400" noOfLines={1} maxWidth="100%">
            {contents}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MessagePreviewItem;
