import { useState, useEffect } from "react";
import { FaBookmark, FaFileAlt, FaVideo, FaFilm, FaBook } from "react-icons/fa";
import Footer from "../components/Footer";
import { RiArticleLine } from "react-icons/ri";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import { BiCameraMovie } from "react-icons/bi";
import { useSelector } from "react-redux";

const SavedItemsPage = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item for details
  const darkMode = useSelector((state) => state.darkMode.isDarkMode); // Access dark mode state
  const userData = useSelector((state) => state.users.user); // Ensure path matches the slice name



 

  // Handle item removal
  const handleRemoveItem = (itemId) => {
    fetchRemoveItem(itemId);
    setSavedItems(savedItems.filter((item) => item.saved_item_id !== itemId));
    if (selectedItem && selectedItem.saved_item_id === itemId) {
      setSelectedItem(null); // If the selected item is removed, reset it
    }
  };

  // // Fetch saved items from the backend
  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        if (userData) {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API}/users/${userData.user_id}/saved-items`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch saved items");
        }

        const data = await response.json();
        

        

        setSavedItems(data);
      }
      } catch (err) {
        setError("Error fetching saved items");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedItems();
  }, [userData]);

  // // Handle item removal
  const fetchRemoveItem = async (itemId) => {
    try {
      // Send DELETE request to remove the saved item
      const response = await fetch(`${import.meta.env.VITE_API}/saved-items/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete saved item");
      }

    } catch (err) {
      setError("Error removing saved item");
      console.error(err);
    }
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
    { name: "youtube", icon: <FaVideo /> },
    { name: "Movie", icon: <FaFilm /> },
  ];

  // Map the item type to its corresponding icon
  const getItemIcon = (type) => {
    console.log(savedItems)

    switch (type) {
      case "article":
        return <FaFileAlt className={`w-8 h-8 ${darkMode ? "text-gray-300" : "text-[#14044c]"}`} />;
      case "youtube":
        return <FaVideo className={`w-8 h-8 ${darkMode ? "text-gray-300" : "text-[#14044c]"}`} />;
      case "movie":
        return <FaFilm className={`w-8 h-8 ${darkMode ? "text-gray-300" : "text-[#14044c]"}`} />;
      default:
        return <FaBookmark className={`w-8 h-8 ${darkMode ? "text-gray-300" : "text-[#14044c]"}`} />;
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
    setSelectedItem((prevItem) =>
      prevItem && prevItem.saved_item_id === item.saved_item_id ? null : item
    ); // Toggle the item selection
    
  };

  // Render different views based on the selected item's type
  const renderSelectedItemDetails = (item) => {
    if (!item) return null;

    return (
      <div className={`border rounded-2xl shadow-lg p-4 mt-2 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        {item.type === "article" ? (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#14044c]">
            <RiArticleLine className={`text-2xl mr-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            {item.title}
            </h3>
            <p className="text-sm mt-2 text-gray-700">
              {item.timestamp}...{" "}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-blue-700 underline hover:text-blue-700 ${darkMode ? "text-blue-400" : ""}`}
              >
                Read more
              </a>
            </p>
            {item.urlImage && (
              <img
                src={item.urlImage}
                alt={item.title}
                className="w-[500px] h-[250px] object-cover mt-4"
              />
            )}
          </div>
        ) : item.type === "youtube" ? (
          <div>
            <h3 className={`text-lg font-semibold mb-2  ${darkMode ? "text-white" : "text-[#14044c] "}`}>
            <TiSocialYoutubeCircular className={`text-3xl mr-2 ${darkMode ? "text-red-400" : "text-red-600"}`} />
            {item.title}
            </h3>
            <iframe
              width="100%"
              height="350"
              src={item.url.replace("watch?v=", "embed/")}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : item.type === "movie" ? (
          <div>
            <h3 className={`text-lg font-semibold mb-2  ${darkMode ? "text-white" : "text-[#14044c] "}`}>
            <BiCameraMovie className={`text-3xl mr-2 ${darkMode ? "text-orange-400" : "text-orange-500"}`} />
            {item.title}
            </h3>
            <img
              src={item.urlImage}
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
    <div className={`flex flex-col min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>

      {/* Add padding below header */}
      <div
        className={`flex-grow flex flex-col lg:flex-row p-4 ${darkMode ? "bg-gray-900" : "bg-[#f6f1fa]"}`}
        style={{ paddingTop: "120px" }}
      >
        {/* Horizontal category slider for small and medium screens */}
        <div className={`lg:hidden mb-4 ${darkMode ? "bg-gray-800" : "bg-[#f6f1fa]"} `}>
          {/* "Type" Label */}
          <h2 className={`text-lg font-bold  ${darkMode ? "text-white" : "text-[#14044c] "} mb-2`}>Type</h2>

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
        <aside className={`lg:w-1/4 w-full lg:pr-4 mb-4 lg:mb-0 hidden lg:block ${darkMode ? "bg-gray-900" : "bg-[#f6f1fa]"}`}>
  <div className={`p-4 rounded-lg shadow-md ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
    <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-[#14044c]"}`}>Type</h2>
    <ul className="space-y-2">
      {categories.map((category, index) => (
        <li
        key={index}
        className={`flex items-center space-x-2 cursor-pointer py-2 px-3 rounded-md transition duration-300 ${
          activeCategory === category.name
            ? `${darkMode ? "bg-gray-700 text-[#e6e2eb]" : "bg-[#e6e2eb] text-[#14044c]"}`
            : `${darkMode ? "text-gray-400 hover:bg-gray-700 hover:text-[#e6e2eb]" : "text-[#14044c] hover:bg-[#e6e2eb] hover:text-[#14044c]"}`
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
        <main className={`lg:w-3/4 w-full p-4  ${darkMode ? "bg-gray-800 " : "bg-white "} rounded-lg shadow-lg`}>
          {/* Dynamic Title */}
          <h1 className={`text-3xl font-bold mb-2  ${darkMode ? "text-white" : "text-[#14044c] "}`}>
            {getDynamicTitle()}
          </h1>

          {/* Fixed height for the saved items container */}
          <div className={`h-96 overflow-y-auto `}>
            <ul>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <li key={item.saved_item_id}>
                    <div
                      className={`flex justify-between items-center mb-4 p-4 rounded-lg ${darkMode ? "bg-gray-900 hover:bg-gray-700" : "bg-white hover:bg-[#f6f1fa]"}  shadow-md  transition duration-300 transform cursor-pointer ${
                        selectedItem &&
                        selectedItem.saved_item_id === item.saved_item_id
                          ? "bg-[#e6e2eb]"
                          : ""
                      }`}
                      onClick={() => handleItemClick(item)} // Set the selected item on click
                    >
                      <div className="flex items-center">
                        {getItemIcon(item.type)}
                        <div className="ml-4">
                          <h2 className={`text-lg font-semibold  ${darkMode ? "text-white" : "text-[#14044c] "}`}>
                            {item.title}
                          </h2>
                          <p className="text-gray-500">{item.timestamp}</p>
                        </div>
                      </div>
                      <button
                        className={`${darkMode ? "text-white" : "text-[#14044c] "} hover:text-[#5342a9] transition duration-300 px-3 py-2 text-sm md:px-6 md:py-2 md:text-base`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent item click event from firing
                          handleRemoveItem(item.saved_item_id);
                        }}
                      >
                        <FaBookmark className="w-4 h-4 md:w-6 md:h-6" />
                      </button>
                    </div>

                    {/* Render details for selected item */}
                    {selectedItem &&
                      selectedItem.saved_item_id === item.saved_item_id && (
                        <div className="pl-4">
                          {renderSelectedItemDetails(selectedItem)}
                        </div>
                      )}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">
                  No items found in this category.
                </p>
              )}
            </ul>
          </div>
        </main>
      </div>

      {/* Full-width Footer */}
      <Footer className="w-full bg-white border-t border-gray-200" />
    </div>
  );
};

export default SavedItemsPage;