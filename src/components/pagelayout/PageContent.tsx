import { auth, firestore } from "@/firebase/clientApp";
import { Flex } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../navbar/Navbar";
import { UserData } from "../userpage/UserHome";

type PageContentProps = {
  children: any;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  //the children are the LHS and RHS react fragments
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<UserData>();
  const [user] = useAuthState(auth);
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

  React.useEffect(() => {
    getUserDetails()
  },[])

  return (
    <>
      <Flex width="100%" justify="center">
        <Navbar userData={userData}/>
        {/*LHS*/}
        <Flex direction="column" width={{ base: "25%" }}>
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/*MHS*/}
        <Flex direction="column" width={{ base: "50%", md: "50%" }}>
          {children && children[1 as keyof typeof children]}
        </Flex>
        {/*RHS*/}
        <Flex direction="column" width={{ base: "25%" }}>
          {children && children[2 as keyof typeof children]}
        </Flex>
      </Flex>
    </>
  );
};
export default PageContent;
