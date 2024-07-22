import React from "react";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="bg-purple-900 min-h-screen flex justify-center">
            <div className="bg-purple-800 p-6 rounded-lg shadow-lg m-3">
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex gap-2 mb-4 md:mb-0 mr-10">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="p-2 rounded border border-violet-500 outline-none focus:ring-2 focus:ring-violet-300"
                        />
                        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                            Search
                        </button>
                    </div>
                    <div className="flex gap-1">
                        <Link to="/log-in" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                            Log in
                        </Link>
                        <Link to="/sign-up" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                            Sign up
                        </Link>
                    </div>
                </div>
                <div className="bg-red-700 w-fit text-3xl rounded text-white p-4 mt-4 hover:bg-red-900 cursor-pointer">+</div>
            </div>
        </div>
    );
}