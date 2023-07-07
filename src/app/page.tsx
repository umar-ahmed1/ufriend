"use client";
import React from "react";
import { Flex, Icon, Image, Text, Button, Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {AiOutlineMenu} from 'react-icons/ai'

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Flex width="100%" height="10vh" align="center" justify="space-between">
        <Flex height="100%" align="center" ml={5}>
          <Image src="/images/logo.png" height={{base:'75%',sm:"85%"}}></Image>
        </Flex>
        <Flex height="100%" align="center" mr={{base:0,sm:5}} display={{base:'none',md:'flex'}}>
          <Button mr={{base:1,md:2}}>Friends</Button>
          <Button mr={{base:1,md:2}}>Classes</Button>
          <Button mr={{base:1,md:2}}>Events</Button>
          <Button onClick={() => router.push("/about")}>About</Button>
        </Flex>
        <Flex display={{base:'flex',md:'none'}} mr={3} height='100%' align='center' mt={2}>
          <Icon as={AiOutlineMenu} fontSize={35} />
        </Flex>
      </Flex>
      <Flex
        width="100%"
        border="1px solid grey"
        height="90vh"
        opacity="0.8"
        bgImage="/images/people.png"
        bgRepeat="no-repeat"
        align="center"
        bgSize="cover"
        justify="center"
        position='relative'
      >
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bg="rgba(0, 0, 0, 0.1)"
        />
        <Flex zIndex="1" width={{base:'100%',md:'50%'}} height='30%' bgColor='white' opacity='0.96' align='center' direction='column'>
          <Stack width='100%' align='center' mt={5} spacing={6} bgColor='white' pb={5} pl={{sm:5,md:1}} pr={{sm:5,md:1}}>
            <Text color='black' fontSize='24px' fontWeight={700}>Make New Friends</Text>
            <Text color='gray.600' fontSize='20px' textAlign='center' fontWeight={500}>Meet new friends in your university through your major, classes, or events held by other students!</Text>
            <Flex width='100%' justify='center'>
              <Button mr={2}>Login</Button>
              <Button bgColor='brand.100' _hover={{bgColor:'brand.100',opacity:'0.9'}}>Signup</Button>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
