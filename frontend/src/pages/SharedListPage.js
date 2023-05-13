import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import SharedList from "../components/SharedList";
import { Helmet } from "react-helmet";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

/*
 * This is the route that handles sharing lists.
 * Navbar: Adds a navigation bar on the top of the screen to switch
 * between different pages easily.
 * SharedList: Adds the shared list functionality to the page.
 */
const SharedListPage = () => (
  <ChakraProvider theme={theme}>
    <Helmet>
      <title>Shared List</title>
    </Helmet>
    <Navbar />
    <SharedList />
  </ChakraProvider>
);

export default SharedListPage;
