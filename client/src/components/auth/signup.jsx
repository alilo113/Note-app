import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"  // Fix typo here
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();  // Await JSON response
            if (res.ok) {
                nav("/sign-up");
            } else {
                setError(data.message || "Registration failed");  // Fix typo here
            }
        } catch (error) {
            console.log("Fetch error", error);
            setError("Something went wrong");  // Fix typo here
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-900">
            <div className="w-full max-w-md p-8 bg-purple-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-white font-medium mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}  {/* Display error message */}
            </div>
        </div>
    );
}