import PropTypes from 'prop-types';
import { useState } from "react";
import { BsMoonFill, BsSunFill, BsSearch, BsX, BsList } from "react-icons/bs"; // Added BsList for hamburger menu
import matchifyLogo from "../assets/matchify_logo.png"; // Adjust the path according to your folder structure

const Header = ({ darkMode, setDarkMode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // To track the state of the search bar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // To track sidebar visibility
  const [activeButton, setActiveButton] = useState("Home"); // Track the active button

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setIsSidebarOpen(false); // Close sidebar when navigating
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle the search bar on click
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
    setIsSearchOpen(false); // Close search when sidebar is closed
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap px-10 py-4 ${
          darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        } shadow-md`}
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <img
            src={matchifyLogo}
            alt="Matchify Logo"
            className="h-10 object-contain"
          />
          <h2
            className={`text-3xl font-bold leading-tight tracking-[-0.015em] ${
              darkMode ? "text-white" : "text-[#14044c]"
            }`}
          >
            Matchify
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-5">
          <a
            href="#"
            onClick={() => handleButtonClick("Home")}
            className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
              activeButton === "Home"
                ? darkMode
                  ? "bg-[#e6e2eb] text-gray-900"
                  : "bg-[#14044c] text-white"
                : darkMode
                ? "text-white hover:bg-[#e6e2eb] hover:text-gray-900"
                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
            }`}
          >
            Home
          </a>
          <a
            href="#"
            onClick={() => handleButtonClick("Feeds")}
            className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
              activeButton === "Feeds"
                ? darkMode
                  ? "bg-[#e6e2eb] text-gray-900"
                  : "bg-[#14044c] text-white"
                : darkMode
                ? "text-white hover:bg-[#e6e2eb] hover:text-gray-900"
                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
            }`}
          >
            Feeds
          </a>
          <a
            href="#"
            onClick={() => handleButtonClick("Users")}
            className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
              activeButton === "Users"
                ? darkMode
                  ? "bg-[#e6e2eb] text-gray-900"
                  : "bg-[#14044c] text-white"
                : darkMode
                ? "text-white hover:bg-[#e6e2eb] hover:text-gray-900"
                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
            }`}
          >
            Users
          </a>
          <a
            href="#"
            onClick={() => handleButtonClick("Profile")}
            className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
              activeButton === "Profile"
                ? darkMode
                  ? "bg-[#e6e2eb] text-gray-900"
                  : "bg-[#14044c] text-white"
                : darkMode
                ? "text-white hover:bg-[#e6e2eb] hover:text-gray-900"
                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
            }`}
          >
            Profile
          </a>
        </nav>

        {/* Search Button / Search Bar, Dark Mode Toggle, and Profile Photo */}
        <div className="flex items-center space-x-4">
          {!isSearchOpen ? (
            <button
              onClick={handleSearchClick}
              className={`flex items-center  hover:text-[#33527A] transition duration-300 ${
                darkMode ? "text-[#e6e2eb]" : "text-[#14044c]"
              }` }
            >
              <BsSearch size={24} />
            </button>
          ) : (
            <div
              className={`relative w-full md:w-96 flex items-center border-2 ${
                darkMode ? "border-[#e6e2eb]" : "border-[#14044c]"
              } rounded-xl`}
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BsSearch
                  className={`${darkMode ? "text-white" : "text-[#e6e2eb]"}`}
                />
              </div>
              <input
                type="text"
                placeholder="Search for articles, ads, or people"
                className={`block w-full pl-10 p-2.5 rounded-xl shadow-sm focus:outline-none focus:ring-[#14044c] focus:border-[#14044c] ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-[#FFFAFA] text-[#14044c] border-[#14044c]"
                }`}
              />
              <button
                onClick={handleSearchClick}
                className="absolute right-0 mr-4"
              >
                <BsX
                  className={`${darkMode ? "text-white" : "text-[#14044c]"}`}
                  size={24}
                />
              </button>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <div
            onClick={toggleDarkMode}
            className={`relative w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
              darkMode ? "bg-gray-600" : "bg-gray-200"
            }`}
          >
            <div
              className={`absolute left-1 h-6 w-6 bg-white rounded-full shadow-md transform ${
                darkMode ? "translate-x-full" : ""
              } transition-transform duration-300 ease-in-out`}
            >
              {darkMode ? (
                <BsMoonFill className="text-[#14044c] absolute inset-0 m-auto" />
              ) : (
                <BsSunFill className="text-[#14044c] absolute inset-0 m-auto" />
              )}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="bg-[#14044c] text-white flex items-center justify-center rounded-full h-10 w-10 border border-[#14044c]">
            {/* Placeholder for initials (or user profile image if needed) */}
            <span className="text-lg font-bold">NH</span>
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
              href="#"
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
              href="#"
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
              href="#"
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
              href="#"
              onClick={() => handleButtonClick("Profile")}
              className={`text-lg font-medium ${
                activeButton === "Profile"
                  ? "bg-[#14044c] text-white"
                  : "text-[#14044c]"
              } py-2 px-4 rounded-lg`}
            >
              Profile
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};
Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired, 
};
export default Header;
