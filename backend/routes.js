const express = require("express");
const List = require("./ListSchema");
const User = require("./UserSchema");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors");

router.use(bodyParser.json());
router.use(cors());

router.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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

router.get("/getListsAPI", (req, res) => {
  const { user } = req.query;

  List.find({ user }, (err, lists) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error fetching lists" });
    } else {
      res.status(200).json(lists);
    }
  });
});

router.get("/getListById", async (req, res) => {
  try {
    const { userId, listId } = req.query;

    const list = await List.findOne({ _id: listId, user: userId });

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/deleteListAPI", async (req, res) => {
  const { _id, user } = req.body;

  try {
    const list = await List.findOne({ _id, user });

    if (!list) {
      return res
        .status(404)
        .json({ error: "List not found or not authorized" });
    }

    await List.deleteOne({ _id, user });

    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/updateListAPI", async (req, res) => {
  try {
    const { _id, listName, items, user } = req.body;

    const updatedList = await List.findByIdAndUpdate(
      { _id, user },
      { listName, items },
      { new: true }
    );

    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json(updatedList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating list" });
  }
});

router.put("/updatePurchasedAPI", async (req, res) => {
  try {
    const { _id, items, user } = req.body;

    const updatedList = await List.findByIdAndUpdate(
      { _id, user },
      { items },
      { new: true }
    );

    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json(updatedList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
