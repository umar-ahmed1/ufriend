import { Flex, Input, Stack, Select, Button,Text, AlertIcon, Alert } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { UserDetails } from './CreateAccount';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

type Step4Props = {
    step:number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    signUpForm: UserDetails,
    setSignUpForm: React.Dispatch<React.SetStateAction<UserDetails>>
};

const Step4:React.FC<Step4Props> = ({step,setStep,signUpForm,setSignUpForm}) => {
    const [errorMessage,setErrorMessage] = React.useState('')
    const [isLoading,setIsLoading] = React.useState(false)
    const [user] = useAuthState(auth)

    //when the create hook makes a user in auth then we should make a document in collections for that user
    const createUserDoc = async (user:User) => {
        const userRef = doc(firestore,'users',user.uid)
        //set the document with data from the hook
        await setDoc(userRef,user)
        //add all the data that we have collected
        console.log(signUpForm)
        await updateDoc(userRef,signUpForm)
    }
    


    return (
            <>
                <Flex>
                    Hi
                </Flex>
                {user && <Button onClick={() => createUserDoc(user)}>Submit</Button>}
                
            </>  
    )
}
export default Step4;