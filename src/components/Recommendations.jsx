import { useState, useEffect } from "react";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike,
  AiFillSave,
  AiOutlineSave,
  AiOutlineShareAlt,
} from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import { BiCameraMovie } from "react-icons/bi";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import { RiArticleLine } from "react-icons/ri";
import LazyLoad from "react-lazyload";
import { TbArticleOff } from "react-icons/tb";
import Search from "../pages/Search";
import SearchForm from "./SearchForm";
import { ImSpinner2 } from "react-icons/im";
import { useSelector } from "react-redux";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [shares, setShares] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const darkMode = useSelector((state) => state.darkMode.isDarkMode); // Access dark mode state

  const [page, setPage] = useState(1); // To track the current page
  const [loading, setLoading] = useState(false); // To manage loading state

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API}/recommendations`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const text = await response.text(); // Read the response as text
  //     if (text) {
  //       const data = JSON.parse(text); // Parse the text as JSON
  //       console.log(data);
  //     } else {
  //       console.error("Empty response");
  //     }

  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_API}/recommendations`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       const movie = {
  //         IMDBscore: 7.9,
  //         Poster:
  //           "https://images-na.ssl-images-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
  //         genres: "Action Science Fiction Adventure",
  //         homepage: "http://www.ironmanmovie.com/",
  //         overview:
  //           "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
  //         title: "Iron Man",
  //         type: "movie",
  //       };

  //       setRecommendations([movie, ...data.recommendations]);
  //       setFilteredRecommendations([movie], ...data.recommendations);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const fetchData = async (pageNum = 1) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API}/recommendations?page=${pageNum}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     const movie = {
  //                IMDBscore: 7.9,
  //               Poster:
  //                  "https://images-na.ssl-images-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
  //                genres: "Action Science Fiction Adventure",
  //               homepage: "http://www.ironmanmovie.com/",
  //              overview:
  //                "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
  //               title: "Iron Man",
  //                type: "movie",
  //              };
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     if (pageNum === 1) {
  //       setRecommendations(data.recommendations);
  //     } else {
  //       setRecommendations((prev) => [...prev, ...data.recommendations]);
  //     }
  //     setFilteredRecommendations(data.recommendations);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/recommendations?page=${pageNum}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
   
      const movie = {
        IMDBscore: 7.9,
        Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
        genres: "Action Science Fiction Adventure",
        homepage: "http://www.ironmanmovie.com/",
        overview: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
        title: "Iron Man",
        type: "movie",
      };
  
      // Add the movie object to the fetched recommendations
      const recommendationsWithMovie = [...data.recommendations, movie];
  
      if (pageNum === 1) {
        setRecommendations(recommendationsWithMovie);
      } else {
        setRecommendations((prev) => [...prev, ...data.recommendations]);
      }
  
      setFilteredRecommendations(recommendationsWithMovie);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, []);

  useEffect(() => {
    if (filterType === "All") {
      setFilteredRecommendations(recommendations);
    } else {
      setFilteredRecommendations(
        recommendations.filter((rec) => rec.type === filterType)
      );
    }
  }, [filterType, recommendations]);

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const response = await fetch("/api/getShares"); //fix api
        const data = await response.json();
        setShares(data.shares);
      } catch (error) {
        console.error("Error fetching shares:", error);
      }
    };

    fetchShares();
  }, []);

  const handleImageClick = (image) => {
    setEnlargedImage(image);
  };

  const handleCloseImage = () => {
    setEnlargedImage(null);
  };

  const toggleLike = (index) => {
    const content_id = recommendations[index].content_id;

    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      const newDislikes = [...dislikes];

      if (newLikes[index]) {
        newLikes[index] = false;
      } else {
        newLikes[index] = true;
        newDislikes[index] = false;
      }

      if (newLikes[index]) {
        sendUserActionToBackend(content_id, "like");
      } else {
        //
      }

      setDislikes(newDislikes);
      return newLikes;
    });
  };

  const toggleDislike = (index) => {
    const content_id = recommendations[index].content_id;

    setDislikes((prevDislikes) => {
      const newDislikes = [...prevDislikes];
      const newLikes = [...likes];

      if (newDislikes[index]) {
        newDislikes[index] = false;
        sendUserActionToBackend(content_id, "dislike");
      } else {
        newDislikes[index] = true;
        newLikes[index] = false;
      }

      setLikes(newLikes);
      return newDislikes;
    });
  };

  const handleShareClick = (url, index) => {
    const content_id = recommendations[index].content_id;

    setShares((prevShares) => {
      const newShares = [...prevShares];
      newShares[index] = (newShares[index] || 0) + 1;
      return newShares;
    });
    navigator.clipboard.writeText(url).then(
      () => {
        alert("Link copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy the link: ", err);
      }
    );

    sendUserActionToBackend(content_id, "share");

    window.open(url, "_blank");
  };

  // Function to save or unsave an item
  const savedItem = async (content_id, method) => {
    try {
      const savedData = {
        timestamp: new Date().toISOString(),
        contentId: content_id,
        userId: 1,
      };

      await fetch(
        `https://rsserviceplan-rsapp.azuremicroservices.io/saved-items`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: method === "POST" ? JSON.stringify(savedData) : null, // Only include body for POST
        }
      );

      console.log(
        `Successfully ${
          method === "POST" ? "saved" : "unsaved"
        } the item with contentId ${content_id}.`
      );
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const savePost = (post) => {
    setSavedPosts((prevSavedPosts) => {
      const isAlreadySaved = prevSavedPosts.some(
        (savedPost) => savedPost.content_id === post.content_id
      );

      if (isAlreadySaved) {
        // If the post is already saved, unsave it
        savedItem(post.content_id, "DELETE");
        return prevSavedPosts.filter(
          (savedPost) => savedPost.content_id !== post.content_id
        );
      } else {
        // If the post is not saved, save it
        savedItem(post.content_id, "POST");
        return [...prevSavedPosts, post];
      }
    });
  };

  const sendUserActionToBackend = async (
    content_id,
    action,
    additionalData = {}
  ) => {
    try {
      const interactionData = {
        contentId: content_id, // Use dynamic content_id
        interactionType: action, // "like", "dislike"
        ...additionalData, // Spread additional data if needed
      };

      await fetch(
        `https://rsserviceplan-rsapp.azuremicroservices.io/interactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(interactionData),
        }
      );

      console.log(`Successfully sent ${action} for content ID ${content_id}`);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };
  const uniqueTypes = [
    "All",
    ...new Set(
      recommendations
        .map((rec) => rec.type)
        .filter((type) => typeof type === "string")
    ),
  ];

  return (
    <LazyLoad>
      <div className="space-y-4">
        <div className="flex space-x-4 mb-4 pt-7">
          {uniqueTypes.map((type, index) => (
            <button
              key={index}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-2xl ${
                filterType === type
                  ? "bg-[#5342a9] text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-white text-black"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <SearchForm />

        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((rec, index) => (
            <div
              key={index}
              className={`border border-gray-300 rounded-2xl shadow-lg ${
                darkMode ? " bg-gray-900" : " bg-white"
              } overflow-hidden`}
            >
              <div className="p-4">
                {rec.type === "article" ? (
                  rec.title === "[Removed]" ? (
                    <p className="text-sm text-gray-500">
                      Content not available
                    </p> // Display a message or nothing if title is "[Removed]"
                  ) : (
                    <div>
                      <h3
                        className={`flex items-center text-lg font-semibold mb-2 ${
                          darkMode ? " text-[#ffffff]" : " text-[#14044c]"
                        } `}
                      >
                        <RiArticleLine className="text-blue-600 text-3xl mr-2" />{" "}
                        <span>{rec.title}</span>
                      </h3>

                      <p
                        className={`text-sm mt-2 ${
                          darkMode ? " text-[#ffffff]" : " text-gray-700"
                        }  `}
                      >
                        {rec.description}...
                        <a
                          href={rec.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline hover:text-blue-700"
                        >
                          Read more
                        </a>
                      </p>

                      <div className="flex justify-center pt-5">
                        {rec.image_url && rec.image_url.trim() ? (
                          <img
                            src={rec.image_url}
                            alt={rec.title}
                            className="w-[500px] h-[250px] object-cover cursor-pointer lazy-load"
                            onClick={() => handleImageClick(rec.image_url)}
                            loading="lazy"
                          />
                        ) : (
                          <TbArticleOff className="text-gray-400 text-7xl" />
                        )}
                      </div>
                    </div>
                  )
                ) : rec.type === "youtube" ? (
                  <div>
                    <h3
                      className={`flex items-center text-lg font-semibold mb-2 ${
                        darkMode ? " text-[#ffffff]" : " text-[#14044c]"
                      } `}
                    >
                      <TiSocialYoutubeCircular className="text-red-600 text-3xl mr-2" />

                      <span>{rec.title}</span>
                    </h3>{" "}
                    <div className="flex justify-center items-center">
                      <iframe
                        width="100%"
                        height="350"
                        src={rec.url.replace("watch?v=", "embed/")}
                        title={rec.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ) : rec.type === "movie" ? (
                  <div>
                    <h3
                      className={`flex items-center text-lg font-semibold mb-2 ${
                        darkMode ? " text-[#ffffff]" : " text-[#14044c]"
                      } `}
                    >
                      <BiCameraMovie className="text-orange-500 text-3xl mr-2" />
                      <span>{rec.title}</span>
                    </h3>

                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-[200px] h-auto flex-shrink-0">
                        <img
                          src={rec.Poster}
                          alt={rec.title}
                          className="w-full h-auto object-cover cursor-pointer"
                          onClick={() => handleImageClick(rec.Poster)}
                          loading="lazy"
                        />
                      </div>

                      <div className="flex-1">
                        <div>
                          <p className="text-lg text-gray-700">
                            <span className="font-semibold">Movie genre:</span>{" "}
                            {rec.genres}
                          </p>
                          <p className="text-lg text-gray-700">
                            <span className="font-semibold">IMDB score:</span>{" "}
                            {rec.IMDBscore}
                          </p>
                          <p className="text-lg text-gray-700 mt-2">
                            {rec.overview}...
                            <a
                              href={rec.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline hover:text-blue-800"
                            >
                              Read more
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-center">
                      <img
                        src={rec.image_url}
                        alt={rec.title}
                        className="w-[150px] h-auto object-cover cursor-pointer lazy-load"
                        onClick={() => handleImageClick(rec.image_url)}
                        loading="lazy"
                      />
                    </div>
                    <p className="text-sm mt-2 text-gray-700">
                      {rec.description}
                    </p>
                  </div>
                )}

                <div className="flex justify-between mt-4">
                  <div className="flex space-x-2">
                    <Tooltip title="Like">
                      <button
                        onClick={() => toggleLike(index)}
                        className="p-2 text-2xl text-gray-600 hover:text-blue-600"
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
                        className="p-2 text-2xl text-gray-600 hover:text-red-600"
                      >
                        {dislikes[index] ? (
                          <AiFillDislike className="text-red-600" />
                        ) : (
                          <AiOutlineDislike />
                        )}
                      </button>
                    </Tooltip>
                    <Tooltip title="Save">
                      <button
                        onClick={() => savePost(rec)}
                        className="p-2 text-2xl text-gray-600 hover:text-green-600"
                      >
                        {savedPosts.some(
                          (savedPost) => savedPost.content_id === rec.content_id
                        ) ? (
                          <AiFillSave className="text-green-600" />
                        ) : (
                          <AiOutlineSave />
                        )}
                      </button>
                    </Tooltip>
                    <Tooltip title="Share">
                      <button
                        onClick={() =>
                          handleShareClick(rec.url || rec.homepage, index)
                        }
                        className="p-2 text-2xl text-gray-600 hover:text-purple-600"
                      >
                        <AiOutlineShareAlt />
                      </button>
                    </Tooltip>
                  </div>
                  <div className="text-base text-gray-500">
                    Shares: {shares[index] || 0}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-64">
            <ImSpinner2 className="w-16 h-16 text-[#5342a9] animate-spin" />
          </div>
        )}

        <div className="text-center py-4">
        <button
      onClick={handleLoadMore}
      className={`px-4 py-2 rounded-2xl ${
        darkMode ? "bg-gray-700 text-gray-300" : "bg-[#5342a9] text-white"
      }`}
    >
      {loading ? (
        <ImSpinner2 className="w-7 h-7  text-white animate-spin" />
      ) : (
        'Load More'
      )}
    </button>

          
        </div>

        {/* make image bigger */}
        {enlargedImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-4 rounded-lg">
              <button
                onClick={handleCloseImage}
                className="absolute top-2 right-2 text-black text-xl "
              >
                &times;
              </button>
              <img
                src={enlargedImage}
                alt="Enlarged"
                className="max-w-full max-h-screen px-5"
              />
            </div>
          </div>
        )}
      </div>
    </LazyLoad>
  );
};

export default Recommendations;
