// import { useState, useEffect } from "react";
// import axios from "axios";
// import { FaHeart, FaShare } from "react-icons/fa";  // Added FaShare for share action
// import { MdSort } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { AiOutlineCalendar } from "react-icons/ai";

// const HistoryPage = () => {
//   const [filter, setFilter] = useState("all");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [historyItems, setHistoryItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Build query parameters dynamically based on filter and dates
//         const params = new URLSearchParams();
//         if (startDate) params.append("date_range_start", startDate.toISOString().split("T")[0]);
//         if (endDate) params.append("date_range_end", endDate.toISOString().split("T")[0]);
//         if (filter !== "all") params.append("action_type", filter);

//         const response = await axios.get(
//           `https://virtserver.swaggerhub.com/ISSAABED3322/project/1.0.0/history?${params.toString()}`
//         );
        
//         // Check the structure of response.data here
//         console.log(response.data); // For debugging
        
//         setHistoryItems(response.data);
//       } catch (error) {
//         setError("Error fetching data. Please try again later.");
//         console.error("Error fetching data:", error.response ? error.response.data : error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, [filter, startDate, endDate]);

//   // Updated filter logic
//   const filteredItems = historyItems
//     .filter((item) => {
//       if (filter === "all") return true;
//       return item.interaction_type === filter;
//     })
//     .filter((item) => {
//       if (startDate && endDate) {
//         const itemDate = new Date(item.date);
//         return itemDate >= startDate && itemDate <= endDate;
//       }
//       return true;
//     })
//     .sort((a, b) => (sortOrder === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)));

//   return (
//     <div className="min-h-screen bg-[#e6e2eb] p-6">
//       <header className="mb-8">
//         <h1 className="text-4xl font-extrabold text-[#14044c] mb-6">History</h1>

//         <div className="max-w-4xl mx-auto flex flex-col space-y-6">
//           {/* Filter and Sort */}
//           <div className="flex flex-col space-y-4">
//             <div className="flex items-center border-b border-gray-400 pb-2">
//               <div className="flex space-x-6">
//                 {/* Filter Options */}
//                 {["like", "dislike", "share", "all"].map((type) => (
//                   <div
//                     key={type}
//                     onClick={() => setFilter(type)}
//                     className={`cursor-pointer flex items-center px-4 py-2 rounded-lg ${
//                       filter === type ? "bg-[#14044c] text-white shadow-lg" : "bg-white text-[#14044c]"
//                     } hover:bg-[#c293dd] hover:text-white transition-all duration-300`}
//                   >
//                     {type === "like" && <FaHeart className="text-xl mr-2" />}
//                     {type === "dislike" && <FaHeart className="text-xl mr-2 text-red-500" />}
//                     {type === "share" && <FaShare className="text-xl mr-2" />}
//                     <span className="text-lg capitalize">{type}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Sort by Date */}
//               <div
//                 onClick={() => setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))}
//                 className="ml-auto cursor-pointer flex items-center px-4 py-2 text-[#14044c] rounded-lg hover:bg-[#c293dd] hover:text-white transition-all duration-300"
//               >
//                 <span className="text-lg">Sort by Date</span>
//                 <MdSort
//                   className={`text-2xl ml-2 ${sortOrder === "asc" ? "transform rotate-180" : ""} transition-transform duration-300`}
//                 />
//               </div>
//             </div>

