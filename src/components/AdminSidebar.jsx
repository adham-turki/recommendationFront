import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ onNavClick, darkMode }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [data, setData] = useState([]);
  

  const handleNavClick = (item) => {
    setActiveItem(item);
    onNavClick(item);
  };

  return (
    <div
      className={`hidden md:flex h-full min-h-[890px] min-w-[300px] flex-col justify-between p-4 border-r sticky top-16
        ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage: `url("${data.profilePicture}")`
              }}
            />
            <div className="flex flex-col">
              <h1 className="text-base font-medium leading-normal">{data.firstname}</h1>
              <p className="text-sm font-normal leading-normal">Admin</p>
            </div>
          </div>
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer ${activeItem === 'dashboard' ? (darkMode ? 'bg-gray-700' : 'bg-[#EEEEEE]') : (darkMode ? 'hover:bg-gray-600' : 'hover:bg-[#EEEEEE]')}`}
            onClick={() => handleNavClick('dashboard')}
          >
            <div className="text-current" data-icon="House" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"
                ></path>
              </svg>
            </div>
            <p className="text-sm font-medium leading-normal">Dashboard</p>
          </div>
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer ${activeItem === 'users' ? (darkMode ? 'bg-gray-700' : 'bg-[#EEEEEE]') : (darkMode ? 'hover:bg-gray-600' : 'hover:bg-[#EEEEEE]')}`}
            onClick={() => handleNavClick('users')}
          >
            <div className="text-current" data-icon="Users" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"
                ></path>
              </svg>
            </div>
            <p className="text-sm font-medium leading-normal">Users</p>
          </div>
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer ${activeItem === 'posts' ? (darkMode ? 'bg-gray-700' : 'bg-[#EEEEEE]') : (darkMode ? 'hover:bg-gray-600' : 'hover:bg-[#EEEEEE]')}`}
            onClick={() => handleNavClick('posts')}
          >
            <div className="text-current" data-icon="File" data-size="24px" data-weight="fill">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Z"
                ></path>
              </svg>
            </div>
            <p className="text-sm font-medium leading-normal">Posts</p>
          </div>
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer ${activeItem === 'graph' ? (darkMode ? 'bg-gray-700' : 'bg-[#EEEEEE]') : (darkMode ? 'hover:bg-gray-600' : 'hover:bg-[#EEEEEE]')}`}
            onClick={() => handleNavClick('graph')}
          >
            <div className="text-current" data-icon="File" data-size="24px" data-weight="fill">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                <path
                  d="M216,200h-8V56a8,8,0,0,0-16,0V200H144V104a8,8,0,0,0-16,0V200H80V152a8,8,0,0,0-16,0v48H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
                ></path>
              </svg>
            </div>
            <p className="text-sm font-medium leading-normal">Graph</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onNavClick: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default Sidebar;
