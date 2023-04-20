const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema({
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
