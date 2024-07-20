const express = require("express")
const app = express()
const port = 3000

app.get("/api", (req, res) => {
    res.json({message: "This from the backend"})
})

app.listen(port, console.log(`This app is listen to port ${port}`))