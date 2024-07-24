import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export function Home({ userProfile, setUserProfile, notes }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleLogout = () => {
    setUserProfile("");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  };

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
          {userProfile ? (
            <div className="flex gap-1">
              <Link to="/profile" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                Profile
              </Link>
              <button onClick={handleLogout} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                Log out
              </button>
            </div>
          ) : (
            <div className="flex gap-1">
              <Link to="/log-in" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                Log in
              </Link>
              <Link to="/sign-up" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
                Sign up
              </Link>
            </div>
          )}
        </div>
        <div className="mt-10">
          <Link to="/newnote" className="bg-red-700 p-6 w-fit text-3xl rounded text-white hover:bg-red-900 cursor-pointer">+</Link>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white">Your Notes</h2>
          <ul className="mt-4 space-y-2">
            {notes.length === 0 ? (
              <li className="text-white">No notes available.</li>
            ) : (
              notes.map((note) => (
                <li key={note._id} className="bg-purple-700 p-4 rounded text-white shadow">
                  <h3 className="text-xl font-semibold">{note.title}</h3>
                  <p>{note.content}</p>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="mt-10">
          <Stack direction="row" spacing={2}>
            <Paper>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Paper>
            <div>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                Dashboard
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={handleClose}>My account</MenuItem>
                          <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}