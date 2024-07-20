import React from "react";

export function Home() {
    return (
        <div className="bg-violet-900 min-h-screen flex justify-center">
            <div className="bg-violet-700 max-w-lg p-6 flex flex-col items-center m-3">
                <div className="flex items-center gap-4 mb-4">
                    <input 
                        type="text" 
                        className="p-2 border rounded" 
                        placeholder="Search bar..." 
                    />
                    <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Log-in</button>
                    <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign-up</button>
                </div>
                <div className="text-4xl">+</div>
            </div>
        </div>
    );
}