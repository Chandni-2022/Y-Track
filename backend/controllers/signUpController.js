const bcryptjs = require('bcryptjs')
const User = require('../models/userModel');


const registerUser = async (req, res) => {
  const { username, email, password,role } = req.body;
  
  const userExists = await User.findOne({email})
  if(userExists) {
    res.json({ message: "User already exists!" })
    return;
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({username, email, password: hashedPassword,role})
  if(newUser) {
    res.status(201).json({
        message: "User created successfully!",
        _id: newUser._id,
        name: newUser.username,
        email: newUser.email,
        role: newUser.role
        // token: generateToken(newUser._id)
    })
  } else {
    res.status(400).json({message: "Registration failed!"})
    return;
  }
 
};

const hashPassword = async(password) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
}

module.exports = {registerUser, hashPassword};