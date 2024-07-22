import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 
import { Home } from "./component/home/home"
import { Newnote } from "./component/newNote/newNote"
import { Login } from "./component/registration/login"
import { Signup } from "./component/registration/signup"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/newnote" element={<Newnote/>}/>
        <Route path="/log-in" element={<Login/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
      </Routes>
    </Router>
  )
}

export default App
