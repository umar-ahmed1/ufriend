"use client";
import React from "react";
import { Flex, Icon, Image, Text, Button, Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Flex width="100%" height="10vh" align="center" justify="space-between">
        <Flex height="100%" align="center" ml={5}>
          <Image src="/images/logo.png" height="85%"></Image>
        </Flex>
        <Flex height="100%" align="center" mr={5}>
          <Button mr={2}>Friends</Button>
          <Button mr={2}>Classes</Button>
          <Button mr={2}>Events</Button>
          <Button onClick={() => router.push("/about")}>About</Button>
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
        <Flex zIndex="1" color="white" width='50%' height='30%' bgColor='white' opacity='0.96' align='center' direction='column'>
          <Stack width='70%' align='center' mt={5} spacing={6}>
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
