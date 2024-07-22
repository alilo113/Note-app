import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./components/home/home"
import { Login } from "./components/auth/login"
import { Signup } from "./components/auth/signup"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/log-in" element={<Login/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
      </Routes>
    </Router>
  )
}

export default App