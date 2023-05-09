import styles from "./styles.module.css";
import React from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box bg="gray.100" px="4">
      <Flex alignItems="center" h="16">
        <Heading size="md">MyShop</Heading>
        <Spacer />
        <Menu>
          <MenuButton as={Button} colorScheme="teal">
            Login/Signup
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to="/login">Login</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/signup">Signup</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default Navbar;
