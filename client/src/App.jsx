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
    async function fetchUserProfile() {
      try {
        const res = await fetch("http://localhost:3000/notes", { // Adjust the endpoint as necessary
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` // Add token if needed
          }
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data); 
          setUserProfile(data.profile); // Set userProfile based on response data
          setEmail(data.email); // Assuming email is also returned in the response
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

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