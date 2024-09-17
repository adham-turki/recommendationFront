import { useState } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike,
} from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const [savedMovies, setSavedMovies] = useState([]);


  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://192.168.1.136:5001/search/${query}`);
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      const data = JSON.parse(responseText);

      setResults(data.suggested_movies);
      console.log(data.suggested_movies);
    } catch (error) {
      console.error("Error parsing or fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearResults = () => {
    setResults([]); 
    setQuery(""); 
  };

  // const handleSave = async (movie) => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API}/saved-item`, 
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(movie),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to save the movie");
  //     }
  //     const data = await response.json();
  //     console.log("Movie saved successfully:", data);
  //     alert("Movie saved successfully!");
  //   } catch (error) {
  //     console.error("Error saving movie:", error);
  //     alert("Failed to save the movie.");
  //   }
  // };

  const handleSave = async (movie) => {
    const isMovieSaved = savedMovies.some((savedMovie) => savedMovie.content_id === movie.content_id);
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/saved-item`,
        {
          method: isMovieSaved ? "PUT" : "POST",  // Use PUT for updates, POST for new saves
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movie),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to save or update the movie");
      }
  
      const data = await response.json();
      console.log(isMovieSaved ? "Movie updated successfully:" : "Movie saved successfully:", data);
  
      if (isMovieSaved) {
        alert("Movie updated successfully!");
      } else {
        setSavedMovies([...savedMovies, movie]);  // Add the saved movie to state
        alert("Movie saved successfully!");
      }
    } catch (error) {
      console.error("Error saving or updating the movie:", error);
      alert("Failed to save or update the movie.");
    }
  };
  
  const handleShareClick = (url) => {
    navigator.clipboard.writeText(url).then(
      () => {
        alert("Link copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy the link: ", err);
      }
    );

    window.open(url, "_blank");
  };

 
  const toggleLike = (index) => {
    const content_id = results[index].content_id;
    console.log("Like button clicked for index:", index);
    console.log("Like button clicked for content_id:", content_id);
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      const newDislikes = [...dislikes];

      if (newLikes[index]) {
        newLikes[index] = false;
        console.log("Unlike:", content_id);
        sendUserActionToBackend(content_id, "unlike"); // Unlike (DELETE)
      } else {
        newLikes[index] = true;
        newDislikes[index] = false;
        console.log("Like:", content_id);
        sendUserActionToBackend(content_id, "like"); // Like (POST)
      }

      setDislikes(newDislikes);
      return newLikes;
    });
  };

  const toggleDislike = (index) => {
    const content_id = results[index].content_id;
    console.log("Dislike button clicked for index:", index);
    console.log("Dislike button clicked for content_id:", content_id);

    setDislikes((prevDislikes) => {
      const newDislikes = [...prevDislikes];
      const newLikes = [...likes];

      if (newDislikes[index]) {
        newDislikes[index] = false;
        console.log("Undislike:", content_id);
        sendUserActionToBackend(content_id, "undislike"); // Undislike (DELETE)
      } else {
        newDislikes[index] = true;
        newLikes[index] = false;
        console.log("Dislike:", content_id);
        sendUserActionToBackend(content_id, "dislike"); // Dislike (POST)
      }

      setLikes(newLikes);
      return newDislikes;
    });
  };

  //for like and dislike
  const sendUserActionToBackend = async (content_id, action) => {
    console.log("aaaaaaaaaaaaaaaaaaaa")
    try {
      const method = action.startsWith("un") ? "DELETE" : "POST"; // Use DELETE for "unlike"/"undislike", POST for "like"/"dislike"
      await fetch(`${import.meta.env.VITE_API}/interactions`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentId: content_id, interactionType: action }),
      });
      console.log(`Action ${action} sent to the backend for content ID: ${content_id}`);

    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };
  return (
    <div className="">
      <div className={`flex items-center space-x-2  `}>
        <form onSubmit={handleSearch} className={`flex-grow `}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className={`w-4 h-4 ${darkMode ? " text-white" :  " text-gray-500" }  `}
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
              className={`block w-full p-4 ps-10 text-sm  border border-gray-300 rounded-lg ${darkMode ? "bg-gray-700 text-white" :  "bg-white text-gray-900" } focus:ring-[#5342a9] focus:border-[#5342a9]`}
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
                  <div className="flex-shrink-0 ">
                    {movie.Poster && movie.Poster !== "N/A" ? (
                      <img
                        src={movie.Poster}
                        alt={movie.title}
                        className="w-24 h-32  object-cover rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="w-24 h-32 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                        <MdOutlineImageNotSupported />
                      </div>
                    )}

                    <a
                      href={
                        movie.homepage && movie.homepage !== "N/A"
                          ? movie.homepage
                          : `https://www.imdb.com/find?q=${encodeURIComponent(
                              movie.title
                            )}`
                      }
                      className="text-[#5342a9]  hover:underline text-sm font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Movie
                    </a>
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
                      <strong>IMDB Score:</strong>{" "}
                      {movie["IMDB Score"] || "N/A"}
                    </p>
                  </div>
                </div>

                {/*  Buttons */}
                {/* <div className="bg-gray-50 border-t border-slate-200 py-3 px-4 flex justify-between items-center">
                  <Tooltip title="Like">
                    <button
                      onClick={() => toggleLike(index)}
                      className="p-2 text-2xl text-[#352872] hover:text-blue-600"
                    >
                      {likes[index] ? (
                        <AiFillLike className="text-blue-600" />
                      ) : (
                        <AiOutlineLike />
                      )}
                    </button>
                  </Tooltip>
                  <Tooltip title="Dislike">
                    <button
                      onClick={() => toggleDislike(index)}
                      className="p-2 text-2xl text-[#352872] hover:text-red-600"
                    >
                      {dislikes[index] ? (
                        <AiFillDislike className="text-red-600" />
                      ) : (
                        <AiOutlineDislike />
                      )}
                    </button>
                  </Tooltip>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave(movie)}
                      className="text-white bg-[#352872] hover:bg-[#3f399c] text-sm px-4 py-2 rounded-lg shadow-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() =>
                        handleShareClick(
                          movie.homepage && movie.homepage !== "N/A"
                            ? movie.homepage
                            : `https://www.imdb.com/find?q=${encodeURIComponent(
                                movie.title
                              )}`
                        )
                      }
                      className="text-white bg-[#352872] hover:bg-[#3f399c] text-sm px-4 py-2 rounded-lg shadow-sm"
                    >
                      <AiOutlineShareAlt />
                    </button>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
