import React, { useEffect, useState, useCallback } from "react";
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
  FormControl,
  FormLabel,
  ScaleFade,
  useToast,
  HStack,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  AddIcon,
  LinkIcon,
  ChevronDownIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { useAuth } from "./AuthContext";
import apiBaseUrl from "../config";

const ListItemComponent = ({
  listId,
  item,
  itemIndex,
  handleCheckboxChange,
}) => {
  const itemKey = `${listId}-${item.store}-${item.name}-${itemIndex}`;

  return (
    <ListItem key={itemKey} maxW="100%">
      <HStack>
        <Box flex="1">
          <Text textDecoration={item.purchased ? "line-through" : "none"}>
            <Badge colorScheme="blue" fontSize="0.8em" mr={2}>
              {item.store}
            </Badge>
            {item.name}
          </Text>
        </Box>
        <Checkbox
          paddingRight={7}
          isChecked={item.purchased}
          onChange={(e) => handleCheckboxChange(itemIndex, e.target.checked)}
        />
      </HStack>
    </ListItem>
  );
};

const UserLists = () => {
  const [lists, setLists] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const { currentUser } = useAuth();
  const bgColor = useColorModeValue("gray.300", "gray.800");
  const isMobileView = useBreakpointValue({ base: true, md: false });

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const [selectedListIndex, setSelectedListIndex] = useState(null);
  const [updatedListName, setUpdatedListName] = useState("");
  const [updatedItems, setUpdatedItems] = useState([]);
  const [groupedItems, setGroupedItems] = useState({});
  const [selectedStore, setSelectedStore] = useState(null);

  const toast = useToast();

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
      setSelectedStore(null);
    }
  };

  const selectGroupedList = (store) => {
    setSelectedStore(store);
    setOpenIndex(null);
  };

  const generateShareableLink = (userId, listId) => {
    return `${window.location.origin}/viewList/${userId}/${listId}`;
  };

  const handleEditClick = (index) => {
    setSelectedListIndex(index);
    setUpdatedListName(lists[index].listName);
    setUpdatedItems(lists[index].items);
    onEditOpen();
  };

  const handleUpdateList = () => {
    if (!updatedListName.trim() || updatedItems.length === 0) {
      toast({
        title: "Please fill in all fields!",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      return;
    }

    const updatedList = {
      ...lists[selectedListIndex],
      listName: updatedListName,
      items: updatedItems,
      user: currentUser._id,
    };

    axios
      .put(`${apiBaseUrl}/updateListAPI`, updatedList)
      .then((response) => {
        const newLists = [...lists];
        newLists[selectedListIndex] = response.data;
        setLists(newLists);
        toast({
          title: "List Updated Successfully!",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        onEditClose();
      })
      .catch((error) => {
        toast({
          title: "Error updating list. Please try again!",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
        console.error(error);
      });
  };

  const handleDeleteList = (listrm) => {
    axios
      .delete(`${apiBaseUrl}/deleteListAPI`, {
        data: { _id: listrm._id, user: currentUser._id },
      })
      .then((response) => {
        setLists(lists.filter((list) => list._id !== listrm._id));
        toast({
          title: `List "${listrm.listName}" Removed Successfully!`,
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Error deleting list. Please try again!",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
        console.error(error);
      });
  };

  const handleItemChange = (itemIndex, field, value) => {
    setUpdatedItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
      return newItems;
    });
  };

  const handleDeleteItem = (itemIndex) => {
    setUpdatedItems((prevItems) =>
      prevItems.filter((_, index) => index !== itemIndex)
    );
  };

  const handleAddItem = () => {
    setUpdatedItems((prevItems) => [...prevItems, { name: "", store: "" }]);
  };

  const handleCheckboxChange = (itemIndex, isChecked) => {
    const updatedList = { ...lists[openIndex] };
    updatedList.items[itemIndex].purchased = isChecked;

    axios
      .put(`${apiBaseUrl}/updatePurchasedAPI`, updatedList)
      .then((response) => {
        const newLists = [...lists];
        newLists[openIndex] = response.data;
        setLists(newLists);
      })
      .catch((error) => {
        toast({
          title: "Item could not be updated.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
        console.error(error);
      });
  };

  const groupItemsByStore = useCallback(() => {
    const itemsByStore = {};
    lists.forEach((list) => {
      list.items.forEach((item) => {
        if (!itemsByStore[item.store]) {
          itemsByStore[item.store] = [];
        }
        itemsByStore[item.store].push({ ...item, listId: list._id });
      });
    });
    return itemsByStore;
  }, [lists]);

  useEffect(() => {
    const itemsByStore = groupItemsByStore();
    setGroupedItems(itemsByStore);
  }, [lists, groupItemsByStore]);

  const generateUniqueIndex = (groupedItems, selectedStore, currentItem) => {
    let uniqueIndex = 0;
    for (const item of groupedItems[selectedStore]) {
      if (item.name === currentItem.name && item.store === currentItem.store) {
        uniqueIndex++;
      }
    }
    return uniqueIndex;
  };

  const handleGroupedCheckboxChange = (itemIndex, isChecked) => {
    const updatedGroupedItems = { ...groupedItems };
    updatedGroupedItems[selectedStore][itemIndex].purchased = isChecked;

    const targetItem = updatedGroupedItems[selectedStore][itemIndex];

    const updatedLists = lists.map((list) => {
      const updatedItems = list.items.map((item) => {
        if (
          item.name === targetItem.name &&
          item.store === targetItem.store &&
          list._id === targetItem.listId
        ) {
          return { ...item, purchased: isChecked };
        }
        return item;
      });
      return { ...list, items: updatedItems };
    });
    setLists(updatedLists);
  };

  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
    document.body.removeChild(textarea);
  }

  return (
    <>
      <AlertDialog
        isOpen={isEditOpen}
        onClose={onEditClose}
        size={isMobileView ? "sm" : "lg"}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent bg={bgColor}>
          <AlertDialogHeader>Edit List</AlertDialogHeader>
          <Divider mb={5} />
          <AlertDialogBody>
            <Box height="400px" overflowY="auto">
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>List Name</FormLabel>
                  <Input
                    value={updatedListName}
                    onChange={(e) => setUpdatedListName(e.target.value)}
                    placeholder="List Name"
                  />
                </FormControl>
                {updatedItems.map((item, index) => (
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    spacing={8}
                  >
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
                    <Box>
                      <IconButton
                        mt={8}
                        size="sm"
                        colorScheme="red"
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteItem(index)}
                      />
                    </Box>
                  </Stack>
                ))}
                <Box>
                  <Button
                    mt={5}
                    size="sm"
                    colorScheme="blue"
                    leftIcon={<AddIcon />}
                    onClick={handleAddItem}
                  >
                    Add Item
                  </Button>
                </Box>
              </VStack>
            </Box>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onEditClose} colorScheme="gray">
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleUpdateList} ml={3}>
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Box minH="100vh" bg={bgColor} paddingTop={150} paddingBottom={20}>
        <VStack
          spacing={8}
          alignItems="center"
          justifyContent="center"
          bg={bgColor}
          w="100%"
          px={[4, 8, 12]}
        >
          <HStack>
            <Heading
              as="h1"
              size="2xl"
              mb={isMobileView ? 0 : 3}
              ml={isMobileView ? 2 : 10}
            >
              Your Lists
            </Heading>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<ChevronDownIcon />}
                colorScheme="gray"
              />
              <MenuList>
                {lists.map((list, index) => (
                  <MenuItem key={list._id} onClick={() => selectList(index)}>
                    {list.listName}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<HamburgerIcon />}
                colorScheme="blue"
              >
                Sort
              </MenuButton>
              <MenuList>
                {Object.keys(groupedItems).map((store) => (
                  <MenuItem
                    key={store}
                    onClick={() => selectGroupedList(store)}
                  >
                    {store}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </HStack>
          {selectedStore && (
            <Box
              p={8}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              bg={bgColor}
              w={isMobileView ? "xs" : "lg"}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize="2xl" fontWeight="bold">
                  {selectedStore} Trip
                </Text>
              </Stack>
              <Divider my={3} />
              <Flex justifyContent="right">
                <Text as="i">Purchased?</Text>
              </Flex>
              <Box>
                <List spacing={3} mt={4}>
                  {groupedItems[selectedStore].map((item, index) => {
                    const listId = lists.find((list) =>
                      list.items.some(
                        (listItem) =>
                          listItem.name === item.name &&
                          listItem.store === item.store
                      )
                    )._id;
                    const uniqueIndex = generateUniqueIndex(
                      groupedItems,
                      selectedStore,
                      item
                    );
                    return (
                      <ListItemComponent
                        key={`${listId}-${uniqueIndex}`}
                        listId={listId}
                        item={item}
                        itemIndex={index}
                        handleCheckboxChange={handleGroupedCheckboxChange}
                      />
                    );
                  })}
                </List>
              </Box>
            </Box>
          )}

          <HStack justifyContent={"center"} alignItems={"center"}>
            <Box flex="1" maxWidth="100%">
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
                    w={isMobileView ? "xs" : "lg"}
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
                    <Flex justifyContent="right">
                      <Text as="i">Purchased?</Text>
                    </Flex>
                    <Box>
                      <List spacing={3} mt={4}>
                        {list.items.map((item, itemIndex) => (
                          <ListItemComponent
                            key={`${list._id}-${itemIndex}`}
                            listId={list._id}
                            item={item}
                            itemIndex={itemIndex}
                            handleCheckboxChange={handleCheckboxChange}
                          />
                        ))}
                      </List>
                    </Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      mt={4}
                    >
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => {
                          copyToClipboard(
                            generateShareableLink(currentUser._id, list._id)
                          );

                          toast({
                            title: "Shareable link copied to clipboard!",
                            status: "success",
                            duration: 1500,
                            isClosable: true,
                          });
                        }}
                        data-list-id={list._id}
                      >
                        {isMobileView ? <LinkIcon /> : "Copy Shareable Link"}
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
                          onClick={() => handleDeleteList(list)}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                </ScaleFade>
              ))}
            </Box>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default UserLists;
