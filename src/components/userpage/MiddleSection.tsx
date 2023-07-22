import { Flex,Text,Image,Icon, Box} from '@chakra-ui/react';
import React from 'react';
import { UserData } from './UserHome';
import {AiOutlineUser} from 'react-icons/ai'

type MiddleSectionProps = {
    userData?: UserData;
};

const MiddleSection:React.FC<MiddleSectionProps> = ({userData}) => {
    
  return (
    <Flex direction='column'>
      <Flex width="100%" height="6vh" align='center' justify='center' border='1px solid red'>
        <Text color='brand.100' fontSize={40}>Friend of the Day</Text>
      </Flex>
      <Flex width="100%" height="94vh" border="1px solid grey" position="relative">
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
    </Flex>
  );
  
  
  
}
export default MiddleSection;