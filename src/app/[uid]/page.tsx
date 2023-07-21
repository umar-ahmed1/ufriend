"use client";
import { UserData } from "@/components/userpage/UserHome";
import { firestore } from "@/firebase/clientApp";
import { Flex } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

type pageProps = {
  uid:string
};

export default function Page({ params }: { params: { uid: string } }) {
  const [profileData, setProfileData] = React.useState<UserData>();
  const [loading, setLoading] = React.useState(false);

  //function to get all the user details from firestore
  const getUserDetails = async () => {
    setLoading(true);
    try {
      const userDocRef = doc(firestore, "users", params.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userInfo = { id: userDoc.id, ...userDoc.data() };
        setProfileData(userInfo as UserData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);

  React.useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  return (
    <>
    <Flex>{profileData && profileData.displayName}</Flex>
    </>
  )
}
