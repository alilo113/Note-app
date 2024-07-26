import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/home/home";
import { Login } from "./components/auth/login";
import { Signup } from "./components/auth/signup";
import { Profile } from "./components/profile/profile";
import { Newnote } from "./components/newNote/newNote";

function App() {
  const [userProfile, setUserProfile] = useState(null); // Initialize as null or an appropriate value
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
  
      try {
        const res = await fetch("http://localhost:3000/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
  
        if (res.ok) {
          const data = await res.json();
          setUserProfile(data.profile);
          setEmail(data.email);
        } else {
          console.error(`Failed to fetch user profile. Status: ${res.status}`);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  
    fetchUserProfile();
  }, []);
  
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home userProfile={userProfile} setUserProfile={setUserProfile} />} />
        <Route path="/log-in" element={<Login setUserProfile={setUserProfile} />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<Profile userProfile={userProfile} email={email} />} />
        <Route path="/newnote" element={<Newnote />} />
      </Routes>
    </Router>
  );
}

export default App;