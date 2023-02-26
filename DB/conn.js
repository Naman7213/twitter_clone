const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

mongoose.set('strictQuery', true);
mongoose
  .connect(url)
  .then(() => {
    console.log("Connection with database successful");
  })
  .catch((error) => {
    console.log(error);
  });
