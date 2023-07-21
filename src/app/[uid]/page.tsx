import { UserDetails } from '@/components/loginsignup/CreateAccount/CreateAccount';
import { firestore } from '@/firebase/clientApp';
import { Flex,Text} from '@chakra-ui/react';
import { query, collection, where, getDocs, doc, getDoc, DocumentReference, DocumentData, Query } from 'firebase/firestore';
import { GetServerSidePropsContext, GetStaticProps } from 'next';
import { useRouter } from 'next/navigation';
import React from 'react';


async function getUser(uid: string){
    try {
        const userDocRef = doc(firestore, "users", uid);
        const userDoc = await getDoc(userDocRef);
        const userInfo = { id: userDoc.id, ...userDoc.data() };
        return userInfo
      } catch (error) {
        console.log(error);
      }
      
}


type pageProps = {
    userData: UserDetails
    userQuery: Query<DocumentData, DocumentData>
    uid: string
    test:string
    searchParams: any
};


export default async function Page({
    params,
  }: {
    params: { uid: string }
  }) {

    const userData = await getUser(params.uid)

    console.log(userData)



    return (
        <div>Hi</div>
    )
  }


