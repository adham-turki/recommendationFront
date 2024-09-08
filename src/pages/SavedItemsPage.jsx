import { useState, useEffect } from "react";
import { FaBookmark, FaLaptopCode, FaFlask, FaHeartbeat, FaBrain, FaUsers, FaPalette, FaPencilAlt, FaBook } from "react-icons/fa";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SavedItemsPage = () => {
  const [savedItems, setSavedItems] = useState([
    {
      saved_item_id: 1,
      title: 'Learning JavaScript Basics',
      description: 'A beginner-friendly tutorial on learning JavaScript.',
      imageUrl: 'https://via.placeholder.com/50', // Example image URL
      category: 'Technology',
    },
    {
      saved_item_id: 2,
      title: 'Understanding Mental Health',
      description: 'An article on the importance of mental health awareness.',
      imageUrl: 'https://via.placeholder.com/50', // Example image URL
      category: 'Health',
    }
  ]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        setLoading(true);
        setLoading(false);
      } catch (err) {
        setError("Error fetching saved items");
        setLoading(false);
      }
    };

    fetchSavedItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      setSavedItems(savedItems.filter(item => item.saved_item_id !== itemId));
    } catch (err) {
      setError("Error removing saved item");
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const categories = [
    { name: "All", icon: <FaBook /> },
    { name: "Technology", icon: <FaLaptopCode /> },
    { name: "Science", icon: <FaFlask /> },
    { name: "Health", icon: <FaHeartbeat /> },
    { name: "Psychology", icon: <FaBrain /> },
    { name: "Society", icon: <FaUsers /> },
    { name: "Art", icon: <FaPalette /> },
    { name: "Design", icon: <FaPencilAlt /> },
    { name: "Writing", icon: <FaBook /> },
  ];

  const filteredItems = Array.isArray(savedItems)
    ? activeCategory === "All"
      ? savedItems
      : savedItems.filter(item => item.category === activeCategory)
    : [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex p-4 bg-slate-50" style={{ paddingTop: '100px' }}>
        <aside className="w-1/4 p-4">
          <h2 className="text-lg font-bold text-[#14044c] mb-4">Categories</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
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

        <main className="w-3/4 p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-[#14044c]">{activeCategory} saved items</h1>
          <ul>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <li
                  key={item.saved_item_id}
                  className="flex justify-between items-center mb-4 p-4 rounded-lg bg-white shadow-md"
                >
                  <div className="flex items-center">
                    <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded-md mr-4" />
                    <div>
                      <h2 className="text-lg font-semibold text-[#14044c]">{item.title}</h2>
                      <p className="text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <button
                    className="text-[#14044c] hover:text-[#5342a9] transition duration-300"
                    onClick={() => handleRemoveItem(item.saved_item_id)}
                  >
                    <FaBookmark className="w-6 h-6" />
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No items found in this category.</p>
            )}
          </ul>
        </main>
      </div>
      
      {/* Full-width Footer */}
      <Footer className="w-full bg-white border-t border-gray-200" />
    </div>
  );
};

export default SavedItemsPage;
