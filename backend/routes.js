const express = require("express");
const List = require("./ListSchema");
const User = require("./UserSchema");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());

router.post("/createListAPI", (req, res) => {
  const { id, listName, items } = req.body;

  const list = new List({
    id,
    listName,
    items,
  });

  list.save((err, savedList) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving list to database");
    } else {
      res.send(savedList);
    }
  });
});

router.post("/signUpAPI", (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  const user = new User({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  user.save((err, savedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving user to database");
    } else {
      res.send(savedUser);
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

module.exports = router;
