const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../MODELS/userSchema");

router.use("/signup", (req, res) => {
  const { name, email, phone, age, gender, pwd, userType } = req.body;
  User.find({ email: email })
    .then((result) => {
      if (result.length != 0) {
        return res
          .status(422)
          .json({ message: "User already exists, try with different email" });
      } else if (result.length === 0) {
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          name: name,
          email: email,
          phone: phone,
          age: age,
          gender: gender,
          pwd: pwd,
          userType: userType,
        });
        newUser
          .save()
          .then(() => {
            return res.status(201).json({ message: "New user created" });
          })
          .catch((error) => {
            return res
              .status(500)
              .json({ message: "Failed to create new user", error });
          });
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Server error, not able to signup", error });
    });
});

router.post("/login", (req, res) => {
  const { email, pwd } = req.body;
  User.find({ email: email })
    .then((result) => {
      if (result.length === 0) {
        return res
          .status(404)
          .json({ message: "User doesn't exist, check your email" });
      } else {
        if (result[0].pwd != pwd) {
          return res
            .status(404)
            .json({ messsage: "Wrong Login Credentials, try again" });
        } else {
          const user_id = result[0]._id;
          const jwttoken = jwt.sign(
            { email, user_id },
            process.env.SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res
            .status(201)
            .json({ message: "User login successful", jwttoken });
        }
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Server error, not able to login", error });
    });
});

module.exports = router;
