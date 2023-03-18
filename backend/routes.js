const express = require("express");
const List = require("./ListSchema");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/createList', (req, res) => {
  const { id, items } = req.body;

  const list = new List({
    id,
    items,
  });

  list.save((err, savedList) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving list to database');
    } else {
      res.send(savedList);
    }
  });
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