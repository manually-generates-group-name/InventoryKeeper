import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import HomePage from "../components/HomePage";
import { Helmet } from "react-helmet";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

/*
 * This route handles the Home directory.
 * Navbar: Adds a navigation bar on the top of the screen to switch
 * between different pages easily.
 * HomePage: Adds content to the page describing the application's
 * abilities and linking the user to the createList page. Will display
 * additional information when the button called Learn More is clicked.
 */
const Home = () => (
  <ChakraProvider theme={theme}>
    <Helmet>
      <title>Inventory Keeper</title>
    </Helmet>
    <Navbar />
    <HomePage />
  </ChakraProvider>
);

export default Home;
