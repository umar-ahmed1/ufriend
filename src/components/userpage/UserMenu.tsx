import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  Text,
  MenuDivider,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";

import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authAtom";
import { auth } from "@/firebase/clientApp";
import { AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { UserData } from "./UserHome";

type UserMenuProps = {
  user?: User | null; //undefined is the ? and null is null and user is user so we cover all three
  userData?: UserData
};

const UserMenu: React.FC<UserMenuProps> = ({user,userData}) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter()

  const logout = async () => {
    await signOut(auth);
  };

  React.useEffect(() => {
    console.log(userData!.uid)
    console.log(user?.uid)
  },[])


  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "grey.200" }}
      >
        <Flex align="center">
          <Flex align="center">
            <Icon as={AiOutlineMenu} fontSize={30} />
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          fontSize="10pt"
          fontWeight={700}
          _hover={{ bg: "blue.500", color: "white" }}
          onClick={() => router.push(`/${user!.uid}`)}
        >
          <Flex align="center">
            <Icon as={CgProfile} mr={2} fontSize={20} />
            <Text>Profile</Text>
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          fontSize="10pt"
          fontWeight={700}
          _hover={{ bg: "blue.500", color: "white" }}
          onClick={logout}
        >
          <Flex align="center">
            <Icon as={MdOutlineLogin} mr={2} fontSize={20} />
            <Text>Log Out</Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
