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

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleSubmit = () => {
    setErrorMessage("");
    if(signUpForm.yearOfProgram != "Year of Program" && signUpForm.programType != "Program Type" && signUpForm.major != ''){
      setStep(step+1)
    } else {
      setErrorMessage("Some fields are not complete")
    }
  };

  const handleClick = () => {
    setMajorClicked(!majorClicked);
  };

  return (
    <>
      <Text fontSize="31px" color="brand.100" fontWeight={600} mt={2} mb={3}>
        {"Tell us about yourself"}
      </Text>
      <Select
            width="100%"
            color="brand.700"
            fontSize="17px"
            p="16px 8px 16px 0px"
            m="12px 0px"
            placeholder="University"
            border="1px solid"
            borderColor="brand.700"
            _placeholder={{ color: "brand.700" }}
            _focus={{ boxShadow: "none" }}
            value={signUpForm.university}
            onChange={(event) => {
              setSignUpForm((prev) => ({
                ...prev,
                university: event.target.value,
              }));
            }}
          >
            {[
              'University of Calgary','University of Alberta'
            ].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
      <Flex position="relative" direction="column" width="100%" height="100px">
        <Input
          width="100%"
          height="100px"
          placeholder="Major..."
          maxH="50px"
          readOnly={true}
          value={signUpForm.major}
          onClick={handleClick}
          _hover={{
            cursor: "pointer",
            border: "1px solid",
            borderColor: "brand.100",
          }}
        />
        {majorClicked && (
          <Combobox
            signUpForm={signUpForm}
            setSignUpForm={setSignUpForm}
            setMajorClicked={setMajorClicked}
            majorClicked={majorClicked}
          />
        )}
      </Flex>
      <Stack direction="column" width="100%" mt={3}>
        <Text fontWeight={600} color="brand.700" fontSize="15px">
          Program Details
        </Text>
        <Text color="brand.700" fontSize="14px">
          These will be used to help you find friends in similar programs and years
        </Text>
        <Stack direction="row" width="100%" align="center">
          
          <Select
            width="100%"
            color="brand.700"
            fontSize="17px"
            p="16px 8px 16px 0px"
            m="12px 0px"
            placeholder="Program Type"
            border="1px solid"
            borderColor="brand.700"
            _placeholder={{ color: "brand.700" }}
            _focus={{ boxShadow: "none" }}
            value={signUpForm.programType}
            onChange={(event) => {
              setSignUpForm((prev) => ({
                ...prev,
                programType: event.target.value,
              }));
            }}
          >
            {[
              'Undergraduate','Graduate'
            ].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Select
            width="100%"
            color="brand.700"
            fontSize="17px"
            placeholder="Year of Program"
            border="1px solid"
            borderColor="brand.700"
            _placeholder={{ color: "brand.700" }}
            _focus={{ boxShadow: "none" }}
            value={signUpForm.yearOfProgram}
            onChange={(event) => {
              setSignUpForm((prev) => ({
                ...prev,
                yearOfProgram: event.target.value,
              }));
            }}
          >
            {[
              1,2,3,4
            ].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Stack>
      </Stack>
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
