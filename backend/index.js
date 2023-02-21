const express = require('express');
const cors = require('cors');
const PORT = 3001;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/alex', (req, res) => {
    res.send('Alex API');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
