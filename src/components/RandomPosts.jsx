// import { useEffect, useState, useRef } from "react";
// import Spinner from "./Spinner";
// import axios from "axios";
// import {
//   AiFillLike,
//   AiOutlineLike,
//   AiFillDislike,
//   AiOutlineDislike,
//   AiOutlineSave,
//   AiFillSave,
//   AiOutlineShareAlt,
// } from "react-icons/ai";
// import Tooltip from "@mui/material/Tooltip";

// const recommendations = [
//   {
//     content_id: "12345",
//     title: "Latest Tech Trends",
//     description:
//       "Technology today is evolving at a rapid pace, enabling faster change and progress, causing an acceleration of the rate of change. However, it is not only technology trends and emerging technologies that are evolving, a lot more has changed, making IT professionals realize that their role will not stay the same in the contactless world tomorrow. And an IT professional in 2024 will constantly be learning, unlearning, and relearning (out of necessity, if not desire).",
//     image_url:
//       "https://www.simplilearn.com/ice9/free_resources_article_thumb/Technology_Trends.jpg",
//     type: "Article",
//     url: "https://www.simplilearn.com/top-technology-trends-and-jobs-article",
//     category: "Tech",
//     date: "2024-08-25",
//     from_admin: false,
//     likes: [],
//     dislikes: [],
//     shares: [],
//   },
//   {
//     content_id: "12346",
//     title: "Latest Tech Trends",
//     type: "youtube",
//     url: "https://youtu.be/vQPgEm9jAJI?si=5Jqo3hXsXr220JqQ",
//     category: "Tech",
//     date: "2024-08-25",
//     from_admin: false,
//     likes: [],
//     dislikes: [],
//     shares: [],
//   },

//   {
//     content_id: "12347",
//     title: "Inception",
//     type: "movie",
//     url: "https://www.imdb.com/title/tt1375666/",
//     image: "https://m.media-amazon.com/images/I/71p9CL+UDmL._AC_SY679_.jpg",
//     description:
//       "A skilled thief is given a chance at redemption if he can successfully perform an inception.",
//     category: "Sci-Fi",
//     date: "2010-07-16",
//     from_admin: false,
//     likes: [],
//     dislikes: [],
//     shares: [],
//   },
//   {
//     content_id: "12348",
//     title: "Guardians of the Galaxy Vol. 2",
//     type: "movie",
//     url: "https://www.imdb.com/title/tt3896198/",
//     image:
//       "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
//     description:
//       "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
//     category: "Action, Adventure, Comedy",
//     date: "2017-05-05",
//     from_admin: false,
//     likes: [],
//     dislikes: [],
//     shares: [],
//   },
// ];

