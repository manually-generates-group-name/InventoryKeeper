import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs-react";
import apiBaseUrl from "../config";

/**
 * This provides functionality for signing up with a new account.
 * It has data fields for firstName, lastName, email, username, and password.
 * When submit is clicked, it will create a new account using these fields if
 * they are valid and if there is no user with this information that exists.
 * Functions inside:
 * - handleChange
 * - checkUser
 * - signUp
 * - handleSubmit
 */
export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showCircularProgress, setShowCircularProgress] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue(
    "linear(gray.300 90%, gray.100 200%)",
    "linear(gray.800 90%, gray.700 200%)"
  );

  /**
  * This provides functionality for changing a data field on the card.
  * It can change any fields within formData.
  */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  /**
  * This provides functionality for checking if a user with the given username
  * and email is already in the database.
  */
  const checkUser = async (username, email) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/checkUserAPI`, {
        username,
        email,
      });
      return response.data;
    } catch (error) {
      throw new Error("Network error. Please try again.");
    }
  };

  /**
  * This provides functionality for sending sign up data to the database and verifying
  * if it was successful
  */
  const signUp = async (updatedFormData) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/signUpAPI`,
        updatedFormData
      );
      return response.data;
    } catch (error) {
      throw new Error("The user was not registered. Please try again.");
    }
  };

  /**
  * This provides functionality for the submit button. It will retrieve the sign up data
  * from the input fields and attempt to register a new user into the database with it.
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.username || !formData.password) {
      toast({
        title: "Error",
        description: "Username and password are required.",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    const { username, email } = formData;

    try {
      const response = await checkUser(username, email);

      if (response.exist) {
        toast({
          title: "Error",
          description: "Username or email already exists.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(formData.password, salt);

      const updatedFormData = {
        ...formData,
        password: hash,
      };

      await signUp(updatedFormData);

      toast({
        title: "Success",
        description: "The user was successfully registered!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });

      setIsLoading(false);
      setShowCircularProgress(true);

      setTimeout(() => {
        setShowCircularProgress(false);
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      setIsLoading(false);
    }
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
            <CircularProgress isIndeterminate color="blue.400" />
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
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign Up
            </Heading>
          </Stack>
          <Box rounded={"lg"} bg={bgColor} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="user" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="user" id="username" onChange={handleChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    onChange={handleChange}
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
              <HStack>
                <Box>
                  <FormControl id="firstName">
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" id="firstName" onChange={handleChange} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" id="lastName" onChange={handleChange} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" id="email" onChange={handleChange} />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading}
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSubmit}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link as={RouterLink} to="/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
