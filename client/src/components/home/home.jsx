import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Header } from "./header";
import { NoteList } from "./notesList";

export function Home({ userProfile, setUserProfile }) {
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editTitle, setEditedTitle] = useState("");
  const [query, setQuery] = useState("")
  const [result, setResult] = useState([])

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/notes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
  
        const data = await response.json();
        setNotes(data.notes || []); // Ensure notes is set to an empty array if data.notes is undefined
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
  
    fetchNotes();
  }, []);  

  function handleLogout() {
    setUserProfile(null); // Use null or undefined for userProfile
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  }

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Add the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  async function handleSaveEdit(id) {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Add the Authorization header
        },
        body: JSON.stringify({ content: editedContent, title: editTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, content: editedContent, title: editT } : note
        )
      );

      setEditMode(null);
      setEditedContent("");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  function handleStartEdit(note) {
    setEditMode(note._id);
    setEditedContent(note.content);
    setEditedTitle(note.title)
  }

  function handleCancelEdit() {
    setEditMode(null);
    setEditedContent("");
    setEditedTitle("")
  }

  async function handleSearch(){
    e.preventDefault();
    try {
      const res = await fetch(`/search?query=${query}`, {
        method: "GET",
        header: {
          "Content-Type": "applicaion/json",
          "Authorization": `Bearer ${token}`
        }
      })

      const data = res.json()
      setResult(data)
      console.log(result)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  return (
    <div className="bg-purple-900 min-h-screen flex flex-col items-center">
      <div className="bg-purple-800 p-6 rounded-lg shadow-lg w-full max-w-4xl mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <Header userProfile={userProfile} handleLogout={handleLogout} handleSearch={handleSearch}/>
        </div>
        <div className="mt-10">
          <Link to="/newnote" className="bg-red-700 p-6 w-fit text-3xl rounded text-white hover:bg-red-900 cursor-pointer">+</Link>
        </div>
        <NoteList
          userProfile={userProfile}
          notes={notes}
          editMode={editMode}
          editedContent={editedContent}
          setEditedContent={setEditedContent}
          handleStartEdit={handleStartEdit}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          handleDelete={handleDelete}
          editTitle={editTitle}
          setEditedTitle={setEditedTitle}
          result={result}
        />
      </div>
    </div>
  );
}