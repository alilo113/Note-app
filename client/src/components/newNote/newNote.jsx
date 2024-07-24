import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Newnote() {
    const [content, setContent] = useState("");
    const nav = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        try {
            const res = await fetch("http://localhost:3000/newnote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Fixed typo here
                },
                body: JSON.stringify({ content })
            });

            if (!res.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await res.json(); // Corrected `re` to `res`

            // Optional: Handle response data if needed

            nav("/"); // Navigate to home page
        } catch (error) {
            console.error("Error submitting the note:", error);
            // Optional: Show error message to the user
        }
    }

    return (
        <div className="bg-purple-900 min-h-screen flex justify-center items-center">
            <div className="p-4 max-w-md mx-auto bg-purple-800">
                <h1 className="text-2xl font-bold mb-4 text-white">New Note</h1>
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