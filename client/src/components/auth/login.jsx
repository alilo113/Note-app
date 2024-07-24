import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({setUserProfile}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const nav = useNavigate()
    
    async function handleSubmit(e) {
        e.preventDefault(); // Prevent the default form submission
    
        try {
            const response = await fetch("http://localhost:3000/log-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // On successful login, navigate and store user data
                nav("/"); // Redirect to home or another page
                setUserProfile(data.username); // Update user profile state
                localStorage.setItem("username", data.username); // Store username in localStorage
                localStorage.setItem("userID", data.userID); // Store userID in localStorage
            } else {
                // On failure, set error message
                setError(data.message || "Login failed");
            }
        } catch (error) {
            // Handle fetch or network errors
            console.error('Fetch error:', error);
            setError("Something went wrong");
        }
    }
        
    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-900">
            <div className="w-full max-w-md p-8 bg-purple-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
                <form onSubmit={handleSubmit}>
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
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}