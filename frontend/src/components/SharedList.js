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
  useBreakpointValue,
} from "@chakra-ui/react";
import apiBaseUrl from "../config";

/**
 * This provides functionality for viewing and retrieving a shared list.
 * If the route has a userID and listID, it will retrieve the list associated
 * with both of these and display it.
 * Functions inside:
 * - fetchList
 */
const SharedList = () => {
  const [list, setList] = useState(null);
  const { userId, listId } = useParams();
  const bgColor = useColorModeValue("gray.300", "gray.800");
  const isMobileView = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    /**
    * This provides functionality for retrieving a shared list by sending
    * the userId and listId to the database.
    */
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
    <Box minH="100vh" bg={bgColor} paddingTop={150} paddingBottom={20}>
      <VStack
        spacing={5}
        alignItems="center"
        justifyContent="center"
        bg={bgColor}
        width={"100%"}
      >
        <Heading as="h1" size="2xl">
          {list.listName}
        </Heading>
        <Text as={"i"}>shared list</Text>
        <Box
          w={isMobileView ? "xs" : "lg"}
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
                  {item.purchased && (
                    <Badge colorScheme="green" fontSize="0.8em" ml={2}>
                      Purchased
                    </Badge>
                  )}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Box>
  );
};

export default SharedList;
