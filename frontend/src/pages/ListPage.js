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
