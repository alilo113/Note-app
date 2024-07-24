import React from "react"

export function Newnote() {
    return (
        <div className="bg-purple-900 min-h-screen flex justify-center items-center">
            <div className="p-4 max-w-md mx-auto bg-purple-800">
                <h1 className="text-2xl font-bold mb-4 text-white">New Note</h1>
                <form className="space-y-4">
                    <textarea
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