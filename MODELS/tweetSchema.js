const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId,
  email: mongoose.Schema.Types.String,
  user_name: mongoose.Schema.Types.String,
  content: mongoose.Schema.Types.String,
  createdAt: mongoose.Schema.Types.Date,
  likeCOunt: mongoose.Schema.Types.Number,
});

const Tweet = new mongoose.model("tweets", tweetSchema);
module.exports = Tweet;
