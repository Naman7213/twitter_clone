const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: mongoose.Schema.Types.String,
  username: mongoose.Schema.Types.String,
  content: mongoose.Schema.Types.String,
  createdAt: mongoose.Schema.Types.Date,
  likeCount: mongoose.Schema.Types.Number,
});

const Tweet = new mongoose.model("tweets", tweetSchema);
