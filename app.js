require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./Routes/userRoutes");
const Tweets = require("./Routes/tweetRoutes");

require("./DB/conn");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Response from /" });
});

app.use("/user", User);
app.use("/tweets",Tweets);

module.exports = app;
