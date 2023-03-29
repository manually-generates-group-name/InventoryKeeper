const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  id: Number,
  listName: String,
  items: [
    {
      name: String,
      store: String,
    },
  ],
});

const List = mongoose.model("List", listSchema);

module.exports = List;
