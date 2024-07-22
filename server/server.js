const express = require("express")
const app = express()
const port = 3000

app.get("/api", (req, res) => {
    res.json({message: "this is from the backend"})
})
app.listen(port, console.log(`This app listen to port ${port}`))