const dotenv = require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
  
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});