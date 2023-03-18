const express = require("express");
const userModel = require("./models");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/createList', (req, res) => {
  const { id, items } = req.body;

  // Here you can store the list of items in a database or other data store
  // using the provided unique identifier

  console.log(`Received list with ID ${id}:`);
  console.log(items);

  res.status(200).send('List received');
});
// ...
// app.post("/add_user", async (request, response) => {
//     const user = new userModel(request.body);
  
//     try {
//       await user.save();
//       response.send(user);
//     } catch (error) {
//       response.status(500).send(error);
//     }
// });

// // ...
// app.get("/users", async (request, response) => {
//   const users = await userModel.find({});

//   try {
//     response.send(users);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

module.exports = app;