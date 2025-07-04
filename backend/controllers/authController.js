const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const crypto = require('crypto');

const nodemailer = require('nodemailer');



// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register controller
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('Email already exists:', email);
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({
      username,
      email,
      password,
      role,
    });
  
    // console.log(' User registered:', email);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    // console.error('Register error:', err.message);
    res.status(500).json({ message: err.message });
  }
};



// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log('Email not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // console.log('Login successful for:', user.email);

    res.json({
      token: generateToken(user),
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: err.message });
  }
};


exports.logoutUser = async (req, res) => {
  // Just a dummy logout endpoint, usually not needed with JWT
  return res.status(200).json({ message: 'Logout successful' });
};



//forget password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');
    const tokenExpiry = Date.now() + 3600000;

    await User.updateOne(
      { _id: user._id },
      { resetToken: token, resetTokenExpiry: tokenExpiry }
    );

    // console.log("EMAIL_USER:", process.env.EMAIL_USER);
    // console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink = `https://ticketbooking-frontend.onrender.com/reset-password/${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });

    res.status(200).json({ message: 'Password reset link sent to email' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



//reset password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  // console.log("Token:", token);
  // console.log("New Password:", newPassword);

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateOne(
      { _id: user._id },
      {
        password: hashedPassword,
        resetToken: undefined,
        resetTokenExpiry: undefined
      }
    );

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (err) {
    console.error("Error during password reset:", err.message);
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


