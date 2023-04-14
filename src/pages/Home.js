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
