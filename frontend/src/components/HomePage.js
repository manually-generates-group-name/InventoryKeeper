import React from "react";
import {
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Text,
  Button,
  LightMode,
} from "@chakra-ui/react";
import FadeInOnScroll from "./FadeInOnScroll";
import Placeholder from "./Placeholder";
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
        <Heading fontSize="6xl">Inventory Keeper</Heading>
        <Text fontSize="xl">
          A powerful and user-friendly online tool designed to help you keep
          track of all your purchases and items.
        </Text>
        <LightMode>
          <Button
            as={RouterLink}
            to={currentUser ? "/createList" : "/signUp"}
            colorScheme="blue"
          >
            Get Started
          </Button>
        </LightMode>
      </VStack>
      <VStack
        spacing={8}
        alignItems="center"
        justifyContent="center"
        minH="100vh"
        bgGradient={bgColor}
      >
        <FadeInOnScroll direction="left">
          <Box mb={50}>
            <Placeholder
              title="Component 1"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          </Box>
        </FadeInOnScroll>
        <FadeInOnScroll direction="right">
          <Placeholder
            title="Component 2"
            content="Sit amet justo donec enim diam. Aliquam sem fringilla ut morbi tincidunt. Euismod elementum nisi quis eleifend quam adipiscing vitae. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Non nisi est sit amet facilisis magna. Ac tincidunt vitae semper quis lectus nulla at. Ultrices neque ornare aenean euismod elementum nisi. Pulvinar mattis nunc sed blandit libero volutpat. Ut tellus elementum sagittis vitae et leo duis. Sed id semper risus in hendrerit gravida rutrum. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Eu ultrices vitae auctor eu augue ut lectus. Risus feugiat in ante metus dictum. Diam vulputate ut pharetra sit amet aliquam id diam. Quisque egestas diam in arcu cursus euismod quis viverra nibh. Nibh tellus molestie nunc non blandit. Metus dictum at tempor commodo ullamcorper a. Netus et malesuada fames ac turpis egestas. Blandit volutpat maecenas volutpat blandit aliquam etiam erat."
          />
        </FadeInOnScroll>
      </VStack>
    </>
  );
};

export default HomePage;
