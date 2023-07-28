import {
  Flex,
  Text,
  Image,
  Icon,
  Box,
  AspectRatio,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { UserData } from "../userpage/UserHome";
import { AiOutlineUser, AiFillPhone } from "react-icons/ai";
import UserShowcase from "../userpage/UserShowcase";
import MessageBox from "../messaging/MessageBox";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { messagingState } from "../atoms/messagingAtom";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

type FotdMiddleSectionProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const MiddleSection: React.FC<FotdMiddleSectionProps> = ({
  userData,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [user] = useAuthState(auth);
  const [fotd, setFotd] = React.useState<UserData>();
  const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);

  //function to get all the user details from firestore
  const getFOTD = async () => {
    setLoading(true);
    try {
      //check if the time from last fotd is less than 24 hrs
      const lastFotdDate = userData?.lastFotdTime?.toDate(); // Assuming lastFOTD is a Firestore timestamp field
      const currentDate = new Date();
      const timeDiff = lastFotdDate
        ? currentDate.getTime() - lastFotdDate?.getTime()
        : 86400000;

      //if the time diff is less than 24 hours then dont get a new FOTD but get the old one
      if (timeDiff < 86400000) {
        const fotdDocRef = doc(firestore, "users", userData!.lastFotdId);
        const fotdDoc = await getDoc(fotdDocRef);
        if (fotdDoc.exists()) {
          const fotdInfo = { id: fotdDoc.id, ...fotdDoc.data() };
          setFotd(fotdInfo as UserData);
        }
        return;
      }

      //otherwise get a new fotd
      //get all the users and te logged in user
      const userDocRef = doc(firestore, "users", user!.uid);
      const usersRef = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersRef);
      if (!usersSnapshot.empty) {
        const users = usersSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((doc) => doc.id !== user!.uid);

        // try 10 times to get a new friend
        let retry = 0;
        const maxRetry = 10;
        while (retry < maxRetry) {
          const randomIndex = Math.floor(Math.random() * users.length);
          const randomUser = users[randomIndex];
          // Check if the randomUser exists in the myFriends array
          const isUserInMyFriends = messagingStateValue.myFriends.some(
            (friend) => friend.id === randomUser.id
          );
          //if it does increment retry
          if (isUserInMyFriends) {
            retry++;
            //if a unique friend was found set them as fotd and update user doc and then break the while loop
          } else {
            setFotd(randomUser as UserData);
            await updateDoc(userDocRef, {
              lastFotdTime: serverTimestamp() as Timestamp,
              lastFotdId: randomUser.id,
            });
            break;
          }
        }
        //if a unique friend wasnt found just give an old fotd
        if (retry == maxRetry) {
          const randomIndex = Math.floor(Math.random() * users.length);
          const randomUser = users[randomIndex];
          setFotd(randomUser as UserData);
          await updateDoc(userDocRef, {
            lastFotdTime: serverTimestamp() as Timestamp,
            lastFotdId: randomUser.id,
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (userData && messagingStateValue.friendsFetched) {
      console.log(messagingStateValue);
      getFOTD();
    }
  }, [userData, messagingStateValue.friendsFetched]);

  return (
    <Flex direction="column" width="100%">
      <Flex
        width="100%"
        height="10vh"
        align="center"
        justify="center"
        borderBottom="1px solid"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Text
          color="brand.100"
          fontSize={{ base: 20, sm: 28, md: 40 }}
          fontWeight={700}
        >
          Friend of the Day
        </Text>
      </Flex>
      <UserShowcase
        userData={fotd}
        type={"middle"}
        setSelectedCategory={setSelectedCategory}
      />
    </Flex>
  );
};
export default MiddleSection;
