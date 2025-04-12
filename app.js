const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const User = require('./models/user');
const Picture = require('./models/picture');

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON requests

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = Date.now() + fileExtension;
    cb(null, fileName); // Generate a unique file name
  }
});

const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/elearning', { useNewUrlParser: true, useUnifiedTopology: true });

// Express route to handle file upload
app.post('/upload-picture', upload.single('image'), async (req, res) => {
  try {
    const userId = req.body.userId; // Assume the user ID is sent in the request body

    const newPicture = new Picture({
      user: userId,
      imageUrl: `/uploads/${req.file.filename}`, // Save the file path
      description: req.body.description
    });

    await newPicture.save();
    res.status(200).json({ message: 'Picture uploaded successfully', picture: newPicture });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading picture', error });
  }
});

// Route to create a user (sign up)
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({
      username,
      email,
      password
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
