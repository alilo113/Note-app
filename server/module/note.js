const mongoose = require('mongoose');

// Define the schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    note: {
        type: String,
        required: true,
        unique: true
    }
});

// Create the model
const Note = mongoose.model('Note', noteSchema);

// Export the model
module.exports = Note;