// const PublicAPIPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [likes, setLikes] = useState({});
//   const [dislikes, setDislikes] = useState({});
//   const [shares, setShares] = useState({});
//   const [savedPosts, setSavedPosts] = useState([]);
//   const [enlargedImage, setEnlargedImage] = useState(null);
//   const [filter, setFilter] = useState("All");
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const observer = useRef();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       try {
//         const booksResponse = await axios.get(
//           `https://openlibrary.org/subjects/science.json?limit=7&page=${page}`
//         );
//         const artResponse = await axios.get(
//           `https://api.artic.edu/api/v1/artworks?limit=7&page=${page}`
//         );

//         const bookPosts = booksResponse.data.works.map((book) => ({
//           content_id: book.key,
//           title: book.title,
//           description: `Author: ${
//             book.authors[0]?.name || "Unknown"
//           }\nPublished: ${book.publish_date || "N/A"}`,
//           image: book.cover_id
//             ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
//             : "/path/to/placeholder-image.png",
//           link: `https://openlibrary.org${book.key}`,
//           type: "book",
//           category: book.subjects?.join(", ") || "N/A",
//           rating: book.rating || "N/A",
//           reviews: book.reviews_count || "N/A",
//           summary: book.summary || "No summary available",
//         }));

//         const artPosts = artResponse.data.data.map((art) => ({
//           content_id: art.id,
//           title: art.title,
//           description: `Artist: ${art.artist_title || "Unknown"}\nDate: ${
//             art.date_display || "N/A"
//           }`,
//           image: art.image_id
//             ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
//             : "/path/to/placeholder-image.png",
//           link: `https://www.artic.edu/artworks/${art.id}`,
//           type: "art",
//           category: art.category_titles?.join(", ") || "N/A",
//           rating: "N/A",
//           reviews: "N/A",
//           summary: art.thumbnail?.alt_text || "No summary available",
//         }));

//         const combinedPosts = [...bookPosts, ...artPosts];
//         const shuffledPosts = combinedPosts
//           .sort(() => 0.5 - Math.random())
//           .slice(0, 5);

//         setPosts((prevPosts) => [
//           ...prevPosts,
//           ...shuffledPosts,
//           ...recommendations,
//         ]);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [page]);

//   useEffect(() => {
//     const handleObserver = (entries) => {
//       const target = entries[0];
//       if (target.isIntersecting) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     };

//     const options = {
//       root: null,
//       rootMargin: "20px",
//       threshold: 1.0,
//     };

//     observer.current = new IntersectionObserver(handleObserver, options);
//     const element = document.getElementById("load-more-trigger");
//     if (element) observer.current.observe(element);

//     return () => {
//       if (observer.current) observer.current.disconnect();
//     };
//   }, []);

//   // Filter posts based on the selected filter
//   const filteredPosts = posts.filter((post) => {
//     if (filter === "All") return true;
//     return post.type === filter;
//   });

//   const toggleLike = (index) => {
//     setLikes((prevLikes) => ({
//       ...prevLikes,
//       [index]: !prevLikes[index],
//     }));
//     setDislikes((prevDislikes) => ({
//       ...prevDislikes,
//       [index]: false,
//     }));
//   };

//   const toggleDislike = (index) => {
//     setDislikes((prevDislikes) => ({
//       ...prevDislikes,
//       [index]: !prevDislikes[index],
//     }));
//     setLikes((prevLikes) => ({
//       ...prevLikes,
//       [index]: false,
//     }));
//   };

//   const generateGoogleSearchLink = (title) => {
//     const query = encodeURIComponent(title);
//     return `https://www.google.com/search?q=${query}`;
//   };

//   const incrementShare = (index) => {
//     setShares((prevShares) => ({
//       ...prevShares,
//       [index]: (prevShares[index] || 0) + 1,
//     }));
//   };

//   // const handleShareClick = (title, index) => {
//   //   incrementShare(index); // Update share count
//   //   const searchLink = generateGoogleSearchLink(title);
//   //   window.open(searchLink, "_blank"); // Open the search link in a new tab
//   // };

//   const handleShareClick = (post, index) => {
//     incrementShare(index); // Update share count
  
//     // Determine the URL to share
//     const shareUrl = post.url ? post.url : generateGoogleSearchLink(post.title);
  
//     // Open the URL in a new tab
//     window.open(shareUrl, "_blank");
//   };
  

//   const savePost = (post) => {
//     const isSaved = savedPosts.some(
//       (savedPost) => savedPost.content_id === post.content_id
//     );
//     if (isSaved) {
//       setSavedPosts(
//         savedPosts.filter(
//           (savedPost) => savedPost.content_id !== post.content_id
//         )
//       );
//     } else {
//       setSavedPosts([...savedPosts, post]);
//     }
//   };

//   const handleImageClick = (image) => {
//     setEnlargedImage(image);
//   };

//   const handleCloseImage = () => {
//     setEnlargedImage(null);
//   };

//   const truncateDescription = (description, maxLength = 250) => {
//     if (description.length > maxLength) {
//       return `${description.substring(0, maxLength)}...`;
//     }
//     return description;
//   };

//   return (
//     <div className="space-y-4">
//       {/* Filter Buttons */}
//       <div className="flex space-x-4 mb-4 pt-7">
//         <button
//           onClick={() => setFilter("All")}
//           className={`px-4 py-2 rounded-2xl ${
//             filter === "All" ? "bg-[#5342a9] text-white" : "bg-gray-200"
//           }`}
//         >
//           All
//         </button>
//         <button
//           onClick={() => setFilter("Article")}
//           className={`px-4 py-2 rounded-2xl ${
//             filter === "Article" ? "bg-[#5342a9] text-white" : "bg-gray-200"
//           }`}
//         >
//           Articles
//         </button>
//         <button
//           onClick={() => setFilter("youtube")}
//           className={`px-4 py-2 rounded-2xl ${
//             filter === "youtube" ? "bg-[#5342a9] text-white" : "bg-gray-200"
//           }`}
//         >
//           YouTube
//         </button>
//         <button
//           onClick={() => setFilter("book")}
//           className={`px-4 py-2 rounded-2xl ${
//             filter === "book" ? "bg-[#5342a9] text-white" : "bg-gray-200"
//           }`}
//         >
//           Books
//         </button>
//         <button
//           onClick={() => setFilter("art")}
//           className={`px-4 py-2 rounded-2xl ${
//             filter === "art" ? "bg-[#5342a9] text-white" : "bg-gray-200"
//           }`}
//         >
//           Art
//         </button>
//         <button
//           onClick={() => setFilter("movie")}
//           className={`px-4 py-2 rounded-2xl ${
//             filter === "movie" ? "bg-[#5342a9] text-white" : "bg-gray-200"
//           }`}
//         >
//           Movies
//         </button>
//       </div>

//       {filteredPosts.length > 0 ? (
//         filteredPosts.map((post, index) => (
//           <div
//             key={index}
//             className="border border-gray-300 rounded-3xl shadow-lg bg-white overflow-hidden"
//           >
//             <div className="p-4">
//               <h3 className="text-lg font-semibold mb-2 text-[#14044c]">
//                 {post.title}
//               </h3>

//               {/* Handling post types */}

//               {post.type === "Article" ? (
//                 <div>
//                   <div className="flex justify-center">
//                     <img
//                       src={post.image_url}
//                       alt={post.title}
//                       className="w-[200px] h-auto  object-cover cursor-pointer"
//                       onClick={() => handleImageClick(post.image)}
//                     />
//                   </div>

//                   <p className="text-sm mt-2  text-gray-700">
//                     {/* {post.description} */}
//                     {truncateDescription(post.description)} 
//                   </p>

                
//                 </div>
//               ) : post.type === "youtube" ? (
//                 <div>
//                   <iframe
//                     width="100%"
//                     height="350"
//                     src={post.url.replace("youtu.be", "www.youtube.com/embed")}
//                     title={post.title}
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               ) : post.type === "book" ||
//                 post.type === "art" ||
//                 post.type == "movie" ? (
//                 <div>
//                   <div className="flex justify-center">
//                     <img
//                       src={post.image}
//                       alt={post.title}
//                       className="w-[200px] h-auto  object-cover cursor-pointer"
//                       onClick={() => handleImageClick(post.image)}
//                     />
//                   </div>
//                   <p className="text-sm mt-2  text-gray-700">
//                     {post.description}
//                   </p>
//                 </div>
//               ) : null}

