import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
  Link,
  Button,
  LightMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const hoverColor = useColorModeValue("gray.200", "blue.700");

  return (
    <Box
      bg={colorMode === "light" ? "gray.300" : "gray.800"}
      p={4}
      boxShadow="md"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="sticky"
    >
      <Flex alignItems="center">
        <Link
          as={RouterLink}
          to="/"
          size="md"
          ml={4}
          _hover={{ bg: hoverColor, borderRadius: "lg" }}
        >
          <Text fontSize="xl" fontWeight="bold">
            Inventory Keeper
          </Text>
        </Link>
        <Flex>
          <Link
            as={RouterLink}
            to="/createList"
            px={2}
            mr={3}
            ml={2}
            _hover={{ bg: hoverColor, borderRadius: "md" }}
          >
            Create a List
          </Link>
        </Flex>
        <Spacer />
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
        <LightMode>
          <Button ml={5} colorScheme="blue">
            Sign Up
          </Button>
        </LightMode>
      </Flex>
    </Box>
  );
};

export default Navbar;
