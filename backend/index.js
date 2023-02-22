const express = require('express');
const cors = require('cors');
const PORT = 3001;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
