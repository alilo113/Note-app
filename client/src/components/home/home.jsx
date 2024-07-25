import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

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

  return (
    <div className="bg-purple-900 min-h-screen flex flex-col items-center">
      <div className="bg-purple-800 p-6 rounded-lg shadow-lg w-full max-w-4xl mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex gap-2 mb-4 md:mb-0 mr-10">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 rounded border border-violet-500 outline-none focus:ring-2 focus:ring-violet-300"
            />
            <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
              Search
            </button>
          </div>
          {userProfile ? (
            <div className="flex gap-1">
              <Link to="/profile" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                Profile
              </Link>
              <button onClick={handleLogout} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                Log out
              </button>
            </div>
          ) : (
            <div className="flex gap-1">
              <Link to="/log-in" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                Log in
              </Link>
              <Link to="/sign-up" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                Sign up
              </Link>
            </div>
          )}
        </div>
        <div className="mt-10">
          <Link to="/newnote" className="bg-red-700 p-6 w-fit text-3xl rounded text-white hover:bg-red-900 cursor-pointer">+</Link>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-3">Your Notes</h2>
          {notes.length > 0 ? (
            <div className="list-disc pl-5 text-white">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="relative mb-2 bg-white text-black p-3 "
                >
                  <div className="break-words">{note.content}</div>
                  <Menu>
                    <MenuButton className="absolute top-2 right-2 text-3xl cursor-pointer">...</MenuButton>
                    <MenuList>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white">No notes available</p>
          )}
        </div>
      </div>
    </div>
  );
}