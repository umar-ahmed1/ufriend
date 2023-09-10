import { auth } from "@/firebase/clientApp";
import { AspectRatio, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { messagingState } from "../atoms/messagingAtom";
import { UserData } from "../userpage/UserHome";

type EventPreviewItemProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  contents: string;
};

const EventPreviewItem: React.FC<EventPreviewItemProps> = ({
  userData,
  selectedCategory,
  setSelectedCategory,
  contents,
}) => {
  const [user] = useAuthState(auth);
  const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);


  return (
    <Flex
      align="center"
      maxHeight="300px"
      width="100%"
      _hover={{
        cursor: "pointer",
        outline: "1px solid",
        outlineColor: "grey.200",
      }}
      borderRadius="xl"
      pt={2}
      pb={2}
      borderBottom='1px solid'
      borderColor='gray.200'
    >
      {userData?.photoURL ? (
        <AspectRatio ratio={1} width="100px" height="100px" pr={1} ml={2}>
          <Image borderRadius="full" src={`${userData.photoURL}`} />
        </AspectRatio>
      ) : (
        <Icon fontSize={100} mr={1} color="brand.300" as={AiOutlineUser} />
      )}
      <Flex
        direction="column"
        maxWidth='70%'
        display={{ base: "none", lg: "flex" }}
        align="flex-start"
        pl={3}
      >
        <Text fontWeight={700} color='brand.200'>August 10th, 2015 * 9:45pm MST</Text>
        <Text fontWeight={700} fontSize={17} color="brand.400">
          CPSC 413 Study Session
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
export default EventPreviewItem;
