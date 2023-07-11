import {
  Flex,
  Input,
  Stack,
  Select,
  Button,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { UserDetails } from "./CreateAccount";

type Step1Props = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  signUpForm: UserDetails;
  setSignUpForm: React.Dispatch<React.SetStateAction<UserDetails>>;
};

const Step1: React.FC<Step1Props> = ({
  step,
  setStep,
  signUpForm,
  setSignUpForm,
}) => {
  const [error, setError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = () => {
    setError("");
    if (validateEmail(signUpForm.email) && signUpForm.displayName !== "") {
      setStep(step + 1);
    } else {
      setError("Invalid Name or Email");
    }
  };
  //https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  const validateEmail = (email: string) => {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <>
      <Text fontSize="31px" color="brand.700" fontWeight={600} mt={2} mb={3}>
        {"Create your account"}
      </Text>
      <Input
        type="text"
        width="100%"
        height="100%"
        color="brand.700"
        fontSize="17px"
        p="16px 8px 16px 8px"
        m="12px 0px"
        placeholder="Name"
        border="1px solid"
        borderColor="brand.100"
        _placeholder={{ color: "brand.700" }}
        _focus={{ boxShadow: "none" }}
        value={signUpForm.displayName}
        onChange={(event) => {
          setSignUpForm((prev) => ({
            ...prev,
            displayName: event.target.value,
          }));
        }}
      ></Input>
      <Input
        type="email"
        width="100%"
        height="100%"
        color="brand.700"
        fontSize="17px"
        p="16px 8px 16px 8px"
        m="12px 0px"
        placeholder="Email"
        border="1px solid"
        borderColor="brand.100"
        _placeholder={{ color: "brand.700" }}
        _focus={{ boxShadow: "none" }}
        value={signUpForm.email}
        onChange={(event) => {
          setSignUpForm((prev) => ({
            ...prev,
            email: event.target.value,
          }));
        }}
      ></Input>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Input
        type="password"
        name="password"
        width="100%"
        height="100%"
        color="brand.900"
        fontSize="17px"
        p="16px 8px 16px 8px"
        m="12px 0px"
        placeholder="Password"
        border="1px solid"
        borderColor="brand.700"
        _placeholder={{ color: "brand.700" }}
        _focus={{ boxShadow: "none" }}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      ></Input>
      <Input
        type="password"
        name="confirmPassword"
        width="100%"
        height="100%"
        color="brand.900"
        fontSize="17px"
        p="16px 8px 16px 8px"
        m="12px 0px"
        placeholder="Confirm Password"
        border="1px solid"
        borderColor="brand.700"
        _placeholder={{ color: "brand.700" }}
        _focus={{ boxShadow: "none" }}
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      ></Input>
      <Stack direction="column" width="100%" mt={3}>
        <Text fontWeight={600} color="brand.700" fontSize="15px">
          Date of birth
        </Text>
        <Text color="brand.700" fontSize="14px">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </Text>
        <Stack direction="row" width="100%" align="center">
          <Select
            width="100%"
            color="brand.700"
            fontSize="17px"
            placeholder="Month"
            border="1px solid"
            borderColor="brand.700"
            _placeholder={{ color: "brand.700" }}
            _focus={{ boxShadow: "none" }}
            value={signUpForm.birthMonth}
            onChange={(event) => {
              setSignUpForm((prev) => ({
                ...prev,
                birthMonth: event.target.value,
              }));
            }}
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
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
            p="16px 8px 16px 8px"
            m="12px 0px"
            placeholder="Day"
            border="1px solid"
            borderColor="brand.700"
            _placeholder={{ color: "brand.700" }}
            _focus={{ boxShadow: "none" }}
            value={signUpForm.birthDay}
            onChange={(event) => {
              setSignUpForm((prev) => ({
                ...prev,
                birthDay: event.target.value,
              }));
            }}
          >
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
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
            p="16px 8px 16px 8px"
            m="12px 0px"
            placeholder="Year"
            border="1px solid"
            borderColor="brand.700"
            _placeholder={{ color: "brand.700" }}
            _focus={{ boxShadow: "none" }}
            value={signUpForm.birthYear}
            onChange={(event) => {
              setSignUpForm((prev) => ({
                ...prev,
                birthYear: event.target.value,
              }));
            }}
          >
            {[
              2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
              2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002,
              2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991,
              1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980,
              1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969,
              1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, 1959, 1958,
              1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950, 1949, 1948, 1947,
              1946, 1945, 1944, 1943, 1942, 1941, 1940, 1939, 1938, 1937, 1936,
              1935, 1934, 1933, 1932, 1931, 1930, 1929, 1928, 1927, 1926, 1925,
              1924, 1923,
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
        mt={4}
        width="100%"
        bg="brand.100"
        mb={4}
        borderColor="brand.100"
        borderRadius="full"
        onClick={handleSubmit}
      >
        <Text mr={4}>Next</Text>
      </Button>
    </>
  );
};
export default Step1;
