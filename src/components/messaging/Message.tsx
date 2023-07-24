import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

type MessageProps = {
  sender:string  
};

const Message:React.FC<MessageProps> = ({sender}) => {
    
    return (
        <Flex width='100%' justify={sender == 'me' ? 'flex-end' : 'flex-start'} pl={4} pr={4} align='center' mb={2}>
            <Flex backgroundColor={sender == 'me' ? 'blue.400' : 'gray.400'} pl={4} pr={4} borderRadius='full' maxWidth='60%' align='center' justify='center' pt={2} pb={2}>
                <Text color='white' textAlign='center'>Message Text blablablalafafafafafafafafafa canada i hate you</Text>
            </Flex>
        </Flex>
    )
}
export default Message;