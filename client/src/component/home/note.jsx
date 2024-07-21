import React, { useState, useRef, useEffect } from "react";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

export function Note({ post, setPost }) {
    const [openMenu, setOpenMenu] = useState(null); // Tracks which menu is open
    const anchorRef = useRef({});

    const handleMenuToggle = (index) => {
        setOpenMenu(prevOpenMenu => prevOpenMenu === index ? null : index);
    };

    const handleCloseMenu = (event) => {
        if (Object.values(anchorRef.current).some(ref => ref && ref.contains(event.target))) {
            return;
        }
        setOpenMenu(null);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(null);
        } else if (event.key === 'Escape') {
            setOpenMenu(null);
        }
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (Object.values(anchorRef.current).every(ref => !ref || !ref.contains(event.target))) {
                setOpenMenu(null);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    async function handleDelete(id) {
        try {
            // Send a DELETE request to the API endpoint
            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // throw an erro if the req not successful
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'An error occurred while deleting the note');
            }
    
            // Update the post state if successful
            setPost((currentPost) => currentPost.filter(post => post._id !== id));
        } catch (error) {
            console.error('Delete failed:', error);
            // Optionally, show a user-friendly error message
        }
    }    

    return (
        <div className="mt-6 w-full flex flex-wrap gap-4">
            {post.length > 0 ? (
                post.map((note, index) => (
                    <div key={index} className="bg-white p-4 rounded shadow min-w-[200px] max-w-[400px]">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">{note.title}</h3>
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
                                                <MenuList autoFocusItem={openMenu === index} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                    <MenuItem onClick={() => alert(`Edit ${note.title} clicked`)}>Edit</MenuItem>
                                                    <MenuItem onClick={() => handleDelete(note._id)}>Delete</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: note.note }}></p>
                    </div>
                ))
            ) : (
                <p>No notes available</p>
            )}
        </div>
    );
}