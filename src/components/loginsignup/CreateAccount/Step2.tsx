import { firestore } from '@/firebase/clientApp';
import { Flex, Input, Stack, Select, Button,Text, InputGroup, InputLeftElement, Alert, AlertIcon } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { collection, doc, Firestore, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React from 'react';
import { UserDetails } from './CreateAccount';
import majors from './majors';

type Step2Props = {
    step:number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    signUpForm: UserDetails,
    setSignUpForm: React.Dispatch<React.SetStateAction<UserDetails>>
};

const Step2:React.FC<Step2Props> = ({step,setStep,signUpForm,setSignUpForm}) => {
    const [loading,setLoading] = React.useState(false)
    const [errorMessage,setErrorMessage] = React.useState('')
    const [searchValue,setSearchValue] = React.useState('')

    const handleSubmit = async () => {
        setLoading(true)
        setErrorMessage('')
        try{
            
        }catch(error:any){
            console.log('createUser error',error.message)
        }
        setLoading(false)
    }

    React.useEffect(() => {
        
        const test = majors.find(item => item.toLowerCase() === searchValue.toLowerCase())
        console.log(test)
        if (test) {
            setSignUpForm((prev) => ({
                ...prev,
                major:test
            }))
        }

        setSignUpForm((prev) => ({
            ...prev,
            major:searchValue
        }))
        
    },[searchValue])

    return (
            <>
            <Text fontSize='31px' color='brand.100' fontWeight={600} mt={2} mb={3}>
                {'Tell us about yourself'}
            </Text>
            <Input 
                type='text' 
                width='100%' 
                height='100%'  
                color='brand.700' 
                fontSize='17px' 
                p='16px 8px 16px 8px'
                m='12px 0px'
                placeholder="Major" 
                border='1px solid'
                borderColor='brand.100'
                 _placeholder={{color:'brand.700'}}
                 _focus={{boxShadow:'none'}}
                value={signUpForm.major}
                onChange={(event) => {setSearchValue(event.target.value)}}
                ></Input>
                <Select>
                    {majors.filter((major) => {
                        const searchTerm = searchValue.toLowerCase()
                        return (
                            searchTerm && major.startsWith(searchTerm) && major !== searchTerm
                        )
                    }).map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </Select>
            {errorMessage && (
                <Alert status='error'>
                    <AlertIcon />
                    {errorMessage}
                </Alert>
                )}
                <Button isLoading={loading} width='100%' bg='brand.100' mb={4} mt={7}  borderRadius='full' onClick={handleSubmit}>
                    <Text mr={4}>Next</Text>
                </Button>
            </>  
    )
}
export default Step2;