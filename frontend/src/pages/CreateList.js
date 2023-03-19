import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Input, Heading, Box, List, ListItem, Flex, Center } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';

const CreateList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editMode, setEditMode] = useState(false);

  const addItem = () => {
    if (!name || !store) {
      toast.error('Please enter both an item and a store.');
      return;
    }
    
    if (editMode && editIndex !== -1) {
      items[editIndex] = { name, store };
      setEditMode(false);
      setEditIndex(-1);
    } else {
      setItems([...items, { name, store }]);
    }
    setName('');
    setStore('');
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems[index] = null;
    setItems(newItems);
  }

  const submitList = () => {
    const filteredItems = items.filter(item => item !== null);
    axios.post('http://localhost:3001/createList', {
      id: Date.now(),
      items: filteredItems,
    })
    .then(response => {
      console.log(response);
      toast.success("List submitted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <ChakraProvider>
      <Box maxW="lg" mx="auto" my={10} p={5} borderWidth="1px" borderRadius="lg" boxShadow="md">
        <Toaster />
        <Heading as="h1" size="lg" mb={5} textAlign='center'>Create a List</Heading>
        <List spacing={3}>
          {items.map((item, index) => {
            if (item !== null) {
              return (
                <ListItem key={index} display="flex" alignItems="center">
                  <Box flex="1">
                    <Flex>
                      <Box fontWeight="bold">{item.name}</Box>
                      <Box ml={2} color="gray.500">- {item.store}</Box>
                    </Flex>
                  </Box>
                  <Button size="sm" mr={2} onClick={() => {
                    setName(item.name);
                    setStore(item.store);
                    setEditMode(true);
                    setEditIndex(index);
                  }}>Edit</Button>
                  <Button size="sm" colorScheme="red" onClick={() => deleteItem(index)}>Delete</Button>
                </ListItem>
              )
            }
          })}
        </List>
        <Flex mt={10}>
          <Input mr={2} flex="1" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input mr={2} flex="1" placeholder="Store" value={store} onChange={(e) => setStore(e.target.value)} />
          <Button mr={2} colorScheme="green" onClick={addItem}>{editMode ? 'Update Item' : 'Add Item'}</Button>
          {editMode && (
            <Button onClick={() => {
              setName('');
              setStore('');
              setEditMode(false);
              setEditIndex(-1);
            }}>Cancel</Button>
          )}
        </Flex>
        <Center>
          <Button mt={10} colorScheme="blue" onClick={submitList}>Submit List</Button>
        </Center>
      </Box>
    </ChakraProvider>
  );
};

export default CreateList;