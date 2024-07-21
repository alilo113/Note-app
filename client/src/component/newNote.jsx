import React, { useState } from "react";
import DOMPurify from "dompurify";

export function Newnote() {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();  // Prevent the default form submission behavior
        try {
            const sanitizedNote = DOMPurify.sanitize(note);

            // Use HTTP instead of HTTPS for local development
            const res = await fetch("http://localhost:3000/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, note: sanitizedNote }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Failed to create a note");
                return;
            }

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
                            onChange={(e) => setTitle(e.target.value)}  // Update state on change
                        />
                    </div>
                    <div className="mb-4">
                        <textarea 
                            className="p-2 border rounded w-full" 
                            placeholder="Your note..." 
                            rows="6"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}  // Update state on change
                        ></textarea>
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