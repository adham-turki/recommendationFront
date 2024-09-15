import "../App.css";
import "../index.css";
import Footer from "../components/Footer";
import YouTubeVideo from "../components/YouTubeVideo";
import { useNavigate } from "react-router-dom";
import ServicesSection from "../components/ServicesSection";
import { useState, useEffect, useRef } from "react";
import { BsMoonFill, BsSunFill, BsSearch, BsX, BsList } from "react-icons/bs"; // Added BsList for hamburger menu
import matchifyLogo from "../assets/matchify_logo1.png"; // Adjust the path according to your folder structure




import matchifyLogowhite from "../assets/matchify_logo_white.png";
import Topmovie2 from "../components/Topmovie2";
import { useSelector } from "react-redux";


const Header2 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const userData = useSelector((state) => state.users.user);
  const isAdmin = userData?.role?.roleName === "ADMIN";


  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    document.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutsideDropdown);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap px-10 py-4 border-gray-200 shadow-md transition-colors duration-300 ${
          scrolled ? "bg-white" : "bg-transparent"
        }`}
        style={{ fontFamily: "'Quicksand', sans-serif" }}
      >
        {/* Logo and Title */}
        <div className="flex items-center">
          <img
            src={matchifyLogo}
            alt="Matchify Logo"
            className="h-12 object-contain"
          />
          <h2
            className={`text-3xl font-bold leading-tight tracking-[-0.015em] ${
              scrolled ? "text-[#14044c]" : "text-white"
            }`}
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
                ? `bg-[#14044c] ${scrolled ? "text-white" : "text-white"}`
                : `${
                    scrolled ? "text-[#14044c]" : "text-white"
                  } hover:bg-[#14044c] hover:text-white`
            }`}
          >
            Home
          </a>
          <a
            href="/my-feed"
            onClick={() => handleButtonClick("Feeds")}
            className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
              activeButton === "Feeds"
                ? `bg-[#14044c] ${scrolled ? "text-white" : "text-white"}`
                : `${
                    scrolled ? "text-[#14044c]" : "text-white"
                  } hover:bg-[#14044c] hover:text-white`
            }`}
          >
            Feeds
          </a>
          <a
            href="/search"
            onClick={() => handleButtonClick("Users")}
            className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
              activeButton === "Users"
                ? `bg-[#14044c] ${scrolled ? "text-white" : "text-white"}`
                : `${
                    scrolled ? "text-[#14044c]" : "text-white"
                  } hover:bg-[#14044c] hover:text-white`
            }`}
          >
            Users
          </a>
          <a
            href="/profile"
            onClick={() => handleButtonClick("Profile")}
            className={`text-lg font-medium leading-normal py-2 px-4 rounded-full transition duration-300 ${
              activeButton === "Profile"
                ? `bg-[#14044c] ${scrolled ? "text-white" : "text-white"}`
                : `${
                    scrolled ? "text-[#14044c]" : "text-white"
                  } hover:bg-[#14044c] hover:text-white`
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
                  ? `bg-[#14044c] ${scrolled ? "text-white" : "text-white"}`
                  : `${
                      scrolled ? "text-[#14044c]" : "text-white"
                    } hover:bg-[#14044c] hover:text-white`
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
              <div className="profile">
                {userData && <img src={userData.profilePicture} alt="Profile" className="rounded-full" />}
              </div> 
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
              href="/"
              onClick={() => handleButtonClick("Home")}
              className={`text-lg font-medium ${
                activeButton === "Home"
                  ? `bg-[#14044c] ${scrolled ? "text-white" : "text-white"}`
                  : `${scrolled ? "text-[#14044c]" : "text-white"}`
              } py-2 px-4 rounded-lg`}
            >
              Home
            </a>
            <a
              href="/my-feed"
              onClick={() => handleButtonClick("Feeds")}
              className={`text-lg font-medium ${
                activeButton === "Feeds"
                  ? `bg-[#14044c] ${scrolled ? "text-white" : "text-white"}`
                  : `${scrolled ? "text-[#14044c]" : "text-white"}`
              } py-2 px-4 rounded-lg`}
            >
              Feeds
            </a>
            <a
              href="/search"
              onClick={() => handleButtonClick("Users")}
              className={`text-lg font-medium ${
                activeButton === "Users"
                  ? `bg-[#14044c] ${scrolled ? "text-white" : "text-white"}`
                  : `${scrolled ? "text-[#14044c]" : "text-white"}`
              } py-2 px-4 rounded-lg`}
            >
              Users
            </a>
            <a
              href="/profile"
              onClick={() => handleButtonClick("Profile")}
              className={`text-lg font-medium ${
                activeButton === "Profile"
                  ? `bg-[#14044c] ${scrolled ? "text-white" : "text-white"}`
                  : `${scrolled ? "text-[#14044c]" : "text-white"}`
              } py-2 px-4 rounded-lg`}
            >
              Profile
            </a>
            {isAdmin && (
              <a
                href="/admin"
                onClick={() => handleButtonClick("Admin")}
                className={`text-lg font-medium ${
                  activeButton === "Admin"
                    ? `bg-[#14044c] ${scrolled ? "text-white" : "text-white"}`
                    : `${scrolled ? "text-[#14044c]" : "text-white"}`
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

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/my-feed");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[550px] bg-center bg-no-repeat bg-cover px-4 pb-10 gap-6 sm:gap-8 sm:px-10 rounded-xl">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-white text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Welcome to Matchify!
        </h1>
        <h2 className="text-white text-lg font-medium px-4 leading-normal sm:text-xl md:text-2xl lg:px-20">
          For the love of articles, movies, TV, and video games. Get ready for a
          world of exclusive content, from in-depth articles to original videos,
          all tailored to your tastes.
        </h2>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleGetStartedClick}
          className="flex items-center justify-center min-w-[150px] min-h-12 max-w-[200px] cursor-pointer rounded-xl px-4 py-2 bg-[#3e237d98] hover:bg-[#382857] text-white text-base font-bold tracking-tight sm:min-w-[200px] sm:px-5 sm:py-3 md:text-lg lg:min-w-[200px] lg:px-6"
        >
          <span className="truncate">Get started</span>
        </button>
      </div>
    </div>
  );
};

