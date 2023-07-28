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
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PageContent from "../pagelayout/PageContent";
import { useRouter } from "next/navigation";
import { CiSettings } from "react-icons/ci";
import UserMenu from "./UserMenu";
import MessageBox from "../messaging/MessagePreviewArea";
import LeftSection from "./LeftSection";
import MiddleSection from "./MiddleSection";
import RightSection from "./RightSection";
import { messagingState } from "../atoms/messagingAtom";
import { useRecoilState } from "recoil";
import Navbar from "../navbar/Navbar";

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
  latestMessage?: string;
  lastFotdTime: Timestamp;
  lastFotdId: string;
}

type pageProps = {
  user: User;
};

const page: React.FC<pageProps> = ({ user }) => {
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<UserData>();
  const [selectedCategory, setSelectedCategory] = React.useState("FOTD");
  const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);
  const router = useRouter();

  //get all the user info and friend info
  React.useEffect(() => {
    getUserDetails();
    getFriends();
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

  const getFriends = async () => {
    if (messagingStateValue.friendsFetched === true) {
      return;
    }
    const userDocRef = doc(firestore, "users", user!.uid);
    const friendsDocsRef = collection(userDocRef, "friends");
    const friendsDocs = await getDocs(friendsDocsRef);
    const friendIds = friendsDocs.docs.map((friendDoc) => friendDoc.id);

    // Get user data and latest messages for each friend
    const friendsDataPromises = friendIds.map(async (friendId) => {
      const friendDocRef = doc(firestore, "users", friendId);
      const friendDoc = await getDoc(friendDocRef);

      if (friendDoc.exists()) {
        const friendData = {
          id: friendDoc.id,
          ...friendDoc.data(),
          latestMessage: "",
        };

        // Get the latest message from the user's subcollection "friends"
        const latestMessageRef = doc(
          firestore,
          `users/${user?.uid}/friends`,
          friendData.id
        );
        const latestMessage = await getDoc(latestMessageRef);
        if (latestMessage.exists()) {
          let temp = latestMessage.data().latestMessage;
          friendData.latestMessage = temp;
        }

        return friendData;
      } else {
        // Handle case when a friend document is not found
        return null;
      }
    });

    // Resolve all promises to get friend data
    const friendsData = await Promise.all(friendsDataPromises);

    setMessagingStateValue((prev) => ({
      ...prev,
      myFriends: friendsData as UserData[],
      friendsFetched: true,
    }));
  };

  return (
    <>
      <Flex width="100%" justify="center">
        <Navbar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Flex direction="column" width={{ base: "25%" }}>
          <LeftSection
            userData={userData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Flex>
        <Flex direction="column" width={{ base: "50%", md: "50%" }}>
          <MiddleSection
            userData={userData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Flex>
        <Flex direction="column" width={{ base: "25%" }}>
          <RightSection
            userData={userData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Flex>
      </Flex>
    </>
  );
};
export default page;
