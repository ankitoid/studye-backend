const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const signUpRoutes = require('./routes/signUpRoutes');
const User = require('./models/User'); // Make sure this file exists: ./models/User.js

require('dotenv').config(); // Load environment variables

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api', signUpRoutes);

// ✅ This route should use `app.get` instead of `router.get` since you're in the main app file
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
