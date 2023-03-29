import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import CreateList from "../components/CreateList";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

const ListPage = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <CreateList />
  </ChakraProvider>
);

export default ListPage;
