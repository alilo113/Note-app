import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import 'quill/dist/quill.snow.css'; // Import Quill CSS
import Quill from 'quill'; // Import Quill
import DOMPurify from "dompurify";

export function Newnote() {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();

    // Initialize Quill editor
    const quillRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        if (quillRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }],
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link'],
                        [{ 'color': [] }, { 'background': [] }],
                        ['clean']
                    ]
                }
            });
        }
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if (!quillInstance.current) {
                throw new Error("Quill instance is not initialized");
            }
            
            const quill = quillInstance.current;
            const sanitizedNote = DOMPurify.sanitize(quill.root.innerHTML);

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

            nav("/");
            setTitle("");  // Clear title input
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
                        <div ref={quillRef} style={{ height: '300px' }}></div>
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