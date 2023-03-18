import React, { useState } from 'react';
import axios from 'axios';

const CreateList = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [store, setStore] = useState('');

  const addItem = () => {
    setItems([...items, { name, store }]);
    setName('');
    setStore('');
  };

  const submitList = () => {
    axios.post('http://localhost:3001/createList', {
      id: Date.now(),
      items,
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <h1>Create a List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.store}
          </li>
        ))}
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
        <button onClick={addItem}>Add Item</button>
      </div>
      <button onClick={submitList}>Submit List</button>
    </div>
  );
};

export default CreateList;
