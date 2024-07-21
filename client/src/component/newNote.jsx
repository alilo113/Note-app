import React from "react";

export function Newnote() {
    return (
        <div className="bg-violet-900 min-h-screen flex justify-center items-center">
            <div className="bg-violet-700 max-w-lg w-full p-6 flex flex-col items-center m-3 rounded shadow-lg">
                <form className="w-full">
                    <div className="mb-4">
                        <input 
                            type="text" 
                            className="p-2 border rounded w-full" 
                            placeholder="Title" 
                        />
                    </div>
                    <div className="mb-4">
                        <textarea 
                            className="p-2 border rounded w-full" 
                            placeholder="Your note..." 
                            rows="6"
                        ></textarea>
                    </div>
                    <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600 w-full">Add Note</button>
                </form>
            </div>
        </div>
    );
}