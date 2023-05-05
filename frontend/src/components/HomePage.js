import React from "react";
import {
  VStack,
  Heading,
  useColorModeValue,
  Text,
  Button,
  LightMode,
  HStack,
  Box,
  Icon,
  Flex,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";
import {
  AiOutlineFileAdd,
  AiOutlineEye,
  AiOutlineShareAlt,
} from "react-icons/ai";
import FadeInOnScroll from "./FadeInOnScroll";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

const HomePage = () => {
  const bgColor = useColorModeValue(
    "linear(gray.300 90%, gray.100 200%)",
    "linear(gray.800 90%, gray.700 200%)"
  );
  const boxColor = useColorModeValue("gray.300", "gray.800");
  const { currentUser } = useAuth();
  const isMobileView = useBreakpointValue({ base: true, md: false });

  const infoBoxes = [
    {
      title: "Create a List",
      description: "Create and manage your lists with ease.",
      icon: AiOutlineFileAdd,
    },
    {
      title: "View Your Lists",
      description: "View and edit your lists anytime, anywhere.",
      icon: AiOutlineEye,
    },
    {
      title: "Share with a Friend!",
      description: "Share your lists with friends and family.",
      icon: AiOutlineShareAlt,
    },
  ];

  return (
    <>
      <VStack
        minH={"100vh"}
        alignItems="center"
        justifyContent="center"
        spacing={8}
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
      <Stack
        spacing={8}
        alignItems="center"
        justifyContent="center"
        minH="50vh"
        bgGradient={bgColor}
        id="learnMore"
        direction={isMobileView ? "column" : "row"}
        paddingTop={5}
        paddingBottom={5}
      >
        {infoBoxes.map((box, index) => (
          <FadeInOnScroll key={index}>
            <Box
              bg={boxColor}
              boxShadow={"2xl"}
              rounded={"md"}
              p={6}
              overflow={"hidden"}
            >
              <Flex justifyContent="center" alignItems="center" mb={4}>
                <Icon as={box.icon} boxSize={12} color="blue.500" />
              </Flex>
              <Heading
                fontSize={"2xl"}
                fontFamily={"body"}
                fontWeight={500}
                textAlign="center"
              >
                {box.title}
              </Heading>
              <Text
                fontWeight={600}
                color={"gray.500"}
                mt={4}
                textAlign="center"
              >
                {box.description}
              </Text>
            </Box>
          </FadeInOnScroll>
        ))}
      </Stack>
    </>
  );
};

export default HomePage;
