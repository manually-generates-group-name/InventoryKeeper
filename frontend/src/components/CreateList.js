import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useAuth } from "./AuthContext";
import axios from "axios";
import apiBaseUrl from "../config";
import {
  Button,
  Input,
  Box,
  List,
  ListItem,
  Flex,
  Center,
  useColorModeValue,
  LightMode,
  Spinner,
  VStack,
  Text,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  useToast,
} from "@chakra-ui/react";

const CreateList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editMode, setEditMode] = useState(false);
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCircularProgress, setShowCircularProgress] = useState(false);

  const { currentUser } = useAuth();
  const toast = useToast();

  const bgColor = useColorModeValue(
    "linear(gray.300 90%, gray.100 200%)",
    "linear(gray.800 90%, gray.700 200%)"
  );
  const cancelBGColor = useColorModeValue("gray.400", "gray.600");
  const iconColor = useColorModeValue("gray.200", "gray.600");

  const buttonTextColor = useColorModeValue("white", "white");
  const placeholderColor = useColorModeValue("gray.500", "whiteAlpha.700");

  const addItem = () => {
    if (!name.trim() || !store.trim()) {
      toast.error("Please enter both an item and a store.");
      return;
    }

    if (editMode && editIndex !== -1) {
      items[editIndex] = { name, store };
      setEditMode(false);
      setEditIndex(-1);
    } else {
      setItems([...items, { name, store }]);
    }
    setName("");
    setStore("");
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems[index] = null;
    setItems(newItems);
  };

  const submitList = async () => {
    const filteredItems = items.filter((item) => item !== null);

    if (filteredItems.length === 0) {
      toast.error("Please add at least one item to the list.");
      return;
    }

    if (!listName.trim()) {
      toast.error("Please enter a name for the list.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${apiBaseUrl}/createListAPI`, {
        listName: listName,
        items: filteredItems,
        user: currentUser._id,
      });

      console.log(response);
      toast({
        title: "Success",
        description: "List submitted successfully!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });

      setLoading(false);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "The list was not submitted! Please try again.",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      console.error(error);
      setLoading(false);
      return;
    }

    setShowCircularProgress(true);

    setTimeout(() => {
      setShowCircularProgress(false);
      window.location.href = "/";
    }, 1000);
  };

  return (
    <>
      <Modal
        isOpen={showCircularProgress}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ModalContent
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            boxShadow="none"
            bg="transparent"
          >
            <CircularProgress isIndeterminate color="blue.400" />
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <VStack
        spacing={8}
        alignItems="center"
        justifyContent="center"
        minH="50vh"
        bgGradient={bgColor}
      >
        <Box
          maxW="lg"
          mx="auto"
          mt={20}
          p={10}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
        >
          <Toaster
            toastOptions={{
              position: "bottom-center",
              success: {
                style: {
                  background: "green",
                  color: "white",
                },
              },
              error: {
                style: {
                  background: "red",
                  color: "white",
                },
              },
            }}
          />
          <Input
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            mb={5}
            placeholder="Enter List Name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            sx={{ "::placeholder": { color: placeholderColor } }}
            isRequired
          />
          <Flex mt={10} mb={10}>
            <Input
              mr={2}
              flex="1"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ "::placeholder": { color: placeholderColor } }}
            />
            <Input
              mr={2}
              flex="1"
              placeholder="Store"
              value={store}
              onChange={(e) => setStore(e.target.value)}
              sx={{ "::placeholder": { color: placeholderColor } }}
            />
            <LightMode>
              <Button
                mr={{ base: 2, md: 0 }}
                color={buttonTextColor}
                colorScheme="green"
                onClick={addItem}
              >
                {editMode ? "Update" : "Add Item"}
              </Button>
            </LightMode>
            {editMode && (
              <Button
                ml={1}
                _hover={{ bgColor: "gray.500" }}
                color={buttonTextColor}
                bgColor={cancelBGColor}
                onClick={() => {
                  setName("");
                  setStore("");
                  setEditMode(false);
                  setEditIndex(-1);
                }}
              >
                Cancel
              </Button>
            )}
          </Flex>
          <List spacing={3} mb={10}>
            {items.map((item, index) => {
              if (item !== null) {
                return (
                  <ListItem key={index} display="flex" alignItems="center">
                    <Box flex="1">
                      <Flex>
                        <Box fontWeight="bold">{item.name}</Box>
                        <Box ml={2} color="gray.500">
                          - {item.store}
                        </Box>
                      </Flex>
                    </Box>
                    <Button
                      bgColor={iconColor}
                      size="sm"
                      mr={2}
                      _hover={{ bgColor: "gray.400" }}
                      onClick={() => {
                        setName(item.name);
                        setStore(item.store);
                        setEditMode(true);
                        setEditIndex(index);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <LightMode>
                      <Button
                        size="sm"
                        colorScheme="red"
                        color={buttonTextColor}
                        onClick={() => deleteItem(index)}
                      >
                        <DeleteIcon />
                      </Button>
                    </LightMode>
                  </ListItem>
                );
              }
              return null;
            })}
          </List>
          <Center>
            <LightMode>
              <Button
                colorScheme="blue"
                color={buttonTextColor}
                onClick={submitList}
                width={450}
                isDisabled={loading}
                isLoading={loading}
                loadingText="Submitting..."
              >
                {loading ? <Spinner size="sm" /> : "Submit List"}
              </Button>
            </LightMode>
          </Center>
        </Box>
      </VStack>
      <VStack
        spacing={8}
        alignItems="center"
        justifyContent="center"
        minH="50vh"
        bgGradient={bgColor}
      >
        <Box>
          <Text fontSize="6xl">Placeholder</Text>
        </Box>
      </VStack>
    </>
  );
};

export default CreateList;
