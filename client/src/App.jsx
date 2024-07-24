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
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:3000/notes"); // Adjust the endpoint as needed
        const data = await res.json();
        if (res.ok) {
          setNotes(data);
        } else {
          console.error("Failed to fetch notes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    const storedUserName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email"); // Get email if needed
    if (storedUserName) {
      setUserProfile(storedUserName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
    fetchNotes();
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Home userProfile={userProfile} setUserProfile={setUserProfile} notes={notes} />} 
        />
        <Route path="/log-in" element={<Login setUserProfile={setUserProfile} />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<Profile userProfile={userProfile} email={email} />} />
        <Route path="/newnote" element={<Newnote />} />
      </Routes>
    </Router>
  );
}

export default App;