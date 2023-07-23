import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { UserDetails } from '../loginsignup/CreateAccount/CreateAccount';
import Message from './Message';

type MessageBoxProps = {
    userData?: UserDetails
};

const MessageBox:React.FC<MessageBoxProps> = ({userData}) => {
    
    return (
        <Flex width='100%' height='94vh' direction='column' position='relative' mt={4}>
            <Message sender='me'/>
            <Message sender='me'/>
            <Message sender='you'/>
            <Message sender='me'/>
            <Message sender='you'/>
            <Flex position='absolute' bottom='0' borderTop='1px solid grey' width='100%' height='100px' align='center' justify='space-between' backgroundColor='gray.100' pl={2} pr={2}>
                <Button backgroundColor='brand.100' borderRadius='full' _hover={{opacity:0.9}} mr={1}>Gif</Button>
                <Button backgroundColor='brand.100' borderRadius='full' _hover={{opacity:0.9}}>Image</Button>
                <Input type='text' height='60%' width='100%' border='none' placeholder='Send A Message' ml={1} mr={1}>

                </Input>
                <Button backgroundColor='brand.100' borderRadius='full' _hover={{opacity:0.9}}>Send</Button>
            </Flex>
        </Flex>
    )
}
export default MessageBox;