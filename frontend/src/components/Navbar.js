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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "./AuthContext";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const hoverColor = useColorModeValue("gray.200", "blue.700");
  const { currentUser, setCurrentUser } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const onCloseLogoutDialog = () => setIsLogoutDialogOpen(false);
  const onOpenLogoutDialog = () => setIsLogoutDialogOpen(true);
  const cancelRef = useRef();

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    onCloseLogoutDialog();
    window.location.reload();
  };

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
        {currentUser && (
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
        )}
        <Spacer />
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
        {currentUser ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              ml={5}
              fontWeight="bold"
            >
              {currentUser.username}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpenLogoutDialog}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            as={RouterLink}
            to="/login"
            ml={5}
            color={"white"}
            bg={"blue.400"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Sign In
          </Button>
        )}
      </Flex>
      <AlertDialog
        isOpen={isLogoutDialogOpen}
        onClose={onCloseLogoutDialog}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Sign Out
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Are you sure you want to sign out?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseLogoutDialog}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleSignOut} ml={3}>
                Sign Out
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Navbar;
