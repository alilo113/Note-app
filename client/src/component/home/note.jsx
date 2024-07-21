import React, { useState, useRef, useEffect } from "react";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

export function Note({ post, setPost }) {
    const [openMenu, setOpenMenu] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const anchorRef = useRef([]);

    const handleMenuToggle = (index) => {
        setOpenMenu(openMenu === index ? null : index);
    };

    const handleCloseMenu = (event) => {
        if (anchorRef.current[openMenu]?.contains(event.target)) {
            return;
        }
        setOpenMenu(null);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (anchorRef.current.every(ref => !ref?.contains(event.target))) {
                setOpenMenu(null);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [openMenu]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('An error occurred while deleting the note');
            }

            setPost(post.filter(note => note._id !== id));
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const handleEdit = (index) => {
        setEditMode(index);
        setNewTitle(post[index].title);
        setNewContent(post[index].note);
    };

    const handleSave = async (id) => {
        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle, note: newContent }),
            });

            if (!response.ok) {
                throw new Error('An error occurred while updating the note');
            }

            const updatedNote = await response.json();
            setPost(post.map(note => note._id === id ? updatedNote : note));
            setEditMode(null);
        } catch (error) {
            console.error('Save failed:', error);
        }
    };

    return (
        <div className="mt-6 w-full flex flex-wrap gap-4">
            {post.length > 0 ? (
                post.map((note, index) => (
                    <div key={note._id} className="bg-white p-4 rounded shadow min-w-[200px] max-w-[400px]">
                        <div className="flex justify-between items-center">
                            {editMode === index ? (
                                <input 
                                    type="text"
                                    placeholder="Title..."
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="w-full mb-2 border rounded p-2"
                                />
                            ) : (
                                <h3 className="text-xl font-bold">{note.title}</h3>
                            )}
                            <Button
                                ref={el => anchorRef.current[index] = el}
                                aria-controls={openMenu === index ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={() => handleMenuToggle(index)}
                            >
                                ...
                            </Button>
                            <Popper
                                open={openMenu === index}
                                anchorEl={anchorRef.current[index]}
                                role={undefined}
                                transition
                                disablePortal
                            >
                                {({ TransitionProps }) => (
                                    <Grow {...TransitionProps} style={{ transformOrigin: 'center top' }}>
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleCloseMenu}>
                                                <MenuList autoFocusItem={openMenu === index} id="menu-list-grow">
                                                    <MenuItem onClick={() => handleEdit(index)}>Edit</MenuItem>
                                                    <MenuItem onClick={() => handleDelete(note._id)}>Delete</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                        {editMode === index ? (
                            <div>
                                <textarea
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    rows={5}
                                    className="w-full border rounded p-2"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleSave(note._id)}
                                >
                                    Save
                                </Button>
                            </div>
                        ) : (
                            <p>{note.note}</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No notes available</p>
            )}
        </div>
    );
}