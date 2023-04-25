import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  InputGroup,
  InputRightElement,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import bcrypt from "bcryptjs-react";
import axios from "axios";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "./AuthContext";

export default function LoginCard() {
  const bgColor = useColorModeValue(
    "linear(gray.300 90%, gray.100 200%)",
    "linear(gray.800 90%, gray.700 200%)"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCircularProgress, setShowCircularProgress] = useState(false);
  const toast = useToast();
  const { setCurrentUser } = useAuth();

  const getUser = async (user) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/existingUserAPI",
        {
          params: {
            username: user,
          },
        }
      );

      if (response.status === 404) {
        return null;
      }

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw new Error("Network error. Please try again.");
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);

    if (!username || !password) {
      toast({
        title: "Error",
        description: "Username and password are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      const user = await getUser(username);

      if (!user) {
        toast({
          title: "User not found!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        toast({
          title: "Incorrect password!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      setCurrentUser(user);

      toast({
        title: "Login Successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }

    setShowCircularProgress(true);

    setTimeout(() => {
      setShowCircularProgress(false);
      window.location.href = "/";
    }, 3000);
  };

  return (
    <>
      <Modal
        isOpen={showCircularProgress}
        onClose={() => {}}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ModalContent
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            boxShadow="none"
            bg="transparent"
          >
            <CircularProgress isIndeterminate color="blue.400" size="80%" />
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bgGradient={bgColor}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign In</Heading>
          </Stack>
          <Box rounded={"lg"} bg={bgColor} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="user">
                <FormLabel>Username</FormLabel>
                <Input
                  type="user"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link as={RouterLink} to="/signUp" color={"blue.400"}>
                    Don't have an account?
                  </Link>
                </Stack>
                <Button
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
