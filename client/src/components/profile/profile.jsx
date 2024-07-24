import React from "react";
import { Link } from "react-router-dom";

export function Profile({ userProfile, email }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-900">
      <div className="bg-purple-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Profile</h2>
        <div className="mb-4">
          <p className="border-b border-gray-300 text-white">Username: {userProfile}</p>
        </div>
        <Link to="/" className="bg-blue-800 hover:bg-blue-900 p-3 rounded text-white">Go homepage</Link>
      </div>
    </div>
  );
}