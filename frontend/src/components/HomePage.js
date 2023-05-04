import React from "react";
import {
  VStack,
  Heading,
  useColorModeValue,
  Text,
  Button,
  LightMode,
  HStack,
} from "@chakra-ui/react";
import FadeInOnScroll from "./FadeInOnScroll";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

const HomePage = () => {
  const bgColor = useColorModeValue(
    "linear(gray.300 90%, gray.100 200%)",
    "linear(gray.800 90%, gray.700 200%)"
  );
  const { currentUser } = useAuth();
  return (
    <>
      <VStack
        spacing={8}
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        bgGradient={bgColor}
      >
        <Heading fontSize={{ base: "5xl", md: "6xl" }}>
          Inventory Keeper
        </Heading>
        <Text fontSize={{ base: "md", md: "xl" }} textAlign={"center"}>
          A powerful and user-friendly online tool designed to help you keep
          track of all your purchases and items.
        </Text>
        <HStack>
          <LightMode>
            <Button
              as={RouterLink}
              to={currentUser ? "/createList" : "/signUp"}
              colorScheme="blue"
              mr={5}
            >
              Get Started
            </Button>
          </LightMode>
          <Button
            variant={"link"}
            colorScheme="black"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("learnMore").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Learn More
          </Button>
        </HStack>
      </VStack>
      <VStack
        spacing={8}
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        bgGradient={bgColor}
        id="learnMore"
      >
        <FadeInOnScroll></FadeInOnScroll>
        <FadeInOnScroll></FadeInOnScroll>
      </VStack>
    </>
  );
};

export default HomePage;
