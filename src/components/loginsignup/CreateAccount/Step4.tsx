import { Flex, Input, Stack, Select, Button,Text, AlertIcon, Alert } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { UserDetails } from './CreateAccount';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

type Step4Props = {
    step:number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    signUpForm: UserDetails,
    setSignUpForm: React.Dispatch<React.SetStateAction<UserDetails>>
};

const Step4:React.FC<Step4Props> = ({step,setStep,signUpForm,setSignUpForm}) => {
    const [password,setPassword] = React.useState('')
    const [confirmPassword,setConfirmPassword] = React.useState('')
    const [errorMessage,setErrorMessage] = React.useState('')
    
    //React Firebase Hook to create user
    const [createUserWithEmailAndPassword,userCredentials,loading,setError] = useCreateUserWithEmailAndPassword(auth)


    const handleSubmit = () => {
        setErrorMessage('')
        if(password !== confirmPassword){
            setErrorMessage('Passwords do not match')
            return
        }
        createUserWithEmailAndPassword(signUpForm.email,password)
    }

    //when the create hook makes a user in auth then we should make a document in collections for that user
    const createUserDoc = async (user:User) => {
        const userRef = doc(firestore,'users',user.uid)
        //set the document with data from the hook
        await setDoc(userRef,user)
        //add all the data that we have collected
        console.log(signUpForm)
        await updateDoc(userRef,signUpForm)
    }

    React.useEffect(() => {
        if(userCredentials){
            createUserDoc(JSON.parse(JSON.stringify(userCredentials.user)))
        }
    },[userCredentials])

    
    return (
            <>
            <Text fontSize='31px' color='brand.900' fontWeight={600} mt={2} mb={3}>
                {'Choose your password'}
            </Text>
            <Input 
                type='password'
                name='password' 
                width='100%' 
                height='100%'  
                color='brand.900' 
                fontSize='17px' 
                p='16px 8px 16px 8px'
                m='12px 0px'
                placeholder="Password" 
                border='1px solid'
                borderColor='brand.700'
                 _placeholder={{color:'brand.700'}}
                 _focus={{boxShadow:'none'}}
                value={password}
                onChange={(event) =>setPassword(event.target.value)}
                ></Input>
                <Input 
                    type='password'
                    name='confirmPassword' 
                    width='100%' 
                    height='100%'  
                    color='brand.900' 
                    fontSize='17px' 
                    p='16px 8px 16px 8px'
                    m='12px 0px'
                    placeholder="Confirm Password" 
                    border='1px solid'
                    borderColor='brand.700'
                    _placeholder={{color:'brand.700'}}
                    _focus={{boxShadow:'none'}}
                    value={confirmPassword}
                    onChange={(event) =>setConfirmPassword(event.target.value)}
                ></Input>
                {errorMessage && (
                    <Alert status='error'>
                        <AlertIcon />
                        {errorMessage}
                    </Alert>
                )}
                <Button isLoading={loading} mt={4} width='100%' bg='white' mb={4}  borderRadius='full' onClick={handleSubmit}>
                    <Text mr={4}>Create Account</Text>
                </Button>
            </>  
    )
}
export default Step4;