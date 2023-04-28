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
