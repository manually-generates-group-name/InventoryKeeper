import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import SignupCard from "../components/SignUpCard";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

const SignUpPage = () => (
  <ChakraProvider theme={theme}>
    <Helmet>
      <title>Sign Up</title>
    </Helmet>
    <Navbar />
    <SignupCard />
  </ChakraProvider>
);

export default SignUpPage;
