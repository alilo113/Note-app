const express = require("express");
const mongoose = require("mongoose");
const User = require("./module/user"); // Ensure that your model file exports a model named 'User'
const note = require("./module/note");
const cors = require("cors")
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())
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
            return res.status(400).json({ error: 'Username already exists' });
        }
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/log-in", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const userExist = await User.findOne({ email });

        if (userExist && await userExist.comparePassword(password)) {
            res.json({ username: userExist.username }); // Sending username if login is successful
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/newnote", async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }

        const newNote = new note({ content });
        await newNote.save();
        res.status(201).send("Note created!!!");
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

app.get("/notes", async (req, res) => {
    try {
        const notes = await note.find({});
        res.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));