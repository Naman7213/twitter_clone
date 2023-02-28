const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const Tweet = require("../MODELS/tweetSchema");

router.post("/posttweet", (req, res) => {
  const { user_name, content, createdAt, likeCount } = req.body;
  const token = req.headers.authorization;
  const get_token = token.split(" ");
  const my_token = get_token[1];
  const is_user_verified = jwt.verify(my_token, process.env.SECRET_KEY);
  if (is_user_verified.usertype === 2) {
    return res.status(300).json({ message: "You are not registered user" });
  } else if (is_user_verified) {
    const newTweet = new Tweet({
      _id: new mongoose.Types.ObjectId(),
      user_id: is_user_verified.user_id,
      email: is_user_verified.email,
      user_name: user_name,
      content: content,
    });
    newTweet
      .save()
      .then(() => {
        return res.status(201).json({ message: "Tweet Created" });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error, can't post tweet", error });
      });
  } else {
    return res.status(401).json({ message: "Unauthorized user, please login" });
  }
});

router.get("/gettweets", (req, res) => {
  Tweet.find()
    .then((result) => {
      return res.status(200).json({ message: result });
      p;
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Server error, please try after some time", error });
    });
});

router.patch("/updatetweet", (req, res) => {
  const { tweetid, email, content } = req.body;
  const token = req.headers.authorization;
  const get_token = token.split(" ");
  const my_token = get_token[1];
  const is_user_verified = jwt.verify(my_token, process.env.SECRET_KEY);
  if (is_user_verified && is_user_verified.usertype === 1) {
    Tweet.find({ tweetid: tweetid })
      .then((result) => {
        if (email === result[0].email) {
          const updateTweet = {
            _id: result[0]._id,
            content: content,
          };
          Tweet.findByIdAndUpdate(result[0]._id, updateTweet)
            .then(() => {
              return res.status(204).json({ message: "Updation Successful" });
            })
            .catch((error) => {
              return res
                .status(500)
                .json({ message: "Can't update tweet", error });
            });
        } else {
          return res.status(300).json({ message: "You can't edit the tweet" });
        }
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error, can't update", error });
      });
  } else {
    return res.status(300).json({ message: "User is not verified" });
  }
});

router.delete("/deletetweet/:_id", (req, res) => {
  const tweetid = req.params._id;
  const token = req.headers.authorization;
  const get_token = token.split(" ");
  const my_token = get_token[1];
  const is_user_verified = jwt.verify(my_token, process.env.SECRET_KEY);
  if (
    is_user_verified &&
    (is_user_verified.usertype === 1 || is_user_verified.usertype === 3)
  ) {
    Tweet.findOne({ tweetid: tweetid })
      .then((result) => {
        Tweet.findByIdAndDelete(tweetid)
          .then(() => {
            return res
              .status(200)
              .json({ message: "Tweet deleted successfully" });
          })
          .catch((error) => {
            return res
              .status(500)
              .json({ message: "Server error, can't delete", error });
          });
      })
      .catch((error) => {
        return res.status(500).json({ message: "Tweet Not Found", error });
      });
  } else {
    return res.status(300).json({ message: "User is not verified" });
  }
});

module.exports = router;
