const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  userID: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
