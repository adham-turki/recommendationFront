import { useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im"; 

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await fetch(`http://192.168.1.136:5001/search/${query}`);
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      const data = JSON.parse(responseText);
      // const data = mockData;

      setResults(data.suggested_movies);
      console.log(data.suggested_movies);
    } catch (error) {
      console.error("Error parsing or fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleClearResults = () => {
    setResults([]); // clear search results
    setQuery(""); // clear search bar
  };

  return (
    <div className="">
      <div className="flex items-center space-x-2">
        <form onSubmit={handleSearch} className="flex-grow">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#5342a9] focus:border-[#5342a9]"
              placeholder="Search Similar Movies..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-[#5342a9] hover:bg-[#3f399c] focus:ring-4 focus:outline-none focus:ring-[#5342a9] font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>

        {/* button to clear search results */}
        {results.length > 0 && (
          <button
            onClick={handleClearResults}
            className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm px-4 py-2"
          >
            Clear Results
          </button>
        )}
      </div>
      {/* Spinner */}
      <div className="pt-5">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ImSpinner2 className="w-10 h-10 text-[#5342a9] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {results.map((movie, index) => (
              <div
                key={index}
                className="relative flex flex-col bg-white shadow-lg border border-slate-200 rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                {/* movie title */}
                <div className="relative bg-gradient-to-r from-[#352872] to-[#c293dd] text-white">
                  <h2 className="py-3 px-5 text-xl font-semibold truncate">
                    {movie.title}
                  </h2>
                </div>

                {/* middle part  */}
                <div className="flex p-5 space-x-4 h-[300px]">
                  {/* image on left */}
                  <div className="flex-shrink-0">
                    {movie.Poster && movie.Poster !== "N/A" ? (
                      <img
                        src={movie.Poster}
                        alt={movie.title}
                        className="w-24 h-32 object-cover rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="w-24 h-32 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                        <MdOutlineImageNotSupported />
                      </div>
                    )}
                  </div>

                  {/* text on right */}
                  <div className="flex-1">
                    <p className="text-slate-600 mb-2 text-sm">
                      {movie.overview.length > 120
                        ? movie.overview.substring(0, 120) + "..."
                        : movie.overview}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Genres:</strong> {movie.genres}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>IMDB Score:</strong> {movie["IMDB Score"] || "N/A"}
                    </p>
                  </div>
                </div>

                {/*  Buttons */}
                <div className="bg-gray-50 border-t border-slate-200 py-3 px-4 flex justify-between items-center">
               
                  <a
                    href={
                      movie.homepage && movie.homepage !== "N/A"
                        ? movie.homepage
                        : `https://www.imdb.com/find?q=${encodeURIComponent(
                            movie.title
                          )}`
                    }
                    className="text-[#5342a9] hover:underline text-sm font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Movie
                  </a>

              
                  <div className="flex space-x-2">
                    <button className="text-white bg-[#352872] hover:bg-[#3f399c] text-sm px-4 py-2 rounded-lg shadow-sm">
                      Save
                    </button>
                    <button className="text-white bg-[#352872] hover:bg-[#3f399c] text-sm px-4 py-2 rounded-lg shadow-sm">
                      <AiOutlineShareAlt />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
