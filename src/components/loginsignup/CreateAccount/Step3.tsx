import { Flex, Input, Stack, Select, Button,Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';
import { UserDetails } from './CreateAccount';

type Step4Props = {
    step:number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    signUpForm: UserDetails,
    setSignUpForm: React.Dispatch<React.SetStateAction<UserDetails>>
};

const Step4:React.FC<Step4Props> = ({step,setStep,signUpForm,setSignUpForm}) => {
    const [error,setError] = React.useState('')
    const handleSubmit = () => {
        setError('')
        setStep(step + 1)
    }

    return (
            <>
            <Text fontSize='31px' color='brand.700' fontWeight={600} mt={2} mb={3}>
                {'Choose your profile pic'}
            </Text>
                <Button mt={4} width='100%' bg='white' mb={4}  borderRadius='full' onClick={handleSubmit}>
                    <Text mr={4}>Next</Text>
                </Button>
            </>  
    )
}
export default Step4;