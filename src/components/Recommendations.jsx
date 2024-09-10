
import { useState, useEffect } from 'react';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [filterType, setFilterType] = useState('article'); // Change this to filter based on type

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:2505/recommendations',{
                         credentials:'include'
            });
        const data = await response.json();
        setRecommendations(data.recommendations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter recommendations based on type
    setFilteredRecommendations(
      recommendations.filter((rec) => rec.type === filterType)
    );
  }, [recommendations, filterType]);

  const handleTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Recommendations</h1>
      <label htmlFor="typeFilter" className="block mb-2 text-lg font-medium">Filter by type:</label>
      <select
        id="typeFilter"
        onChange={handleTypeChange}
        value={filterType}
        className="p-2 border border-gray-300 rounded-md mb-6"
      >
        <option value="article">Article</option>
        <option value="youtube">YouTube</option>
      </select>

      <div className="space-y-6">
        {filteredRecommendations.map((rec, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white shadow-md max-w-2xl mx-auto">
            {rec.image_url && <img src={rec.image_url} alt={rec.title} className="w-full h-auto rounded-lg mb-4" />}
            <div>
              <h2 className="text-2xl font-semibold mb-2">{rec.title}</h2>
              <p className="text-gray-700 mb-4">{rec.description}</p>
              <a
                href={rec.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {rec.type == 'article' ? "Read more" : "Go to Youtube" }
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
