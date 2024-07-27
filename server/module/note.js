const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  findToSearch: {
    type: String,
    text: true
  }
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;