//               {/* <p className="text-sm mt-2  text-gray-700">{post.description}</p> */}

//               <div className="flex justify-between mt-4">
//                 <div className="flex space-x-2">
//                   <Tooltip title="Like">
//                     <button
//                       onClick={() => toggleLike(index)}
//                       className="p-2 text-xl text-gray-600 hover:text-blue-600 "
//                     >
//                       {likes[index] ? (
//                         <AiFillLike className="text-blue-600" />
//                       ) : (
//                         <AiOutlineLike />
//                       )}
//                     </button>
//                   </Tooltip>
//                   <Tooltip title="Dislike">
//                     <button
//                       onClick={() => toggleDislike(index)}
//                       className="p-2 text-xl text-gray-600 hover:text-red-600"
//                     >
//                       {dislikes[index] ? (
//                         <AiFillDislike className="text-red-600" />
//                       ) : (
//                         <AiOutlineDislike />
//                       )}
//                     </button>
//                   </Tooltip>
//                   <Tooltip title="Save">
//                     <button
//                       onClick={() => savePost(post)}
//                       className="p-2 text-xl text-gray-600 hover:text-green-600"
//                     >
//                       {savedPosts.some(
//                         (savedPost) => savedPost.content_id === post.content_id
//                       ) ? (
//                         <AiFillSave className="text-green-600" />
//                       ) : (
//                         <AiOutlineSave />
//                       )}
//                     </button>
//                   </Tooltip>
//                   <Tooltip title="Share">
//                     <button
//                       onClick={() => handleShareClick(post, index)}
//                       className="p-2 text-xl text-gray-600 hover:text-purple-600"
//                     >
//                       <AiOutlineShareAlt />
//                     </button>
//                   </Tooltip>
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   Shares: {shares[index] || 0}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <Spinner />
//       )}

