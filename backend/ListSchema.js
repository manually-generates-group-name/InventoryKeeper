const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    id: Number,
    items: [
      {
        name: String,
        store: String,
      },
    ],
  });

const List = mongoose.model("List", listSchema);

module.exports = List;