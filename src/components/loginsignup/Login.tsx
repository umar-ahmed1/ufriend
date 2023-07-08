import { Flex, Divider,Text, Input, Button } from '@chakra-ui/react';
import React from 'react';
import GoogleButton from './GoogleButton';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
    const [signInWithEmailAndPassword,userCred,loading,error] = useSignInWithEmailAndPassword(auth)
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')

    const handleSubmit = () => {
        signInWithEmailAndPassword(email,password)
    }

    return (
        <Flex width='100%' align='center' justify='center' direction='column'>
            <Text fontSize='31px' color='black' fontWeight={600} mb={3}>
                {'Sign in'}
            </Text>
            <GoogleButton/>
            <Flex width='100%' align='center'>
                <Divider borderColor='brand.100' />
                <Text p={3} color='brand.100'>or</Text>
                <Divider borderColor='brand.100' />
            </Flex>
            <Input 
                type='text' 
                width='100%' 
                height='100%'  
                color='brand.700' 
                fontSize='17px' 
                p='16px 8px 16px 8px'
                m='12px 0px'
                placeholder="Email" 
                border='1px solid'
                borderColor='brand.100'
                 _placeholder={{color:'brand.700'}}
                 _focus={{boxShadow:'none'}}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                ></Input>
                <Input 
                    type='password' 
                    width='100%' 
                    height='100%'  
                    color='brand.900' 
                    fontSize='17px' 
                    p='16px 8px 16px 8px'
                    m='12px 0px'
                    placeholder="Password" 
                    border='1px solid'
                    borderColor='brand.100'
                    _placeholder={{color:'brand.700'}}
                    _focus={{boxShadow:'none'}}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                ></Input>
                <Button mt={4} width='100%' bg='brand.100' mb={4}  borderRadius='full' onClick={handleSubmit} _hover={{opacity:'0.9'}} border='1px solid' borderColor='brand.100'>
                    <Text mr={4}>Login</Text>
                </Button>
                <Button mt={4} width='100%' bg='white' border='1px solid' borderColor='brand.100' color='black' mb={4}  borderRadius='full' _hover={{opacity:'0.9',backgroundColor:'brand.100'}}>
                    <Text mr={4}>Forgot Password?</Text>
                </Button>

        </Flex>


    )
}
export default Login;