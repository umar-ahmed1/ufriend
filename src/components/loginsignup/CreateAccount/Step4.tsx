import {
  Flex,
  Input,
  Stack,
  Select,
  Button,
  Text,
  AlertIcon,
  Alert,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { UserDetails } from "./CreateAccount";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/clientApp";
import { doc, setDoc, updateDoc } from "firebase/firestore";

type Step4Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  signUpForm: UserDetails;
  setSignUpForm: React.Dispatch<React.SetStateAction<UserDetails>>;
  password:string,
  setPassword: React.Dispatch<React.SetStateAction<string>>
};

const Step4: React.FC<Step4Props> = ({
  step,
  setStep,
  signUpForm,
  setSignUpForm,
  password,
  setPassword
}) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [user] = useAuthState(auth);
  //React Firebase Hook to create user
  const [
    createUserWithEmailAndPassword,
    userCredentials,
    loading,
    setErrorAcc,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = () => {
    createUserWithEmailAndPassword(signUpForm.email, password);
  };

  //when the create hook makes a user in auth then we should make a document in collections for that user
  const createUserDoc = async (user: User) => {
    console.log("doc start");
    const userRef = doc(firestore, "users", user.uid);
    //set the document with data from the hook
    await setDoc(userRef, user);
    console.log("doc mid");
    //add all the data that we have collected
    console.log(signUpForm);
    await updateDoc(userRef, signUpForm);
    console.log("doc end");
  };

  React.useEffect(() => {
    if (userCredentials) {
      console.log("effect");
      createUserDoc(JSON.parse(JSON.stringify(userCredentials.user)));
    }
  }, [userCredentials]);

  return (
    <>
      <Flex>Hi</Flex>
    <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};
export default Step4;