//       {/* Enlarged Image Modal */}
//       {enlargedImage && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="relative bg-white p-4 rounded-lg">
//             <button
//               onClick={handleCloseImage}
//               className="absolute top-2 right-2 text-black"
//             >
//               &times;
//             </button>
//             <img
//               src={enlargedImage}
//               alt="Enlarged"
//               className="max-w-full max-h-screen"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PublicAPIPosts;
import { useEffect, useState, useRef } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike,
  AiOutlineSave,
  AiFillSave,
  AiOutlineShareAlt,
} from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";

const recommendations = [
  {
    content_id: "12345",
    title: "Latest Tech Trends",
    description:
      "Technology today is evolving at a rapid pace, enabling faster change and progress, causing an acceleration of the rate of change. However, it is not only technology trends and emerging technologies that are evolving, a lot more has changed, making IT professionals realize that their role will not stay the same in the contactless world tomorrow. And an IT professional in 2024 will constantly be learning, unlearning, and relearning (out of necessity, if not desire).",
    image_url:
      "https://www.simplilearn.com/ice9/free_resources_article_thumb/Technology_Trends.jpg",
    type: "Article",
    url: "https://www.simplilearn.com/top-technology-trends-and-jobs-article",
    category: "Tech",
    date: "2024-08-25",
    from_admin: false,
    likes: [],
    dislikes: [],
    shares: [],
  },
  {
    content_id: "12346",
    title: "Latest Tech Trends",
    type: "youtube",
    url: "https://youtu.be/vQPgEm9jAJI?si=5Jqo3hXsXr220JqQ",
    category: "Tech",
    date: "2024-08-25",
    from_admin: false,
    likes: [],
    dislikes: [],
    shares: [],
  },

  {
    content_id: "12347",
    title: "Inception",
    type: "movie",
    url: "https://www.imdb.com/title/tt1375666/",
    image: "https://m.media-amazon.com/images/I/71p9CL+UDmL._AC_SY679_.jpg",
    description:
      "A skilled thief is given a chance at redemption if he can successfully perform an inception.",
    category: "Sci-Fi",
    date: "2010-07-16",
    from_admin: false,
    likes: [],
    dislikes: [],
    shares: [],
  },
  {
    content_id: "12348",
    title: "Guardians of the Galaxy Vol. 2",
    type: "movie",
    url: "https://www.imdb.com/title/tt3896198/",
    image:
      "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
    description:
      "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
    category: "Action, Adventure, Comedy",
    date: "2017-05-05",
    from_admin: false,
    likes: [],
    dislikes: [],
    shares: [],
  },
];

