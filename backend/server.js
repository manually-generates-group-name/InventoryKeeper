const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();

const username = "amora7741";
const password = "fhgHhhfZYzfMWhYA";
const cluster = "cluster0.nyreuwv";
const dbname = "test";

const db = mongoose.connection;

app.use(express.json());

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
  }
);

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});