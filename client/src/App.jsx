import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 
import { Home } from "./component/home/home"
import { Newnote } from "./component/newNote"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/newnote" element={<Newnote/>}/>
      </Routes>
    </Router>
  )
}

export default App
