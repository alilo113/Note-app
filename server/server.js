const express = require('express');
const mongoose = require('mongoose');
const Note = require('./module/note'); // Import the model, not the schema
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/notedb')
    .then(() => console.log('Database connected'))
    .catch((error) => console.error('Database connection error:', error));

app.use(bodyParser.json());
app.use(cors());

app.post('/api/notes', async (req, res) => {
    try {
        const { title, note } = req.body;
        if (!title || !note) {
            return res.status(400).json({ message: 'Title and note are required' });
        }

        const newNote = new Note({
            title,
            note
        });

        await newNote.save();
        res.status(201).json({ message: 'New note created' });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Failed to create note' });
    }
});

app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find(); // Fetch all notes
        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Failed to fetch notes' });
    }
});

app.delete("/api/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id); // Use the 'id' to find and delete the note

        if (!deletedNote) {
            return res.status(404).json({ error: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the note" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});