import React from "react";

export function Login() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-900">
            <div className="w-full max-w-md p-8 bg-purple-800 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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