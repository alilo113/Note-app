import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

export function NoteList({
  notes,
  editMode,
  editedContent,
  setEditedContent,
  handleStartEdit,
  handleSaveEdit,
  handleCancelEdit,
  handleDelete,  
  userProfile,
  editTitle,
  setEditedTitle,
  result
}) {
  // Determine which data to display
  const displayNotes = result.length > 0 ? result : notes;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-white mb-3">
        {result.length > 0 ? "Search Results" : "Your Notes"}
      </h2>
      {!userProfile ? (
        <p className="text-white">Please log in to view your notes.</p>
      ) : displayNotes.length > 0 ? (
        <div className="list-disc pl-5 text-white">
          {displayNotes.map((note) => (
            <div
              key={note._id}
              className="relative mb-2 bg-white text-black p-3"
            >
              {editMode === note._id ? (
                <div>
                  <input 
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                  />
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSaveEdit(note._id)}
                      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-600 text-white p-2 rounded hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl mb-3 font-bold">{note.title}</h1>
                  <div className="break-words">{note.content}</div>
                  <Menu>
                    <MenuButton className="absolute top-2 right-2 text-3xl cursor-pointer">...</MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleStartEdit(note)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDelete(note._id)}>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No notes available</p>
      )}
    </div>
  );
}