const PersonalizedSection = () => {
  const articles = [
    {
      image:
        "https://cdn.usegalileo.ai/stability/9f3511ab-0cf1-4e6c-a9c7-14c80c1427d9.png",
      title: "Meet the cast of The Marvels",
      readTime: 5,
    },
    {
      image:
        "https://cdn.usegalileo.ai/sdxl10/9b3ca3b8-440f-4a3c-8c70-b870bcb841b6.png",
      title: "The best new shows on Netflix",
      readTime: 4,
    },
    {
      image:
        "https://cdn.usegalileo.ai/stability/8844c9e0-d369-4e62-aa27-524c42917bfd.png",
      title: "The 10 best video game villains",
      readTime: 3,
    },
    {
      image:
        "https://cdn.usegalileo.ai/stability/255195ac-7ddf-4416-b970-bea1a7f7d814.png",
      title: "The most anticipated movies of 2023",
      readTime: 7,
    },
    {
      image:
        "https://cdn.usegalileo.ai/sdxl10/36fd406e-b322-451d-9bee-119bfd0914c0.png",
      title: "The 15 greatest TV series finales ever",
      readTime: 6,
    },
  ];

  return (
    <>
      <h2 className="text-[#1D3557] text-[35px] font-bebas-neue leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Most Popular
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </>
  );
};

const ArticleCard = ({ image, title, readTime }) => {
  const searchQuery = encodeURIComponent(title);

  return (
    <div className="flex flex-col gap-3 pb-3">
      <div
        className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
        style={{ backgroundImage: `url("${image}")` }}
      ></div>
      <div>
        <a
          href={`https://www.google.com/search?q=${searchQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1D3557] text-xl font-medium leading-normal hover:underline"
        >
          {title}
        </a>
        <p className="text-[#25303f] text-base font-normal leading-normal">
          {readTime} min read
        </p>
      </div>
    </div>
  );
};

const Homepage = () => {
  const youtubeUrl = "https://www.youtube.com/watch?v=lkkGlVWvkLk"; // Replace with your YouTube video URL

  return (
    <div>
      <div className="bg-[url('./src/assets/pexels-anniroenkae-2.png')] bg-cover">
        <Header2 />

        <HeroSection />
      </div>

      {/* service */}

      <div
        className="pt-10 relative flex min-h-screen flex-col bg-[#f6f1fa] group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex flex-col h-full grow">
          <div className="px-4 sm:px-10 lg:px-40 flex flex-1 justify-center py-5">
            <ServicesSection />
          </div>
        </div>
      </div>

      <div
        className=" pt-10 relative flex size-full min-h-screen flex-col bg-[#b3a1cd] group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <div className=" flex flex-1 justify-center py-5  ">
            <div className="layout-content-container flex flex-col max-w-full flex-1">
              <Topmovie2 />
              {/* <NewspaperHeader/> */}
            </div>
          </div>
        </div>
      </div>

      <div
        className="pt-10 relative flex min-h-screen flex-col bg-[#f6f1fa] group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <div className="flex flex-col h-full grow">
          <div className="px-4 md:px-10 flex flex-1 justify-center py-5">
            <div className="w-full max-w-4xl flex flex-col">
              <PersonalizedSection />
              <YouTubeVideo
                url={youtubeUrl}
                title="Boost Your Focus with 40Hz Gamma Binaural Beats - Enhance Productivity"
                description="Make sure to tune in and elevate your focus today!"
              />
            </div>
          </div>
        </div>
      </div>


      <div>
        <Footer />
      </div>

    </div>
  );
};

export default Homepage;
