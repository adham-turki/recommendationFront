import "../App.css";
import "../index.css";
// import Footer from "../components/Footer";
import NewspaperHeader from "../components/NewspaperHeader";
import YouTubeVideo from "../components/YouTubeVideo";
import { useNavigate } from "react-router-dom";
import ServicesSection from "../components/ServicesSection";



import { useState } from "react";
import { BsMoonFill, BsSunFill, BsSearch, BsX, BsList } from "react-icons/bs"; // Added BsList for hamburger menu
import matchifyLogo from "../assets/matchify_logo1.png"; // Adjust the path according to your folder structure
import matchifyLogowhite from  "../assets/matchify_logo_white.png";
const Header2 = () => {
  const [darkMode, setDarkMode] = useState(false);
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
          darkMode ? " border-gray-700" : " border-gray-200"
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
            href="/"
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
            href="/my-feed"
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

        {/* Search Button / Search Bar and Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          {!isSearchOpen ? (
            <button
              onClick={handleSearchClick}
              className="flex items-center text-[#14044c] hover:text-[#33527A] transition duration-300"
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
                  className={`${darkMode ? "text-white" : "text-[#14044c]"}`}
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



const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/my-feed");
  };

  return (
    <div className="flex min-h-[550px] flex-col gap-6 items-center justify-center bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl px-4 pb-10 @[480px]:px-10">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-white  text-6xl font-black  fontleading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
          Welcome to Matchify!
        </h1>
        <h2 className="text-white text-3xl font-medium  font-quicksand  px-20 leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
          For the love of articles, movies, TV, and video games. Get ready for a
          world of exclusive content, from in-depth articles to original videos,
          all tailored to your tastes.
        </h2>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleGetStartedClick}
          className="flex items-center justify-center min-w-[200px] min-h-14 max-w-[200px] cursor-pointer overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#3e237d98] hover:bg-[#382857]  text-white text-2xl font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
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
  return (
    <div className="flex flex-col gap-3 pb-3">
      <div
        className="bg-center bg-no-repeat aspect-video bg-cover rounded-xl "
        style={{ backgroundImage: `url("${image}")` }}
      ></div>
      <div>
        <p className="text-[#1D3557] text-xl font-medium leading-normal">
          {title}
        </p>
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
        className=" pt-10 relative flex size-full min-h-screen flex-col bg-[#f6f1fa] group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5  ">
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
              <NewspaperHeader />

             
            </div>
          </div>
        </div>
      </div>



      <div
        className=" pt-10 relative flex size-full min-h-screen flex-col bg-[#f6f1fa] group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5  ">
            <div className="layout-content-container flex flex-col max-w-full flex-1">
             

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

      {/* <Footer /> */}
    </div>
  );
};

export default Homepage;
