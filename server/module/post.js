const mongoose = require("mongoose")

const newPost = new mongoose.Schema({
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