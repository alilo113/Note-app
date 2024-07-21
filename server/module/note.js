const mongoose = require("mongoose")

const newNote = new mongoose.Schema({
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
})

const note = mongoose.model("note", newNote)
module.exports = newNote