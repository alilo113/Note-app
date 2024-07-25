import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/home/home";
import { Login } from "./components/auth/login";
import { Signup } from "./components/auth/signup";
import { Profile } from "./components/profile/profile";
import { Newnote } from "./components/newNote/newNote";

function App() {
  const [userProfile, setUserProfile] = useState("");
  const [email, setEmail] = useState(""); // Add email state if needed

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/log-in" element={<Login setUserProfile={setUserProfile} />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<Profile userProfile={userProfile} email={email} />} />
        <Route path="/newnote" element={<Newnote />} />
      </Routes>
    </Router>
  );
}

export default App;