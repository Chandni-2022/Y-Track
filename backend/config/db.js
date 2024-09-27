const mongoose = require("mongoose");

const connectToDB = () => {
    mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
}

module.exports = connectToDB;