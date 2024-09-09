<<<<<<< Updated upstream
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
=======
import { useState, useRef, useEffect } from "react";
import { BsX, BsList } from "react-icons/bs";
import matchifyLogo from "../assets/matchify_logo.png";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(""); // Start with no active button
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isAdmin = true; // Simulating whether the user is an admin

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set the clicked button as active
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
>>>>>>> Stashed changes
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleClickOutsideDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  return (
<<<<<<< Updated upstream
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
=======
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap px-10 py-4 bg-white border-gray-200 shadow-md`}
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Logo and Title */}
        <div className="flex items-center ">
          <img
            src={matchifyLogo}
            alt="Matchify Logo"
            className="h-12 object-contain"
          />
          <h2
            className={`text-3xl font-bold leading-tight tracking-[-0.015em] text-[#14044c]`}
          >
            Matchify
          </h2>
        </div>

        {/* Navigation Links (Right aligned) */}
        <div className="flex space-x-5">
          <a
            href="/home"
            onClick={() => handleButtonClick("Home")}
            className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
              activeButton === "Home"
                ? "bg-[#14044c] text-white"
                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
            }`}
          >
            Home
          </a>
          <a
            href="/my-feed"
            onClick={() => handleButtonClick("Feeds")}
            className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
              activeButton === "Feeds"
                ? "bg-[#14044c] text-white"
                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
            }`}
          >
            Feeds
          </a>
          <a
            href="/search"
            onClick={() => handleButtonClick("Users")}
            className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
              activeButton === "Users"
                ? "bg-[#14044c] text-white"
                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
            }`}
          >
            Users
          </a>
          <a
            href="/profile"
            onClick={() => handleButtonClick("Profile")}
            className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
              activeButton === "Profile"
                ? "bg-[#14044c] text-white"
                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
            }`}
          >
            Profile
          </a>

          {/* Conditionally render Admin button */}
          {isAdmin && (
            <a
              href="/admin"
              onClick={() => handleButtonClick("Admin")}
              className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
                activeButton === "Admin"
                  ? "bg-[#14044c] text-white"
                  : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
              }`}
            >
              Admin
            </a>
          )}

          {/* Profile Picture with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="bg-[#14044c] text-white flex items-center justify-center rounded-full h-10 w-10 cursor-pointer"
              onClick={toggleDropdown}
            >
              <span className="text-lg font-bold">NH</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                <ul className="py-2">
                  <li>
                    <a
                      href="/history"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      History
                    </a>
                  </li>
                  <li>
                    <a
                      href="/saved-items"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Saved Items
                    </a>
                  </li>
                  <hr className="my-2 border-gray-300" />
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer font-semibold"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon for Sidebar on Small Screens */}
          <button
            className="md:hidden flex items-center text-[#14044c]"
            onClick={toggleSidebar}
          >
            <BsList size={28} />
          </button>
        </div>
      </header>

      {/* Sidebar for small screens (opens from the right) */}
      <div
        className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="absolute right-0 top-0 w-64 bg-white h-full shadow-lg">
          <button
            className="absolute top-4 right-4 text-2xl text-gray-800"
            onClick={toggleSidebar}
          >
            <BsX />
          </button>
          <nav className="flex flex-col space-y-4 p-6 pt-20">
            <a
              href="/home"
              onClick={() => handleButtonClick("Home")}
              className={`text-lg font-medium ${
                activeButton === "Home"
                  ? "bg-[#14044c] text-white"
                  : "text-[#14044c]"
              } py-2 px-4 rounded-lg`}
            >
              Home
            </a>
            <a
              href="/my-feed"
              onClick={() => handleButtonClick("Feeds")}
              className={`text-lg font-medium ${
                activeButton === "Feeds"
                  ? "bg-[#14044c] text-white"
                  : "text-[#14044c]"
              } py-2 px-4 rounded-lg`}
            >
              Feeds
            </a>
            <a
              href="/search"
              onClick={() => handleButtonClick("Users")}
              className={`text-lg font-medium ${
                activeButton === "Users"
                  ? "bg-[#14044c] text-white"
                  : "text-[#14044c]"
              } py-2 px-4 rounded-lg`}
            >
              Users
            </a>
            <a
              href="/profile"
              onClick={() => handleButtonClick("Profile")}
              className={`text-lg font-medium ${
                activeButton === "Profile"
                  ? "bg-[#14044c] text-white"
                  : "text-[#14044c]"
              } py-2 px-4 rounded-lg`}
            >
              Profile
            </a>

            {/* Conditionally render Admin button */}
            {isAdmin && (
              <a
                href="#"
                onClick={() => handleButtonClick("Admin")}
                className={`text-lg font-medium ${
                  activeButton === "Admin"
                    ? "bg-[#14044c] text-white"
                    : "text-[#14044c]"
                } py-2 px-4 rounded-lg`}
              >
                Admin
              </a>
            )}
          </nav>
>>>>>>> Stashed changes
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