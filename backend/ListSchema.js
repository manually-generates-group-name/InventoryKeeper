const mongoose = require("mongoose");
const { Schema } = mongoose;

const listSchema = new Schema({
  listName: String,
  items: [
    {
      name: String,
      store: String,
      purchased: { type: Boolean, default: false },
    },
  ],
  user: String,
});

const List = mongoose.model("List", listSchema);

module.exports = List;
