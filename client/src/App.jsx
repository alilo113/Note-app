import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/home/home";
import { Login } from "./components/auth/login";
import { Signup } from "./components/auth/signup";
import { Profile } from "./components/profile/profile";

function App() {
  const [userProfile, setUserProfile] = useState("");
  const [email, setEmail] = useState(""); // Add email state if needed

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email"); // Get email if needed
    if (storedUserName) {
      setUserProfile(storedUserName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home userProfile={userProfile} setUserProfile={setUserProfile} />} />
        <Route path="/log-in" element={<Login setUserProfile={setUserProfile} />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<Profile userProfile={userProfile} email={email} />} />
      </Routes>
    </Router>
  );
}

export default App;