const PublicAPIPosts = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [shares, setShares] = useState({});
  const [savedPosts, setSavedPosts] = useState([]);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const booksResponse = await axios.get(
          `https://openlibrary.org/subjects/science.json?limit=7&page=${page}`
        );
        const artResponse = await axios.get(
          `https://api.artic.edu/api/v1/artworks?limit=7&page=${page}`
        );

        const bookPosts = booksResponse.data.works.map((book) => ({
          content_id: book.key,
          title: book.title,
          description: `Author: ${
            book.authors[0]?.name || "Unknown"
          }\nPublished: ${book.publish_date || "N/A"}`,
          image: book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
            : "/path/to/placeholder-image.png",
          link: `https://openlibrary.org${book.key}`,
          type: "book",
          category: book.subjects?.join(", ") || "N/A",
          rating: book.rating || "N/A",
          reviews: book.reviews_count || "N/A",
          summary: book.summary || "No summary available",
        }));

        const artPosts = artResponse.data.data.map((art) => ({
          content_id: art.id,
          title: art.title,
          description: `Artist: ${art.artist_title || "Unknown"}\nDate: ${
            art.date_display || "N/A"
          }`,
          image: art.image_id
            ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
            : "/path/to/placeholder-image.png",
          link: `https://www.artic.edu/artworks/${art.id}`,
          type: "art",
          category: art.category_titles?.join(", ") || "N/A",
          rating: "N/A",
          reviews: "N/A",
          summary: art.thumbnail?.alt_text || "No summary available",
        }));

        const combinedPosts = [...bookPosts, ...artPosts];
        const shuffledPosts = combinedPosts
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);

        setPosts((prevPosts) => [
          ...prevPosts,
          ...shuffledPosts,
          ...recommendations,
        ]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    const element = document.getElementById("load-more-trigger");
    if (element) observer.current.observe(element);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  // Filter posts based on the selected filter
  const filteredPosts = posts.filter((post) => {
    if (filter === "All") return true;
    return post.type === filter;
  });

  const toggleLike = (index) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index],
    }));
    setDislikes((prevDislikes) => ({
      ...prevDislikes,
      [index]: false,
    }));
  };

  const toggleDislike = (index) => {
    setDislikes((prevDislikes) => ({
      ...prevDislikes,
      [index]: !prevDislikes[index],
    }));
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: false,
    }));
  };

  const generateGoogleSearchLink = (title) => {
    const query = encodeURIComponent(title);
    return `https://www.google.com/search?q=${query}`;
  };

  const incrementShare = (index) => {
    setShares((prevShares) => ({
      ...prevShares,
      [index]: (prevShares[index] || 0) + 1,
    }));
  };

  // const handleShareClick = (title, index) => {
  //   incrementShare(index); // Update share count
  //   const searchLink = generateGoogleSearchLink(title);
  //   window.open(searchLink, "_blank"); // Open the search link in a new tab
  // };

  const handleShareClick = (post, index) => {
    incrementShare(index); // Update share count
  
    // Determine the URL to share
    const shareUrl = post.url ? post.url : generateGoogleSearchLink(post.title);
  
    // Open the URL in a new tab
    window.open(shareUrl, "_blank");
  };
  

  const savePost = (post) => {
    const isSaved = savedPosts.some(
      (savedPost) => savedPost.content_id === post.content_id
    );
    if (isSaved) {
      setSavedPosts(
        savedPosts.filter(
          (savedPost) => savedPost.content_id !== post.content_id
        )
      );
    } else {
      setSavedPosts([...savedPosts, post]);
    }
  };

  const handleImageClick = (image) => {
    setEnlargedImage(image);
  };

  const handleCloseImage = () => {
    setEnlargedImage(null);
  };

  const truncateDescription = (description, maxLength = 250) => {
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  };

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-4 pt-7">
        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded-2xl ${
            filter === "All" ? "bg-[#5342a9] text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Article")}
          className={`px-4 py-2 rounded-2xl ${
            filter === "Article" ? "bg-[#5342a9] text-white" : "bg-gray-200"
          }`}
        >
          Articles
        </button>
        <button
          onClick={() => setFilter("youtube")}
          className={`px-4 py-2 rounded-2xl ${
            filter === "youtube" ? "bg-[#5342a9] text-white" : "bg-gray-200"
          }`}
        >
          YouTube
        </button>
        <button
          onClick={() => setFilter("book")}
          className={`px-4 py-2 rounded-2xl ${
            filter === "book" ? "bg-[#5342a9] text-white" : "bg-gray-200"
          }`}
        >
          Books
        </button>
        <button
          onClick={() => setFilter("art")}
          className={`px-4 py-2 rounded-2xl ${
            filter === "art" ? "bg-[#5342a9] text-white" : "bg-gray-200"
          }`}
        >
          Art
        </button>
        <button
          onClick={() => setFilter("movie")}
          className={`px-4 py-2 rounded-2xl ${
            filter === "movie" ? "bg-[#5342a9] text-white" : "bg-gray-200"
          }`}
        >
          Movies
        </button>
      </div>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-3xl shadow-lg bg-white overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-[#14044c]">
                {post.title}
              </h3>

              {/* Handling post types */}

              {post.type === "Article" ? (
                <div>
                  <div className="flex justify-center">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-[200px] h-auto  object-cover cursor-pointer"
                      onClick={() => handleImageClick(post.image)}
                    />
                  </div>

                  <p className="text-sm mt-2  text-gray-700">
                    {/* {post.description} */}
                    {truncateDescription(post.description)} 
                  </p>

                
                </div>
              ) : post.type === "youtube" ? (
                <div>
                  <iframe
                    width="100%"
                    height="350"
                    src={post.url.replace("youtu.be", "www.youtube.com/embed")}
                    title={post.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : post.type === "book" ||
                post.type === "art" ||
                post.type == "movie" ? (
                <div>
                  <div className="flex justify-center">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-[200px] h-auto  object-cover cursor-pointer"
                      onClick={() => handleImageClick(post.image)}
                    />
                  </div>
                  <p className="text-sm mt-2  text-gray-700">
                    {post.description}
                  </p>
                </div>
              ) : null}

              {/* <p className="text-sm mt-2  text-gray-700">{post.description}</p> */}

              <div className="flex justify-between mt-4">
                <div className="flex space-x-2">
                  <Tooltip title="Like">
                    <button
                      onClick={() => toggleLike(index)}
                      className="p-2 text-xl text-gray-600 hover:text-blue-600 "
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
                      className="p-2 text-xl text-gray-600 hover:text-red-600"
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
                      onClick={() => savePost(post)}
                      className="p-2 text-xl text-gray-600 hover:text-green-600"
                    >
                      {savedPosts.some(
                        (savedPost) => savedPost.content_id === post.content_id
                      ) ? (
                        <AiFillSave className="text-green-600" />
                      ) : (
                        <AiOutlineSave />
                      )}
                    </button>
                  </Tooltip>
                  <Tooltip title="Share">
                    <button
                      onClick={() => handleShareClick(post.url, index)}
                      className="p-2 text-xl text-gray-600 hover:text-purple-600"
                    >
                      <AiOutlineShareAlt />
                    </button>
                  </Tooltip>
                </div>
                <div className="text-sm text-gray-500">
                  Shares: {shares[index] || 0}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Spinner />
      )}

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white p-4 rounded-lg">
            <button
              onClick={handleCloseImage}
              className="absolute top-2 right-2 text-black"
            >
              &times;
            </button>
            <img
              src={enlargedImage}
              alt="Enlarged"
              className="max-w-full max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicAPIPosts;