//             {/* Date Pickers */}
//             <div className="flex space-x-6 mb-4">
//               {[{ date: startDate, setDate: setStartDate, label: "Start Date" }, { date: endDate, setDate: setEndDate, label: "End Date" }].map(
//                 ({ date, setDate, label }, idx) => (
//                   <div className="relative flex-1" key={idx}>
//                     <DatePicker
//                       selected={date}
//                       onChange={(selectedDate) => setDate(selectedDate)}
//                       customInput={
//                         <div className="relative w-full">
//                           <input
//                             type="text"
//                             value={date ? date.toLocaleDateString() : ""}
//                             readOnly
//                             className="w-full px-4 py-3 bg-white text-[#14044c] border-2 border-[#d1c8f3] rounded-lg shadow-lg focus:outline-none placeholder:text-[#a4a4a4] pl-10"
//                             placeholder={label}
//                           />
//                           <div className="absolute top-0 left-0 flex items-center pl-3 h-full pointer-events-none">
//                             <AiOutlineCalendar className="text-[#14044c] text-xl" />
//                           </div>
//                         </div>
//                       }
//                     />
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       <section className="flex flex-col gap-6 max-w-4xl mx-auto">
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : filteredItems.length > 0 ? (
//           filteredItems.map((item) => (
//             <div
//               key={item.content_id}
//               className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center p-6 hover:scale-105 transform transition-transform duration-300"
//             >
//               <img className="w-28 h-28 object-cover rounded-lg" src={item.thumbnail} alt={item.title} />
//               <div className="ml-6 flex-1">
//                 <h3 className="text-lg font-semibold text-[#14044c]">{item.title}</h3>
//                 <p className="text-sm text-[#14044c]">{item.type}</p>
//                 <div className="mt-3 flex justify-between items-center">
//                   <p className="text-sm text-[#14044c]">{new Date(item.date).toLocaleDateString()}</p>
//                   <button className="bg-[#14044c] hover:bg-[#c293dd] text-white px-4 py-2 rounded-full text-sm transition-all shadow-lg">
//                     Watch Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-[#14044c]">No items found.</p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default HistoryPage;
import { useState, useEffect } from "react";
import { MdSort } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaThumbsUp, FaThumbsDown, FaShareAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import Header from './Header';
//import Footer from './Footer';
// Sample static data
const staticHistoryItems = [
  {
    content_id: 1,
    title: "Sample History Item 1",
    type: "like",
    date: "2024-09-01T12:00:00Z",
    thumbnail: "/path/to/sample-image1.jpg"
  },
  {
    content_id: 2,
    title: "Sample History Item 2",
    type: "dislike",
    date: "2024-09-02T14:00:00Z",
    thumbnail: "/path/to/sample-image2.jpg"
  },
  {
    content_id: 3,
    title: "Sample History Item 3",
    type: "share",
    date: "2024-09-03T16:00:00Z",
    thumbnail: "/path/to/sample-image3.jpg"
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

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        // Build query parameters dynamically based on filter and dates
        const params = new URLSearchParams();
        if (startDate) params.append("date_range_start", startDate.toISOString().split("T")[0]);
        if (endDate) params.append("date_range_end", endDate.toISOString().split("T")[0]);
        if (filter !== "all") params.append("type", filter);

        // Simulate API response for testing
        const response = { data: staticHistoryItems }; // For testing, replace this with actual API call

        // Uncomment the following line to use the actual API call
        // const response = await axios.get(`https://virtserver.swaggerhub.com/ISSAABED3322/project/1.0.0/history?${params.toString()}`);

        console.log(response.data); // For debugging
        
        setHistoryItems(response.data);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
        // Use static data as a fallback
        setHistoryItems(staticHistoryItems);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [filter, startDate, endDate]);

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
    <div className="min-h-screen bg-[#e6e2eb]">
      {/* <Header /> */}
      <main className="pt-20 pb-16"> {/* Adjust padding to avoid overlap */}
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold text-[#14044c] mb-6">History</h1>

        <div className="max-w-4xl mx-auto flex flex-col space-y-6">
          {/* Filter and Sort */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center border-b border-gray-400 pb-2">
              <div className="flex space-x-6">
                {/* Filter Options */}
                <div
                  onClick={() => setFilter("like")}
                  className={`cursor-pointer flex items-center px-4 py-2 rounded-lg ${
                    filter === "like" ? "bg-[#c293dd] text-white" : "hover:bg-[#d3b6e6]"
                  } transition-all duration-300`}
                >
                  <FaThumbsUp className={`text-lg ${filter === "like" ? "text-white" : "text-[#14044c]"}`} />
                  <span className="ml-2 text-lg">Like</span>
                </div>

                <div
                  onClick={() => setFilter("dislike")}
                  className={`cursor-pointer flex items-center px-4 py-2 rounded-lg ${
                    filter === "dislike" ? "bg-[#c293dd] text-white" : "hover:bg-[#d3b6e6]"
                  } transition-all duration-300`}
                >
                  <FaThumbsDown className={`text-lg ${filter === "dislike" ? "text-white" : "text-[#14044c]"}`} />
                  <span className="ml-2 text-lg">Dislike</span>
                </div>

                <div
                  onClick={() => setFilter("share")}
                  className={`cursor-pointer flex items-center px-4 py-2 rounded-lg ${
                    filter === "share" ? "bg-[#c293dd] text-white" : "hover:bg-[#d3b6e6]"
                  } transition-all duration-300`}
                >
                  <FaShareAlt className={`text-lg ${filter === "share" ? "text-white" : "text-[#14044c]"}`} />
                  <span className="ml-2 text-lg">Share</span>
                </div>

                <div
                  onClick={() => setFilter("all")}
                  className={`cursor-pointer flex items-center px-4 py-2 rounded-lg ${
                    filter === "all" ? "bg-[#c293dd] text-white" : "hover:bg-[#d3b6e6]"
                  } transition-all duration-300`}
                >
                  <span className="text-lg">All</span>
                </div>
              </div>

              {/* Sort by Date */}
              <div
                onClick={() => setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))}
                className="ml-auto cursor-pointer flex items-center px-4 py-2 text-[#14044c] rounded-lg hover:bg-[#c293dd] hover:text-white transition-all duration-300"
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
                            className="w-full px-4 py-3 bg-white text-[#14044c] border-2 border-[#d1c8f3] rounded-lg shadow-lg focus:outline-none placeholder:text-[#a4a4a4] pl-10"
                            placeholder={label}
                          />
                          <div className="absolute top-0 left-0 flex items-center pl-3 h-full pointer-events-none">
                            <AiOutlineCalendar className="text-[#14044c] text-xl" />
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

      <section className="flex flex-col gap-6 max-w-4xl mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.content_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center p-6 hover:scale-105 transform transition-transform duration-300"
            >
              <img className="w-28 h-28 object-cover rounded-lg" src={item.thumbnail} alt={item.title} />
              <div className="ml-6 flex-1">
                <h3 className="text-lg font-semibold text-[#14044c]">{item.title}</h3>
                <p className="text-sm text-[#6a5b8b] mt-1">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No history items found.</p>
        )}
      </section>
      </main>
      {/* <Footer /> */}
      
    </div>
  );
};

export default HistoryPage;
