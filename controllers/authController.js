const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ;

// Sign Up
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password: bcrypt.hashSync(password, 8) });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token, message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password (Just placeholder)
exports.forgotPassword = async (req, res) => {
  res.send("Forgot password logic goes here");
};

// Validate Token
exports.validateToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // If the token is valid, respond with user details
    res.status(200).json({ message: 'Token is valid', userId: decoded.id });
  } catch (error) {
    console.error('Token validation error:', error.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};