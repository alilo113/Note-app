import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
    const nav = useNavigate()
    const [post, setPost] = useState([])
    const [error, setError] = useState("")

    useEffect(async () => {
        try {
            const res = await fetch("https://localhost:3000/api/notes", {
                method: "GET",
                header: {
                    "Content-Type": "Applicaion/json"
                }
            })
        } catch (error) {
            
        }
    }, [])
    function newNoteNav(){
        nav("/newnote")
    }
    return (
        <div className="bg-violet-900 min-h-screen flex justify-center">
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
                <div className="text-4xl text-white bg-red-600 p-5 cursor-pointer rounded hover:bg-red-700" onClick={newNoteNav}>+</div>
            </div>
        </div>
    );
}