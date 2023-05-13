import React, { useState, useEffect } from "react";
import { EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
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
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";

/**
 * This allows the user to create new lists and add them into the database.
 * Functions inside:
 * - handleListNameChange
 * - toggleListTitleEditMode
 * - closeAlertDialog
 * - openEditModal
 * - updateItem
 * - addItem
 * - deleteItem
 * - submitList
 */
const CreateList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [store, setStore] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCircularProgress, setShowCircularProgress] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [listTitleEditMode, setListTitleEditMode] = useState(false);
  const [tempListName, setTempListName] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const { currentUser } = useAuth();
  const toast = useToast();

  const bgColor = useColorModeValue("gray.300", "gray.800");
  const cancelBGColor = useColorModeValue("gray.400", "gray.600");
  const iconColor = useColorModeValue("gray.300", "gray.600");

  const buttonTextColor = useColorModeValue("white", "white");
  const placeholderColor = useColorModeValue("gray.500", "whiteAlpha.700");
  const isMobileView = useBreakpointValue({ base: true, md: false });

  /**
  * Changes the name of the list.
  */
  const handleListNameChange = (e) => {
    setListName(e.target.value);
  };

  /**
  * A layout to handle changing the list title.
  */
  const toggleListTitleEditMode = () => {
    setListTitleEditMode(!listTitleEditMode);
  };

  /**
  * Close the popup dialogue and set the list name.
  */
  const closeAlertDialog = () => {
    setListName(tempListName);
    setIsAlertDialogOpen(false);
  };

  /**
  * Enter a screen where editing items within the list is done.
  */
  const openEditModal = (item, index) => {
    setEditedItem({ ...item, index });
    setName(item.name);
    setStore(item.store);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    setIsAlertDialogOpen(true);
  }, []);

  /**
  * Handle updating an item into the list and verify the input.
  * It will require both an item name and a store to proceed.
  */
  const updateItem = () => {
    if (!name.trim() || !store.trim()) {
      toast({
        title: "Error",
        description: "Please enter both an item name and a store!",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }

    if (editedItem) {
      items[editedItem.index] = { name, store };
      setEditedItem(null);
    }

    setName("");
    setStore("");
    setIsEditModalOpen(false);
  };

  /**
  * Handle adding a new item into the list and verify the input.
  * It will require both an item name and a store to proceed.
  */
  const addItem = () => {
    if (!name.trim() || !store.trim()) {
      toast({
        title: "Error",
        description: "Please enter both an item name and a store!",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }
    setItems([...items, { name, store }]);
    setName("");
    setStore("");
  };

  /**
  * Handle deleting a new item from the list. Will remove the item at the given index.
  */
  const deleteItem = (index) => {
    const newItems = [...items];
    newItems[index] = null;
    setItems(newItems);
  };

  /**
  * Store the full list. Will require a name and at least one item to proceed.
  */
  const submitList = async () => {
    const filteredItems = items.filter((item) => item !== null);

    if (filteredItems.length === 0) {
      toast({
        title: "Error",
        description: "Pleaet add at least one item to this list!",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }

    if (!listName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for this list!",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
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
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg={bgColor} width={isMobileView ? "70%" : "100%"}>
          <ModalHeader>Edit Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Item Name"
              value={name}
              sx={{ "::placeholder": { color: placeholderColor } }}
              onChange={(e) => setName(e.target.value)}
              isRequired
            />
            <Input
              placeholder="Store"
              value={store}
              sx={{ "::placeholder": { color: placeholderColor } }}
              onChange={(e) => setStore(e.target.value)}
              isRequired
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updateItem}>
              Update
            </Button>
            <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isAlertDialogOpen} onClose={closeAlertDialog} isCentered>
        <ModalOverlay />
        <ModalContent bg={bgColor} width={isMobileView ? "70%" : "100%"}>
          <ModalHeader>Enter List Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="List Name"
              value={tempListName}
              sx={{ "::placeholder": { color: placeholderColor } }}
              onChange={(e) => setTempListName(e.target.value)}
              isRequired
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeAlertDialog}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
      <Box minHeight={"100vh"} bg={bgColor} paddingTop={150} paddingBottom={20}>
        <VStack
          spacing={8}
          alignItems="center"
          justifyContent="center"
          width={"100%"}
          bg={bgColor}
        >
          {listTitleEditMode ? (
            <Flex>
              <Input
                value={listName}
                onChange={handleListNameChange}
                sx={{ "::placeholder": { color: placeholderColor } }}
                isRequired
              />
              <Button
                ml={2}
                colorScheme="green"
                onClick={toggleListTitleEditMode}
              >
                <CheckIcon />
              </Button>
            </Flex>
          ) : (
            <Heading ml={10}>
              {listName}
              <Button
                ml={2}
                bgColor={iconColor}
                size="sm"
                _hover={{ bgColor: "gray.400" }}
                onClick={toggleListTitleEditMode}
              >
                <EditIcon />
              </Button>
            </Heading>
          )}
          <Box
            maxW={isMobileView ? "sm" : "lg"}
            mx="auto"
            mt={20}
            p={isMobileView ? 5 : 10}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
          >
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
                          openEditModal(item, index);
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
      </Box>
    </>
  );
};

export default CreateList;
