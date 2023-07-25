import { Flex,Text,Image,Icon, Box} from '@chakra-ui/react';
import React from 'react';
import { UserData } from './UserHome';
import {AiOutlineUser} from 'react-icons/ai'
import UserShowcase from './UserShowcase';
import MessageBox from '../messaging/MessageBox';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

type MiddleSectionProps = {
    userData?: UserData;
    selectedCategory: string;
    setSelectedCategory:React.Dispatch<React.SetStateAction<string>>
};

const MiddleSection:React.FC<MiddleSectionProps> = ({userData,selectedCategory,setSelectedCategory}) => {
  const [loading,setLoading] = React.useState(false)
  const [user] = useAuthState(auth)
  const [fotd,setFotd] = React.useState<UserData>()

  //function to get all the user details from firestore
  const getFOTD = async () => {
    setLoading(true);
    try {
      const usersRef = collection(firestore,'users')
      const usersSnapshot = await getDocs(usersRef);
      if (!usersSnapshot.empty) {
        const users = usersSnapshot.docs.map((doc) => ({
          id:doc.id,
          ...doc.data()
        })).filter((doc) => doc.id !== user!.uid )
        // Randomly select one user from the array
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];
        setFotd(randomUser as UserData) 
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() =>{
    getFOTD()
  },[])
  
  
  return (
    <Flex direction='column' width='100%'>
      <Flex width="100%" height="6vh" align='center' justify='center' borderBottom='1px solid grey' borderRight='1px solid grey'>
        <Text color='brand.100' fontSize={{base:20,sm:28,md:40}} fontWeight={700}>{selectedCategory == 'FOTD' ? 'Friend of the Day' : 'Messenger'}</Text>
      </Flex>
      {selectedCategory=='FOTD' && <UserShowcase userData={fotd} type={'middle'} setSelectedCategory={setSelectedCategory} />}
      {selectedCategory=='Messages' && <MessageBox userData={userData}/>}
    </Flex>
  );
  
  
  
}
export default MiddleSection;