import { useState, useEffect } from "react";
import { FaBookmark, FaFileAlt, FaVideo, FaFilm, FaBook } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { RiArticleLine } from "react-icons/ri";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import { BiCameraMovie } from "react-icons/bi";

const SavedItemsPage = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item for details

  // Use mock data instead of fetching from the backend
  useEffect(() => {
    // Use mock data instead
    const mockData = [
      {
        saved_item_id: 1,
        title: "How to Learn JavaScript",
        description: `Saved on ${new Date().toLocaleString()}`,
        type: "article",
        url: "https://example.com/article/javascript",
        image_url: "https://example.com/images/javascript.jpg",
      },
      {
        saved_item_id: 2,
        title: "React Tutorial",
        description: `Saved on ${new Date().toLocaleString()}`,
        type: "video",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      {
        saved_item_id: 3,
        title: "The Inception Movie",
        description: `Saved on ${new Date().toLocaleString()}`,
        type: "movie",
        Poster: "https://example.com/images/inception.jpg",
      },
      {
        saved_item_id: 4,
        title: "Web Development Trends",
        description: `Saved on ${new Date().toLocaleString()}`,
        type: "article",
        url: "https://example.com/article/webdev",
        image_url: "https://example.com/images/webdev.jpg",
      },
    ];

    // Set mock data
    setSavedItems(mockData);
    setLoading(false);
  }, []);

  // Handle item removal
  const handleRemoveItem = (itemId) => {
    setSavedItems(savedItems.filter((item) => item.saved_item_id !== itemId));
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setSelectedItem(null); // Reset selected item when changing category
  };

  // Define the categories based on the type of saved items
  const categories = [
    { name: "All", icon: <FaBook /> },
    { name: "Article", icon: <FaFileAlt /> },
    { name: "Video", icon: <FaVideo /> },
    { name: "Movie", icon: <FaFilm /> },
  ];

  // Map the item type to its corresponding icon
  const getItemIcon = (type) => {
    switch (type) {
      case "article":
        return <FaFileAlt className="w-8 h-8 text-[#14044c]" />;
      case "video":
        return <FaVideo className="w-8 h-8 text-[#14044c]" />;
      case "movie":
        return <FaFilm className="w-8 h-8 text-[#14044c]" />;
      default:
        return <FaBookmark className="w-8 h-8 text-[#14044c]" />;
    }
  };

  // Get the dynamic title based on the selected category
  const getDynamicTitle = () => {
    if (activeCategory === "All") {
      return "All Saved Items";
    }
    return `Saved ${activeCategory}s`;
  };

  // Filter saved items based on the selected category/type
  const filteredItems = Array.isArray(savedItems)
    ? activeCategory === "All"
      ? savedItems
      : savedItems.filter((item) => item.type === activeCategory.toLowerCase())
    : [];

  // Handle click on an item to display its details
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Render different views based on the selected item's type
  const renderSelectedItemDetails = (item) => {
    if (!item) return null;

    return (
      <div className="border border-gray-300 rounded-2xl shadow-lg bg-white p-4 mt-6">
        {item.type === "article" ? (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#14044c]">
              <RiArticleLine className="text-blue-600 text-2xl mr-2" />
              {item.title}
            </h3>
            <p className="text-sm mt-2 text-gray-700">
              {item.description}...{" "}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline hover:text-blue-700"
              >
                Read more
              </a>
            </p>
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="w-[500px] h-[250px] object-cover mt-4"
              />
            )}
          </div>
        ) : item.type === "video" ? (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#14044c]">
              <TiSocialYoutubeCircular className="text-red-600 text-3xl mr-2" />
              {item.title}
            </h3>
            <iframe
              width="100%"
              height="350"
              src={item.url.replace("watch?v=", "embed/")}
              title={item.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : item.type === "movie" ? (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#14044c]">
              <BiCameraMovie className="text-orange-500 text-3xl mr-2" />
              {item.title}
            </h3>
            <img
              src={item.Poster}
              alt={item.title}
              className="w-[300px] h-[450px] object-cover mt-4"
            />
          </div>
        ) : null}
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Add padding below header */}
      <div
        className="flex-grow flex flex-col lg:flex-row p-4 bg-[#f6f1fa]"
        style={{ paddingTop: "120px" }}
      >
        {/* Horizontal category slider for small and medium screens */}
        <div className="lg:hidden mb-4">
          {/* "Type" Label */}
          <h2 className="text-lg font-bold text-[#14044c] mb-2">Type</h2>

          {/* Horizontal Scrollable Buttons */}
          <div className="flex justify-start overflow-x-auto space-x-4 bg-white p-4 rounded-lg shadow-md">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300 ${
                  activeCategory === category.name
                    ? "bg-[#e6e2eb] text-[#14044c]"
                    : "bg-[#f6f1fa] hover:bg-[#e6e2eb] hover:text-[#14044c]"
                }`}
              >
                {category.icon}
                <span className="font-semibold">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Sidebar for large screens only */}
        <aside className="lg:w-1/4 w-full lg:pr-4 mb-4 lg:mb-0 hidden lg:block">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-[#14044c] mb-4">Type</h2>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-md transition duration-300 ${
                    activeCategory === category.name
                      ? "bg-[#e6e2eb] text-[#14044c]"
                      : "text-[#14044c] hover:bg-[#e6e2eb] hover:text-[#14044c]"
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.icon}
                  <span className="font-semibold">{category.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/* Main Content */}
        <main className="lg:w-3/4 w-full p-4 bg-white rounded-lg shadow-lg">
          {/* Dynamic Title */}
          <h1 className="text-3xl font-bold mb-2 text-[#14044c]">
            {getDynamicTitle()}
          </h1>

          {/* Fixed height for the saved items container */}
          <div className="h-96 overflow-y-auto">
            <ul>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <li
                    key={item.saved_item_id}
                    className="flex justify-between items-center mb-4 p-4 rounded-lg bg-white shadow-md hover:bg-[#f6f1fa] transition duration-300 transform hover:scale-105 cursor-pointer"
                    onClick={() => handleItemClick(item)} // Set the selected item on click
                  >
                    <div className="flex items-center">
                      {getItemIcon(item.type)}
                      <div className="ml-4">
                        <h2 className="text-lg font-semibold text-[#14044c]">
                          {item.title}
                        </h2>
                        <p className="text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <button
                      className="text-[#14044c] hover:text-[#5342a9] transition duration-300 px-3 py-2 text-sm md:px-6 md:py-2 md:text-base"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent item click event from firing
                        handleRemoveItem(item.saved_item_id);
                      }}
                    >
                      <FaBookmark className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">
                  No items found in this category.
                </p>
              )}
            </ul>
          </div>

          {/* Display selected item details */}
          {renderSelectedItemDetails(selectedItem)}
        </main>
      </div>

      {/* Full-width Footer */}
      <Footer className="w-full bg-white border-t border-gray-200" />
    </div>
  );
};

export default SavedItemsPage;
