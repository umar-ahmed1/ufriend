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
            pl={{ base: 1, sm: 5 }}
            pr={{ base: 1, sm: 5 }}
          >
            <Flex height="100%" align="center">
              <Image
                src="/images/logo.png"
                height={{ base: "50%", sm: "65%" }}
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
                color="brand.100"
                fontSize={{ base: 15,sm:20, md: 25 }}
                _hover={{textDecoration:'underline',cursor:'pointer'}}
              >
                FRIENDS
              </Text>
              <Text
                color="brand.100"
                fontSize={{ base: 15,sm:20, md: 25 }}
                _hover={{textDecoration:'underline',cursor:'pointer'}}
              >
                EVENTS
              </Text>
              <Text
                color="brand.100"
                fontSize={{ base: 15,sm:20, md: 25 }}
                _hover={{textDecoration:'underline',cursor:'pointer'}}
              >
                TUTORS
              </Text>
              <Text
                color="brand.100"
                fontSize={{ base: 15,sm:20, md: 25 }}
                _hover={{textDecoration:'underline',cursor:'pointer'}}
              >
                CLASSES
              </Text>
              <Text
                color="brand.100"
                fontSize={{ base: 15,sm:20, md: 25 }}
                _hover={{textDecoration:'underline',cursor:'pointer'}}
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
                border='2px solid'
                borderColor='brand.100'
                color='brand.100'
                backgroundColor='white'
                _hover={{cursor:'pointer',backgroundColor:'brand.100',color:'black'}}
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
            position="relative"
          >
            <Box
              position="absolute"
              top={0}
              bottom={0}
              left={0}
              right={0}
              bg="rgba(0, 0, 0, 0.2)"
            />
            <Flex
              zIndex="1"
              width={{ base: "100%", md: "33%" }}
              height="30%"
              bgColor="white"
              opacity="0.96"
              align="center"
              direction="column"
            >
              <Stack
                width="100%"
                align="center"
                mt={5}
                spacing={6}
                bgColor="white"
                pb={5}
                pl={{ sm: 5, md: 1 }}
                pr={{ sm: 5, md: 1 }}
              >
                <Text color="black" fontSize="24px" fontWeight={700}>
                  Make New Friends
                </Text>
                <Text
                  color="gray.600"
                  fontSize="20px"
                  textAlign="center"
                  fontWeight={500}
                >
                  Meet new friends in your university through your major,
                  classes, or events held by other students!
                </Text>
                <Flex width="100%" justify="center">
                  <Button
                    mr={2}
                    onClick={() =>
                      setModalState({
                        open: true,
                        view: "login",
                      })
                    }
                  >
                    Login
                  </Button>
                  <Button
                    bgColor="brand.100"
                    _hover={{ bgColor: "brand.100", opacity: "0.9" }}
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
