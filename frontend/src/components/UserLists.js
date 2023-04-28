import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  VStack,
  Text,
  Collapse,
  List,
  ListItem,
  IconButton,
  useColorModeValue,
  Badge,
  Stack,
  Divider,
  Heading,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useAuth } from "./AuthContext";
import apiBaseUrl from "../config";

const UserLists = () => {
  const [lists, setLists] = useState([]);
  const [openIndexes, setOpenIndexes] = useState([]);
  const { currentUser } = useAuth();
  const bgColor = useColorModeValue(
    "linear(gray.300 90%, gray.100 200%)",
    "linear(gray.800 90%, gray.700 200%)"
  );

  useEffect(() => {
    if (!currentUser) return;
    let isMounted = true;
    axios
      .get(`${apiBaseUrl}/getListsAPI`, {
        params: { user: currentUser._id },
      })
      .then((response) => {
        if (isMounted) {
          setLists(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      isMounted = false;
    };
  }, [currentUser, currentUser?._id]);

  const toggleList = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const generateShareableLink = (userId, listId) => {
    return `${window.location.origin}/viewList/${userId}/${listId}`;
  };

  return (
    <VStack
      spacing={8}
      alignItems="center"
      justifyContent="center"
      minH="50vh"
      bgGradient={bgColor}
    >
      <Heading as="h1" size="2xl" mb={6}>
        Your Lists
      </Heading>
      {lists.map((list, index) => (
        <Box
          key={list._id}
          maxW="lg"
          p={8}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          bg={bgColor}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="2xl" fontWeight="bold">
              {list.listName}
            </Text>
            <IconButton
              onClick={() => toggleList(index)}
              icon={
                openIndexes.includes(index) ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )
              }
            />
          </Stack>
          <Divider my={3} />
          <Collapse in={openIndexes.includes(index)}>
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
          </Collapse>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => {
              navigator.clipboard.writeText(
                generateShareableLink(currentUser._id, list._id)
              );
              alert("Shareable link copied to clipboard!");
            }}
          >
            Copy Shareable Link
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default UserLists;
