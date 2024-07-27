import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Newnote() {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")
    const nav = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
            const userID = localStorage.getItem("userID"); // Retrieve userID from localStorage
            const trimmedContent = content.trim(); // Trim content to avoid empty spaces
    
            if (!userID || !trimmedContent) {
                setError("Content is missing")
                return
            }
    
            const response = await fetch("http://localhost:3000/newnote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ user: userID, content: trimmedContent, title: title }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Network response was not ok: ${errorData.message || "Unknown error"}`);
            }
    
            const data = await response.json();
            nav("/"); // Navigate to home page
        } catch (error) {
            console.error("Error submitting the note:", error.message);
        }
    }
    
    return (
        <div className="bg-purple-900 min-h-screen flex justify-center items-center">
            <div className="p-4 max-w-md mx-auto bg-purple-800">
                <h1 className="text-2xl font-bold mb-4 text-white">New Note</h1>
                <div>
                    <input 
                        type="text"
                        placeholder="Title..." 
                        className="w-full mb-3 p-3 rounded"
                        value={title}
                        onChange={(e) => setTitle((e.target.value))}
                    />
                </div>
                {error ? (
                    <div className="bg-red-700 mb-4 text-white p-3 rounded">
                        {error}
                    </div>
                ):(
                    <></>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your note here..."
                        rows="6"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save Note
                    </button>
                </form>
            </div>
        </div>
    );
}