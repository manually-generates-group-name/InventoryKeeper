import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import UserLists from "../components/UserLists";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

/*
 * This route handles the main page for the user signed in.
 * Navbar: Adds a navigation bar on the top of the screen to switch
 * between different pages easily.
 * UserLists: Adds a functionality to view lists associated with this user.
 */
const UserListPage = () => (
  <ChakraProvider theme={theme}>
    <Helmet>
      <title>Your Lists</title>
    </Helmet>
    <Navbar />
    <UserLists />
  </ChakraProvider>
);

export default UserListPage;
