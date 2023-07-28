"use client";
import React from "react";
import { Flex, Icon, Image, Text, Button, Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import { authModalState } from "@/components/atoms/authAtom";
import { useSetRecoilState } from "recoil";
import AuthModal from "@/components/loginsignup/AuthModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import UserHome from "@/components/userpage/UserHome";

export default function Home() {
  const router = useRouter();
  const setModalState = useSetRecoilState(authModalState);
  const [user] = useAuthState(auth);

  return (
    <>
      <AuthModal />
      {!user ? (
        <>
          <Flex
            width="100%"
            height="10vh"
            align="center"
            justify="space-between"
            bgColor='brand.300'
            pl={{ base: 1, sm: 5 }}
            pr={{ base: 1, sm: 5 }}
          >
            <Flex height="100%" align="center">
              <Image
                src="/images/logo33.png"
                height={{ base: "40%",sm:'50%', md: "65%" }}
              ></Image>
            </Flex>
            <Stack
              height="100%"
              align="center"
              display={{ base: "none", md: "flex" }}
              direction="row"
              spacing={10}
            >
              <Text
                color="brand.500"
                fontSize={{ base: 15, sm: 20, md: 25 }}
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
              >
                FRIENDS
              </Text>
              <Text
                color="brand.500"
                fontSize={{ base: 15, sm: 20, md: 25 }}
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
              >
                EVENTS
              </Text>
              <Text
                color="brand.500"
                fontSize={{ base: 15, sm: 20, md: 25 }}
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
              >
                TUTORS
              </Text>
              <Text
                color="brand.500"
                fontSize={{ base: 15, sm: 20, md: 25 }}
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
              >
                CLASSES
              </Text>
              <Text
                color="brand.500"
                fontSize={{ base: 15, sm: 20, md: 25 }}
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
              >
                ABOUT
              </Text>
            </Stack>
            <Flex
              display={{ base: "flex", md: "none" }}
              mr={3}
              height="100%"
              align="center"
              mt={2}
            >
              <Icon as={AiOutlineMenu} fontSize={35} />
            </Flex>
            <Flex>
              <Button
                border="2px solid"
                borderColor="brand.500"
                color="black"
                borderRadius='full'
                backgroundColor="white"
                _hover={{
                  cursor: "pointer",
                  backgroundColor: "brand.500",
                  color: "white",
                }}
                onClick={() =>
                  setModalState({
                    open: true,
                    view: "login",
                  })
                }
              >
                Login
              </Button>
            </Flex>
          </Flex>
          <Flex height="90vh" width="100%" direction={{base:'column',sm:'row'}}>
            <Flex bgColor="brand.300" width={{base:"100%",sm:'60%',md:"50%"}} height="100%" position='relative' zIndex="1">
              <Stack
                width="100%"
                align="center"
                position='absolute'
                top="15%"
                spacing={6}
                pb={5}
                pl={{ sm: 5, md: 1 }}
                pr={{ sm: 5, md: 1 }}
              >
                <Text color="brand.500" fontSize={{base:'30px',sm:'50px',md:'60px',lg:'70px'}} fontWeight={700} textAlign='center'>
                  A Simple Way to Make New Friends
                </Text>
                <Text
                  color="brand.500"
                  fontSize={{base:'15px',sm:'20px',md:'25px',lg:'30px'}}
                  textAlign="center"
                  fontWeight={500}
                >
                  Meet new friends in your university through your major,
                  classes, or events held by other students!
                </Text>
                <Flex width="100%" justify="center">
                  <Button
                    width={{base:'40%',sm:'30%',md:'20%'}}
                    height='50px'
                    bgColor="white"
                    borderRadius='full'
                    border='2px solid'
                    p={2}
                    fontSize={{base:'15px',sm:'20px'}}
                    borderColor='brand.500'
                    _hover={{ bgColor: "brand.500", opacity: "0.9",color:'white'}}
                    onClick={() =>
                      setModalState({
                        open: true,
                        view: "signup",
                      })
                    }
                  >
                    Signup
                  </Button>
                </Flex>
              </Stack>
            </Flex>
            <Flex
              width={{base:"100%",sm:"40%",md:'50%'}}
              height="100%"
              opacity="1"
              bgImage="/images/aipeople442.png"
              bgColor='brand.300'
              bgRepeat="no-repeat"
              align="center"
              bgSize="cover"
              justify="center"
              position="relative"
            ></Flex>
          </Flex>
        </>
      ) : (
        <>
          <UserHome user={user} />
        </>
      )}
    </>
  );
}
