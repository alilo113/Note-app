const express = require("express");
const mongoose = require("mongoose");
const User = require("./module/user"); // Ensure that your model file exports a model named 'User'
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
app.post("/sign-up", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newUser = new User({ username, password, email });
        console.log(newUser);
        await newUser.save();
        res.status(200).send("User created");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Failed to create user");
    }
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));