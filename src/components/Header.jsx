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
            className={`no-underline !no-underline text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
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
            className={`no-underline !no-underline  text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
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
            className={`no-underline !no-underline text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
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
            className={`no-underline !no-underline text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
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
              className={`no-underline !no-underline text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
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
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer no-underline !no-underline"
                    >
                      History
                    </a>
                  </li>
                  <li>
                    <a
                      href="/saved-items"
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer no-underline !no-underline"
                    >
                      Saved Items
                    </a>
                  </li>
                  <hr className="my-2 border-gray-300" />
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-red-600 hover:bg-red-100 cursor-pointer font-semibold no-underline !no-underline"
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
              href="/"
              onClick={() => handleButtonClick("Home")}
              className={`no-underline !no-underline text-lg font-medium ${
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
              className={`no-underline !no-underline text-lg font-medium ${
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
              className={`no-underline !no-underline text-lg font-medium ${
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
              className={`no-underline !no-underline  text-lg font-medium ${
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
                className={`no-underline !no-underline text-lg font-medium ${
                  activeButton === "Admin"
                    ? "bg-[#14044c] text-white"
                    : "text-[#14044c]"
                } py-2 px-4 rounded-lg`}
              >
                Admin
              </a>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
