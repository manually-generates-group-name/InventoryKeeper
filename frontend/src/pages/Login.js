import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import LoginCard from "../components/LoginCard";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

const LoginPage = () => (
  <ChakraProvider theme={theme}>
    <Helmet>
      <title>Sign In</title>
    </Helmet>
    <Navbar />
    <LoginCard />
  </ChakraProvider>
);

export default LoginPage;
