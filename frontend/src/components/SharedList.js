import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  VStack,
  Text,
  List,
  ListItem,
  Badge,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import apiBaseUrl from "../config";

const SharedList = () => {
  const [list, setList] = useState(null);
  const { userId, listId } = useParams();
  const bgColor = useColorModeValue(
    "linear(gray.300 90%, gray.100 200%)",
    "linear(gray.800 90%, gray.700 200%)"
  );

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/getListById`, {
          params: { userId, listId },
        });

        setList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchList();
  }, [userId, listId]);

  if (!list) {
    return <Text>Loading...</Text>;
  }

  return (
    <VStack
      spacing={8}
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bgGradient={bgColor}
    >
      <Heading as="h1" size="2xl" mb={6}>
        {list.listName}
      </Heading>
      <Box
        maxW="lg"
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        bg={bgColor}
      >
        <List spacing={3} mt={4}>
          {list.items.map((item, itemIndex) => (
            <ListItem key={itemIndex}>
              <Text>
                <Badge colorScheme="blue" fontSize="0.8em" mr={2}>
                  {item.store}
                </Badge>
                {item.name}
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  );
};

export default SharedList;
