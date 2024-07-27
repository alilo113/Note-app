const express = require("express");
const mongoose = require("mongoose");
const User = require("./module/user"); // Ensure this file exports the User model
const Note = require("./module/note"); // Make sure to use the correct model name here
const auth = require("./middleware/auth");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1/noteUsers")
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("Database connection error:", error));

// Sign-up route
app.post('/sign-up', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Log-in route
app.post("/log-in", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const userExist = await User.findOne({ email });

        if (userExist && await bcrypt.compare(password, userExist.password)) {
            // Generate a JWT token
            const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({
                username: userExist.username,
                userID: userExist._id.toString(),
                token // Send the token to the client
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Create new note route
app.post("/newnote", auth, async (req, res) => {
    try {
        const { content, title } = req.body;
        const userId = req.user.id; // Extract user ID from the authenticated request

        if (!content && title) {
            return res.status(400).json({ error: "Content is required" });
        }

        const newNote = new Note({
            user: userId,
            content,
            title
        });

        await newNote.save();
        res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
        console.error('Error creating note:', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch notes route
app.get("/notes", auth, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from the authenticated request
        const notes = await Note.find({ user: userId }); // Filter notes by user
        res.status(200).json({ notes });
    } catch (error) {
        console.log("Fetching error", error);
        res.status(500).json({ message: "Error fetching notes", error: error.message });
    }
});

app.delete('/notes/:id', auth, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Extract user ID from the authenticated request

    try {
        const result = await Note.findOneAndDelete({ _id: id, user: userId });
        if (!result) {
            return res.status(404).send('Note not found or you are not authorized to delete it');
        }
        res.status(200).send('Note deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting note: ' + error.message);
    }
});

app.put("/notes/:id", auth, async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user.id; // Extract user ID from the authenticated request

    try {
        const noteUpdated = await Note.findOneAndUpdate({ _id: id, user: userId }, updateData, { new: true });
        if (!noteUpdated) {
            return res.status(404).json({ message: "No note found to update or you are not authorized to update it" });
        }
        res.status(200).json({ message: "Note updated", note: noteUpdated });
    } catch (error) {
        res.status(500).json({ message: "Error updating note", error: error.message });
    }
});

app.get("/profile", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        profile: user,
        email: user.email // Assuming you want to return email as well
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
});

app.get("/search", auth, async (req, res) => {
    try {
        const { query } = req.query;
        const result = await Note.find({ $text: { $search: query } });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));