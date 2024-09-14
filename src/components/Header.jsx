
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { BsX, BsList, BsSunFill, BsMoonFill } from "react-icons/bs";
import matchifyLogo from "../assets/matchify_logo1.png";
import { Link, useLocation } from "react-router-dom";
import matchifyLogo_white from "../assets/matchify_logo_white.png";
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../redux/darkModeSlice';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(""); // Start with no active button
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isAdmin = true;
  const location = useLocation();
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();


  // Set the active button based on the current path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/home") setActiveButton("Home");
    else if (path === "/my-feed") setActiveButton("Feeds");
    else if (path === "/search") setActiveButton("Users");
    else if (path === "/profile") setActiveButton("Profile");
    else if (path === "/admin") setActiveButton("Admin");
  }, [location]);


  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set the clicked button as active
    setIsSidebarOpen(false);
  };





  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
  if (window.location.pathname == "/home") {
    return (<></>);
  }
  return (
    <>

      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap px-10 py-4  border-gray-200 ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
          } shadow-md`}
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Logo and Title */}

        <div className="flex items-center ">
          <img
            src={darkMode ? matchifyLogo_white : matchifyLogo}
            alt="Matchify Logo"
            className="h-12 object-contain"

          />
          <h2
            className={`text-3xl cursor-default font-bold leading-tight tracking-[-0.015em] ${darkMode ? "text-white" : "text-[#14044c]"
              }`}
          >
            Matchify
          </h2>

        </div>

        {/* Navigation Links (Right aligned) */}
        <div className="flex space-x-5 ">
          <Link
            to="/home"
            onClick={() => handleButtonClick("Home")}
            className={`hidden custom-md:block text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 !no-underline ${activeButton === "Home"
              ? darkMode
                ? "bg-[#e6e2eb] text-gray-900"
                : "bg-[#14044c] text-white"
              : darkMode
                ? "text-white hover:bg-[#e6e2eb] hover:text-gray-900"

                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
              }`}
          >
            Home
          </Link>
          <Link
            to="/my-feed"

            onClick={() => handleButtonClick("Feeds")}
            className={`hidden custom-md:block text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 !no-underline ${activeButton === "Feeds"
              ? darkMode
                ? "bg-[#e6e2eb] text-gray-900"
                : "bg-[#14044c] text-white"
              : darkMode
                ? "text-white hover:bg-[#e6e2eb] hover:text-gray-900"

                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
              }`}
          >
            Feeds
          </Link>
          <Link
            to="/search"
            onClick={() => handleButtonClick("Users")}
            className={` hidden custom-md:block text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 !no-underline ${activeButton === "Users"
              ? darkMode
                ? "bg-[#e6e2eb] text-gray-900"
                : "bg-[#14044c] text-white"
              : darkMode
                ? "text-white hover:bg-[#e6e2eb] hover:text-gray-900"

                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
              }`}
          >
            Users
          </Link>
          <Link
            to="/profile"
            onClick={() => handleButtonClick("Profile")}
            className={` hidden custom-md:block text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 !no-underline ${activeButton === "Profile"
              ? darkMode
                ? "bg-[#e6e2eb] text-gray-900"
                : "bg-[#14044c] text-white"
              : darkMode
                ? "text-white hover:bg-[#e6e2eb] hover:text-gray-900"

                : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
              }`}
          >
            Profile
          </Link>

          {/* Conditionally render Admin button */}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => handleButtonClick("Admin")}
              className={` hidden custom-md:block text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 !no-underline ${activeButton === "Admin"
                ? darkMode
                  ? "bg-[#e6e2eb] text-gray-900"
                  : "bg-[#14044c] text-white"
                : darkMode
                  ? "text-white hover:bg-[#e6e2eb] hover:text-gray-900"

                  : "text-[#14044c] hover:bg-[#14044c] hover:text-white"
                }`}
            >
              Admin
            </Link>
          )}
          {/* Dark Mode Toggle */}
          <div
            onClick={() => dispatch(toggleDarkMode())}
            className="relative w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            <div
              className={`absolute left-1 h-6 w-6 bg-white rounded-full shadow-md transform !no-underline ${darkMode ? "translate-x-full" : ""
                } transition-transform duration-300 ease-in-out`}
            >
              {darkMode ? (
                <BsMoonFill className="text-[#14044c] absolute inset-0 m-auto" />
              ) : (
                <BsSunFill className="text-[#14044c] absolute inset-0 m-auto" />
              )}
            </div>
          </div>


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
                    <Link
                      to="/history"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"

                    >
                      History
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/saved-items"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"

                    >
                      Saved Items
                    </Link>
                  </li>
                  <hr className="my-2 border-gray-300" />
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer font-semibold"

                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon for Sidebar on Small Screens */}
          <button
            className="custom-md:hidden flex items-center text-[#14044c]"
            onClick={toggleSidebar}
          >
            <BsList size={28} />
          </button>
        </div>
      </header>

      {/* Sidebar for small screens (opens from the right) */}
      <div
        className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
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
            <Link
              to="/"
              onClick={() => handleButtonClick("Home")}
              className={`text-lg font-medium ${activeButton === "Home"
                ? "bg-[#14044c] text-white"
                : "text-[#14044c]"
                } py-2 px-4 rounded-lg`}

            >
              Home
            </Link>
            <Link
              to="/my-feed"
              onClick={() => handleButtonClick("Feeds")}
              className={`text-lg font-medium ${activeButton === "Feeds"
                ? "bg-[#14044c] text-white"
                : "text-[#14044c]"
                } py-2 px-4 rounded-lg`}

            >
              Feeds
            </Link>
            <Link
              to="/search"
              onClick={() => handleButtonClick("Users")}
              className={`text-lg font-medium ${activeButton === "Users"
                ? "bg-[#14044c] text-white"
                : "text-[#14044c]"
                } py-2 px-4 rounded-lg`}

            >
              Users
            </Link>
            <Link
              to="/profile"
              onClick={() => handleButtonClick("Profile")}
              className={`text-lg font-medium ${activeButton === "Profile"
                ? "bg-[#14044c] text-white"
                : "text-[#14044c]"
                } py-2 px-4 rounded-lg`}

            >
              Profile
            </Link>

            {/* Conditionally render Admin button */}
            {isAdmin && (
              <Link
                to="#"
                onClick={() => handleButtonClick("Admin")}
                className={`text-lg font-medium ${activeButton === "Admin"
                  ? "bg-[#14044c] text-white"
                  : "text-[#14044c]"
                  } py-2 px-4 rounded-lg`}

              >
                Admin
              </Link>
            )}
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
