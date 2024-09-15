
// export default HistoryPage;
import { useState, useEffect } from "react";
import { MdSort } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaThumbsUp, FaThumbsDown, FaShareAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from '../components/Footer';
import { useSelector } from "react-redux";
import axios from "axios";

// Sample static data
const staticHistoryItems = [
  {
    content_id: 1,
    title: "Sample History Item 1",
    type: "like",
    date: "2024-09-01T12:00:00Z",
    thumbnail: "/path/to/sample-image1.jpg",
    videoUrl: "https://example.com/video1" // Added video URL for demonstration
  },
  {
    content_id: 2,
    title: "Sample History Item 2",
    type: "dislike",
    date: "2024-09-02T14:00:00Z",
    thumbnail: "/path/to/sample-image2.jpg",
    videoUrl: "https://example.com/video2" // Added video URL for demonstration
  },
  {
    content_id: 3,
    title: "Sample History Item 3",
    type: "share",
    date: "2024-09-03T16:00:00Z",
    thumbnail: "/path/to/sample-image3.jpg",
    videoUrl: "https://example.com/video3" // Added video URL for demonstration
  }
];

const HistoryPage = () => {
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode); // Access dark mode state


  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      setError(null);
      try {
        // Build query parameters dynamically based on filter and dates
        const params = new URLSearchParams();
        if (startDate) params.append("date_range_start", startDate.toISOString().split("T")[0]);
        if (endDate) params.append("date_range_end", endDate.toISOString().split("T")[0]);
        if (filter !== "all") params.append("type", filter);


        const response = await fetch(`${import.meta.env.VITE_API}/history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        
        setHistoryItems(data);
        if(data.length === 0) {
          console.log("first")
          setHistoryItems(staticHistoryItems);
        }
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
        // Use static data as a fallback
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredItems = historyItems
    .filter((item) => {
      if (filter === "all") return true;
      return item.type === filter;
    })
    .filter((item) => {
      if (startDate && endDate) {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      }
      return true;
    })
    .sort((a, b) => (sortOrder === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)));


  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-[#e6e2eb]"} transition-colors duration-300`}>
      <main className="pt-20 pb-16"> {/* Adjust padding to avoid overlap */}
        <header className="mb-6">
        <h1 className={`text-4xl font-extrabold mb-6 ml-24 ${darkMode ? "text-gray-100" : "text-[#14044c]"}`}>History</h1>

          <div className="max-w-4xl mx-auto flex flex-col space-y-6">
            {/* Filter and Sort */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center border-b border-gray-400 pb-2">
                <div className="flex space-x-6">
                  {/* Filter Options */}
                  <div
                    onClick={() => setFilter("all")}
                    className={`cursor-pointer flex items-center px-4 py-2 rounded-lg ${
                      filter === "all" ? "bg-[#c293dd] text-white" : "hover:bg-[#d3b6e6]"
                    } ${darkMode ? "text-white" : "text-[#14044c]"} transition-all duration-300`}
                  >
                    <span className="text-lg">All</span>
                  </div>
                  <div
                    onClick={() => setFilter("like")}
                    className={`cursor-pointer flex items-center px-4 py-2 rounded-lg ${
                      filter === "like" ? "bg-[#c293dd] text-white" : "hover:bg-[#d3b6e6]"
                    } ${darkMode ? "text-white" : "text-[#14044c]"} transition-all duration-300`}
                  >
                    <FaThumbsUp className={`text-lg ${filter === "like" ? "text-white" : "text-[#14044c]"} ${darkMode ? "text-white" : "text-[#14044c]"} `} />
                    <span className="ml-2 text-lg">Like</span>
                  </div>

                  <div
                    onClick={() => setFilter("dislike")}
                    className={`cursor-pointer flex items-center px-4 py-2 rounded-lg ${
                      filter === "dislike" ? "bg-[#c293dd] text-white" : "hover:bg-[#d3b6e6]"
                    } ${darkMode ? "text-white" : "text-[#14044c]"} transition-all duration-300`}
                  >
                    
                    <FaThumbsDown className={`text-lg ${filter === "dislike" ? "text-white" : "text-[#14044c]"}  ${darkMode ? "text-white" : "text-[#14044c]"}`} />
                    <span className="ml-2 text-lg">Dislike</span>
                  </div>

                  <div
                    onClick={() => setFilter("share")}
                    className={`cursor-pointer flex items-center px-4 py-2 rounded-lg ${
                      filter === "share" ? "bg-[#c293dd] text-white" : "hover:bg-[#d3b6e6]"
                    } ${darkMode ? "text-white" : "text-[#14044c]"} transition-all duration-300`}
                  >
                    <FaShareAlt className={`text-lg ${filter === "share" ? "text-white" : "text-[#14044c]"}${darkMode ? "text-white" : "text-[#14044c]"}`} />
                    <span className="ml-2 text-lg">Share</span>
                  </div>

                 
                </div>

                {/* Sort by Date */}
                <div
                  onClick={() => setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))}
                  className={`ml-auto cursor-pointer flex items-center px-4 py-2 rounded-lg ${darkMode ? "text-gray-100 hover:bg-gray-800" : "text-[#14044c] hover:bg-[#c293dd]"} transition-all duration-300`}
                >
                  <span className="text-lg">Sort by Date</span>
                  <MdSort
                    className={`text-2xl ml-2 ${sortOrder === "asc" ? "transform rotate-180" : ""} transition-transform duration-300`}
                  />
                </div>
              </div>

              {/* Date Pickers */}
              <div className="flex space-x-6 mb-4">
                {[{ date: startDate, setDate: setStartDate, label: "Start Date" }, { date: endDate, setDate: setEndDate, label: "End Date" }].map(
                  ({ date, setDate, label }, idx) => (
                    <div className="relative flex-1" key={idx}>
                      <DatePicker
                        selected={date}
                        onChange={(selectedDate) => setDate(selectedDate)}
                        customInput={
                          <div className="relative w-full">
                            <input
                              type="text"
                              value={date ? date.toLocaleDateString() : ""}
                              readOnly
                              className={`w-full px-4 py-3 border-2 rounded-lg shadow-lg focus:outline-none placeholder:text-[#a4a4a4] pl-10 ${darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-[#14044c] border-[#d1c8f3]"}`}
                              placeholder={label}
                            />
                            <div className="absolute top-0 left-0 flex items-center pl-3 h-full pointer-events-none">
                            <AiOutlineCalendar className={`text-xl ${darkMode ? "text-gray-100" : "text-[#14044c]"}`} />
                            </div>
                          </div>
                        }
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </header>

        <section className="max-w-4xl mx-auto">
          {loading ? (
            <p className="text-center text-lg">Loading...</p>
          ) : error ? (
            <p className="text-center text-lg text-red-600">{error}</p>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.content_id}
                  className={`flex items-center p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-[#14044c]"}`}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-[#14044c]"}`}>{item.title}</h2>
                    <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{new Date(item.date).toLocaleString()}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      {item.type === "like" && <FaThumbsUp className="text-green-500" />}
                      {item.type === "dislike" && <FaThumbsDown className="text-red-500" />}
                      {item.type === "share" && <FaShareAlt className="text-blue-500" />}
                    </div>
                  </div>
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 bg-[#14044c] text-white px-4 py-2 rounded-lg hover:bg-[#a982d6] transition-all duration-300"
                  >
                    
                    Watch Now
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer  className ="mt-96 "/> 
    </div>
  );
};

export default HistoryPage;
