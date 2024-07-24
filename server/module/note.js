const mongoose = require("mongoose");

// Define the schema for the note
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});

// Create and export the model based on the schema
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;