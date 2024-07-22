import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Newnote() {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState(""); // State to hold the note content
    const [error, setError] = useState("");
    const nav = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            // Use HTTP instead of HTTPS for local development
            const res = await fetch("http://localhost:3000/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, note }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Failed to create a note");
                return;
            }

            nav("/");
            setTitle("");  // Clear title input
            setNote("");   // Clear note input
            setError("");  // Clear error message
        } catch (error) {
            console.error("Failed to fetch", error);
            setError("Something went wrong");
        }
    }

    return (
        <div className="bg-violet-900 min-h-screen flex justify-center items-center">
            <div className="bg-violet-700 max-w-lg w-full p-6 flex flex-col items-center m-3 rounded shadow-lg">
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            className="p-2 border rounded w-full" 
                            placeholder="Title" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            className="p-2 border rounded w-full"
                            placeholder="Write your note here..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows="10"
                        />
                    </div>
                    <button type="submit" className="p-2 bg-green-500 text-white rounded hover:bg-green-600 w-full">
                        Add Note
                    </button>
                </form>
                {error && <div className="mt-4 text-red-500">{error}</div>}
            </div>
        </div>
    );
}