const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: mongoose.Schema.Types.String,
  email: mongoose.Schema.Types.String,
  phone: mongoose.Schema.Types.Number,
  age: mongoose.Schema.Types.Number,
  gender: mongoose.Schema.Types.String,
  pwd: mongoose.Schema.Types.String,
  userType: mongoose.Schema.Types.Number,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
