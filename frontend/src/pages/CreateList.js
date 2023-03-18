import React, { useState } from 'react';
import axios from 'axios';

const CreateList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editMode, setEditMode] = useState(false);

  const addItem = () => {
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
      alert('List Created Successfully!');
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <h1>Create a List</h1>
      <ul>
        {items.map((item, index) => {
          if (item !== null) {
            return (
              <li key={index}>
                <span>{item.name} - {item.store}</span>
                <button onClick={() => {
                  setName(item.name);
                  setStore(item.store);
                  setEditMode(true);
                  setEditIndex(index);
                }}>Edit</button>
                <button onClick={() => deleteItem(index)}>Delete</button>
              </li>
            )
          }
        })}
      </ul>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
        />
        <input
          type="text"
          value={store}
          onChange={(e) => setStore(e.target.value)}
          placeholder="Store"
        />
        <button onClick={addItem}>{editMode ? 'Update Item' : 'Add Item'}</button>
        {editMode && (
          <button onClick={() => {
            setName('');
            setStore('');
            setEditMode(false);
            setEditIndex(-1);
          }}>Cancel Edit</button>
        )}
      </div>
      <button onClick={submitList}>Submit List</button>
    </div>
  );
};

export default CreateList;
