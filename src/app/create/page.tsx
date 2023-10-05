"use client"
import EventsCreateArea from '@/components/events/EventsCreateArea';
import { auth } from '@/firebase/clientApp';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    const [user] = useAuthState(auth)
    return (
        <>
            <EventsCreateArea user={user}/>
        </>
    )
}
export default page;