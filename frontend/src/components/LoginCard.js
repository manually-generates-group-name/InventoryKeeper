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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import bcrypt from "bcryptjs-react";
import axios from "axios";

export default function SimpleCard() {
  const bgColor = useColorModeValue(
    "linear(gray.300 90%, gray.100 200%)",
    "linear(gray.800 90%, gray.700 200%)"
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const handleSignIn = async () => {
    const user = await getUser(username);
    if (!user) {
      toast({
        title: "User not found!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
      return;
    } else {
      toast({
        title: "Login Successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // TODO: Handle successful sign in
  };

  async function getUser(user) {
    try {
      const response = await axios.get(
        "http://localhost:3001/existingUserAPI",
        {
          params: {
            username: user,
          },
        }
      );

      return response.data;
    } catch (error) {
      return null;
    }
  }

  return (
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
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
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
  );
}
