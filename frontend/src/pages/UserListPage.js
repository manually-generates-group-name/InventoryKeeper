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
