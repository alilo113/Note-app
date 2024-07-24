import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Newnote() {
    const [note, setNote] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault(); // Prevent form from reloading the page
    
        try {
            const res = await fetch("http://localhost:3000/newnote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: note }), // Send JSON data
            });
    
            console.log("Response status:", res.status); // Log response status
    
            if (res.ok) {
                // Handle successful response
                const data = await res.json();
                console.log("Response data:", data);
                nav("/"); // Navigate to another page
            } else {
                // Handle non-OK responses
                const errorData = await res.json();
                setError(errorData.error || "An error occurred. Please try again.");
            }
        } catch (error) {
            // Catch and log network or other errors
            console.error("Fetch error:", error);
            setError("Network error. Please try again later.");
        }
    }
    
    return (
        <div className="bg-purple-900 min-h-screen flex justify-center items-center">
            <div className="p-4 max-w-md mx-auto bg-purple-800">
                <h1 className="text-2xl font-bold mb-4 text-white">New Note</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write your note here..."
                        rows="6"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {error && (
                        <div className="text-red-500 mb-4">
                            {error}
                        </div>
                    )}
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