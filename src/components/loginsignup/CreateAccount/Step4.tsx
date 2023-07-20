import {
  Flex,
  Input,
  Stack,
  Select,
  Button,
  Text,
  AlertIcon,
  Alert,
  Textarea,
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
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const Step4: React.FC<Step4Props> = ({
  step,
  setStep,
  signUpForm,
  setSignUpForm,
  password,
  setPassword,
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
    const userRef = doc(firestore, "users", user.uid);
    //set the document with data from the hook
    await setDoc(userRef, user);
    //add all the data that we have collected
    console.log(signUpForm);
    await updateDoc(userRef, signUpForm);
  };

  React.useEffect(() => {
    if (userCredentials) {
      console.log("effect");
      createUserDoc(JSON.parse(JSON.stringify(userCredentials.user)));
    }
  }, [userCredentials]);

  return (
    <>
      <Stack
        width="100%"
        mt={2}
        mb={2}
        align="center"
        fontSize="13px"
        textColor="brand.700"
      >
        <Text fontWeight={600} color="brand.700" fontSize="15px">
          Biography
        </Text>
        <Text color="brand.700" fontSize="14px">
          This will be used to tell others on the app about yourself
        </Text>
        <Textarea
          name="body"
          height="100px"
          value={signUpForm.bio}
          onChange={(event) => {
            setSignUpForm((prev) => ({
              ...prev,
              bio: event.target.value,
            }));
          }}
          fontSize="10pt"
          borderRadius={4}
          placeholder="Text (optional)"
          _placeholder={{ color: "gray.500" }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "black",
          }}
          border="1px solid"
          borderColor="brand.100"
        />
      </Stack>

      <Button
        mt={4}
        width="100%"
        bg="brand.100"
        mb={4}
        borderColor="brand.100"
        borderRadius="full"
        onClick={handleSubmit}
      >
        <Text mr={4}>Submit</Text>
      </Button>
    </>
  );
};
export default Step4;
