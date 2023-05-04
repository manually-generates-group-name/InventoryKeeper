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

const SharedList = () => {
  const [list, setList] = useState(null);
  const { userId, listId } = useParams();
  const bgColor = useColorModeValue("gray.300", "gray.800");
  const isMobileView = useBreakpointValue({ base: true, md: false });

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
