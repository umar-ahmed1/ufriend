import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { UserData } from "../userpage/UserHome";

type MessagePreviewItemProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const MessagePreviewItem: React.FC<MessagePreviewItemProps> = ({ userData,selectedCategory,setSelectedCategory }) => {
  const [user] = useAuthState(auth);
  return (
    <Flex align="center" maxHeight='60px' width='100%' _hover={{cursor:'pointer',outline: "1px solid", outlineColor: "grey.200"}} borderRadius='full' pt={1} pb={1} onClick={() => setSelectedCategory('Messages')}>
      {userData?.photoURL ? (
        <Image
          width="50px"
          height="50px"
          borderRadius="full"
          pr={1}
          color="gray.300"
          src={`${userData.photoURL}`}
        />
      ) : (
        <Icon fontSize={50} mr={1} color="brand.100" as={AiOutlineUser} />
      )}
      <Flex
        direction="column"
        maxWidth='100%'
        display={{ base: "none", lg: "flex" }}
        fontSize="8pt"
        align="flex-start"
        pl={1}
        
      >
        <Text fontWeight={700} fontSize={14}>
          {(userData && userData.displayName) || user!.email?.split("@")[0]}
        </Text>
        <Flex align="center" width='100%'>
          <Text fontSize={13} color="gray.400" noOfLines={1} maxWidth='100%'>
            insert brief details about the message heareafafrgwiogwogiwgrhwowoafoedafaejo
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MessagePreviewItem;