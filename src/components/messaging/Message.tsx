import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

type MessageProps = {
  sender:string
  contents:string
};

const Message:React.FC<MessageProps> = ({sender,contents}) => {
    
    return (
        <Flex width='100%' justify={sender == 'me' ? 'flex-end' : 'flex-start'} pl={{base:2,md:4}} pr={{base:2,md:4}} align='center' mb={2}>
            <Flex backgroundColor={sender == 'me' ? 'blue.400' : 'gray.400'} pl={{base:2,md:4}} pr={{base:2,md:4}} borderRadius='full' maxWidth={{base:'90%',sm:'80%',md:'60%'}} align='center' justify='center' pt={2} pb={2}>
                <Text color='white' textAlign='center'>{contents}</Text>
            </Flex>
        </Flex>
    )
}
export default Message;