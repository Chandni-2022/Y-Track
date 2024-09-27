const bcryptjs = require("bcryptjs");
const User = require("../models/userModel");

const authUser = async(req, res) => {
    const {email, password} = req.body;

    const validUser = await User.findOne({email})
    if(!validUser) {
        res.status(401).json({message: "Invalid user!"})
        return;
    }
    console.log(password, validUser.password);
    
    const isPasswordMatched = await bcryptjs.compare(password, validUser.password);
    if(!isPasswordMatched) {
        res.status(402).json({messgae: "Password mismatch!"})
        return;
    }
    // If user exists and password matched then...
    res.status(200).json({
        message: "Login successful!",
        _id: validUser._id,
        password: validUser.password,
        email: validUser.email,
        // token: generateToken(validUser._id)
    })
}

module.exports = authUser;