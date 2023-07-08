import { Flex, Divider ,Text, Button} from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';
import { authModalState } from '../atoms/authAtom';
import GoogleButton from './GoogleButton';

type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {
    const [modalState,setModalState] = useRecoilState(authModalState)
    return (
        <Flex width='100%' align='center' justify='center' direction='column'>
            <Text fontSize='31px' color='black' fontWeight={600} mb={3}>
                {'Sign up'}
            </Text>
            <GoogleButton/>
            <Flex width='100%' align='center'>
                <Divider borderColor='brand.100' />
                <Text p={3} color='brand.100'>or</Text>
                <Divider borderColor='brand.100' />
            </Flex>
            <Button border='1px solid' borderColor='brand.100' width='100%' bg='white' mb={1}  borderRadius='full' onClick={() => setModalState({
                    open:true,
                    view:'create account'
                })}>
                <Text mr={4}>Create Account</Text>
            </Button>
            <Text></Text>
        </Flex>


    )
}
export default Signup;