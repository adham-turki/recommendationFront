// export default HistoryPage;
import { useState, useEffect } from "react";
import { MdSort } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaList, FaExternalLinkAlt, FaVideo } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import axios from "axios";

const HistoryPage = () => {
  const [filter, setFilter] = useState("All");
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
        if (startDate)
          params.append(
            "date_range_start",
            startDate.toISOString().split("T")[0]
          );
        if (endDate)
          params.append("date_range_end", endDate.toISOString().split("T")[0]);
        if (filter !== "all") params.append("interactionType", filter);

        const response = await fetch(`${import.meta.env.VITE_API}/history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        setHistoryItems(data);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  const filteredItems = historyItems
    .filter((item) => {
      if (filter === "All") return true;
      return item.interactionType=== filter;
    })
    .filter((item) => {
      if (startDate && endDate) {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      }
      return true;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-[#e6e2eb]"
      } transition-colors duration-300`}>
      <main className="pt-20 pb-16">
        {" "}
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          {" "}

          <header className="mb-6">
            <h1 className={`text-4xl font-extrabold  mt-5 mb-6 ${darkMode ? "text-gray-100" : "text-[#14044c]"
              }`}
            >
              History
            </h1>

            <div className="max-w-4xl mx-auto flex flex-col space-y-6 px-4 sm:px-0">
              {/* Filter and Sort Options */}
              <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap items-center border-b border-gray-400 pb-2">
                  <div className="flex flex-wrap space-x-2 md:space-x-6  md:mb-0">
                    {/* Filter Options */}
                    {["All", "like", "dislike", "share"].map((filterType) => {
                      const icons = {
                        like: <FaThumbsUp />,
                        dislike: <FaThumbsDown />,
                        share: <FaShareAlt />,
                        All: <FaList />,
                      };

                      return (
                        <div
                          key={filterType}
                          onClick={() => setFilter(filterType)}
                          className={`cursor-pointer flex items-center px-4 py-2 rounded-lg ${filter === filterType
                            ? `${darkMode ? "bg-gray-800 text-white" : "bg-[#14044c] text-white"}`
                            : `${darkMode ? "text-white hover:bg-gray-700 hover:text-white" : "text-[#14044c] hover:bg-[#14044c] hover:text-white"}`
                            } transition-all duration-300`}
                        // Adjust text and icon size based on screen width
                        >
                          {icons[filterType] && (
                            <div
                              className={`text-lg md:text-xl lg:text-2xl mr-2 ${filterType === "All" ? "lg:mr-3" : ""
                                }`}
                            >
                              {icons[filterType]}
                            </div>
                          )}
                          {/* Show text only on medium screens and larger */}
                          <span
                            className={`text-sm md:text-base lg:text-lg ${window.innerWidth < 600 ? "hidden" : ""
                              }`}
                          >
                            {filterType}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sort by Date */}
                  <div
                    onClick={() =>
                      setSortOrder((prevOrder) =>
                        prevOrder === "asc" ? "desc" : "asc"
                      )
                    }
                    className="cursor-pointer flex items-center px-4 py-2 text-[#14044c] rounded-lg hover:bg-[#14044c] hover:text-white transition-all duration-300"
                    style={{ marginLeft: "auto" }} // Align right
                  >
                    <span
                      className={`text-sm md:text-base lg:text-lg ${darkMode
                        ? "text-gray-100 hover:bg-gray-800"
                        : "text-[#14044c] hover:bg-[#c293dd]"
                        } ${window.innerWidth < 600 ? "hidden" : ""}`}
                    >
                      Sort by Date
                    </span>
                    <MdSort
                      className={`text-xl md:text-2xl lg:text-3xl ${darkMode ? "text-white"  : "text-[#14044c]"} ml-2 ${sortOrder === "asc" ? "transform rotate-180" : ""
                        } transition-transform duration-300`}
                    />
                  </div>
                </div>

                {/* Date Pickers */}
                <div className="flex flex-wrap space-x-0 space-y-4 md:space-y-0 md:space-x-6 mb-4">
                  <div className="flex justify-between">
                    {[
                      {
                        date: startDate,
                        setDate: setStartDate,
                        label: "Start Date",
                      },
                      { date: endDate, setDate: setEndDate, label: "End Date" },
                    ].map(({ date, setDate, label }, idx) => (
                      <div
                        className={`relative flex-1 ${idx === 0 ? "mr-4" : "ml-4"
                          } `}
                        key={idx}
                      >
                        <DatePicker
                          selected={date}
                          onChange={(selectedDate) => setDate(selectedDate)}
                          customInput={
                            <div className="relative w-full">
                              <input
                                type="text"
                                value={date ? date.toLocaleDateString() : ""}
                                readOnly
                                className={`w-full px-4 py-3 border-2 rounded-lg shadow-lg focus:outline-none placeholder:text-[#a4a4a4] pl-10 ${darkMode
                                  ? "bg-gray-800 text-gray-100 border-gray-700"
                                  : "bg-white text-[#14044c] border-[#d1c8f3]"
                                  }`} placeholder={label}
                              />
                              <div className="absolute top-0 left-0 flex items-center pl-3 h-full pointer-events-none">
                                <AiOutlineCalendar className={`text-xl md:text-2xl ${darkMode ? "text-gray-100" : "text-[#14044c]"
                                  }  `} />
                              </div>
                            </div>
                          }
                        />
                      </div>
                    ))}
                  </div>
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
                {/* <FaVideo /> */}
                {filteredItems.map((item) => (
                  <div
                    key={item.content_id}
                    className={`flex items-center p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${darkMode
                      ? "bg-gray-800 text-gray-100"
                      : "bg-white text-[#14044c]"
                      }`}
                  >
                    {item.imageUrl ? <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg mr-4 sm:w-20 sm:h-20" // Smaller size for <600px, larger for >=600px
                    /> :
                      <FaVideo className="w-16 h-16 object-cover rounded-lg mr-4 sm:w-20 sm:h-20" />
                    }
                    <div className="flex-1">
                      <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-[#14044c]"}  sm:text-xl`}>
                        {" "}
                        {/* Smaller font for <600px, larger for >=600px */}
                        {item.title}
                      </h2>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                      >
                        {new Date(item.date).toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        {item.interactionType === "like" && <FaThumbsUp />}
                        {item.interactionType === "dislike" && <FaThumbsDown />}
                        {item.interactionType === "share" && <FaShareAlt />}
                      </div>
                    </div>
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`ml-4 bg-[#14044c] text-white px-4 py-2 rounded-lg hover:bg-[#14044c] hover:text-white transition-all duration-300 flex items-center ${window.innerWidth < 600 ? "bg-transparent p-0" : ""
                        }`} // Remove background and padding for smaller screens
                    >
                      <FaExternalLinkAlt
                        className={`mr-2 ${window.innerWidth < 600
                          ? "m-0 text-[#14044c] hover:text-white "
                          : ""
                          }`} // Remove margin and set icon color on smaller screens, with hover effect to revert color
                      />
                      <span
                        className={`${window.innerWidth < 600 ? "hidden" : ""}`}
                      >
                        See More
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      {<Footer />}
    </div>
  );
};

export default HistoryPage;