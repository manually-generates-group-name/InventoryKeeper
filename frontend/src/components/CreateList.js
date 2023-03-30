import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
  Button,
  Input,
  Heading,
  Box,
  List,
  ListItem,
  Flex,
  Center,
  ChakraProvider,
  useColorModeValue,
} from "@chakra-ui/react";

const CreateList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editMode, setEditMode] = useState(false);
  const [listName, setListName] = useState("");

  const submitBgColor = useColorModeValue("blue.500", "blue.500");
  const addBgColor = useColorModeValue("green.500", "green.500");
  const deleteBgColor = useColorModeValue("red.600", "red.600");
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

  const submitList = () => {
    const filteredItems = items.filter((item) => item !== null);

    if (filteredItems.length === 0) {
      toast.error("Please add at least one item to the list.");
      return;
    }

    if (!listName.trim()) {
      toast.error("Please enter a name for the list.");
      return;
    }

    axios
      .post("http://localhost:3001/createList", {
        id: Date.now(),
        listName: listName,
        items: filteredItems,
      })
      .then((response) => {
        console.log(response);
        toast.success("List submitted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ChakraProvider>
      <Box
        maxW="lg"
        mx="auto"
        my={20}
        p={10}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
      >
        <Toaster />
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
          <Button
            mr={{ base: 2, md: 0 }}
            bgColor={addBgColor}
            color={buttonTextColor}
            colorScheme="green"
            onClick={addItem}
          >
            {editMode ? "Update" : "Add Item"}
          </Button>
          {editMode && (
            <Button
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
                  <Button
                    size="sm"
                    colorScheme="red"
                    bgColor={deleteBgColor}
                    color={buttonTextColor}
                    onClick={() => deleteItem(index)}
                  >
                    <DeleteIcon />
                  </Button>
                </ListItem>
              );
            }
          })}
        </List>
        <Center>
          <Button
            colorScheme="blue"
            bgColor={submitBgColor}
            color={buttonTextColor}
            onClick={submitList}
            width={450}
          >
            Submit List
          </Button>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

export default CreateList;
