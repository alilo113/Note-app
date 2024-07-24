const mongoose = require("mongoose");

// Define the Note schema
const noteSchema = new mongoose.Schema({
    Content: {
        type: String,
        required: true
    }
});

// Create and export the Note model
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;