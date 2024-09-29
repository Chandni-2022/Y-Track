const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const validUser = await User.findOne({ email });
  if (!validUser) {
    return res.status(401).json({ message: "Invalid user!" });
  }

  const isPasswordMatched = await bcryptjs.compare(password, validUser.password);
  if (!isPasswordMatched) {
    return res.json({ message: "Password mismatch!" });
  }

  res.status(200).json({
    message: "Login successful!",
    _id: validUser._id,
    email: validUser.email,
    // token: generateToken(validUser._id)
  });
};

module.exports = authUser;
