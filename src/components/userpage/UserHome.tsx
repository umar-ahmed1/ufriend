"use client";
import { UserDetails } from "@/components/loginsignup/CreateAccount/CreateAccount";
import { auth, firestore } from "@/firebase/clientApp";
import { Button, Flex, Icon, Text, Image } from "@chakra-ui/react";
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
import PageContent from "../pagelayout/PageContent";
import { AiOutlineUser, AiOutlineMenu} from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {CiSettings} from 'react-icons/ci'
import UserMenu from "./UserMenu";


export interface UserData {
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
  user: User;
};

const page: React.FC<pageProps> = ({ user }) => {
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<UserData>();
  const router = useRouter();

  //get all the user info
  React.useEffect(() => {
    getUserDetails();
  }, [user]);

  //get all the user info
  React.useEffect(() => {
    console.log(userData);
  }, [userData]);

  const logout = async () => {
    await signOut(auth);
  };

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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageContent>
        <Flex
          width="100%"
          height="50px"
          align="center"
          pl={3}
          pr={3}
          justify="space-between"
        >
          <Flex align='center'>
            {userData?.photoURL ? (
              <Image
                width="40px"
                height="40px"
                borderRadius="full"
                mr={1}
                color="gray.300"
                src={`${userData.photoURL}`}
              />
            ) : (
              <Icon fontSize={40} mr={1} color="brand.100" as={AiOutlineUser} />
            )}
            <Flex
              direction="column"
              display={{ base: "none", lg: "flex" }}
              fontSize="8pt"
              align="flex-start"
              ml={1}
            >
              <Text fontWeight={700} fontSize={12}>
                {(userData && userData.displayName) ||
                  user.email?.split("@")[0]}
              </Text>
              <Flex align="center">
                <Icon as={IoSparkles} color="brand.100" mr={1} />
                <Text fontSize={12} color="gray.400">1 karma</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex align="center">
            <Icon mr={2} fontSize={35} as={CiSettings}></Icon>
            <UserMenu user={user} userData={userData}/>
          </Flex>
        </Flex>

        <Flex width="100%" height="50px" align='center' justify='center'>
          <Text color='brand.100' fontSize={40}>Friend of the Day</Text>
        </Flex>

        <Flex width="100%" height="50px" align="center" justify="center">
          <Button mr={{ base: 1, md: 3 }}>Events</Button>
          <Button mr={{ base: 1, md: 3 }}>Tutors</Button>
          <Button onClick={() => router.push("/about")}>Classes</Button>
        </Flex>
      </PageContent>
    </>
  );
};
export default page;
