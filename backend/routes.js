const express = require("express");
const List = require("./ListSchema");
const User = require("./UserSchema");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors");

router.use(bodyParser.json());
router.use(cors());

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://main.d2lvy99qjveg79.amplifyapp.com"
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.post("/createListAPI", (req, res, next) => {
  const { id, listName, items, user } = req.body;

  const list = new List({
    id,
    listName,
    items,
    user,
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

router.post("/signUpAPI", (req, res, next) => {
  const { firstName, lastName, email, username, password, userID } = req.body;

  const user = new User({
    firstName,
    lastName,
    email,
    username,
    password,
    userID,
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

router.post("/checkUserAPI", async (req, res, next) => {
  const { username, email } = req.body;
  const user = await User.findOne({ $or: [{ username }, { email }] });
  res.json({ exist: !!user });
});

router.get("/existingUserAPI", async (req, res, next) => {
  const username = req.query.username;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.send(user);
});

module.exports = router;
