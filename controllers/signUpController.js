const bcrypt = require('bcryptjs');
const User = require('../models/User');

const signUpController = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user', // ✅ Set role from request
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signUpController };
