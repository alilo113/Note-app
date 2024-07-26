import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ setUserProfile }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const nav = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault(); // Prevent the default form submission
    
        setLoading(true); // Set loading to true
        setError(""); // Clear any previous errors
    
        try {
            const response = await fetch("http://localhost:3000/log-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                // Call setUserProfile if needed
                console.log("Stored token:", localStorage.getItem("token"));
                if (data.userProfile) {
                    setUserProfile(data.userProfile);
                }
                // Redirect after successful login
                nav("/");
            } else {
                const data = await response.json();
                throw new Error(data.message || "Login failed");
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || "Something went wrong");
        } finally {
            setLoading(false); // Set loading to false
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
                    {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
}