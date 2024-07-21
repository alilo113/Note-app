const express = require("express")
const app = express()
const port = 3000
const mongoose = require("mongoose")
const note = require("./module/note")

mongoose.connect("mongodb://127.0.0.1:27017/notedb")
.then(() => console.log("database connected"))
.catch((error) => console.log(error))

app.get("/api/notes", async (req, res) => {
    try {
        const {title, note} = req.body;
        const newNote = new note({title: title, note: note})
        console.log(newNote)
        await newNote.save()
        res.status(200).json({message: "New post created!!"})
    } catch (error) {
        console.log(error)        
        res.status(500).json({message: "Faild to create new post"})
    }
})

app.listen(port, console.log(`This app is listen to port ${port}`))