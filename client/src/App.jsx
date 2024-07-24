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
  const [content, setContent] = useState([]); // Initialize as an empty array

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/newnote", {
          method: "GET",
          headers: {
            'Content-Type': "application/json"
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setContent(data); // Set content as the response data
        } else {
          console.error("Failed to fetch note");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    }

    const storedUserName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email"); // Get email if needed
    if (storedUserName) {
      setUserProfile(storedUserName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }

    fetchData(); // Fetch the data on component mount
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home userProfile={userProfile} setUserProfile={setUserProfile} content={content}/>} />
        <Route path="/log-in" element={<Login setUserProfile={setUserProfile} />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<Profile userProfile={userProfile} email={email} />} />
        <Route path="/newnote" element={<Newnote />} />
      </Routes>
    </Router>
  );
}

export default App;