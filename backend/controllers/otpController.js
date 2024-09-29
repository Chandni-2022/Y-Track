const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');



// Send OTP
const sendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpires = Date.now() + 300000; // OTP expires in 5 minutes

    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, otp, otpExpires });
        } else {
            user.otp = otp;
            user.otpExpires = otpExpires;
        }

        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Failed to send OTP', error: error.message });
            }
            res.status(200).json({ message: 'OTP sent successfully!' });
        });

    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
};

// Verify OTP
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (Date.now() > user.otpExpires) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        if (user.otp.toString() !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // OTP verified successfully, you may mark user as verified or move to reset password
        res.status(200).json({ message: 'OTP verified successfully!' });

        // Clear the OTP from the user data
        user.otp = null;
        user.otpExpires = null;
        await user.save();

    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();
        res.status(200).json({ message: 'Password successfully reset' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to reset password', error: error.message });
    }
};

module.exports = { sendOtp, verifyOtp, resetPassword };
