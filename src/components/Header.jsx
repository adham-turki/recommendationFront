import { BsMoonFill, BsSunFill } from "react-icons/bs";
import PropTypes from 'prop-types';


const Header = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap  px-10 py-4 bg-white shadow-md dark:bg-gray-800">
      {/* Logo and Title */}
      <div className="flex items-center gap-2">
        <h2 className="text-[#1D3557] text-3xl font-bold leading-tight tracking-[-0.015em] dark:text-white">
          Matchify
        </h2>
      </div>
      {/* Search Bar */}
      <div className="flex justify-center items-center w-1/3">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="dark:text-white"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for articles, ads, or people"
            className="block w-full pl-10 p-2.5 bg-[#FFFAFA] text-[#1D3557] border border-[#1D3557] rounded-xl shadow-sm focus:outline-none focus:ring-[#33527A] focus:border-[#33527A] dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>
      {/* Navigation Links, Dark Mode Toggle, and Profile Picture */}
      <div className="flex items-center space-x-9">
        <nav className="flex space-x-5">
          <a
            href="#"
            className="text-[#1D3557] text-lg font-medium leading-normal hover:bg-[#33527A] hover:text-white py-2 px-4 rounded-full transition duration-300 dark:text-white"
          >
            Home
          </a>
          <a
            href="#"
            className="text-[#1D3557] text-lg font-medium leading-normal hover:bg-[#33527A] hover:text-white py-2 px-4 rounded-full transition duration-300 dark:text-white"
          >
            Users
          </a>
          <a
            href="#"
            className="text-[#1D3557] text-lg font-medium leading-normal hover:bg-[#33527A] hover:text-white py-2 px-4 rounded-full transition duration-300 dark:text-white"
          >
            Profile
          </a>
        </nav>
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#FFFFFF] text-[#1D3557] border border-[#1D3557] shadow-sm dark:bg-gray-700 dark:text-white"
        >
          {darkMode ? <BsSunFill size={24} /> : <BsMoonFill size={24} />}
        </button>
        <div
          className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 border border-[#1D3557] dark:border-white"
          style={{
            backgroundImage:
              'url("https://cdn.usegalileo.ai/stability/90e338a6-2c0e-44ba-81c4-acb4b89c363b.png")',
          }}
        ></div>
      </div>
    </header>
  );
};
Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired, 
};

export default Header;
