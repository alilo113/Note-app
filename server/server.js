const express = require("express");
const mongoose = require("mongoose");
const User = require("./module/user"); // Ensure this file exports the User model
const Note = require("./module/note"); // Make sure to use the correct model name here
const cors = require("cors");
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

        // Create and save new user
        const newUser = new User({ username, email, password });
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

        if (userExist && await userExist.comparePassword(password)) {
            res.json({
                username: userExist.username,
                userID: userExist._id.toString() // Include userID in the response
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
app.post("/newnote", async (req, res) => {
    try {
        const { user, content } = req.body;

        if (!user || !content) {
            return res.status(400).json({ error: "User ID and content are required" });
        }

        // Ensure the user ID is valid
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const newNote = new Note({
            user,
            content
        });

        await newNote.save();
        res.status(201).json({ message: "Note created successfully" });
    } catch (error) {
        console.error('Error creating note:', error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch notes route
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find().populate('user', 'username email');
        res.status(200).json({ notes });
    } catch (error) {
        console.log("Fetching error", error);
        res.status(500).json({ message: "Error fetching notes", error: error.message });
    }
});

app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Note.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send('Note not found');
        }
        res.status(200).send('Note deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting note: ' + error.message);
    }
});

app.put("/notes/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const NoteUpdated = await Note.findByIdAndUpdate(id, updateData, { new: true });
        if (!NoteUpdated) {
            return res.status(404).json({ message: "No note found to update" });
        }
        res.status(200).json({ message: "Note updated", note: NoteUpdated });
    } catch (error) {
        res.status(500).json({ message: "Error updating note", error: error.message });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));