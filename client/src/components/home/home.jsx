import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItems, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export function Home({ userProfile, setUserProfile, content }) {

  function handleLogout() {
    setUserProfile("");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
  }

  return (
    <div className="bg-purple-900 min-h-screen flex justify-center w-fit">
      <div className="bg-purple-800 p-6 rounded-lg shadow-lg m-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
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
          {content && content.length > 0 ? (
            <div>
              <ul className="list-disc pl-5 text-white">
                {content.map((note) => (
                  <li key={note._id} className="mb-2 bg-white text-black p-3 w-fit">{note.content}</li>
                ))}
              </ul>
              <Menu>
                <MenuButton
                  px={4}
                  py={2}
                  transition='all 0.2s'
                  borderRadius='md'
                  borderWidth='1px'
                  _hover={{ bg: 'gray.400' }}
                  _expanded={{ bg: 'blue.400' }}
                  _focus={{ boxShadow: 'outline' }}
                >
                  File <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem>New File</MenuItem>
                  <MenuItem>New Window</MenuItem>
                  <MenuDivider />
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save File</MenuItem>
                </MenuList>
              </Menu>
            </div>
          ) : (
            <p className="text-white">No notes available</p>
          )}
        </div>
      </div>
    </div>
  );
}