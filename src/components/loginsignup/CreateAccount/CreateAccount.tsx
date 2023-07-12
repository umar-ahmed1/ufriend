import { Button, Flex,Input,Select,Stack,Text } from '@chakra-ui/react';
import React from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step4 from './Step3';
import Step3 from './Step3';
// import Step1 from './Step1';
// import Step2 from './Step2';
// import Step3 from './Step3';
// import Step4 from './Step4';

type CreateAccountProps = {
    
};

export type UserDetails = {
    displayName:string,
    email:string,
    university:string,
    major:string,
    yearOfProgram:string,
    programType:string
    bio:string,
    birthMonth:string,
    birthDay:string,
    birthYear:string,
    photoURL?:string,
}

const CreateAccount:React.FC<CreateAccountProps> = () => {
    const [step,setStep] = React.useState(1)
    const [signUpForm,setSignUpForm] = React.useState({
        displayName:'',
        email:'',
        university:'',
        major:'',
        yearOfProgram:'Year of Program',
        programType:'',
        bio:'',
        birthMonth:'',
        birthDay:'',
        birthYear:'',
        photoURL:'',
    } as UserDetails)
    
    return (
        <Flex width='100%' align='center' justify='center' backgroundColor='white' direction='column'>
            <Text fontWeight={600} color='brand.100'>Step {step} of 4</Text>
            {step === 1 && (<Step1 step={step} setStep = {setStep} signUpForm={signUpForm} setSignUpForm={setSignUpForm}/>)}
            {step === 2 && (<Step2 step={step} setStep = {setStep} signUpForm={signUpForm} setSignUpForm={setSignUpForm}/>)}
            {step === 3 && (<Step3 step={step} setStep = {setStep} signUpForm={signUpForm} setSignUpForm={setSignUpForm}/>)}
            {step === 4 && (<Step4 step={step} setStep = {setStep} signUpForm={signUpForm} setSignUpForm={setSignUpForm}/>)}
        </Flex>


    )
}
export default CreateAccount;