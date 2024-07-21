import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Note } from "./note";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export function Home() {
    const nav = useNavigate();
    const [post, setPost] = useState([]);
    const [error, setError] = useState("");
    
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("http://localhost:3000/api/notes", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                } else {
                    setError("Failed to fetch notes");
                }
            } catch (error) {
                setError("Error fetching data. Please try again.");
                console.error(error);
            }
        }
        fetchData();
    }, []);

    function newNoteNav() {
        nav("/newnote");
    }

    return (
        <div className="bg-violet-900 min-h-screen flex flex-col items-center">
            <div className="bg-violet-700 max-w-lg p-6 flex flex-col items-center m-3 rounded">
                <div className="flex items-center gap-4 mb-4">
                    <input 
                        type="text" 
                        className="p-2 border rounded" 
                        placeholder="Search bar..." 
                    />
                    <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Log-in</button>
                    <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign-up</button>
                </div>
                <Note></Note>
                <div 
                    className="text-4xl text-white bg-red-600 p-5 cursor-pointer rounded hover:bg-red-700 mt-6" 
                    onClick={newNoteNav}
                >
                    +
                </div>
                {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
        </div>
    );
}