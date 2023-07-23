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
import MessageBox from "../messaging/MessagePreviewArea";
import LeftSection from "./LeftSection";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";


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

const page: React.FC<pageProps> = ({ user}) => {
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<UserData>();
  const [selectedCategory,setSelectedCategory] = React.useState('FOTD')
  const router = useRouter();

  //get all the user info
  React.useEffect(() => {
    getUserDetails();
  }, [user]);

  
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
        <LeftSection userData={userData} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        <MiddleSection userData={userData } selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        <RightSection userData={userData} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      </PageContent>
    </>
  );
};
export default page;
