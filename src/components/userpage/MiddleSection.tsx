import { Flex,Text} from '@chakra-ui/react';
import React from 'react';
import { UserData } from './UserHome';

type MiddleSectionProps = {
    userData?: UserData;
};

const MiddleSection:React.FC<MiddleSectionProps> = ({userData}) => {
    
    return (
        <Flex direction='column'>
          <Flex width="100%" height="6vh" align='center' justify='center' border='1px solid red'>
            <Text color='brand.100' fontSize={40}>Friend of the Day</Text>
          </Flex>
        </Flex>
    )
}
export default MiddleSection;