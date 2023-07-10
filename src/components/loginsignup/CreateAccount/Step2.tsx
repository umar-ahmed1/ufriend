import { firestore } from "@/firebase/clientApp";
import {
  Flex,
  Input,
  Stack,
  Select,
  Button,
  Text,
  InputGroup,
  InputLeftElement,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { UserDetails } from "./CreateAccount";
import majors from "./majors";
import Combobox from "./Combobox";

type Step2Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  signUpForm: UserDetails;
  setSignUpForm: React.Dispatch<React.SetStateAction<UserDetails>>;
};

const Step2: React.FC<Step2Props> = ({
  step,
  setStep,
  signUpForm,
  setSignUpForm,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [majorClicked, setMajorClicked] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
    } catch (error: any) {
      console.log("createUser error", error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Text fontSize="31px" color="brand.100" fontWeight={600} mt={2} mb={3}>
        {"Tell us about yourself"}
      </Text>
      <Flex position="relative" direction="column" width="100%" height="100px">
        <Input
          width="100%"
          height="100px"
          placeholder="Major..."
          maxH="50px"
          readOnly={true}
          value={signUpForm.major}
          onClick={() => setMajorClicked(!majorClicked)}
          _hover={{
            cursor: "pointer",
            border: "1px solid",
            borderColor: "brand.100",
          }}
        />
        {majorClicked && (
          <Combobox signUpForm={signUpForm} setSignUpForm={setSignUpForm} setMajorClicked = {setMajorClicked} majorClicked={majorClicked} />
        )}
      </Flex>
      {errorMessage && (
        <Alert status="error">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <Button
        isLoading={loading}
        width="100%"
        bg="brand.100"
        mb={4}
        mt={7}
        borderRadius="full"
        onClick={handleSubmit}
      >
        <Text mr={4}>Next</Text>
      </Button>
    </>
  );
};
export default Step2;
