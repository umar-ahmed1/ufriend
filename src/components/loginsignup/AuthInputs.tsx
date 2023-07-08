import React from 'react';
import { authModalState } from '../atoms/authAtom'
import { useRecoilState} from 'recoil'
import { Flex } from '@chakra-ui/react';
import Login from './Login'
import Signup from './Signup'
import CreateAccount from './CreateAccount/CreateAccount';

type AuthInputsProps = {
    
};

const AuthInputs:React.FC<AuthInputsProps> = () => {
    const [modalState,setModalState] = useRecoilState(authModalState)

    return (
        <Flex justify='center' align='center' width='100%'>
            <Flex direction='column' align='center' width={{base:'100%', md:'75%'}} mt={4}>
                {modalState.view === 'login' && <Login/>}
                {modalState.view === 'signup' && <Signup/>}
                {modalState.view === 'create account' && <CreateAccount/>}
            </Flex>
        </Flex>

    )
}
export default AuthInputs;