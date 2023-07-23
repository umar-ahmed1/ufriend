import { Flex, Icon,Image,Box,Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { UserData } from './UserHome';

type UserShowcaseProps = {
    userData?: UserData;
};

const UserShowcase:React.FC<UserShowcaseProps> = ({userData}) => {
    
    return (
        <Flex width="100%" height="94vh" position="relative">
        {userData?.photoURL ? (
          <Image
            width="100%"
            height="100%"
            src={`${userData.photoURL}`}
          />
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
          left="10%"
          width="100%"
          height="20%"
          padding="20px"
          color="white" 
        >
          <Text fontSize={35} fontWeight={700} color='brand.100'>{userData && userData.displayName}</Text>
          <Text fontSize={25}>{`${userData && userData.major}, ${userData && userData.yearOfProgram}rd year`}</Text>
          <Text fontSize={18} >{userData && userData.bio}</Text>
        </Box>
      </Flex>
    )
}
export default UserShowcase;