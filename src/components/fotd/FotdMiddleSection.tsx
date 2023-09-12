import {
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { UserData } from "../userpage/UserHome";
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
import UserShowcaseFotd from "./UserShowcaseFotd";

type FotdMiddleSectionProps = {
  userData?: UserData;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

export interface Time {
  hours:number,
  minutes:number,
  seconds:number,
}

const FotdMiddleSection: React.FC<FotdMiddleSectionProps> = ({
  userData,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [user] = useAuthState(auth);
  const [fotd, setFotd] = React.useState<UserData>();
  const [messagingStateValue, setMessagingStateValue] =
    useRecoilState(messagingState);
  const [timeRemaining,setTimeRemaining] = React.useState<Time>({hours:0,minutes:0,seconds:0})

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

      calculateTimeRemaining(timeDiff)

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

  const calculateTimeRemaining = (timeDiff: number) => {
    const timeUntilNextFOTD = 86400000 - timeDiff;
    // Calculate hours, minutes, and seconds from timeDiff
    const hours = Math.floor(timeUntilNextFOTD / 3600000);
    const minutes = Math.floor((timeUntilNextFOTD % 3600000) / 60000);
    const seconds = Math.floor((timeUntilNextFOTD % 60000) / 1000);
    setTimeRemaining({hours,minutes,seconds})
  };

  React.useEffect(() => {
    if (userData && messagingStateValue.friendsFetched) {
      console.log(messagingStateValue);
      getFOTD();
    }
  }, [userData, messagingStateValue.friendsFetched]);

  return (
    <Flex direction="column" width="100%">
      <UserShowcaseFotd
        userData={fotd}
        type={"middle"}
        setSelectedCategory={setSelectedCategory}
        timeRemaining = {timeRemaining}
        setTimeRemaining = {setTimeRemaining}
      />
    </Flex>
  );
};
export default FotdMiddleSection;
