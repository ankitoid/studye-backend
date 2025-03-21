// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const signUpRoutes = require('./routes/signUpRoutes'); // Correct path

require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use('/api/signup', signUpRoutes); // Correct route for signup

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
