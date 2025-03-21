// controllers/signUpController.js
const bcrypt = require('bcryptjs'); // Use bcryptjs
const User = require('../models/User'); // Assuming you have a User model

// Sign up controller
const signUpController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // Create the new user
    const newUser = new User({ username, email, password: hashedPassword });

    // Save user to database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signUpController };
