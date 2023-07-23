import { Flex,Text,Image,Icon, Box} from '@chakra-ui/react';
import React from 'react';
import { UserData } from './UserHome';
import {AiOutlineUser} from 'react-icons/ai'
import UserShowcase from './UserShowcase';
import MessageBox from '../messaging/MessageBox';

type MiddleSectionProps = {
    userData?: UserData;
    selectedCategory: string;
    setSelectedCategory:React.Dispatch<React.SetStateAction<string>>
};

const MiddleSection:React.FC<MiddleSectionProps> = ({userData,selectedCategory,setSelectedCategory}) => {
    
  return (
    <Flex direction='column' width='100%'>
      <Flex width="100%" height="6vh" align='center' justify='center' borderBottom='1px solid grey' borderRight='1px solid grey'>
        <Text color='brand.100' fontSize={40}>{selectedCategory == 'FOTD' ? 'Friend of the Day' : 'Messenger'}</Text>
      </Flex>
      {selectedCategory=='FOTD' && <UserShowcase userData={userData}/>}
      {selectedCategory=='Messages' && <MessageBox userData={userData}/>}
    </Flex>
  );
  
  
  
}
export default MiddleSection;