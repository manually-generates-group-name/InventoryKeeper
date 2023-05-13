import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import CreateList from "../components/CreateList";
import { Helmet } from "react-helmet";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

/*
 * This is the route that handles creating lists.
 * Navbar: Adds a navigation bar on the top of the screen to switch
 * between different pages easily.
 * CreateList: Adds the functionality of creating a list.
 */
const ListPage = () => (
  <ChakraProvider theme={theme}>
    <Helmet>
      <title>Create a List</title>
    </Helmet>
    <Navbar />
    <CreateList />
  </ChakraProvider>
);

export default ListPage;
