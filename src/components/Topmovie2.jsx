import { useEffect, useState } from "react";
import axios from "axios";
import "../Card2animate.css"; // Make sure the CSS above is included in this file
import Spinner from "./Spinner";
import { LiaImdb } from "react-icons/lia";


const Topmovie2 = () => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(
          "http://192.168.1.136:5001/homepage-movies"
        );
        const movies = movieResponse.data.movies || [];
        const topMovies = Array.isArray(movies) ? movies.slice(0, 10) : [];

        const data = topMovies.map((movie) => ({
          type: "movie",
          content: movie,
          imageUrl: movie.Poster || "../assets/no_image.png",
          imdbScore: movie["IMDB Score"] || "N/A",
        }));

        setCombinedData(data);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center items-center w-full">
        <div className="max-w-full mx-4 text-center z-10">
          <h1 className="text-4xl md:text-4xl font-serif font-bold tracking-widest leading-tight mb-2 text-[#14044C]">
            OUR MOVIE HIGHLIGHTS
          </h1>
          <p className="text-sm md:text-sm text-[#14044C] mt-2 uppercase tracking-wide font-serif">
            Latest - Trending - Top Rated - Upcoming
          </p>

          <div className="overflow-x-auto w-full py-6">
            <div className="flex space-x-6 px-5">
              {combinedData.length > 0 ? (
                combinedData.map((item, index) => (
                  <div key={index} className="container">
                    <img
                      src={item.imageUrl}
                      alt={item.content.title}
                      className="image rounded-xl"
                    />
                    <div className="overlay rounded-xl">
                      <div className="text pt-5 px-5">
                      

                        <h1 className="text-lg text-[#5342a9] font-semibold mb-2 text-center">
                          {item.content.title}
                        </h1>
                        <p className="text-sm text-[#14044C] mb-2 text-center">
                          {/* {item.content.overview || "No description available"} */}
                          {truncateText(
                            item.content.overview || "No description available",
                            150
                          )}
                        </p>
                        <span className=" text-[#14044C] mb-2 text-center flex items-center justify-center text-base">
                          <LiaImdb className="  text-yellow-500 text-6xl  mx-2" />
                          Score: {item.imdbScore}
                        </span>

                        <button
                          className="bg-[#162a4680] text-white py-1 px-3 rounded-md text-sm"
                          onClick={() =>
                            window.open(
                              `https://www.imdb.com/find?q=${encodeURIComponent(
                                item.content.title
                              )}`,
                              "_blank"
                            )
                          }
                        >
                         go to IMDB
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topmovie2;
