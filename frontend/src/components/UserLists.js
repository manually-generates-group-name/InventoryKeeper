import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  VStack,
  Text,
  List,
  ListItem,
  IconButton,
  useColorModeValue,
  Badge,
  Stack,
  Divider,
  Heading,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Input,
  Grid,
  FormControl,
  FormLabel,
  Flex,
  ScaleFade,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useAuth } from "./AuthContext";
import apiBaseUrl from "../config";

const UserLists = () => {
  const [lists, setLists] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const { currentUser } = useAuth();
  const bgColor = useColorModeValue(
    "linear(gray.300 90%, gray.100 200%)",
    "linear(gray.800 90%, gray.700 200%)"
  );

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [selectedListIndex, setSelectedListIndex] = useState(null);
  const [updatedListName, setUpdatedListName] = useState("");
  const [updatedItems, setUpdatedItems] = useState([]);

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

  const selectList = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const generateShareableLink = (userId, listId) => {
    return `${window.location.origin}/viewList/${userId}/${listId}`;
  };

  const handleEditClick = (index) => {
    setSelectedListIndex(index);
    setUpdatedListName(lists);
    setUpdatedItems(lists[index].items);
    onEditOpen();
  };

  const handleUpdateList = () => {};

  const handleDeleteList = (index) => {};

  const handleItemChange = (itemIndex, field, value) => {
    setUpdatedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
      return newItems;
    });
  };

  return (
    <VStack
      spacing={8}
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bgGradient={bgColor}
      w="100%"
      px={[4, 8, 12]}
    >
      <Heading as="h1" size="2xl" mb={6}>
        Your Lists
      </Heading>
      <Flex width="100%" justifyContent="space-between">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
          bg={bgColor}
          maxH="200px"
          overflowY="scroll"
        >
          <VStack alignItems="flex-start" spacing={4}>
            {lists.map((list, index) => (
              <Button
                key={list._id}
                onClick={() => selectList(index)}
                colorScheme={openIndex === index ? "blue" : "gray"}
                variant={"link"}
              >
                {list.listName}
              </Button>
            ))}
          </VStack>
        </Box>
        <Box flex="1" ml={8} maxWidth="100%">
          {lists.map((list, index) => (
            <ScaleFade
              in={openIndex === index}
              key={list._id}
              initialScale={0.7}
            >
              <Box
                p={8}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                bg={bgColor}
                maxW={"xl"}
                display={openIndex === index ? "block" : "none"}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontSize="2xl" fontWeight="bold">
                    {list.listName}
                  </Text>
                </Stack>
                <Divider my={3} />
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
                <Stack direction="row" justifyContent="space-between" mt={4}>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        generateShareableLink(currentUser._id, list._id)
                      );

                      alert("Shareable link copied to clipboard!");
                    }}
                    data-list-id={list._id}
                  >
                    Copy Shareable Link
                  </Button>
                  <Stack direction="row" spacing={2}>
                    <IconButton
                      size="sm"
                      colorScheme="gray"
                      icon={<EditIcon />}
                      onClick={() => handleEditClick(index)}
                    />
                    <IconButton
                      size="sm"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteList(index)}
                    />
                  </Stack>
                </Stack>
              </Box>
            </ScaleFade>
          ))}
        </Box>
      </Flex>
      <AlertDialog isOpen={isEditOpen} onClose={onEditClose} size="lg">
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Edit List</AlertDialogHeader>
          <AlertDialogBody>
            <VStack spacing={4}>
              <Input
                value={updatedListName}
                onChange={(e) => setUpdatedListName(e.target.value)}
                placeholder="List Name"
              />
              {updatedItems.map((item, index) => (
                <Grid templateColumns="1fr 1fr" gap={4} key={index}>
                  <FormControl>
                    <FormLabel>Item {index + 1}</FormLabel>
                    <Input
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      placeholder="Item Name"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Store</FormLabel>
                    <Input
                      value={item.store}
                      onChange={(e) =>
                        handleItemChange(index, "store", e.target.value)
                      }
                      placeholder="Store"
                    />
                  </FormControl>
                </Grid>
              ))}
            </VStack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onEditClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleUpdateList} ml={3}>
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </VStack>
  );
};

export default UserLists;
