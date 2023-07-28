import { Flex, Stack, Icon, Text, Button, Image } from "@chakra-ui/react";
import React from "react";
import {BiLogOut } from "react-icons/bi";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BsBookmark, BsPerson, BsThreeDots,BsFillPeopleFill,BsFillCalendarEventFill } from "react-icons/bs";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import UserMenu from "../userpage/UserMenu";
import { useRecoilState } from "recoil";
import { authModalState } from "../atoms/authAtom";
import { useRouter } from "next/navigation";
import {IoMdSchool} from 'react-icons/io'
import { UserData } from "../userpage/UserHome";
import {CiSettings} from 'react-icons/ci'
import { signOut } from "firebase/auth";

type NavbarProps = {
    userData?: UserData
};

const Navbar: React.FC<NavbarProps> = ({userData}) => {
  const [user] = useAuthState(auth);
  const [modalState, setModalState] = useRecoilState(authModalState);
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Flex
      maxWidth="31%"
      justify="flex-start"
      height="100vh"
      flexGrow={1}
      display={{ base: "none", sm: "flex" }}
      borderRight="1px solid"
      borderColor="gray.200"
      position='relative'
      borderBottom='1px solid red'
      direction='column'
    >
      <Stack
        direction="column"
        spacing={2}
        pl={3}
        pb={3}
        pr={{ base: 0, lg: 6 }}
        mr={{ base: 0, lg: 6 }}
      >
        <Flex
          align="center"
          cursor="pointer"
          width="100%"
          p="12px"
          _hover={{ bg: "whiteAlpha.200" }}
          borderRadius="full"
        >
          <Image src="/images/logo33.png" width="50%" />
        </Flex>
        <Flex
          align="center"
          cursor="pointer"
          width="100%"
          p="12px"
          _hover={{ bg: "blackAlpha.200" }}
          borderRadius="full"
          onClick={() => {
            router.push("/");
          }}
        >
          <Icon color="brand.400" fontSize={28} as={BsFillPeopleFill} mr={2} />
          <Flex display={{ base: "none", lg: "flex" }}>
            <Text fontSize="20px" color="brand.400">
              Friend of the Day
            </Text>
          </Flex>
        </Flex>
        <Flex
          align="center"
          cursor="pointer"
          _hover={{ bg: "blackAlpha.200" }}
          p="12px"
          borderRadius="full"
        >
          <Icon color="brand.400" fontSize={28} as={AiOutlineMail} mr={2} />
          <Flex display={{ base: "none", lg: "flex" }}>
            <Text fontSize="20px" color="brand.400">
              Messages
            </Text>
          </Flex>
        </Flex>
        <Flex
          align="center"
          cursor="pointer"
          _hover={{ bg: "blackAlpha.200" }}
          p="12px"
          borderRadius="full"
        >
          <Icon color="brand.400" fontSize={24} as={BsFillCalendarEventFill} mr={2} />
          <Flex display={{ base: "none", lg: "flex" }}>
            <Text fontSize="20px" color="brand.400">
              Events
            </Text>
          </Flex>
        </Flex>
        <Flex
          align="center"
          cursor="pointer"
          _hover={{ bg: "blackAlpha.200" }}
          p="12px"
          borderRadius="full"
        >
          <Icon
            color="brand.400"
            fontSize={28}
            as={IoMdSchool}
            mr={2}
          />
          <Flex display={{ base: "none", lg: "flex" }}>
            <Text fontSize="20px" color="brand.400">
              Tutor
            </Text>
          </Flex>
        </Flex>
        <Flex
          align="center"
          cursor="pointer"
          _hover={{ bg: "blackAlpha.200" }}
          p="12px"
          borderRadius="full"
        >
          <Icon color="brand.400" fontSize={28} as={BsPerson} mr={2} />
          <Flex display={{ base: "none", lg: "flex" }}>
            <Text fontSize="20px" color="brand.400">
              Profile
            </Text>
          </Flex>
        </Flex>
      </Stack>
        <Flex
        width="100%"
        height="6vh"
        align="center"
        pl={{base:0,sm:6}}
        pr={{base:0,sm:6}}
        justify={{base:'center',sm:'space-between'}}
        position='absolute'
        bottom={5}
      >
        <Flex align="center" >
          {userData?.photoURL ? (
            <Image
              width={{base:'30px',md:'40px'}}
              height={{base:'30px',md:'40px'}}
              borderRadius="full"
              mr={{base:0,md:1}}
              color="gray.300"
              src={`${userData.photoURL}`}
            />
          ) : (
            <Icon fontSize={{base:25,md:40}} mr={1} color="brand.100" as={AiOutlineUser} />
          )}
          <Flex
            direction="column"
            display={{ base: "none", lg: "flex" }}
            fontSize="8pt"
            align="flex-start"
            ml={{base:0,sm:1}}
          >
            <Text fontWeight={700} fontSize={12}>
              {(userData && userData.displayName) || user!.email?.split("@")[0]}
            </Text>
            <Flex align="center">
              <Text fontSize={12} color="gray.400">
                1 karma
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex align="center" _hover={{cursor:'pointer'}} onClick={logout}>
          <Icon fontSize={{base:30,sm:35}} as={BiLogOut}></Icon>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Navbar;
