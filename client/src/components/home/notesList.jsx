import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

export function NoteList({ notes, handleEdit, handleDelete }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-white mb-3">Your Notes</h2>
      {notes.length > 0 ? (
        <div className="list-disc pl-5 text-white">
          {notes.map((note) => (
            <div
              key={note._id}
              className="relative mb-2 bg-white text-black p-3"
            >
              <div className="break-words">{note.content}</div>
              <Menu>
                <MenuButton className="absolute top-2 right-2 text-3xl cursor-pointer">...</MenuButton>
                <MenuList>
                  <MenuItem onClick={() => handleEdit(note._id)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleDelete(note._id)}>Delete</MenuItem>
                </MenuList>
              </Menu>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No notes available</p>
      )}
    </div>
  );
}