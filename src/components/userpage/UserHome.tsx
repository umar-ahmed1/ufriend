"use client";
import { UserDetails } from "@/components/loginsignup/CreateAccount/CreateAccount";
import { auth, firestore } from "@/firebase/clientApp";
import { Button, Flex, Text } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface UserData {
    apiKey: string;
    appName: string;
    bio: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    createdAt: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    id: string;
    isAnonymous: boolean;
    lastLoginAt: string;
    major: string;
    photoURL: string;
    programType: string;
    providerData: Array<any>;
    stsTokenManager: {
      expirationTime: number;
      accessToken: string;
      refreshToken: string;
    };
    uid: string;
    university: string;
    yearOfProgram: string;
  }


type pageProps = {
  user?: User | null
};

const page: React.FC<pageProps> = ({user}) => {
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<UserData>()

  //get all the user info
  React.useEffect(() => {
    if (user) {
      getUserDetails();
    }
  }, [user]);

  //get all the user info
  React.useEffect(() => {
    console.log(userData);
  }, [userData]);

  const logout = async () => {
    console.log("hi")
    await signOut(auth)
  }

  //function to get all the user details from firestore
  const getUserDetails = async () => {
    setLoading(true);
    try {
      const userDocRef = doc(firestore, "users", user!.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userInfo = { id: userDoc.id, ...userDoc.data() };
        setUserData(userInfo as UserData);
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex width='100%' border='1px solid red'>
        <Text>{userData && userData.displayName as string}</Text>
        <Text>{userData && userData.university as string}</Text>
        <Text>{userData && userData.birthDay as string}</Text>
        <Button onClick={logout}>Sign out</Button>
      </Flex>
    </>
  );
};
export default page;
