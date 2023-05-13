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

/*
 * This route handles signing up for the website.
 * Navbar: Adds a navigation bar on the top of the screen to switch
 * between different pages easily.
 * SignupCard: Adds the sign up functionality to the page.
 */
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
