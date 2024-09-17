
import { useEffect, useState } from "react";
import axios from "axios";
import "../FlipCard.css"; // Import custom CSS for card flipping

const NewspaperHeader = () => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleResponse = await axios.get(
          "https://api.sampleapis.com/futurama/episodes"
        ); // Example API for articles
        const bookResponse = await axios.get(
          "https://openlibrary.org/subjects/fantasy.json?limit=5"
        ); // Example API for books

        const articles = articleResponse.data.slice(0, 7);
        const books = bookResponse.data.works.slice(0, 7);

        const data = [
          ...books.map((book) => ({
            type: "book",
            content: book,
            imageUrl: book.cover_id
              ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
              : "https://via.placeholder.com/300x200",
          })),
          ...articles.map((article) => ({
            type: "article",
            content: article,
            imageUrl: "https://via.placeholder.com/300x200", // Custom image for articles
          })),
        ];

        // Shuffle the data
        for (let i = data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [data[i], data[j]] = [data[j], data[i]];
        }

        setCombinedData(data);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex justify-center items-center w-full">
        <div className="max-w-full mx-4 text-center z-10">
          <h1 className="text-4xl md:text-4xl font-serif font-bold tracking-widest leading-tight mb-2 text-[#14044C]">
            DAILY FEATURINGS
          </h1>
          <p className="text-sm md:text-sm text-[#14044C] mt-2 uppercase tracking-wide font-serif">
            World - Business - Finance - Lifestyle - Travel - Sports - Weather
          </p>

          {/* Horizontal Scrollable Container */}
          <div className="overflow-x-auto w-full py-6">
            <div className="flex space-x-6">
              {combinedData.length > 0 ? (
                combinedData.map((item, index) => (
                  <div
                    key={index}
                    className="flip-card w-[250px] min-w-[250px] mx-4"
                  >
                    <div className="flip-card-inner">
                      {/* Front Side - Title & Description */}
                      <div className="flip-card-front bg-slate-50  rounded-xl shadow-lg border border-gray-500 p-4">
                        <h1 className="text-lg text-[#5342a9]  font-semibold mb-2">
                          {item.content.title}
                        </h1>
                        <p className="text-sm text-[#14044C] mb-2">
                          {item.type === "book"
                            ? `Author: ${item.content.authors[0]?.name || "Unknown"}`
                            : item.content.synopsis}
                        </p>
                        <p className="text-sm text-[#14044C]">
                          {item.type === "book"
                            ? item.content.subjects?.[0]
                            : item.content.desc}
                        </p>
                      </div>

                      {/* Back Side - Image & Read More Button */}
                      <div className="flip-card-back bg-slate-50 rounded-xl shadow-lg border border-gray-500 p-4 flex flex-col justify-center items-center">
                        <img
                          src={
                            item.type === "book"
                              ? item.imageUrl
                              : "./src/assets/article-image.png"
                          }
                          alt={item.content.title}
                          className="w-[200px] h-[300px] object-cover  rounded-lg mb-4"
                        />
                        {/* <button className="bg-[#162a4680] text-white py-1 px-3 rounded-md text-sm">
                          Read More
                        </button> */}


<button
  className="bg-[#162a4680] text-white py-1 px-3 rounded-md text-sm"
  onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(item.content.title)}`, '_blank')}
>
  Read More
</button>

                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading content...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewspaperHeader;