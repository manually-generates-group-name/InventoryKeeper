import React from "react";
import { VStack, Heading, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

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

Placeholder.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Placeholder;
