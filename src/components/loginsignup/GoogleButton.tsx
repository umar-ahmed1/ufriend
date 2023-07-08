import { auth, firestore } from '@/firebase/clientApp';
import { Flex, Button, Image, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import {doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../atoms/authAtom';




const GoogleButton:React.FC = () => {
    //React firebase hook
    const [signInWithGoogle,userCredentials,loading,error]= useSignInWithGoogle(auth)
    const setModalState = useSetRecoilState(authModalState)

    //take the user from signinwithgoogle and create a document in the collections with all the user data
    //we use setDoc because if theres alrdy a doc there then we dont want to make a new one
    const createUser = async (user: User) => {
        const userDocRef = doc(firestore,'users',user.uid)
        await setDoc(userDocRef, user)
    }

    //everytime usercredentials change from signinwithgoogle then run create user
    React.useEffect(() => {
        if(userCredentials){
            setModalState((prev) => ({
                ...prev,
                open:false,
            }))
            createUser(JSON.parse(JSON.stringify(userCredentials.user)))
            
        }

    },[userCredentials])


    return (
        <Flex direction="column" width="100%" mb={1}>
            <Button border='1px solid' borderColor='brand.100' bg='white' isLoading={loading} borderRadius='full' onClick={() => signInWithGoogle()} _hover={{opacity:'0.9',backgroundColor:'brand.100'}}>
                <Text mr={4}>Continue with Google</Text>
                <Image height="20px" src="/images/googlelogo.png" ></Image>
            </Button>
            {error && <Text color='brand.900'>{error.message}</Text>}

        </Flex>

    )
}
export default GoogleButton;