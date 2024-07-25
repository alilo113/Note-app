import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Header } from "./header";
import { NoteList } from "./notesList";

export function Home({ userProfile, setUserProfile }) {
  const [notes, setNotes] = useState([]); // Initialize as an empty array

  useEffect(() => {
    // Fetch notes when the component mounts
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:3000/notes");
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        setNotes(data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  function handleLogout() {
    setUserProfile("");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      // Remove the deleted note from the state
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  function handleEdit(id) {
    // Handle edit functionality here
  }

  return (
    <div className="bg-purple-900 min-h-screen flex flex-col items-center">
      <div className="bg-purple-800 p-6 rounded-lg shadow-lg w-full max-w-4xl mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <Header userProfile={userProfile} handleLogout={handleLogout} />
        </div>
        <div className="mt-10">
          <Link to="/newnote" className="bg-red-700 p-6 w-fit text-3xl rounded text-white hover:bg-red-900 cursor-pointer">+</Link>
        </div>
        <NoteList notes={notes} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
}