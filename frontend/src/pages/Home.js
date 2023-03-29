import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorMode,
  extendTheme,
  ChakraProvider,
  CSSReset,
  Spacer,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";

const MotionBox = motion(Box);

const FadeInOnScroll = ({ children, direction }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const scrollComponentRef = React.useRef(null);

  const initialPosition = direction === "left" ? -100 : 100;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const element = scrollComponentRef.current;
    observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  return (
    <MotionBox
      ref={scrollComponentRef}
      initial={{ opacity: 0, x: initialPosition }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : initialPosition,
      }}
      transition={{ duration: 1 }}
    >
      {children}
    </MotionBox>
  );
};

const Placeholder = ({ title, content }) => (
  <VStack
    p={6}
    borderWidth={1}
    borderRadius="lg"
    boxShadow="md"
    maxW="lg"
    w="100%"
  >
    <Heading size="md">{title}</Heading>
    <Text>{content}</Text>
  </VStack>
);

const HomePage = () => {
  return (
    <>
      <VStack
        spacing={8}
        alignItems="center"
        justifyContent="center"
        minH="100vh"
      >
        <Heading>Inventory Keeper</Heading>
      </VStack>
      <VStack
        spacing={8}
        alignItems="center"
        justifyContent="center"
        minH="100vh"
      >
        <FadeInOnScroll direction={"left"}>
          <Box mb={50}>
            <Placeholder
              title="Component 1"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />
          </Box>
        </FadeInOnScroll>
        <FadeInOnScroll direction={"right"}>
          <Placeholder
            title="Component 2"
            content="Sit amet justo donec enim diam. Aliquam sem fringilla ut morbi tincidunt. Euismod elementum nisi quis eleifend quam adipiscing vitae. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Non nisi est sit amet facilisis magna. Ac tincidunt vitae semper quis lectus nulla at. Ultrices neque ornare aenean euismod elementum nisi. Pulvinar mattis nunc sed blandit libero volutpat. Ut tellus elementum sagittis vitae et leo duis. Sed id semper risus in hendrerit gravida rutrum. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Eu ultrices vitae auctor eu augue ut lectus. Risus feugiat in ante metus dictum. Diam vulputate ut pharetra sit amet aliquam id diam. Quisque egestas diam in arcu cursus euismod quis viverra nibh. Nibh tellus molestie nunc non blandit. Metus dictum at tempor commodo ullamcorper a. Netus et malesuada fames ac turpis egestas. Blandit volutpat maecenas volutpat blandit aliquam etiam erat."
          />
        </FadeInOnScroll>
      </VStack>
    </>
  );
};

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

const Home = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Navbar />
    <HomePage />
  </ChakraProvider>
);

export default Home;
