
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



const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);


  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.123:2505/recommendations',{
                         credentials:'include'
            });
        const data = await response.json();
        setRecommendations(data.recommendations);
      } catch (error) {
        console.error('Error fetching data:', error);

  const [filterType, setFilterType] = useState("All");
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [shares, setShares] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const movie = {
    IMDBscore: 7.9,
    Poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    genres: "Action Science Fiction Adventure",
    homepage: "http://www.ironmanmovie.com/",
    overview:
      "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
    title: "Iron Man",
    type: "movie",
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://192.168.1.123:2505/recommendations");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text(); // Read the response as text
      if (text) {
        const data = JSON.parse(text); // Parse the text as JSON
        console.log(data);
      } else {
        console.error("Empty response");
      }

      try {
        const response = await fetch(
          "http://192.168.1.123:2505/recommendations",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        
        setRecommendations([movie, ...data.recommendations]);
        setFilteredRecommendations([movie], ...data.recommendations);
      } catch (error) {
        console.error("Error fetching data:", error);

      }
    };

    fetchData();
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
        const response = await fetch('/api/getShares');//fix api
        const data = await response.json();
        setShares(data.shares);
      } catch (error) {
        console.error('Error fetching shares:', error);
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
        // sendUserActionToBackend(content_id, "unlike");
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

  
  const savePost = (post) => {
    setSavedPosts((prevSavedPosts) => {
      const isAlreadySaved = prevSavedPosts.some(
        (savedPost) => savedPost.content_id === post.content_id
      );
  
      if (isAlreadySaved) {
        // If the post is already saved, remove it and send a request to the backend to unsave it
        savedItem(post.content_id, "DELETE");  
        return prevSavedPosts.filter(
          (savedPost) => savedPost.content_id !== post.content_id
        );
      } else {
        // If the post is not saved, add it and send a request to the backend to save it
        savedItem(post.content_id, "POST");
        return [...prevSavedPosts, post];
      }
    });
  };
  
  // Function to save or unsave an item
  const savedItem = async (content_id, method) => {
    try {
      const savedData = {
        contentId: 1,
        userId: 1,
      };
  
      await fetch(`http://192.168.1.136:8089/saved-items`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method === "POST" ? JSON.stringify(savedData) : null, 
      });
  
      console.log(`Successfully ${method === "POST" ? "saved" : "unsaved"} the item.`);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };
  
  const sendUserActionToBackend = async (
    content_id,
    action,
    additionalData = {}
  ) => {
    try {
      const interactionData = {
        contentId: 1,
        userId: 1,
        interactionType: action,
        ...additionalData,
      };

      await fetch(`http://192.168.1.136:8089/interactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interactionData),
      });
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
                filterType === type ? "bg-[#5342a9] text-white" : "bg-white"
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
              className="border border-gray-300 rounded-2xl shadow-lg bg-white overflow-hidden"
            >
              <div className="p-4">
                {rec.type === "article" ? (
                  rec.title === "[Removed]" ? (
                    <p className="text-sm text-gray-500">
                      Content not available
                    </p> // Display a message or nothing if title is "[Removed]"
                  ) : (
                    <div>
                      <h3 className="flex items-center text-lg font-semibold mb-2 text-[#14044c]">
                        <RiArticleLine className="text-blue-600 text-3xl mr-2" />{" "}
                        <span>{rec.title}</span>
                      </h3>

                      <p className="text-sm mt-2 text-gray-700">
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
                    <h3 className="flex items-center text-lg font-semibold mb-2 text-[#14044c]">
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
                    <h3 className="flex items-center text-lg font-semibold mb-2 text-[#14044c]">
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
